import React, {useContext, useEffect, useState} from 'react';

import ForgotPassword from '../screens/forgotPassword';
import IntroSlider from '../screens/introslider/introslider';
import Login from '../screens/login';
import Register from '../screens/register';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<PreLoginStackParamList>();

const IntroStack = createStackNavigator();

const IntroStackNavigator = () => {
  return (
    <IntroStack.Navigator screenOptions={{headerShown: false}}>
      <IntroStack.Screen name="IntroSlider" component={IntroSlider} />
    </IntroStack.Navigator>
  );
};

const PreLoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  console.log('This got called')
  const [activeScreen, setActiveScreen] = useState<React.JSX.Element>(
    <PreLoginStack />,
  );

  return activeScreen;
};

export default Main;

export type PreLoginStackParamList = {
  Welcome: undefined;
  IntroSlider: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};
