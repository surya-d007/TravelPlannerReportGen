import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHzxOQGg7CIRVBECADkXk6q0EBFSie6JE",
    authDomain: "travelguideapp-426604.firebaseapp.com",
    projectId: "travelguideapp-426604",
    storageBucket: "travelguideapp-426604.appspot.com",
    messagingSenderId: "1015526823511",
    appId: "1:1015526823511:web:592974c0cee251bc18f512"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth }; // Export Firebase app and auth instance
