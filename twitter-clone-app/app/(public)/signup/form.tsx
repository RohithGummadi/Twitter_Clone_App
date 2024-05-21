import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";


function Form() {
    const router = useRouter();
    const [username, setUsername] = useState<undefined | string> ("");
    const [password, setPassword] = useState<undefined | string> ("");
    const [confirmPassword, setConfirmPassword] = useState<undefined | string>("")

    const [errors, setErrors] = useState<string[]>([]);


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors([])
        const newError = []
        if(password!=confirmPassword){
            newError.push("Passwords do not match")
            setErrors(newError);
            return
        }
        const res = await fetch("/api/signup",{
            method: "post",
            body: JSON.stringify({username, password})
        })
        if (res.ok){
            router.push("/signin")
        } else {
            alert("signup failed")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-500 rounded-lg">
            <div className ="text-center">
                <h3 className="font-semibold">Sign up</h3>
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

            <div className="flex flex-col gap-2">
                <label>Confirm Password</label>
                <input className ="text-black p-3 border border-slate-700 rounded-lg" type="confirm password" value={confirmPassword} id="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm Password" />
            </div>
            <div className="text-center">
            <button className="mt-4 dark:bg-slate-800 bg-slate-300 text-white p-3 rounded-lg" type="submit">Sign Up</button>
            {errors.map((error)=>{
                return(
                    <div key ={error} className="text-red-600">
                        {error}
                   </div>
                )
            })}
            </div>
        </form>
    );
}
export default Form;