import { auth } from "@/lib/firebaseClient";
import { signInWithEmailAndPassword, User } from "firebase/auth";

interface LoginResult {
  user: User | null;
  error: string | null;
}

export async function loginUser(email: string, password: string): Promise<LoginResult> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    return {
      user: result.user,
      error: null,
    };
  } catch (error: unknown) {
    const err = error as Error;

    return {
      user: null,
      error: err.message,
    };
  }
}
