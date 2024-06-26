import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";

function Form({post}:{post:PostI}){
    const router = useRouter();
    const [content, setContent] = useState(post.content);
    console.log(content)


    async function handleSubmit(e:FormEvent){
        e.preventDefault();
        const res = await fetch("/api/posts/" + post.id, {
            method: "PATCH",
            body: JSON.stringify({content: content})

        })
        if(res.ok){
            setContent("")
            router.push("/profile")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea className="bg-gray-600 p-2 rounded-lg w-full my-2" placeholder="What is happening?" value={content} onChange={(e)=>{setContent(e.target.value)}}/>

            <button type="submit" className="bg-slate-600 p-2 rounded-lg">Update Post</button>
        </form>
    )    
}


export default Form;