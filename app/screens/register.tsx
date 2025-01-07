import * as COLORS from '../utils/colors';

import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../utils/authProvider';
import FormInput from '../components/formInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../components/loader';
import Toast from 'react-native-simple-toast';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const phoneRegex = new RegExp(/^\d{10}$/);
  const onlyLetters = new RegExp(/^[a-zA-Z\s]+$/);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardOffset(50);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      event => {
        setKeyboardOffset(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const formSchema = z
    .object({
      firstName: z
        .string()
        .min(1, 'The first name field is empty')
        .min(2, 'Name must be at least 2 characters')
        .max(50, `First name must not exceed 50 characters`)
        .regex(onlyLetters, 'Name should have valid characters'),
      lastName: z
        .string()
        .min(1, 'The last name field is empty')
        .min(1, 'Name must be at least 1 characters')
        .max(50, `Last name must not exceed 50 characters`)
        .regex(onlyLetters, 'Last name should have valid characters'),
      email: z
        .string()
        .min(1, 'The email field is empty')
        .max(50, `Email must not exceed 50 characters`)
        .email('Please enter a valid email'),
      password: z
        .string()
        .min(1, 'The password field is empty')
        .min(6, 'Password must be at least 6 characters')
        .max(50, `Password must not exceed 50 characters`),
      confirmPassword: z
        .string()
        .min(1, 'The confirm password field is empty')
        .min(6, 'Password must be at least 6 characters')
        .max(50, `Password must not exceed 50 characters`),
      phoneNumber: z
        .string()
        .min(1, 'The phone number field is empty')
        .regex(phoneRegex, 'Phone number must be 10 digits long'),
      city: z
        .string()
        .min(1, 'The city field is empty')
        .min(2, 'City name must be at least 2 characters long')
        .max(50, `City must not exceed 50 characters`)
        .regex(onlyLetters, 'Enter a valid city name'),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  const {control, handleSubmit} = useForm({
    mode: "onTouched",
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      city: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    city: string;
  }) => {
    Alert.alert('',data.firstName + ' , \n' + data.lastName + ' , \n' + data.email + ' , \n' + data.password   + ' , \n' + data.phoneNumber + ' , \n' + data.city);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading && <Loader />}

      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Ionicons name="chevron-back" size={22} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.description}>
             Sign In
            </Text>
          </View>
          <KeyboardAwareScrollView
            style={{
              height: Dimensions.get('window').height,
              marginBottom: 60,
            }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <FormInput
                control={control}
                name={'firstName'}
                placeholder="First Name"
                secureTextEntry={false}
              />
              <FormInput
                control={control}
                name={'lastName'}
                placeholder="Last Name"
                secureTextEntry={false}
              />
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
              <FormInput
                control={control}
                name={'confirmPassword'}
                placeholder="Confirm Password"
                secureTextEntry={true}
              />
              <FormInput
                control={control}
                name={'phoneNumber'}
                placeholder="Phone"
                secureTextEntry={false}
                keyboardType={true}
              />
              <FormInput
                control={control}
                name={'city'}
                placeholder="City"
                secureTextEntry={false}
              />
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>CREATE AN ACCOUNT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: COLORS.white,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  description: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    color: COLORS.brandColor,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  loginButton: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    backgroundColor: COLORS.brandColor,
    borderRadius: 20,
    padding: 10,
    width: Dimensions.get('window').width - 30,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
