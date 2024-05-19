"use client"
import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";


function Form(){
    const {mutate}  = useSWRConfig();
    const [post, setPost] = useState("")

    async function handleSubmit(e: FormEvent){
        e.preventDefault();
        const res = await fetch("/api/posts",{
            method: "post",
            body: JSON.stringify({content: post})
        })
        if(res.ok){
            setPost("");
            mutate((key)=> typeof key ==="string" && key.startsWith("/api/posts"))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea className="bg-gray-700 p-2 rounded-lg my-2 w-full " placeholder="What is Happening?" onChange={(e)=>{setPost(e.target.value)}} value = {post}/>

            <button type="submit" className="bg-slate-500 p-2 rounded-lg self-center">
                Post
            </button>
        </form>
    )
}

export default Form