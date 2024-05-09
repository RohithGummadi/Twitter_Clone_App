"use client"
import AvatarForm from "./avatar-form"
import SignoutButton from "./signout-button"
export default function AccountPage(){
    return(

        <div>
            <h2>Account</h2>
            <AvatarForm/>
            <SignoutButton/>
        </div>
    )

}