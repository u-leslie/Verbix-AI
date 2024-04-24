import React from "react";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavLink from "./shared/NavLink";


const Header = ()=>{
    const auth =useAuth();
    return <div className="flex justify-between">
        <Logo/>
        <div className="m-4">
  {auth?.isLoggedIn?(
    <>
    <NavLink bg="#004d56" to="/chat" text="Chat" textColor="white"/>
    <NavLink bg="white" textColor="black" to="/" text="Logout" onClick={auth.logout}/>
    </>
  ):(
<>
    <NavLink bg="#004d56" to="/login" text="Login" textColor="white"/>
    <NavLink bg="white" textColor="black" to="/signup" text="Sign up"/>

</>
  )}
        </div>
    </div>
}

export default Header;