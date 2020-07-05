import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import {
  SSID_PREFIX,
  SCANNING_TEXT,
  CONNECT_TEXT,
  ACTIVITY_INICATOR_LAGRE,
  ACTIVITY_INDICATOR_COLOR,
} from '../../constants/App';
import {VENT_INSTALL} from '../../constants/Navigation';

const {height} = Dimensions.get('window');

const Item = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.item}>
      <View>
        <Text style={styles.itemText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

class VentSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wifi: null,
      currentWifi: null,
      indicator: true,
      activity: SCANNING_TEXT,
    };
  }

  componentDidMount() {
    this.loadWifiList();
  }

  loadWifiList() {
    WifiManager.reScanAndLoadWifiList()
      .then((result) => JSON.parse(result))
      .then((data) =>
        this.setState({wifi: data, indicator: false, activity: null}),
      )
      .catch(() => this.setState({wifi: [], indicator: false}));
  }

  activityIndicator() {
    if (this.state.indicator === false) {
      return null;
    }

    return (
      <View style={styles.indicator}>
        <ActivityIndicator
          size={ACTIVITY_INICATOR_LAGRE}
          color={ACTIVITY_INDICATOR_COLOR}
        />
        <Text style={styles.indicatorText}>{this.state.activity}</Text>
      </View>
    );
  }

  connect(index) {
    WifiManager.connectToProtectedSSID(this.state.wifi[index].SSID, '', false)
      .then(() => this.props.navigation.navigate(VENT_INSTALL))
      .catch((err) => {
        console.log(err);
        this.loadWifiList();
      });
  }

  render() {
    console.log(this.props);
    return (
      <>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.headline}>Vent Select</Text>
          </View>

          {this.activityIndicator()}
          <FlatList
            style={{
              display: this.state.activity === CONNECT_TEXT ? 'none' : 'flex',
            }}
            data={this.state.wifi}
            renderItem={({item, index}) => (
              <Item
                title={item.SSID}
                onPress={() => {
                  this.setState({
                    indicator: true,
                    activity: CONNECT_TEXT,
                    wifi: null,
                  });
                  this.connect(index);
                }}
              />
            )}
            keyExtractor={(item) => item.BSSID}
          />
          <View style={styles.rescan}>
            <Button
              title="Rescan Networks"
              disabled={this.state.wifi === null}
              onPress={() => {
                this.setState({
                  wifi: null,
                  indicator: true,
                  activity: SCANNING_TEXT,
                });
                this.loadWifiList();
              }}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: height,
    position: 'relative',
  },
  rescan: {
    position: 'absolute',
    bottom: 30,
    zIndex: 2,
    left: 0,
    right: 0,
    paddingLeft: 5,
    paddingRight: 5,
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 120,
    transform: [{translateY: -60}, {translateX: -100}],
  },
  indicatorText: {
    textAlign: 'center',
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  item: {
    height: 50,
    paddingLeft: 10,
    borderBottomWidth: 1,
  },
  itemText: {
    lineHeight: 50,
    fontSize: 16,
    textAlignVertical: 'center',
  },
});

export default VentSelect;
