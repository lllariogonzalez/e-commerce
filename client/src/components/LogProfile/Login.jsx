import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return(
        <button className="btn btn-sm  btn-dark py-0 " onClick={()=> loginWithRedirect() }> <i className="fa-solid fa-right-to-bracket"></i> Login</button>
    )
}