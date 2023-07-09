import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getAuth, signOut, initializeAuth } from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import uniqid from "uniqid";

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
    .then((result:any) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = {
        uid: result.uid,
        displayName: result.displayName,
        email: result.email,
        photoURL: result.photoURL,
        accessToken: result.accessToken,
      }
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

export const checkAuthState = (callback:any) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (data:any) => {
    const user = {
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
      photoURL: data.photoURL,
      accessToken: data.accessToken,
    }

    if (user) {
      callback(user)
    } else {
      callback(null)
    }
  });
}

export const createNewGame = (game:any,challenge:any, currentUser:any, callback:any) => {

  const author = {
    uid: currentUser.uid,
    displayName: currentUser.displayName,
    email: currentUser.email,
    photoURL: currentUser.photoURL,
    author: true
  }

  const newGameObject = {
    id: uniqid(),
    name: game.name,
    players: [author],
    status: "waiting",
    createdAt: new Date().toISOString(),
    challenge: challenge,
  }
  
  postData(`games/${newGameObject.id}`, newGameObject, ()=>callback(newGameObject))
};

export const initializeGame = (gameId:any, currentUser:any, callback:any) => {
  const dbRef = ref(database);

  get(child(dbRef, `games/${gameId}`)).then((snapshot) => {

    if (snapshot.exists()) {
      const result = JSON.parse(snapshot.val())
      
      const playerExists = result.players.some((player:any) => player.email === currentUser.email);

        if (!playerExists) {
          result.players.push(currentUser);
        }

      const newGameObject = {
        ...result,
        status: result.players.length > 1 ? "ready" : "waiting",
      }

      console.log('newGameObject', newGameObject)

      postData(`games/${gameId}`, newGameObject, ()=>callback(newGameObject))

    } else {
      callback("No data available")
    }
  }).catch((error) => {
    callback(error);
  });
}

export const postData = (path:string, data:any, callback:any) => {
  const dbRef = ref(database, path);
  set(dbRef, JSON.stringify(data));
  callback()
}

export const getData = (path:string, callback:any) => {
  const dbRef = ref(database);

  get(child(dbRef, path)).then((snapshot) => {
    if (snapshot.exists()) {
      callback(JSON.parse(snapshot.val()))
    } else {
      callback("No data available")
    }
  }).catch((error) => {
    callback(error);
  });
}