import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

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

const handleVideoUpload = async (title, videoFile, userId, username) => {
  const videoRef = ref(
    storage,
    `uploads/videos/${Date.now()}-${videoFile.name}`
  );

  try {
    // Upload video
    console.log("Uploading video...");
    await uploadBytes(videoRef, videoFile);

    // Fetch video download URL
    console.log("Fetching video download URL...");
    const videoURL = await getDownloadURL(videoRef);

    // Add document to Firestore
    const docRef = await addDoc(collection(firestore, "videos"), {
      title,
      username,
      videoURL,
      userId,
      createdAt: new Date().toISOString(), // Add this line
    });

    console.log("Document written with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};

const listAllVideos = async () => {
  const querySnapshot = await getDocs(collection(firestore, "videos"));
  const videos = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt || new Date().toISOString(), // Add this line
    };
  });
  console.log("Fetched videos: ", videos);
  return videos;
};

const listUserVideos = async (userId) => {
  try {
    const videosRef = collection(firestore, "videos");
    const q = query(videosRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const videos = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt || new Date().toISOString(),
      };
    });
    console.log(`Fetched videos for user ${userId}:`, videos);
    return videos;
  } catch (error) {
    console.error(`Error fetching videos for user ${userId}:`, error);
    throw error;
  }
};

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider
      value={{ handleVideoUpload, listAllVideos, listUserVideos }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
