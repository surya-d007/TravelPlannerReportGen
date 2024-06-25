import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const AuthenticationStatus = ({ setIsLoggedIn, setEmail }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        setEmail(user.email);
        setIsLoggedIn(true);
      } else {
        setEmail(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [setEmail, setIsLoggedIn]);

  return null;
};

export default AuthenticationStatus;
