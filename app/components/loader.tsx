import * as COLORS from '../utils/colors';

import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';

import React from 'react';

const Loader = () => {
  return (
    <View>
      <Modal
        transparent={true}
        animationType="none"
        // visible={loading}
        onRequestClose={() => {}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={true}
              size="large"
              color={COLORS.brandColor}
            />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
  },
  activityIndicatorWrapper: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 100,
    width: '50%',
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 15,
    alignSelf: 'center',
    color: COLORS.black,
  },
});
