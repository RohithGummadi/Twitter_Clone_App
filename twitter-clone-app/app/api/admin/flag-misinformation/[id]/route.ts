import { authorizeAdmin } from "@/app/util/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: number } }) {
    return authorizeAdmin(async () => {
        const { id } = params;
        console.log(`Flagging ${id} as misinformation`);
        await sql("update posts set is_misinformation = true, is_misinformation_flagged_at = now() where id = $1", [id]);
        return NextResponse.json({ message: "Post flagged as misinformation" });
    });
}
