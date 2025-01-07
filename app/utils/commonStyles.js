'use strict';

import COLORS from './colors';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    buttonStyle: {
        backgroundColor: COLORS.brandColor,
            borderRadius: 10,
            padding: 10,
            width: '100%',
            height: 40,
            marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
    },
});