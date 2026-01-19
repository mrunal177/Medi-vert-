import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const COLLECTION_NAME = "community_stories";

// 1. Function to Add a Post
export const addPost = async (user, postData) => {
  try {
    await addDoc(collection(db, COLLECTION_NAME), {
      ...postData,
      author: user.displayName || user.email.split("@")[0],
      authorPhoto: user.photoURL || null,
      uid: user.uid,
      createdAt: serverTimestamp(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

// 2. Function to Listen to Posts (Real-time)
export const subscribeToPosts = (callback) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc"),
  );

  // onSnapshot provides real-time updates
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(posts);
  });
};
