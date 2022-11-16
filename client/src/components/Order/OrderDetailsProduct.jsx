import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const OrderDetailsProduct = ({ products,totalPay }) => {

    const { user, isAuthenticated } = useAuth0();
    const history = useHistory();
    useEffect(()=>{
        if(!isAuthenticated){
            history.replace("/");
            return;
        }
    },[user]);

    return (
        <>
            <div className="row   ">
                {products && products.map(p => (
                    <div key={p.id} className="col-12 border mt-2 border-secondary p-1 rounded" >
                        <p className="text-center m-0">{p.name}</p>
                        <p className="text-center m-0 text-danger fw-bold"> {p.qty}</p>
                        {p.Offer?.active === "true"
                        ? <p className="text-center m-0">  $ {Math.trunc(p.price*(1-p.Offer.discount/100))} </p>
                        : <p className="text-center m-0">  $ {p.price} </p>
                        }
                    </div>
                ))}


                <div className='text-center mt-3 fs-4'>
                   <span className='text-danger fs-6 fw-semibold d-block '> 
                    <span className='text-dark fs-6'> Total Products : </span>
                    { user && products ?  products.map(p =>  parseInt(p.qty)).reduce((acc,p ) => acc +p ) : 0}
                   </span>
                    Pay : <span className='text-danger fw-bold'>$ { user && products.length>0 ? products.map(p => {
                        let price = p.price;
                        if(p.Offer?.active ==="true") price = Math.trunc(p.price*(1-p.Offer.discount/100));
                        return price * p.qty;
                    }).reduce(( acc, p ) => acc + p )
                    : 0 }</span>
                </div>
            </div>
        </>
    )
}

export default OrderDetailsProduct;