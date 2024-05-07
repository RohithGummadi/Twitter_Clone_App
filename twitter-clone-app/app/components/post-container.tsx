import { useState } from "react";
import PostList from "./post-list";


function PostContainer({username}:{username:string}){
    const [cnt, setCnt] = useState(1);
    const pages = []

    for(let i = 0; i<cnt; i++){
        pages.push(
            <PostList index={i} username = {username} key = {i}/>
        )
    }
    return(
        <div className="my-5">
            {pages}
            <div className = "flex flex row justify-center my-5">
                <button onClick={()=>setCnt(cnt+1)} className="bg-slate-500 p-2 rounded-lg self-center">
                    Load More
                </button>
            </div>
        </div>
    )

}

export default PostContainer