import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){
 var today = new Date();

    return(
        <div className="container-fluid" style={{ backgroundColor: "#a52323"}}>
            <footer className="py-3 mt-4">
                <ul className="nav justify-content-center pb-3 mb-3">
                   
                    <li className="nav-item "><Link to={"/"} className="nav-link px-2 text-white">Home</Link></li>
                    <li className="nav-item "><Link to={`/privacy`} className="nav-link px-2 text-white">Privacy Policies</Link></li>
                    <li className="nav-item "><Link to={`/contact`} className="nav-link px-2 text-white">Contact Us</Link></li>
                    <li className="nav-item "><Link to={`/developers`} className="nav-link px-2 text-white">Developers</Link></li>
                    <li className="nav-item "><Link to={`/about`} className="nav-link px-2 text-white">About</Link></li> 
                </ul>
                <p className="text-center text-white">{`© ${today.getFullYear()} Tecnoshop`}</p>
            </footer>
        </div>
    )
}