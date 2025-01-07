import * as COLORS from '../utils/colors';

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Controller} from 'react-hook-form';
import FAIcon from 'react-native-vector-icons/FontAwesome';

type Params = {
  control: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  eyeIconPresent?: boolean;
  keyboardType?: boolean
};

const FormInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  eyeIconPresent=false,
  keyboardType
}: Params) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View>
          <View
            style={styles.inputBorderStyle}>
            <TextInput
              placeholderTextColor={COLORS.black}
              style={[styles.inputStyle, {width: eyeIconPresent ? '85%' : '100%'}]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={
                (name.includes('password') ||
                name.includes('Password')) && eyeIconPresent
                  ? !showPassword
                  : secureTextEntry
              }
              autoCapitalize="none"
              keyboardType= {keyboardType? 'number-pad' : 'default'}
            />
            {eyeIconPresent && 
            <TouchableOpacity
              onPress={() => {
                setShowPassword(!showPassword);
              }}>
              {showPassword ? (
                <FAIcon
                  name="eye"
                  size={20}
                  color={COLORS.brandColor}
                  style={{margin: 10}}
                />
              ) : (
                <FAIcon
                  name="eye-slash"
                  size={20}
                  color={COLORS.brandColor}
                  style={{margin: 10}}
                />
              )}
            </TouchableOpacity>}
          </View>
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        </View>
      )}
    />
  );
};
export default FormInput;

export const styles = StyleSheet.create({
  inputBorderStyle: {
    width: '100%',
    height: 40,
    marginTop: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
  },
  inputStyle: {
    color: COLORS.black,
    borderRadius: 5,
    padding: 10,
    width: '85%',
    height: 40,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    margin: 3,
    left: 0,
  },
});
