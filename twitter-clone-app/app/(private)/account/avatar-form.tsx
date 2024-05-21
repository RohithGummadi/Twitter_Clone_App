import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

export default function AvatarForm(){

    const {data, error, isLoading} = useSWR("/api/users/profile");
    if(error) return <div>Failed to load</div>
    if(isLoading) return <div>Loading...</div>

    const user = data.data;

    return (
        <div>
            {user.avatar && (
                <div>
                    <Image src={user.avatar} alt={user.avatar} width={200} height={200} className="rounded-full m-auto my-5"/>
                </div>
            )}
            {!user.avatar &&(
                <div className = "bg-slate-600 rounded-full m-auto my-5" style={{width:200, height:200}}></div>
            )}
    
            <Link href="/avatar/upload" className="text-green-500 underline p-2 rounded-lg my-5">Upload Image</Link>
        </div>
    )

}