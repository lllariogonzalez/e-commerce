import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return(
        <button className="btn btn-primary  col-2 m-0 border-0 d-block fw-semibold" style={{backgroundColor: "#a52323"}} onClick={()=> loginWithRedirect() }> <i className="fa-solid fa-user"></i> Login</button>
    )
}