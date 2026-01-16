import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const createUserIfNotExists = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName || "User",
            email: user.email,
            joinedAt: serverTimestamp(),

            impactStats: {
                totalDisposals: 0,
                totalItems: 0,
                waterSavedLiters: 0
            }
        });
    }
};
