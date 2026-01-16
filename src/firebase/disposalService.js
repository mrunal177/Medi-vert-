import { 
  collection, 
  addDoc, 
  serverTimestamp,
  doc,
  updateDoc,
  increment
} from "firebase/firestore";
import { db } from "./firebase";

export const logDisposal = async ({
  userId,
  medicineCount,
  medicineType,
}) => {
  try {
    if (!userId) {
      throw new Error("User not logged in");
    }

    const count = Number(medicineCount);

    console.log("🔥 Saving disposal...", { userId, count, medicineType });

    // ✅ STEP 1: Save disposal to disposals collection
    const disposalRef = await addDoc(collection(db, "disposals"), {
      userId,
      medicineCount: count,
      medicineType,
      timestamp: serverTimestamp(),
    });

    console.log("✅ Disposal saved with ID:", disposalRef.id);

    // ✅ STEP 2: UPDATE USER'S IMPACT STATS (CRITICAL!)
    const userRef = doc(db, "users", userId);
    
    try {
      await updateDoc(userRef, {
        "impactStats.totalDisposals": increment(1),
        "impactStats.totalItems": increment(count),
        "impactStats.waterSavedLiters": increment(count * 25),
      });
      console.log("✅ User stats updated!");
    } catch (updateError) {
      console.warn("⚠️ Could not update user stats (user doc might not exist):", updateError.message);
    }

    return { success: true, disposalId: disposalRef.id };
  } catch (error) {
    console.error("❌ Error logging disposal:", error);
    throw error;
  }
};
