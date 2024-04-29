import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";

export default function PrivateLayout(
    {children }:{children: React.ReactNode})
{
    return(
        <div>
            <Header/>
            <NavBar/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
}