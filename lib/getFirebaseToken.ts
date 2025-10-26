import { NextRequest } from "next/server";

export const getFirebaseToken = (req: NextRequest) => {
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

    return token
}