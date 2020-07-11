import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import {SSID_PREFIX, SCANNING_TEXT, CONNECT_TEXT} from '../../constants/App';
import {VENT_INSTALL} from '../../constants/Navigation';
import Backdrop from '../Backdrop/Backdrop';
import {connect} from 'react-redux';
import {setCurrentWifi, setConfigWifi} from '../../redux/actions/Wifi';
import {bindActionCreators} from 'redux';

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
    if (this.props.currentWifi === null) {
      WifiManager.getCurrentWifiSSID().then((ssid) =>
        this.props.setCurrentWifi(ssid),
      );
    }
  }

  loadWifiList() {
    WifiManager.reScanAndLoadWifiList()
      .then((result) => JSON.parse(result))
      .then((data) =>
        this.setState({wifi: data, indicator: false, activity: null}),
      )
      .catch(() => this.setState({wifi: [], indicator: false}));
  }

  connect(index) {
    WifiManager.connectToProtectedSSID(this.state.wifi[index].SSID, '', false)
      .then(() => this.props.navigation.navigate(VENT_INSTALL))
      .catch((err) => {
        this.loadWifiList();
      });
  }

  getVentNetwoks() {
    if (!this.state.wifi) {
      return null;
    }

    return [this.state.wifi.find((wifi) => wifi.SSID.startsWith(SSID_PREFIX))];
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop isOpen={this.state.indicator} text={this.state.activity} />
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.headline}>Vent Select</Text>
          </View>
          <FlatList
            style={{
              display: this.state.activity === CONNECT_TEXT ? 'none' : 'flex',
            }}
            data={this.getVentNetwoks()}
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
      </React.Fragment>
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCurrentWifi,
      setConfigWifi,
    },
    dispatch,
  );

const mapStateToProps = (state) => ({
  currentWifi: state.currentWifi,
});

export default connect(mapStateToProps, mapDispatchToProps)(VentSelect);
