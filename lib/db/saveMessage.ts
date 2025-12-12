import { db } from "@/lib/firebaseClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveMessage(
  uid: string,
  projectId: string,
  sender: "user" | "ai",
  message: string
) {
  await addDoc(
    collection(db, "users", uid, "projects", projectId, "messages"),
    {
      sender,
      message,
      createdAt: serverTimestamp(),
    }
  );
}
