import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAMXdaB-BGgIOUSIiYk9nRRb6j2hoiOpew',
  authDomain: 'proxypurchase-bed70.firebaseapp.com',
  databaseURL: 'https://proxypurchase-bed70.firebaseio.com',
  projectId: 'proxypurchase-bed70',
  storageBucket: 'proxypurchase-bed70.appspot.com',
  messagingSenderId: '499244763330',
  appId: '1:499244763330:web:5a3bd45fffea077fda535b',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
