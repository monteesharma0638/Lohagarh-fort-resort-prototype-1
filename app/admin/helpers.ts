import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "");
    // Return the user data stored in the JWT
    return payload;
  } catch (error) {
    // Token is expired or invalid
    return null;
  }
}