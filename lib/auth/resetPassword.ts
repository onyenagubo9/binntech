import { auth } from "@/lib/firebaseClient";
import { sendPasswordResetEmail } from "firebase/auth";

interface ResetPasswordResult {
  success: boolean;
  error: string | null;
}

export async function resetPassword(email: string): Promise<ResetPasswordResult> {
  try {
    await sendPasswordResetEmail(auth, email);

    return {
      success: true,
      error: null,
    };
  } catch (error: unknown) {
    const err = error as Error;

    return {
      success: false,
      error: err.message,
    };
  }
}
