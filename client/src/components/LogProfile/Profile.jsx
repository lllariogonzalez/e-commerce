import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./Logout";
import { Link } from 'react-router-dom'
import isAdmin from "../../utils/isAdmin";
import isClient from "../../utils/isClient";
import { getUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export const Profile = () => {

    const [ admin, setAdmin ] = useState(false);
    const [ client, setClient] = useState(true);
    const { user, isLoading, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
    const dispatch = useDispatch();
    const userLocal = useSelector(state=>state.user);

    const setUser= async()=>{
        const token = await getAccessTokenSilently();
        dispatch(getUser(user.email, token))
    }
    
    useEffect(()=>{
        isClient(user).then((data)=>setClient(data)).catch((error)=>setClient(error));
        isAdmin(getAccessTokenSilently).then((res)=>setAdmin(res)).catch((error)=>setAdmin(error));
        if(user){
            setUser()
        }
    }, [user]);

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }
    
    return (
        <div className="dropdown">
            <button className="btn btn-sm  btn btn-outline-light px-2 py-0 mx-0 dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mx-2 fw-semibold"> {user.name}</span>
                <i className="fa-solid fa-user"></i>
            </button>
        {isAuthenticated && admin?
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* <p className="p-2 m-0 fw-semibold" >{user.email}</p> */}
                <Link to={'/profile/myInformation'} className=' dropdown-item'><i className="fa-solid fa-id-card"></i> Profile </Link>
                <Link to={'/dashboard'} className=' dropdown-item'><i className="fa-solid fa-table-columns"></i> Dashboard </Link>
                {/* <Link className="dropdown-item" to={'/create'}> <i className="fa-solid fa-circle-plus"></i>  Create product </Link> */}
                <LogoutButton />
            </div>
        :
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* <p className="p-2 m-0 fw-semibold" >{user.email}</p> */}
                <Link to={'/profile'} className=' dropdown-item'><i className="fa-solid fa-table-columns"></i> Profile </Link>
                <LogoutButton />
            </div>
        }
        </div>
    )
}