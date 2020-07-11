# VentConfigurator

Sources for the build-a-vent configurator on Android

to switch with the ESP to the config wifi, open Arduino IDE go to Tools >> Serial Monitor and rype:

```
"blafasel "Passwort wificonfig
```

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

After receiving the answer, the config wizard can start. In the head, the MAC address will displayed

## First request

to stop the vent and move to config mode send:

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
c_int2t: o2FlowInterval
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
