import { sql } from "@/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const result = await sql("SELECT id, username FROM users WHERE username ILIKE $1", [json.username]);
        if (result.rowCount && result.rowCount > 0) {
            return NextResponse.json({ error: "User already exists"}, {status:400});
        }
        const saltRounds = 10;
        const hash = await bcrypt.hash(json.password, saltRounds);
        await sql("insert into users (username, password) values($1, $2)", [json.username, hash])
        return NextResponse.json({msg: "registration success"}, {status:201});

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
