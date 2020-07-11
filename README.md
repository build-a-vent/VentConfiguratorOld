# VentConfigurator

Sources for the build-a-vent configurator on Android

to switch with the ESP to the config wifi, open Arduino IDE go to Tools >> Serial Monitor and rype:

```
"blafasel "Passwort wificonfig
```

## Connection

After joining the vent wifi, the app will send a broadcast.

Answer:

```

{
 ...AppBroadcast
}


```

After receiving the answer, the config wizard can start. In the head, the MAC address will displayed

## Config json to vent

```

{
    cmd: 'config
    key: name
    f_air: airFlow
    f_o2: o2Flow
    c_airt: airFlowInterval
    c_o2t: o2FlowInterval
    ssid: ssid
    password: password
}


```

## Vent answer

```

{

    //success:
    {
        cmd: 'cfgsuccess'
    }

    //fail
    {
        cmd: 'cfgfail'

    }

}

```
