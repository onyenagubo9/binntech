import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

/**
 * Ensures a project document exists BEFORE messages are written.
 * This is REQUIRED for admin listing.
 */
export async function ensureProjectExists(
  uid: string,
  projectId: string
) {
  await setDoc(
    doc(db, "users", uid, "projects", projectId),
    {
      name: projectId,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}
