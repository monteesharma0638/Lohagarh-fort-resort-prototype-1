import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import UserActivities from "@/models/UserActivities";

export async function createActivity(userToken: any, operation: string, collectionName: string, documentIds: string[], changeSummary?: string) {
    try {
        // const token = (await cookies()).get("admin_token")?.value || (await cookies()).get("super_admin_token")?.value;
        // if (!token) throw new Error("Unauthorized");
        // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        //     id: string;
        //     access: string;
        // };
    
        await UserActivities.create({
            userId: userToken.id,
            operation,
            collectionName,
            documentIds,
            changeSummary
        });
        return true;
    }
    catch(err) {
        return false;
    }
}