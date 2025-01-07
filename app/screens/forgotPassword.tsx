import * as COLORS from '../utils/colors';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import FormInput from '../components/formInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../components/loader';
import {ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const formSchema = z.object({
    email: z.string().email('Please enter a valid email'),
  });

  const navigation = useNavigation();

  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    Alert.alert('Successful', data.email);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'pink'}}>
      {loading && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{flexGrow: 1}}
          style={{
            backgroundColor: COLORS.white,
          }}>
          <View style={styles.container}>
            <View
              style={{
                height: '10%',
                paddingVertical: 10,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={22} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: '90%',
                alignItems: 'center',
                paddingTop: 100,
              }}>
              <Text style={styles.forgotPasswordHeader}>Forgot Password</Text>

              <Text style={styles.description2}>
                Enter your email and we'll send you the recovery details.
              </Text>
              <FormInput
                control={control}
                name={'email'}
                placeholder="Email"
                secureTextEntry={false}
              />
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>SEND EMAIL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 15,
  },
  forgotPasswordHeader: {
    color: COLORS.brandColor,
    fontWeight: 'bold',
    fontSize: 25,
  },
  forgotPasswordDescription: {
    marginTop: 15,
    width: '60%',
    color: COLORS.brandColor,
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
  },
  imageContainer: {
    width: 85,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
  },
  description2: {
    marginTop: 15,
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  detailsSection: {
    width: '100%',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    height: 40,
    marginVertical: 15,
  },
  forgotPasswordButton: {},
  loginButton: {
    backgroundColor: COLORS.brandColor,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    height: 40,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  registerButton: {},
  registerSection: {
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registerText: {
    color: '#636F94',
  },
});
