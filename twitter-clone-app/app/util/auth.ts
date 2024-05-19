import { sql } from "@/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getJWTPayload() {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt-token");
    if (!token?.value) {
        throw new Error("JWT token not found in cookies");
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token.value, secret);
    return payload;
}

export async function authorizeAdmin(func: Function) {
    try {
        const jwtpayload = await getJWTPayload();
        const res = await sql("select is_admin from users where id = $1", [jwtpayload.sub]);
        if (res.rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const data = res.rows[0];

        if (!data.is_admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        return await func();
    } catch (error) {
        console.error("Authorization error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
