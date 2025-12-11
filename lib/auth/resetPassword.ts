import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
