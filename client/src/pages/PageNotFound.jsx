import React from 'react';
import {Link} from 'react-router-dom';

export default function PageNotFound(){
    return(
        <div className='container text-danger p-5'> 
            <div className='card border border-danger rounded  p-5 shadow'>
                <h1 className='text-center fw-bold'> ERROR : 404 </h1>
                <div className='row'>
                    <div className='col text-center align-items-center '>
                        <i className="fa-solid fa-triangle-exclamation fa-5x"></i>
                        <p className='text-center fs-3 m-0 p-0 fw-bold'> Page Not Found </p>
                        <p className='text-center fs-6 m-0 p-0 fw-bold'>sorry the page you requested is not found, please go home</p>
                    </div>
                </div>
                <Link to='/' className='btn btn-danger w-50 mx-auto text-center mt-4'>
                    Go to Home
                </Link>

            </div>
        </div>
    )
}