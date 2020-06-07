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

  // const collectionRef = await firestore.collection('users');
  // const collectionSnapShot = await collectionRef.get();
  // console.log({collection: collectionSnapShot.docs.map( doc => doc.data() ) });
  
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

export const addCollectionAndDocuments = async ( collectionKey, documentsToAdd ) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();

  documentsToAdd.forEach( obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotsToMap = (collections) => {
  const transformedCollection = collections.docs.map( doc =>{
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;