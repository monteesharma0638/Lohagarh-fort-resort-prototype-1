import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function requireAdmin(access: Array<String>) {
  const token = (await cookies()).get("session")?.value;
  if (!token) throw new Error("Unauthorized");
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
    access: string;
    name: string;
    email: string;
  };

  if(!access.includes(decoded.access)) throw new Error("Unauthorized");
  
  return decoded;
}

export async function requireSuperAdmin() {
    const token = (await cookies()).get("session")?.value;
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      access: string;
      name: string;
      email: string;
    }

    if(decoded.access !== "super-admin") throw new Error("You need to be a super admin to create a user.");
    return decoded;
}