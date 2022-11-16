import React from 'react'
import { Link } from 'react-router-dom';
import { LogoutButton } from '../LogProfile/Logout';

const Navbar = () => {


    return (
        <header className="navbar navbar-dark sticky-top bg-danger flex-md-nowrap p-0 shadow">
            <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" to="/">TecnoSHOP</Link>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="navbar-nav w-100 ">
                    <div className="nav-item">
                        <LogoutButton />
                    </div>
                </div>
        </header>
    )
}
export default Navbar;