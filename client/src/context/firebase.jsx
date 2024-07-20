import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

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

const handleVideoUpload = async (
  title,
  videoFile,
  userId,
  username,
  avatar
) => {
  const videoRef = ref(
    storage,
    `uploads/videos/${Date.now()}-${videoFile.name}`
  );
  const avatarRef = ref(storage, `uploads/images/${Date.now()}-${avatar.name}`);

  try {
    // Upload avatar
    console.log("Uploading avatar...");
    const avatarUploadResult = await uploadBytes(avatarRef, avatar);
    console.log("Avatar upload result:", avatarUploadResult);

    // Fetch avatar download URL
    console.log("Fetching avatar download URL...");
    const avatarURL = await getDownloadURL(avatarRef);
    console.log("Avatar URL:", avatarURL);

    // Upload video
    console.log("Uploading video...");
    const videoUploadResult = await uploadBytes(videoRef, videoFile);
    console.log("Video upload result:", videoUploadResult);

    // Fetch video download URL
    console.log("Fetching video download URL...");
    const videoURL = await getDownloadURL(videoRef);
    console.log("Video URL:", videoURL);

    // Add document to Firestore
    const docRef = await addDoc(collection(firestore, "videos"), {
      title,
      username,
      avatarURL,
      videoURL,
      userId,
    });
    console.log("Document written with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error uploading video or avatar:", error);
  }
};

const listAllVideos = async () => {
  const querySnapshot = await getDocs(collection(firestore, "videos"));
  const videos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("Fetched videos: ", videos);
  return videos;
};

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ handleVideoUpload, listAllVideos }}>
      {children}
    </FirebaseContext.Provider>
  );
};
