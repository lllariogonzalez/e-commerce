import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return(
        <button className="btn btn-sm btn-danger ms-2 text-white text-center"  onClick={() => logout({returnTo: window.location.origin}) }> <i className="fa-solid fa-right-from-bracket"></i> Logout</button>
    )
}