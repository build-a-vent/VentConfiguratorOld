import {NetworkInfo} from 'react-native-network-info';
import store from '../redux/Store';
import {
  setVentData,
  setConfigMode,
  setVentTesting,
  setVentSaved,
} from '../redux/actions/Vent';
import {VENT_CONFIG_TESTS} from '../constants/App';

const Buffer = (global.Buffer = global.Buffer || require('buffer').Buffer);
const dgram = require('dgram');

const socketType = 'udp4';
const socketPort = 1111;

const SCAN_CMD = 'scan';
const SAVE_CMD = 'config';
const STATUS_CMD = 'status';

const CMD_CONFIG_MODE = 'configmode';
const CMD_TESTS = 'valvecfg';

const retryTime = 100;

class Broadcaster {
  ip;
  subnet;
  broadcast;
  seqPrefix;
  socket;
  request = false;

  constructor() {
    this.socket = dgram.createSocket(socketType);
    this.getInterfaceIp().getInterfaceNet();
  }

  reinit() {
    this.getInterfaceIp()
      .getInterfaceNet()
      .calculateBroadcast()
      .sendBroadcast();
  }

  init() {
    this.calculateBroadcast();
    this.socket.once('listening', () => {});

    this.socket.on('message', this.receive.bind(this));
    this.socket.bind(socketPort);
  }
  /**
   * sends the broadcast for all ventilators no specials needed
   */
  sendBroadcast() {
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
      if (this.request === false) return;
      this.sendBroadcast();
    }, retryTime);
  }

  saveVent(sendData) {
    const data = store.getState();
    sendData.cmd = SAVE_CMD;
    sendData.mac = data.mac;

    this.sendToVent(sendData, data.ip);

    setTimeout(() => {
      store.dispatch(setVentSaved());
      this.request = true;
    }, 2000);
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

    store.dispatch(setVentTesting(true));
    this.sendToVent(sendData, data.ip);
    setTimeout(() => {
      console.warn('----- REMOVE ME ---------------');
      this.request = false;
      store.dispatch(setVentTesting(false));
    }, 2000);
  }

  switchConfigMode() {
    console.log('set vent to config mode');
    const data = store.getState();
    const sendData = {
      cmd: CMD_CONFIG_MODE,
      mac: data.mac,
    };

    this.sendToVent(sendData, data.ip);

    // TODO hack while no vent response

    setTimeout(() => {
      console.warn('----- REMOVE ME ---------------');
      store.dispatch(setConfigMode(true));
      this.request = true;
    }, 2000);
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
    console.log(data);
    switch (cmd) {
      case SCAN_CMD:
        return;
      case STATUS_CMD:
        this.request = false;
        store.dispatch(
          setVentData({
            mac: data.mac,
            ip: rinfo.address,
            name: data.c_name,
            isConnected: true,
          }),
        );
        break;
      default:
        console.log('------------------ no cmd ----------------------');
        console.log(data);
    }
  }

  getInterfaceIp() {
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      this.ip = ipv4Address;

      if (this.broadcast) {
        this.init();
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
        this.init();
      }
    });
    return this;
  }

  calculateBroadcast() {
    const addr_splitted = this.ip.split('.');
    const netmask_splitted = this.subnet.split('.');
    this.seqPrefix = addr_splitted.slice(-1)[0]; //last part of a ip is unique so we can use as prefix

    // bitwise OR over the splitted NAND netmask, then glue them back together with a dot character to form an ip
    // we have to do a NAND operation because of the 2-complements; getting rid of all the 'prepended' 1's with & 0xFF
    this.broadcast = addr_splitted
      // eslint-disable-next-line no-bitwise
      .map((e, i) => (~netmask_splitted[i] & 0xff) | e)
      .join('.');

    return this;
  }
}

const broadcast = new Broadcaster();

export default broadcast;
