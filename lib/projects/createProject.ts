import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

const COLORS = [
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // purple
  "#EC4899", // pink
];

const ICONS = ["📁", "💡", "🧠", "⚙️", "🚀", "📊"];

export async function createProject(uid: string, name: string) {
  if (!uid || !name.trim()) {
    throw new Error("Invalid project data");
  }

  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const icon = ICONS[Math.floor(Math.random() * ICONS.length)];

  const ref = await addDoc(
    collection(db, "users", uid, "projects"),
    {
      name,
      color,
      icon,
      createdAt: serverTimestamp(),
    }
  );

  return ref.id;
}
