"use client"
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Form() {
    const router = useRouter();
    const [username, setUsername] = useState<undefined | string> ("");
    const [password, setPassword] = useState<undefined | string> ("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const res = await fetch("/api/login",{
            method: "post",
            body: JSON.stringify({username, password})
        })
        if (res.ok){
            router.push("/feed")
        } else {
            alert("Log in failed")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-500 rounded-lg">
            <div className ="text-center">
                <h3 className="font-semibold">Sign In</h3>
            </div>

            <div className="my-5">
                <hr/>
            </div>

            <div>
                <div className="flex flex-col gap-2">
                    <label>Username</label>
                    <input className="text-black p-3 border border-slate-700 rounded-lg" type="text" value={username} id="username" onChange={(e) => setUsername(e.target.value)} required placeholder="Username" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label>Password</label>
                <input className ="text-black p-3 border border-slate-700 rounded-lg" type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
            </div>
            <div className="text-center">
            <button className="mt-4 dark:bg-slate-800 bg-slate-800 text-white p-3 rounded-lg" type="submit">Submit</button>
            </div>
        </form>
    );
}

export default Form;
