import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MEASUREMENT_SENDER_ID,
  appId: import.meta.env.PUBLIC_APP_ID,
  measurementId: import.meta.env.PUBLIC_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

export const signInWithGoogle = (setCurrentUser:any) => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      setCurrentUser(user)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      setCurrentUser(null)
      // ...
    });
}

export const userSignOut = (setCurrentUser:any) => {
  const auth = getAuth();
  signOut(auth).then(() => {
    setCurrentUser(null)
  }).catch((error) => {
    setCurrentUser(null)
  });
}

export const checkAuth = (setCurrentUser:any, callback:any) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
      callback(user)
      console.log('checkAuth:')
      console.log(user)
      
    } else {
      setCurrentUser(null)
      callback(null)
    }
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
