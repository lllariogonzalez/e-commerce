import React from "react";

export default function Footer(){
    return(
        <div className="container-fluid" style={{ backgroundColor: "#a52323"}}>
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center pb-3 mb-3">
                    <li className="nav-item "><a href={window.location.href} className="nav-link px-2 text-white">Home</a></li>
                    <li className="nav-item "><a href={window.location.origin} className="nav-link px-2 text-white">Features</a></li>
                    <li className="nav-item "><a href={window.location.origin} className="nav-link px-2 text-white">Pricing</a></li>
                    <li className="nav-item "><a href={window.location.origin} className="nav-link px-2 text-white">FAQs</a></li>
                    <li className="nav-item "><a href="http://localhost:3000/about" className="nav-link px-2 text-white">About</a></li> {/*HREF HARDCODEADO!!! */}
                </ul>
                <p className="text-center text-white">© 2022 Tecnoshop</p>
            </footer>
        </div>
    )
}