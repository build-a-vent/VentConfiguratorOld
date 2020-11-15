# VentConfigurator

In the following, the Sources of the VentConfigurator - the software running on Android used to configure the ventilators - are published. For detailed information about the project, visit the [Build-a-Vent website](https://build-a-vent.org/). We are always looking for contributors.

The project was realized in React-Native and TypeScript.

The Vent has to be put into Config Mode to prevent connecting to a wifi. To do this, open Arduino IDE, connect the Vent via USB to your computer then go to Tools >> Serial Monitor and set the Baud rate to 115200. Access the input field and type:

```
"blafasel "Passwort wificonfig
```

The vent will display

```
marked new ssid="blafasel" and key="Passwort" to eeprom
```

Then, reset the vent. The following message will be displayed:

```
AP : bav_<Vent Mac> running, IP : <Vent IP>
```

In order to track the network traffic, the following commands can be executed:
to display network messages, type:

5000 netshowtx

5000 netshowrx

## Connection

After joining the vent wifi, the app will send a broadcast.

Broadcast:

```

{
     cmd: scan,
}

```

Answer:

```
{
  cmd: 'status',
  c_pip: 60,
  c_lip: 40,
  c_pep: 30,
  c_lep: 30,
  c_flair: 1500,
  c_flo2: 1500,
  c_airt: 1300,
  c_o2t: 1300,
  c_inspt: 2600,
  c_cyclt: 4000,
  c_wtemp: 44,
  c_name: '??',
  mac: '98:F4:AB:FB:25:C9',
  a_pip: 0,
  a_eip: 0,
  a_eep: 0,
}


```

## First request

In order to put the vent into config mode:

```
{
 cmd: configmode,
 mac: xxxxx
}

```

answer:

```

{
    cmd: configuring,
}

```

## Test requests

### To activate the test on the vent send:

```

 {
  cmd: valvecfg,
  mac: xxxxxx,
  action: [airone,o2one,airten,o2ten]
}

```

answer:

```
 {
  cmd: valvecfgdone,
}

```

## Config json to vent

```

{
cmd: config
mac: mac
ventname: name
c_flair: airFlow
c_flo2: o2Flow
c_intair: airFlowInterval
c_into2: o2FlowInterval
ssid: ssid
password: password
}

```

## Vent answer

```

{
cmd: cfgack
req: config
seq: seqnr
mac: mac
}

```

```

```
