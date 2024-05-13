import { getJWTPayload } from "@/app/util/auth";
import { NextResponse } from "next/server";
import { sql } from "@/db";


export async function DELETE(request: Request, {params}:{params:{user_id: string}}){
    const jwtPayload = await getJWTPayload();
    const userId = params.user_id;

    await sql("delete from follows where user_id = $1 and follower_id = $2", [userId, jwtPayload.sub])

    return NextResponse.json({msg:"follow detected but removed now"})


}