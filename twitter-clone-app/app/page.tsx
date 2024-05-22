import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-400">

        <div className="flex flex-col">
            <div className="font-bold text-orange-600 m-5 text-xl ml-5">
                <h1>Welcome to ChirpChat!</h1>
            </div>

            <div className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-500 rounded-lg">
                <div className="text-center my-4">
                    <h1 className="text-lg text-yellow-300">Lets begin the Chirping......</h1>
                </div>
                <div>
                    <Link href="/signin" className="bg-slate-200 my-4 p-3 rounded-lg block">Sign In</Link>
                </div>
                <div>
                    <Link href="/signup" className="bg-slate-200 my-4 p-3 rounded-lg block">Sign Up</Link>
                </div>
            </div>
        </div>
    </main>

  );
}

