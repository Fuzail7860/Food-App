import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGlhsg_0MOUZXrZVlNvYb7e7ec12T7H-U",
  authDomain: "foodapp-ae0c7.firebaseapp.com",
  projectId: "foodapp-ae0c7",
  storageBucket: "foodapp-ae0c7.appspot.com",
  messagingSenderId: "339570265082",
  appId: "1:339570265082:web:7b7779772a418e54d9b243"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
export {firebase};

// import {initializeApp} from 'firebase/app';
// import {getAuth} from 'firebase/auth';
// import {initializeFirestore} from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAGlhsg_0MOUZXrZVlNvYb7e7ec12T7H-U',
//   authDomain: 'foodapp-ae0c7.firebaseapp.com',
//   projectId: 'foodapp-ae0c7',
//   storageBucket: 'foodapp-ae0c7.appspot.com',
//   messagingSenderId: '339570265082',
//   appId: '1:339570265082:web:7b7779772a418e54d9b243',
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });
