import React from 'react';
import {Text, StyleSheet, View, Button, Keyboard} from 'react-native';
import NameInput from './Name';
import FlowAdjust from './FlowAdjust';
import Backdrop from '../Backdrop/Backdrop';
import {
  AIR_FLOW_MIN,
  AIR_FLOW_MAX,
  AIR_FLOW_KEY,
  O2_FLOW_KEY,
  AIR_TEN_TIMES_FLOW_KEY,
} from '../../constants/App';
import NetworkSetup from './NetworkSetup';
import Finish from './Finish';
import {VENT_SELECT_PAGE, INDEX_PAGE} from '../../constants/Navigation';
import broadcast from '../../data/Broadcast';
import {connect} from 'react-redux';
import WifiManager from 'react-native-wifi-reborn';

class ConfigWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      ventName: true,
      name: false,
      airFlow: '',
      o2Flow: '',
      airFlowInterval: '',
      o2FlowInterval: '',
      ssid: '',
      password: '',
    };
  }

  componentDidMount() {
    setTimeout(() => broadcast.sendBroadcast(), 300);
  }

  componentDidUpdate() {
    if (this.props.isConnected === true && this.props.isConfigMode === false) {
      broadcast.switchConfigMode();
    }

    console.log('didUpdate', this.props.isSaved);
    if (this.props.isSaved === true) {
      this.props.navigation.navigate(INDEX_PAGE);
    }
  }

  sendVentTestCmd(test) {
    Keyboard.dismiss();
    broadcast.sendTest(test);
  }

  updateVent() {
    Keyboard.dismiss();

    broadcast.saveVent({
      ventname: this.state.name,
      c_flair: this.state.airFlow,
      c_flo2: this.state.o2Flow,
      c_intair: this.state.airFlowInterval,
      c_int2t: this.state.o2FlowInterval,
      ssid: this.state.ssid,
      password: this.state.password,
    });
  }

  nameSaveButton() {
    if (this.state.step !== 0) {
      return null;
    }
    return (
      <Button
        title="Set name"
        disabled={
          this.state.name.length < 5 || this.state.name === false ? true : false
        }
        style={{
          display: this.state.ventName === true ? 'flex' : 'none',
        }}
        onPress={() => this.setState({ventName: false, step: 1})}
      />
    );
  }

  render() {
    if (this.props.isConnected === false || this.props.isConfigMode === false) {
      return (
        <Backdrop
          isOpen={true}
          text={
            this.props.isConnected === false
              ? 'Waiting for vent data'
              : 'Switch vent to config mode'
          }
        />
      );
    }
    return (
      <View style={styles.wrapper}>
        <Backdrop isOpen={this.props.isTesting === true} />
        <Text style={styles.headline}>Vent Setup</Text>
        <NameInput
          defaultValue={this.props.name}
          value={this.state.name}
          editable={this.state.step === 0}
          onChange={(val) => this.setState({name: val})}
        />
        {this.nameSaveButton()}
        <FlowAdjust
          title="Actual Flow Air"
          step={this.state.step}
          value={this.state.airFlow}
          active={1}
          editable={this.state.step === 1}
          onChange={(value) => this.setState({airFlow: Number(value)})}
          actionButton={{
            title: 'Air/1s',
            onPress: () => this.sendVentTestCmd(AIR_FLOW_KEY),
          }}
          onSave={() => this.setState({step: 2})}
          minValue={AIR_FLOW_MIN}
          maxValue={AIR_FLOW_MAX}
        />

        <FlowAdjust
          title="Actual Flow O2"
          step={this.state.step}
          value={this.state.o2Flow}
          active={2}
          editable={this.state.step === 2}
          onChange={(value) => this.setState({o2Flow: Number(value)})}
          actionButton={{
            title: 'O2/1s',
            onPress: () => this.sendVentTestCmd(O2_FLOW_KEY),
          }}
          onSave={() => this.setState({step: 3})}
          minValue={AIR_FLOW_MIN}
          maxValue={AIR_FLOW_MAX}
        />

        <FlowAdjust
          title="Actual Air/10x"
          step={this.state.step}
          value={this.state.airFlowInterval}
          active={3}
          editable={this.state.step === 3}
          onChange={(value) => this.setState({airFlowInterval: Number(value)})}
          actionButton={{
            title: 'Air/10x',
            onPress: () => this.sendVentTestCmd(AIR_TEN_TIMES_FLOW_KEY),
          }}
          onSave={() => this.setState({step: 4})}
          minValue={AIR_FLOW_MIN}
          maxValue={AIR_FLOW_MAX}
        />

        <FlowAdjust
          title="Actual Flow O2/10x"
          step={this.state.step}
          value={this.state.o2FlowInterval}
          active={4}
          editable={this.state.step === 4}
          onChange={(value) => this.setState({o2FlowInterval: Number(value)})}
          actionButton={{
            title: 'O2/10x',
            onPress: () => this.sendVentTestCmd(AIR_TEN_TIMES_FLOW_KEY),
          }}
          onSave={() => this.setState({step: 5})}
          minValue={AIR_FLOW_MIN}
          maxValue={AIR_FLOW_MAX}
        />

        <NetworkSetup
          active={5}
          step={this.state.step}
          editable={this.state.step === 5}
          ssid={this.state.ssid}
          password={this.state.password}
          onSsidChange={(text) => this.setState({ssid: text})}
          onPasswordChange={(text) => this.setState({password: text})}
          onSave={() => this.setState({step: 6})}
        />

        <Finish
          active={6}
          step={this.state.step}
          onPress={() => this.updateVent()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'relative',
  },
  headline: {
    height: 40,
    lineHeight: 40,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
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
});

const mapStateToProps = (state) => ({
  name: state.name,
  mac: state.mac,
  ip: state.ip,
  isConfigMode: state.isConfigMode,
  isConnected: state.isConnected,
  isTesting: state.isTesting,
  isSaved: state.isSaved,
  currentWifi: state.currentWifi,
});

export default connect(mapStateToProps)(ConfigWizard);
