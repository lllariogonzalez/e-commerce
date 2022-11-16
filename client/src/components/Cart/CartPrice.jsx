import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { setCurrentOrder, setTotalPayment } from '../../redux/actions';
import { useAuth0 } from "@auth0/auth0-react";

const CardPrice = ({ order }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const total = Object.values(order)?.reduce((acc, text)=>{
       return acc += Number(text.split("|")[1]);
    }, 0);
    const currentOrder = {};
    Object.keys(order)?.map((key) => {
        currentOrder[key] = order[key].split('|')[0]
    })

    const { isAuthenticated } = useAuth0();


    function handleClick(e) {
        e.preventDefault();
        dispatch(setCurrentOrder(currentOrder));
        history.push('/Order')
    }
    
    useEffect(()=>{
        dispatch(setTotalPayment(total));
    },[order])

    return (
        <>
            <div className="col-xl-4  col-md-12 card border border-secondary shadow  bg-light p-4">
                <h5 className="text-left mb-4 pb-2">Cart Price</h5>

                <div className="d-flex justify-content-between mb-4">
                    <h6 className="fw-bold fs-4">Total : </h6>
                    <span className="fw-bold fs-4"> $ {total}</span>
                </div>
                
                { total === 0 ? <>  <button disabled size="md" className="btn btn-dark mt-4 w-100 disable" >Proceed to checkout</button> </> :
                    <>
                        {!isAuthenticated ? <h4 className='text-danger'>Please login to continue...</h4> : ''}
                        <button disabled={total === 0 || !isAuthenticated } variant="dark" size="md" className="btn btn-success mt-4 w-100" onClick={handleClick}>
                                Proceed to checkout
                        </button>
                    </>
                }

            </div>
        </>
    )

}
export default CardPrice;