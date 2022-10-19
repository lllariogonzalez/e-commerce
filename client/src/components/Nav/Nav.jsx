import React from "react";
import { LoginButton } from "../LogProfile/Login";
import favoriteIcon from "./images/favorite.png"
import orderIcon from "./images/orderIcon.png"
import logo from "./images/Logo.png"
import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "../LogProfile/Profile";
import { Link } from 'react-router-dom';



export default function Nav() {

    const { isAuthenticated } = useAuth0();
    
    return (
        <nav className="navbar d-inline">
            <div className="row mx-0 py-2 d-flex justify-content-between align-items-center " style={{ backgroundColor: "#a52323" }}>
                <div className="col-2 text-center text-white fw-semibold">+57 3184612011</div>
                <Link className="col-2 text-center text-white fw-semibold" to="/">www.tecnoshop.com.ar</Link>
                {isAuthenticated ? <Profile /> : <LoginButton />}
            </div>
            <div className="row mx-0 py-0 align-items-center justify-content-center" style={{ backgroundColor: "#4b1b1b" }}>
                <Link className="navbar-brand col-3 text-white fw-semibold" to="/">
                    <img src={logo} alt="logo" className="w-25"></img>
                    TECNOSHOP
                </Link>
                
                <div className="d-flex col-4 align-items-center text-center">
                    <div className="text-white mx-5 col">
                        <img src={favoriteIcon} alt="favoriteIcon" className="w-25 col"></img>
                        <p className="col">Favs</p>
                    </div>
                    <div className="text-white mx-5 col">
                        <img src={orderIcon} alt="orderIcon" className="w-25 col" />
                        <p className="col">Cart</p>
                        </div>
                </div>
            </div>
        </nav>
    )
}