import { auth } from "@/lib/firebaseClient";
import { createUserWithEmailAndPassword, User } from "firebase/auth";

interface SignupResult {
  user: User | null;
  error: string | null;
}

export async function signupUser(
  email: string,
  password: string
): Promise<SignupResult> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

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
