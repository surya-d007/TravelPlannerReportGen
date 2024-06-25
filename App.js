import React, { useState, createContext } from 'react';
import { View, SafeAreaView } from 'react-native';
import Home from './Pages/Home';
import StacksNavNewPlan from './Pages/StacksNavNewPlan';
import Sample from './Pages/Sample';
import SignInForm from './Logins/SignInForm';
import SignUpForm from './Logins/SignUpForm';
import AuthenticationStatus from './Logins/AuthenticationStatus';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export const MyContext = createContext();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  const LoggedOutView = () => (
    <View style={{ margin: 30 }}>
      <SignUpForm />
      <SignInForm />
      <AuthenticationStatus setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} />
    </View>
  );

  const LoggedInView = () => (
    <MyContext.Provider value={{ isLoggedIn, email, setIsLoggedIn }}>
      <SafeAreaView style={{ flex: 1, paddingTop: 10, backgroundColor: '#ffffff' }}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Plan New trip" component={StacksNavNewPlan} options={{ headerShown: false, swipeEnabled: false }} />
              <Drawer.Screen name="Sample" component={Sample} />
            </Drawer.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </MyContext.Provider>
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <LoggedInView /> : <LoggedOutView />}
    </View>
  );
}
