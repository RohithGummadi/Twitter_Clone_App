"use client";
import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";
import { SWRConfig } from "swr";
import fetcher from "../util/fetcher";


export default function PrivateLayout(
    {children }:{children: React.ReactNode})
{
    return(
        <SWRConfig value={{fetcher:fetcher}}>
            <div>
                <Header/>
                <NavBar/>
                <main>{children}</main>
                <Footer/>
            </div>
        </SWRConfig>
    
    );
}