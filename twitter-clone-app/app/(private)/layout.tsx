"use client";
import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";
import { SWRConfig } from "swr";
import fetcher from "../util/fetcher";
import SearchBar from "./search-bar";
import Image from "next/image";


export default function PrivateLayout(
    {children }:{children: React.ReactNode})
{
    return(
        <SWRConfig value={{fetcher:fetcher}}>
            <div className="flex flex-col min-h-screen max-w-md m-auto items-center justify-center">
                <SearchBar/>
                <Header/>
                <NavBar/>
                <main className="w-full p-5 bg-slate-300 rounded-lg my-2">{children}</main>
                <Footer/>
            </div>
        </SWRConfig>
    
    );
}