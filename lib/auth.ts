import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function requireAdmin() {
  const token = (await cookies()).get("admin_token")?.value;
  if (!token) throw new Error("Unauthorized");

  return jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
    restaurantId: string;
  };
}

export async function requireSuperAdmin() {
    const token = (await cookies()).get("super_admin_token")?.value;
    if (!token) throw new Error("Unauthorized");

    return jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        access: string;
    }
}