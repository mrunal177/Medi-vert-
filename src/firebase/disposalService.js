import {
    addDoc,
    collection,
    doc,
    updateDoc,
    increment,
    serverTimestamp
} from "firebase/firestore";

import { db } from "./config";

/**
 * Logs a medicine disposal and updates user impactStats
 * @param {string} uid - firebase user uid
 * @param {number} qty - total medicine count
 * @param {object} medicineTypes - pills/syrups/injectables
 */
export const logDisposal = async (uid, qty, medicineTypes) => {
    const waterSaved = qty * 25;

    // STEP 1: Add disposal record
    await addDoc(collection(db, "disposals"), {
        userId: uid,
        timestamp: serverTimestamp(),
        medicineCount: qty,
        medicineTypes,
        impactSnapshot: {
            waterSaved
        }
    });

    // STEP 2: Update user totals
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        "impactStats.totalItems": increment(qty),
        "impactStats.totalDisposals": increment(1),
        "impactStats.waterSavedLiters": increment(waterSaved)
    });
};
