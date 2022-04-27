import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAKvLdVv1tiqQpYTcS0gVmyZF4Tnm97ZNA",
    authDomain: "crwn-clothing-db-84f61.firebaseapp.com",
    projectId: "crwn-clothing-db-84f61",
    storageBucket: "crwn-clothing-db-84f61.appspot.com",
    messagingSenderId: "522165640733",
    appId: "1:522165640733:web:aca77b50e9c1e683e330f4"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();  //GoogleAuthProvider is a class that we get from firebase authentication and it's connected to google auth itself & u can have multiple providers. 
  googleProvider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth(); //authentication is singleton object
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
  }

  // export const getCategoriesAndDocuments = async () => {
  //   const collectionRef = collection(db, 'categories');
  //   const q = query(collectionRef);

  //   const querySnapshot = await getDocs(q);
  //   return querySnapshot.docs.map(docSnapShot => docSnapShot.data());
  // }

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  };

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
   
  if(!userAuth) return;

  //we need to see if there is an existing document reference  
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log('user1Apr', userDocRef);

    const userSnapshot = await getDoc(userDocRef); //through this snapshot we can check whether the document exists or not

    console.log('userSnap: ', userSnapshot, userSnapshot.exists());

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;

      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
            displayName, 
            email, 
            createdAt,
            ...additionalInformation
        });
      } catch (error) {
        console.log('error creating the user: ', error.message);
      }
    }

    return userSnapshot;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

  export const signOutUser = async () => await signOut(auth);

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
      );
    });
  };