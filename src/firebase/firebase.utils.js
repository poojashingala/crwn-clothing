import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCxBra7ewR3zD8VgTGKQ3faUHy14hk7hBA",
    authDomain: "crwn-db-271a3.firebaseapp.com",
    databaseURL: "https://crwn-db-271a3.firebaseio.com",
    projectId: "crwn-db-271a3",
    storageBucket: "crwn-db-271a3.appspot.com",
    messagingSenderId: "49428436352",
    appId: "1:49428436352:web:82159f8e35e70e191a1d65",
    measurementId: "G-8Z0N52382N"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
  if(!snapShot.exists) {
   const {displayName, email} = userAuth;
   const createdAt = new Date();
   try{
    await userRef.set({
      displayName,
      email,
      createdAt,
      ...additionalData
    });

   } catch(error) {
      console.log("Error in creating User", error.message);
   }
  }
  return userRef;
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;