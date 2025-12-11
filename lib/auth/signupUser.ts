import { auth } from "@/lib/firebaseClient";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function signupUser(email: string, password: string) {
  try {
    // Firebase signup
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Get Firebase ID token
    const token = await result.user.getIdToken();

    // Store token inside a secure cookie (for middleware auth)
    document.cookie = `binntech_token=${token}; Path=/; Secure; SameSite=Strict; Max-Age=86400`;

    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}
