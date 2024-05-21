import useSWR from "swr"
import { useRouter } from "next/navigation"

export default function SignoutButton(){
    const router = useRouter();

    async function SignOut(){
        const res = await fetch("/api/logout")
        if (res.ok){
            router.push("/signin")
        }

    }
    return (
        <div>
            <button onClick={SignOut} className="text-green-500 underline p-2 rounded-lg my-5">Signout</button>

        </div>
    )

}