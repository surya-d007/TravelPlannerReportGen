import React, { useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import HomeTripCard from '../Components/HomeTripCard';
import ButtonCom from '../Components/ButtonCom';
import { MyContext } from '../App';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Home = ({ navigation }) => {
  const { isLoggedIn, email, setIsLoggedIn } = useContext(MyContext);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
  });

  useEffect(() => {
    console.log('From home :isLoggedIn:', isLoggedIn);
    console.log('email:', email);
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoggedIn, email]);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        console.log('User signed out successfully');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fafcff', paddingHorizontal: 8 }}>
        <View style={{ height: 200, position: 'relative' }}>
          <View style={{ position: 'absolute', bottom: 12, right: 4, paddingHorizontal: 20 }}>
            <ButtonCom navigation={navigation} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <Text style={styles.popsemi}>- - - - -  Jan , 2024  - - - - - </Text>
          </View>
          <HomeTripCard />
          <HomeTripCard />
          <HomeTripCard />
          <HomeTripCard />
          <HomeTripCard />
          <Pressable style={{ backgroundColor: 'black', padding: 10 }} onPress={handleLogout}>
            <Text style={{ color: 'white' }}>Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  popreg: {
    fontFamily: 'Poppins-Regular',
  },
  popsemi: {
    fontFamily: 'Poppins-SemiBold',
  },
});
