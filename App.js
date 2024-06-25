import React from 'react';
import { Text, View , StyleSheet, SafeAreaView } from 'react-native';
import Home from './Pages/Home';
import StacksNavNewPlan from './Pages/StacksNavNewPlan';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import Sample from './Pages/Sample';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaView className="flex-1  pt-10 bg-[#ffffff]">
      <View className='flex-1 '>
          <NavigationContainer>
              <Drawer.Navigator>
                  <Drawer.Screen name="Home" component={Home}  />
                  <Drawer.Screen name="Plan New trip" component={StacksNavNewPlan} 
                    options={{ headerShown: false , swipeEnabled : false }} />




                  <Drawer.Screen name="Sample" component={Sample}  />
            


          
              </Drawer.Navigator>
          </NavigationContainer>
        </View>
    </SafeAreaView>
  );
}

 