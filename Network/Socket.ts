import dgram from 'react-native-udp';
import UdpSocket from 'react-native-udp/lib/types/UdpSocket';
import WifiManager from 'react-native-wifi-reborn';
import {UDP_TYPE} from '../constants/app';
import {UDP_PORT} from './../constants/app';
import {TBroadcastMessages, TResponseBroadcast} from './Socket.d';
const Buffer = (global.Buffer = global.Buffer || require('buffer').Buffer);

type TRinfo = {address: string; port: number; family: string; size: number};

let socket: UdpSocket | null = null;
let target: string = '255.255.255.255';

export function socketSend(data: TBroadcastMessages): Promise<any> {
  return new Promise((resolve, reject) => {
    if (socket === null) {
      reject(new Error('socket is null'));
      return;
    }
    let timerId: NodeJS.Timeout;
    // event to receive messages
    socket.on('message', messageCallback);
    // resolve by message and destroy socket event
    function messageCallback(msg: Uint8Array, rinfo: TRinfo) {
      const message = JSON.parse(msg.toString());

      if (message.cmd === data.cmd) return;

      clearTimeout(timerId);
      if (target !== rinfo.address) target = rinfo.address;

      if (socket === null) return;
      socket.off('message', messageCallback);
      resolve(message);
    }

    const message = Buffer.from(JSON.stringify(data));
    socket.send(
      message,
      0,
      message.length,
      UDP_PORT,
      target,
      (err: unknown) => {
        console.log(err);
      },
    );

    // udp is stateless so try again after 300ms
    timerId = setTimeout(async () => {
      if (socket === null) return;
      socket.off('message', messageCallback);
      socketSend(data)
        .then((message) => resolve(message))
        .catch((e) => reject(e));
    }, 300);
  });
}

export const createSocket = (): Promise<TResponseBroadcast> => {
  return new Promise((resolve, reject) => {
    WifiManager.forceWifiUsageWithOptions(true, {noInternet: true});
    socket = dgram.createSocket({type: UDP_TYPE, debug: true});

    try {
      socket.bind(UDP_PORT);
      socket.once('listening', async () => {
        const response = await socketSend({cmd: 'scan'});
        resolve(response);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const closeSocket = () => {
  WifiManager.forceWifiUsageWithOptions(false, {noInternet: true});
  if (socket === null) return;
  target = '255.255.255.255';
  socket.close();
  socket = null;
};
