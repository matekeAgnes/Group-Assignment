import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import Homepage from './Screens/Homepage';
import Borrowers from './Screens/Borrowers';
import Signup from './Screens/Signup';
import Success from './Screens/Success';
import WelcomePage from './Screens/WelcomePage';
import LenderLogin from './Screens/LenderLogin';
import LenderSignup from './Screens/LenderSignup';
import LenderHome from './Screens/LenderHome';
import BorrowerInfo from './Screens/BorrowerInfo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='WelcomePage' component={WelcomePage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Borrowers" component={Borrowers} />
        <Stack.Screen name='Success' component={Success} />
        <Stack.Screen name="LenderLogin" component={LenderLogin} />
        <Stack.Screen name='LenderSignup' component={LenderSignup} />
        <Stack.Screen name="LenderHome" component={LenderHome} />
        <Stack.Screen name="BorrowerInfo" component={BorrowerInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
