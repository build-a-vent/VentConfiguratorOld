import React from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Colors} from '../../constants/styles';
import {RootState} from '../../store';
import styles from './styles';

type PropsProgress = {
  isOpen: boolean;
  message: string | null;
};

const Progress: React.FunctionComponent<PropsProgress> = (
  props,
): JSX.Element => {
  return (
    <Modal visible={props.isOpen} transparent={true}>
      <View style={styles.backdrop}>
        <View style={styles.message}>
          <ActivityIndicator
            color={Colors.spinnerColor}
            style={styles.spinner}
            size={80}
          />
          <Text style={styles.text}>{props.message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const mapState = (state: RootState) => ({
  isOpen: state.app.progress,
  message: state.app.progressMessage,
});

export default connect(mapState)(Progress);
