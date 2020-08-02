import { NetworkInfo } from 'react-native-network-info';
import store from '../redux/Store';
import {
  setVentData,
  setConfigMode,
  setVentTesting,
  setVentSaved,
} from '../redux/actions/Vent';
import { VENT_CONFIG_TESTS } from '../constants/App';

const Buffer = (global.Buffer = global.Buffer || require('buffer').Buffer);
const dgram = require('dgram');

const socketType = 'udp4';
const socketPort = 1111;

const SCAN_CMD = 'scan';
const STATUS_CONFIG_MODE = 'configuring';
const STATUS_CMD = 'status';
const STATUS_TESTING = 'valverun'

const CMD_SAVE = 'config';
const CMD_CONFIG_MODE = 'configmode';
const CMD_TESTS = 'valvecfg';

const retryTime = 100;
const TEST_DURATION = 2000;

class Broadcast {
  ip = null;
  subnet = null;
  broadcast;
  seqPrefix;
  socket;
  broadcastSuccess = false

  constructor() {
    this.socket = dgram.createSocket(socketType);
    this.getInterfaceIp().getInterfaceNet().calculateBroadcast();
  }

  init() {
    this.socket.once('listening', () =>
      this.sendBroadcast());

    this.socket.on('message', this.receive.bind(this));
    this.socket.bind(socketPort);
  }

  close() {
    this.socket.close(() => console.log('Socet is close and can be used again'))
  }

  /**
   * sends the broadcast for all ventilators no specials needed
   */
  sendBroadcast() {
    if (this.broadcastSuccess === true) return;
    this.request = true;
    const buffer = this.stringToBuffer(
      JSON.stringify({
        cmd: SCAN_CMD,
      }),
    );

    this.socket.send(
      buffer,
      0,
      buffer.length,
      socketPort,
      this.broadcast,
      (err) => {
        // TODO send status to app for network reconnect
        //{message: "sendto failed: ENETUNREACH (Network is unreachable)"}
        console.log(err);
      },
    );

    setTimeout(() => {
      this.sendBroadcast();
    }, retryTime);
  }

  saveVent(sendData) {
    const data = store.getState();
    sendData.cmd = CMD_SAVE;
    sendData.mac = data.mac;

    this.sendToVent(sendData, data.ip);
  }

  sendTest(test) {
    if (VENT_CONFIG_TESTS.indexOf(test) === -1) {
      throw `unknown test ${test}`;
    }

    const data = store.getState();
    const sendData = {
      cmd: CMD_TESTS,
      mac: data.mac,
      action: test,
    };

    setTimeout(() => store.dispatch(setVentTesting(true)), 0);
    this.sendToVent(sendData, data.ip);
  }

  switchConfigMode() {
    const data = store.getState();
    const sendData = {
      cmd: CMD_CONFIG_MODE,
      mac: data.mac,
    };

    this.sendToVent(sendData, data.ip);
  }

  sendToVent(data, ip) {
    this.request = true;
    const buffer = this.stringToBuffer(JSON.stringify(data));
    this.socket.send(buffer, 0, buffer.length, socketPort, ip, (err) =>
      console.log('send error ====>', err),
    );
  }

  receive(msg, rinfo) {
    const data = JSON.parse(msg.toString());
    const cmd = data.cmd;
    switch (cmd) {
      case SCAN_CMD:
        return;
      case STATUS_CMD:
        this.broadcastSuccess = true;
        store.dispatch(
          setVentData({
            mac: data.mac,
            ip: rinfo.address,
            name: data.c_name,
            isConnected: true,
          }),
        );
        break;
      case STATUS_CONFIG_MODE:
        store.dispatch(setConfigMode(true));
        break;
      case STATUS_TESTING:
        setTimeout(() => store.dispatch(setVentTesting(false)), TEST_DURATION)
        break;
      default:
        console.log(data);
    }
  }

  getInterfaceIp() {
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      this.ip = ipv4Address;
      if (this.broadcast) {
        this.calculateBroadcast()
      }
    });
    return this;
  }

  stringToBuffer(data) {
    return Buffer.from(data);
  }

  getInterfaceNet() {
    NetworkInfo.getSubnet().then((subnet) => {
      this.subnet = subnet;
      if (this.ip) {
        this.calculateBroadcast()
      }
    });
    return this;
  }

  calculateBroadcast() {
    if (this.ip === null || this.subnet === null) {
      return this;
    }
    const addr_splitted = this.ip.split('.');
    const netmask_splitted = this.subnet.split('.');
    this.seqPrefix = addr_splitted.slice(-1)[0]; //last part of a ip is unique so we can use as prefix

    // bitwise OR over the splitted NAND netmask, then glue them back together with a dot character to form an ip
    // we have to do a NAND operation because of the 2-complements; getting rid of all the 'prepended' 1's with & 0xFF
    this.broadcast = addr_splitted
      // eslint-disable-next-line no-bitwise
      .map((e, i) => (~netmask_splitted[i] & 0xff) | e)
      .join('.');

    return this.init()
  }
}

//const broadcast = new Broadcaster();

export default Broadcast;
