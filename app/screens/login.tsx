import * as COLORS from '../utils/colors';
import * as s from '../utils/commonStyles';

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import React, {useContext, useEffect, useState} from 'react';

import {AuthContext} from '../utils/authProvider';
import FormInput from '../components/formInput';
import Loader from '../components/loader';
import {useIsFocused} from '@react-navigation/native';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const isFocused = useIsFocused();

  console.log('Login')
  useEffect(() => {
    if (isFocused) {
      reset();
    }
  }, [isFocused]);

  const formSchema = z.object({
    email: z
      .string()
      .min(1, 'The email field is empty')
      .email('Please enter a valid email'),
    password: z
      .string()
      .min(1, 'The password field is empty')
      .min(6, 'Password must be at least 6 characters'),
  });

  const {control, handleSubmit, reset} = useForm({
    mode: "onTouched",
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    Alert.alert('Email -> '+data.email, 'Password ->'+ data.password)
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
          resizeMethod="resize"
        />
      </View>
      <View style={styles.detailsSection}>
        <FormInput
          control={control}
          name={'email'}
          placeholder="Email"
          secureTextEntry={false}
        />
        <FormInput
          control={control}
          name={'password'}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerSection}>
          <Text style={styles.noAccountText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}>
            <Text style={styles.registerText}>Sign up</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
  },
  logoImage: {
    height: 160,
    width: 160,
  },
  detailsSection: {
    width: '100%',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordButton: {
    alignSelf:'flex-end',
    marginTop: 10
  },
  forgotPasswordText: {
    color: COLORS.black,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
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
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  noAccountText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerSection: {
    bottom: 20,
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  registerText: {
    color: COLORS.white,
  },
  registerButton: {
    height: 40,
    width: 80,
    backgroundColor: COLORS.brandColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 10,
    paddingHorizontal: 5,
    elevation: 2,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
  },
});
