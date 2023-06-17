// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MEASUREMENT_SENDER_ID,
  appId: import.meta.env.PUBLIC_APP_ID,
  measurementId: import.meta.env.PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

export const signInWithGoogle = (setCurrentUser:any) => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      setCurrentUser(user)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      setCurrentUser(null)
      // ...
    });
}

export const userSignOut = (setCurrentUser:any) => {
  const auth = getAuth();
  signOut(auth).then(() => {
    setCurrentUser(null)
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    setCurrentUser(null)
  });
}

export const writeData = (path:string, data:any, callback:any) => {
  const dbRef = ref(database, path);
  set(dbRef, data);
  getData(path, callback)
  
}

export const getData = (path:string, callback:any) => {
  const dbRef = ref(database);

  get(child(dbRef, path)).then((snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val())
    } else {
      callback("No data available")
    }
  }).catch((error) => {
    callback(error);
  });
}
