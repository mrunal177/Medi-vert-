import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc, // <--- Imported for editing
  doc,
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
      // Store a readable date string for display
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

// 3. Function to Delete a Post
export const deletePost = async (postId) => {
  try {
    const postRef = doc(db, COLLECTION_NAME, postId);
    await deleteDoc(postRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// 4. Function to Update a Post (Edit)
export const updatePost = async (postId, updatedData) => {
  try {
    const postRef = doc(db, COLLECTION_NAME, postId);
    await updateDoc(postRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
