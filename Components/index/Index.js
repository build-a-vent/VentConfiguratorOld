import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { PermissionsAndroid } from 'react-native';

import * as RootNavigation from '../../RootNavigation';
import { VENT_SELECT_PAGE } from "../../constants/Navigation";


let displayed = false

function getPermissions(setIsVisible) {
    displayed = true
    PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: 'Location permission is required for WiFi connections',
            message:
                'This app needs location permission as this is required  ' +
                'to scan for wifi networks.',
            buttonNegative: 'DENY',
            buttonPositive: 'ALLOW',
        },
    ).then(granted => {
        console.log('promise result ====>', granted
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            RootNavigation.navigate(VENT_SELECT_PAGE);
        } else {
            setIsVisible(true)
        }
    });


}

function grantButton(cb) {

    return (<Button onPress={() => getPermissions(cb)} title='Grant access' />)

}

const IndexView = (props) => {

    const [isVisible, setIsVisible] = useState(false)
    const cb = () => setIsVisible(true)
    if (displayed === false) { getPermissions(cb) }
    return (
        <View key="index-view" style={styles.wrapper}>
            <Text>We need access to your wifi connection</Text>
            {isVisible === true ? grantButton(cb) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'green',
        height: '100%'
    }
})

export default IndexView
