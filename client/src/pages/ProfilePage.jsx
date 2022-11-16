import React , { useState , useEffect } from 'react'
import Footer from '../components/Footer/Footer.jsx';
import Nav from '../components/Nav/Nav.jsx';
import isClient from "../utils/isClient";
import { useAuth0 } from "@auth0/auth0-react";
import FormOrder from '../components/Order/FormOrder.jsx';
import { Link, NavLink, Route } from 'react-router-dom';
import axios from 'axios';
import OrderContainer from '../components/Profile/Orders/OrderContainer';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/actions.js';
import MyFavorites from '../components/MyFavorites/MyFavorites.jsx';
import Transition from '../components/Transition/Transition.jsx';
import TransitionY from '../components/Transition/TransitionY.jsx';
import GoUpButton from '../components/GoUpButton/GoUpButton.jsx';

export default function ProfilePage() {

    const [ client, setClient] = useState(true);
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const history = useHistory();
    const profileImg = useSelector(state=>state.profileImg);
    const dispatch = useDispatch();
    const userLocal = useSelector(state=>state.user);

    const setUser= async()=>{
        const token = await getAccessTokenSilently();
        dispatch(getUser(user.email, token))
    }

    useEffect( ()=>{
        isClient(user).then((data)=>setClient(data)).catch((error)=>setClient(error));
        if(user){
            setUser()
        }
    }, [user]);
    
    useEffect( ()=>{
        if(!isAuthenticated) {
            history.replace("/");
        }
    }, [client]);

    return (
        <>
            <Nav />
            <Transition>
            <div style={{minHeight: "65vh"}} className="container mt-4 border border-secondary rounded">
                <div className="row my-3 ">
                    <div className="col-xl-3 col-md-4 col-sm-12  mb-4">
                        <div className=" text-center">
                            
                            <img src={profileImg ? profileImg : userLocal.image? userLocal.image : 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'} style={ { width : '6em', height: "6em"}} className="text-center rounded-circle" alt="Avatar" />
                            <p className='m-0 p-0 fw-bold'>{user && user.name}</p>
                            <span className='m-0 p-0 fw-bold fs-15'>{user && user.email}</span>
                        </div>
                        <div className="p-2 mt-3">
                            <div className="row">
                                <NavLink to={'/profile/myInformation'}  activeClassName="btn btn-danger" className="btn btn-sm btn-secondary w-100"  ><span className="text-start"  aria-current="true"> <i className="me-2 fa-solid fa-circle-user"></i>My Infomation</span></NavLink>
                                <NavLink to={'/profile/myOrders' }  activeClassName="btn btn-danger" className="btn btn-sm btn-secondary mt-2 w-100" ><span className="text-start"><i className="me-2 fa-solid fa-newspaper"></i> My Orders</span></NavLink>
                                <NavLink to={'/profile/myFavorites'} activeClassName="btn btn-danger" className="btn btn-sm btn-secondary mt-2 w-100 px-4" ><span className="text-start"><i className="me-2 fa-solid fa-heart"></i>My Favorites</span></NavLink>
                            </div>

                        </div>
                    </div>

                    <div className='col-xl-9 col-md-8 col-sm-12 '>
                        <Route path={'/profile/myInformation'}>
                                <FormOrder user={ user} />
                        </Route>
                        <Route path={'/profile/myOrders'}>
                                <OrderContainer />
                        </Route>
                        <Route path={'/profile/myFavorites'}>
                                <MyFavorites />
                        </Route>
                    </div>

                </div>
            </div>
            <GoUpButton />
            </Transition>
            <Footer/>
        </>
    )
}