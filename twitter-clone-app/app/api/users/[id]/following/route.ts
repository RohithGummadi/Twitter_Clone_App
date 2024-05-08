import { NextResponse } from "next/server";
import { sql } from "@/db";
import { getJWTPayload } from "@/app/util/auth";


export async function GET (request: Request, {params}:{params:{id:string}}){
    const {searchParams} = new URL(request.url)
    const page = (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0
    const limit = 5;
    const offset = page*5
    const id = params.id;
    const jwtPayload = await getJWTPayload()
    const res = await sql(`select u.id, u.username, u.avatar from users u inner join follows f on u.id = f.user_id where follower_id = $1 limit $2 offset $3`, [id, limit, offset])

    return NextResponse.json({data: res.rows})

}