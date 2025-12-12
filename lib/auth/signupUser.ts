import { auth } from "@/lib/firebaseClient";
import { db } from "@/lib/firebaseClient";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface SignupResult {
  user: UserCredential["user"] | null;
  error: string | null;
}

export async function signupUser(
  email: string,
  password: string
): Promise<SignupResult> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Firestore user document
    await setDoc(doc(db, "users", result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      createdAt: new Date().toISOString(),
      role: "user", // you can create admin roles later
    });

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
