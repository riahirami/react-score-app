// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyCJ_aisu4KdqCj5veaeCM6ILI6lP_SGfj0',
  authDomain: 'react-score-app.firebaseapp.com',
  databaseURL: 'https://react-score-app-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'react-score-app',
  storageBucket: 'react-score-app.appspot.com',
  messagingSenderId: '287014922775',
  appId: '1:287014922775:web:6a3f293dac0332b7c4ca52',
  measurementId: 'G-8KEZ2JVRM6',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
