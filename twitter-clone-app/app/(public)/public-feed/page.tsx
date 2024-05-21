import Post from "@/app/components/post";
import { sql } from "@/db";

async function getData(){
    const res = await sql(`select p.*, u.username from posts p inner join users u on p.user_id = u.id order by created_at desc limit 10`)
    return res.rows;
}

export default async function PublicFeed(){
    const posts = await getData();
    return (
        <main>
            <div className="flex flex-row bg-orange-400 m-4 p-3" >
                <h1>Twitter Clone -  </h1>
                <h2>Recent posts from the community</h2>
            </div>
            <div>
                {posts.map((post)=>{
                    return <Post post={post} key={post.id}/>
                })}
            </div>
        </main>
    )
}