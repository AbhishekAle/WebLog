import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

const handleVideoUpload = async (title, videoFile, userId) => {
  const videoRef = ref(
    storage,
    `uploads/videos/${Date.now()}-${videoFile.name}`
  );
  const uploadResult = await uploadBytes(videoRef, videoFile);
  return await addDoc(collection(firestore, "videos"), {
    title,
    videoURL: uploadResult.ref.fullPath,
    userId,
  });
};

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ handleVideoUpload }}>
      {children}
    </FirebaseContext.Provider>
  );
};
