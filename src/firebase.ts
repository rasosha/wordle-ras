import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, query, where, setDoc, doc, limit, orderBy } from 'firebase/firestore';
import { IMessage } from './types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    handleError(err as FirebaseError);
  }
};

const sendMessage = async (uid: string, message: string, name: string, photoURL: string) => {
  await setDoc(doc(db, "chat", Date.now().toString()), {
    uid,
    message,
    name,
    photoURL,
    createdAt: Date.now()
  });
}

const getMessages = async (chat: string) => {
  const q = query(collection(db, chat), orderBy('createdAt', 'desc'), limit(25))
  const querySnapshot = await getDocs(q);
  return (querySnapshot.docs.map((docs) => docs.data()) as IMessage[])
}

const logout = () => {
  try {
    signOut(auth);
  } catch (err) {
    handleError(err as FirebaseError);
  }
};

const handleError = (err: FirebaseError) => {
  const errorCode = err.code.substring(5);
  throw errorCode;
};

export {
  auth,
  db,
  signInWithGoogle,
  logout,
  sendMessage,
  getMessages,
};
