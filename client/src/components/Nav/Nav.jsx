import React, { useEffect, useState } from "react";
import { LoginButton } from "../LogProfile/Login";
import logo from "./images/Logo.png"
import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "../LogProfile/Profile";
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { useDispatch, useSelector } from "react-redux";
import { getItemsLocal, getTotalFav } from "../../redux/actions";
import getCartLocalStorage from "../../utils/getCartLocalStorage";

export default function Nav() {

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const cart = useSelector(state => state.cart);
    const [items, setItems] = useLocalStorage("cart", []);
    const dispatch = useDispatch();
    const [isFirstTime, setIsFirstTime] = useState(true);
    const totalFav = useSelector(state => state.totalFav);

    useEffect(() => {
        if (isAuthenticated) {
            user && user.email && getFav(user.email)
        }

    }, [user])

    useEffect(() => {
        if (items.length > 0 && cart.length === 0 && isFirstTime) {
            getCartLocalStorage(items.map(i => i.id)).then((data) => dispatch(getItemsLocal(data)))
        } else {
            setItems(cart);
        }


    }, [cart])

    const getFav = async (email) => {
        const token = await getAccessTokenSilently();
        dispatch(getTotalFav(email, token));
    }

    useEffect(() => { setIsFirstTime(false) }, [])

    return (
        <>
            {/* <nav className="navbar bg-dark m-0 p-0">
                <div className="container ">
                    <div className="row bg-secondary py-2 px-xl-5">
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="d-inline-flex align-items-center">
                                <span className=" text-white" aria-current="page" href="#"><i className="fa-solid fa-phone me-2"></i> 55-55555</span>
                                <Link className=" text-white" to="/" ><i className="fa-solid fa-globe me-2"></i>www.tecnoshop.com.ar</Link>

                            </div>

                        </div>
                        <div className="col-lg-6 text-end text-lg-right">
                            {isAuthenticated ? <Profile /> : <LoginButton />}
                        </div>

                    </div>

                </div>
            </nav> */}
            <nav className=" bg-dark m-0 p-0">
                <div className="container">
                    <div className="row  py-2 px-xl-5">
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="d-inline-flex align-items-center">
                                <Link className="text-white px-2" to="/" ><i className="fa-solid fa-globe me-2"></i>www.tecnoshop.com.ar</Link>                                                               
                            </div>
                        </div>
                        <div className="col-lg-6 text-center text-lg-end">
                            <div className="d-inline-flex align-items-center">
                                {isAuthenticated ? <Profile /> : <LoginButton />}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className="bg-danger">
                <div className="container">
                    <div className="row align-items-center py-2 px-xl-5">
                        <div className="col-lg-6 col-sm-6  col-6 align-self-start">
                            <Link to="/" className="text-white text-decoration-none " >
                                <img src={logo} alt="logo" style={{ maxWidth: '5em' }}></img>
                                <span className="fw-semibold lh-lg fs-3 text-white d-none d-md-inline d-sm-none "> TECNOSHOP </span>
                            </Link>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 align-self-start text-center">
                            <div className="d-flex justify-content-end" >
                                {isAuthenticated ? (
                                    <Link to="/profile/myFavorites" className="nav-card text-white text-decoration-none bg-danger position-relative my-2 mx-5 p-1 ">
                                        <i className="fa-solid fa-heart fa-2x "></i>
                                        <p className="fw-normal fs-6 lh-1 ">Favs</p>
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                            {typeof totalFav === "object" ? totalFav.length : 0}
                                        </span>
                                    </Link>

                                ) : (
                                    <button disabled={true} className="text-white text-decoration-none bg-danger position-relative my-2 mx-5 p-1 border-0  ">
                                        <i className="fa-solid fa-heart fa-2x "></i>
                                        <p className="fw-normal fs-6 lh-1 ">Favs</p>
                                    </button>
                                )}

                                <Link to="/cart" className="nav-card text-white text-decoration-none bg-danger position-relative my-2 mx-5 p-1  ">
                                    <i className="fa-solid fa-cart-shopping  fa-2x"></i>
                                    <p className="fw-normal fs-6 lh-1 ">Cart</p>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                        {cart?.length || 0}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>

            {/* <nav className="navbar bg-danger m-0 px-6 py-2 shadow-sm border-dark ">
                <div className="container">
                    <Link to="/" className="text-white text-decoration-none " >
                        <img src={logo} alt="logo" style={{ maxWidth: '5em' }}></img>
                        <span className="fw-semibold lh-lg fs-3 text-white "> TECNOSHOP </span>
                    </Link>
                    <div className="d-flex" role="search">
                        {isAuthenticated ? (
                            <Link to="/profile/myFavorites" className="text-white text-decoration-none bg-danger position-relative my-2 mx-5 p-1 ">
                                <i className="fa-solid fa-heart fa-2x "></i>
                                <p className="fw-normal fs-6 lh-1 ">Favs</p>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                    {!isAuthenticated ? '-' : totalFav}
                                </span>
                            </Link>

                        ) : (
                            <button disabled={true} className="text-white text-decoration-none bg-danger position-relative my-2 mx-5 p-1 border-0  ">
                                <i className="fa-solid fa-heart fa-2x "></i>
                                <p className="fw-normal fs-6 lh-1 ">Favs</p>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                    -
                                </span>
                            </button>
                        )}

                        <Link to="/cart" className="text-white text-decoration-none bg-danger position-relative my-2 mx-5 p-1  ">
                            <i className="fa-solid fa-cart-shopping  fa-2x"></i>
                            <p className="fw-normal fs-6 lh-1 ">Cart</p>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                {cart?.length || 0}
                            </span>
                        </Link>
                    </div>
                </div>
            </nav > */}

        </>
    )
}