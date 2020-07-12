import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import DefaultWif from './DefaultWifi';
import ConnectDefault from './ConnectDefault';

const DefaultModal = (props) => {
  if (
    props.defaultWifi &&
    (props.defaultWifi === props.currentWifi || props.stayCurrent === true)
  ) {
    return null;
  }
  return (
    <View style={styles.backdrop}>
      <View style={styles.modal}>
        <DefaultWif />
        <ConnectDefault />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  defaultWifi: state.defaultWifi,
  currentWifi: state.currentWifi,
  stayCurrent: state.stayCurrent,
});

export default connect(mapStateToProps)(DefaultModal);

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(33,37,41, .4)',
    zIndex: 9999999,
  },
  modal: {
    width: '90%',
    backgroundColor: '#ffffff',
    minHeight: 200,
    position: 'absolute',
    top: 60,
    left: '5%',
    padding: 10,
  },
});
