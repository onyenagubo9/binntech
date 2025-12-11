import { auth } from "@/lib/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(email: string, password: string) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdToken();

    // Store token securely
    document.cookie = `binntech_token=${token}; path=/; secure; max-age=86400`;

    return { error: null };
  } catch (err: any) {
    return { error: err.message };
  }
}
