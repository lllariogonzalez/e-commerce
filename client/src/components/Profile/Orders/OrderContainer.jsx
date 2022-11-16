import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import useLoginEmail from '../../../utils/useLoginEmail';
import TransitionY from '../../Transition/TransitionY';
import OrderCard from './OrderCard';

const OrderContainer = () => {

    const { getAccessTokenSilently } = useAuth0();
    const [userOrders, setUserOrders] = useState([]);
    const [userData, setUserData] = useState({});
    const userEmail = useLoginEmail();


    async function getUserOrders() {
        const token = await getAccessTokenSilently()
        try {
            let result = await axios.get(`/order/email/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserOrders(result.data)
            let userGet = await axios.get(`/user/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(userGet.data)
        } catch (error) {
            console.log("getUserOrders Error:", error)
        }
    }

    useEffect(() => {
        getUserOrders()
    }, [])

    return (
        <>
            <TransitionY>
            <div className='container '>
              <h3>My Orders</h3>
                <div className="row">
                {Array.isArray(userOrders) && userOrders.length > 0 
                    ? userOrders.map(order => <OrderCard getUserOrders={getUserOrders} key={order.id} userOrders={userOrders} userData={userData} userEmail={userEmail} order={order} />) 
                    :<div className='d-flex flex-column align-items-center mt-4'>
                    <i className="fa-solid fa-circle-exclamation fs-4 text-danger"></i>
                    <p className='text-danger fw-bold fs-4 mt-2'>Without Orders</p>
                    </div>
                }
                </div>
            </div>
            </TransitionY>
        </>
    )
}
export default OrderContainer;