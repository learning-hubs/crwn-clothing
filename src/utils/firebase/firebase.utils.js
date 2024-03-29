// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';
import SHOP_DATA from "../../shop-data";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtgUqUA8MnhY-q1oO0GnTDqV9EOlbkAM4",
  authDomain: "crwn-clothing-db-f23b2.firebaseapp.com",
  projectId: "crwn-clothing-db-f23b2",
  storageBucket: "crwn-clothing-db-f23b2.appspot.com",
  messagingSenderId: "993613498914",
  appId: "1:993613498914:web:265a42807771be06aad87b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = async () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = async () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if(!userAuth) return;

    const userDocRef = await doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
           console.log('error creating the user', error.message); 
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    // .reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});

    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const getCategoriesAndDocumentsFromShopData = () => {
    const categoryMap = SHOP_DATA.reduce((acc, documentSnapshot) => {
        const {title, items} = documentSnapshot;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    return categoryMap;
}