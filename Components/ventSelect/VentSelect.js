import React from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import {SSID_PREFIX} from '../../constants/App';

const Item = (props) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

class VentSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wifi: null,
      currentWifi: null,
    };
  }

  componentDidMount() {
    this.loadWifiList();
  }

  loadWifiList() {
    WifiManager.reScanAndLoadWifiList()
      .then((result) => JSON.parse(result))
      .then((data) => this.setState({wifi: data}))
      .catch(() => this.setState({wifi: []}));
  }

  render() {
    console.log(this.state);

    return (
      <>
        <View style={{height: '80%'}}>
          <View>
            <Text style={styles.headline}>Vent Select</Text>
          </View>
          <FlatList
            data={this.state.wifi}
            renderItem={({item, index}) => <Item title={item.SSID} />}
            keyExtractor={(item) => item.BSSID}
          />
        </View>
        <Button
          title="Rescan Networks"
          style={styles.rescan}
          disabled={this.state.wifi === null}
          onPress={() => {
            this.setState({wifi: null});
            this.loadWifiList();
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  rescan: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    color: 'green',
  },

  headline: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VentSelect;
