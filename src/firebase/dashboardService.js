import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const getDashboardData = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User not logged in");
    }

    console.log("📊 Fetching dashboard data for user:", userId);

    // ✅ Get user document
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? userSnap.data() : {};

    console.log("👤 User data:", userData);

    // ✅ Get all disposals for this user
    // NOTE: If you want to sort by timestamp, you need to create a Composite Index in Firebase Console
    const q = query(
      collection(db, "disposals"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    const disposals = [];
    const typeMap = {}; // For pie chart
    let totalItems = 0;

    snapshot.forEach((doc) => {
      const d = doc.data();
      const count = Number(d.medicineCount || 0);
      
      disposals.push({
        id: doc.id,
        donationId: doc.id,
        medicineCount: count,
        medicineType: d.medicineType || "unknown",
        timestamp: d.timestamp,
        medicineTypes: { [d.medicineType || "unknown"]: count }, // For dashboard compatibility
      });

      totalItems += count;

      // Group by type for pie chart
      const type = d.medicineType || "unknown";
      typeMap[type] = (typeMap[type] || 0) + count;
    });

    console.log("📋 Found disposals:", disposals.length);

    return {
      disposals,
      totalItems,
      totalDisposals: disposals.length,
      totalWater: totalItems * 25,
      totalScore: totalItems * 5,
      medicineTypes: typeMap,
      userStats: userData.impactStats || {},
    };
  } catch (error) {
    console.error("❌ Error fetching dashboard data:", error);
    return {
      disposals: [],
      totalItems: 0,
      totalDisposals: 0,
      totalWater: 0,
      totalScore: 0,
      medicineTypes: {},
      userStats: {},
    };
  }
};