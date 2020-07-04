import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Headline = props => {


    return <Text>Headkline ......</Text>;
};

const IndexView = (props) => {

    console.log(props)
    return (
        <View key="index-view" style={styles.wrapper}>
            <Headline />
            <Text style={{ color: 'deeppink', fontSize: 22 }}>Ich bin der Index</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'green',
        height: 80
    }
})

export default IndexView
