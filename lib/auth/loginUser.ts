import { auth } from "@/lib/firebaseClient";
import {
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

export interface LoginResult {
  user: UserCredential["user"] | null;
  token: string | null;
  error: string | null;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResult> {
  try {
    // Sign in user with Firebase
    const result = await signInWithEmailAndPassword(auth, email, password);

    // Get Firebase ID token for middleware authentication
    const token = await result.user.getIdToken();

    return {
      user: result.user,
      token,
      error: null,
    };
  } catch (error: unknown) {
    const err = error as Error;

    return {
      user: null,
      token: null,
      error: err.message,
    };
  }
}
