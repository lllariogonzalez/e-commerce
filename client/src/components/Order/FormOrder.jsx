import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImg } from '../../redux/actions';
import { useLocation } from 'react-router-dom';
import spinner from '../spinner.gif';
import Transition from '../Transition/Transition';
import TransitionY from '../Transition/TransitionY';
import Loading from '../Loading/Loading';


const FormOrder = (props) => {

    const { getAccessTokenSilently, user } = useAuth0();
    const dispatch = useDispatch();
    const location = useLocation();

    const [inputOrder, setinputOrder] = useState({
        email: user ? user.email : '',
        name: user ? user.name : '',
        country: '',
        region: '',
        shipping_address: '',
        postal_code: '',
        phone: ''
    });
    
    const [errors, setErrors] = useState({
    
    })


    async function getUserByEmail() {
        if(!user) return
        const token = await getAccessTokenSilently();
        const response = await axios.get(`/user/${user.email}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setinputOrder(response.data)
    }

    useEffect(() => {
        try {
            getUserByEmail();       
        } catch (error) {   
            console.log(error)
        }
    }, [])

    async function saveUser(e) {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.put(`/user/${user.email}`, inputOrder,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) toast.success('Updated successfully');
        } catch (error) {
            console.log(error);
        }
        // props.setShippingCheck(inputOrder.shipping_address)
        props.setShippingCheck(`${inputOrder.shipping_address}, ${inputOrder.region}, ${inputOrder.country}, ${inputOrder.postal_code}`)
    }



    function validate(input) {
        if (input.email === '') {
            errors.email = 'Email is required';
        } else if (! /\S+@\S+\.\S+/.test(input.email)) {
            errors.email = 'Enter a valid email';
        } else {
            errors.email = '';
        }

        if (input.name === '') {
            errors.name = 'Contact Name is required';
        } else {
            errors.name = '';
        }

        if (input.country === '') {
            errors.country = 'country is required';
        } else {
            errors.country = '';
        }

        if (input.region === '') {
            errors.region = 'region is required';
        } else {
            errors.region = '';
        }

        if (input.shipping_address === '') {
            errors.shipping_address = 'Street Address is required';
        } else {
            errors.shipping_address = '';
        }

        if (input.postal_code === '') {
            errors.postal_code = 'Postal Code is required';
        } else {
            errors.postal_code = '';
        }

        if (input.phone === '') {
            errors.phone = 'Contact Number is required';
        } else {
            errors.phone = '';
        }
        return errors;
    }



    function handleChange(e) {
        e.preventDefault();
        setinputOrder({
            ...inputOrder,
            [e.target.name]: e.target.value
        })

        setErrors(
            validate({
                ...inputOrder,
                [e.target.name]: e.target.value
            })
        )
    }
    
    const [preview, setPreview] = useState();
    const [loading, setLoading] = useState(false);

    const handleInputImg= (e)=>{
        const file= e.target.files[0]
        previewFile(file);

    }

    const previewFile=(file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend= ()=>{
            setPreview(reader.result)
            dispatch(setProfileImg(reader.result)) 
        }
    }

    const handleSubmitImg= (e)=>{
        e.preventDefault();
        if(!preview) return;
        setLoading(true);
        uploadImage(preview);
    }

    const uploadImage = async (preview)=>{
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.post(`/user/${user.email}`, JSON.stringify({image: preview}),
                {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
            setLoading(false);
            if (response.status === 200) toast.success('Updated successfully');
            
        } catch (error) {
            console.log(error);
            toast.success('Something wrong');
        }
    }

    return (
        <>
        <TransitionY>
            {loading ?
            <div className='d-flex justify-content-center'>
                <Loading size={"50px"} />
            </div>
            : location.pathname==="/profile/myInformation" ? 
                <form onSubmit={handleSubmitImg} encType='multipart/form-data' className='row align-items-center'>
                    <h5 className='m-0 col-4'>Change your profile picture:</h5>
                    <label htmlFor="image" className='btn btn-secondary m-0 col-4'>Select and Upload Image</label>
                    <input onChange={handleInputImg} type="file" name="image" accept='image/*' id="image" style={{"display":"none"}}/>
                    <input className='col-2 btn btn-success m-2 text-center' type="submit" value="Save"/>
                </form>
            : <></>
            }
            <form autoComplete='off' >
                <br/>
                <div className="form-floating mb-3">
                    <input disabled={true} type="email" className={errors.email ? "form-control border border-danger" : "form-control"} id="email" name='email' value={inputOrder.email} onChange={handleChange} />
                    <label htmlFor="email">Email</label>
                    {errors.email && <span className="ms-2 text-danger">{errors.email}</span>}
                </div>
                <div className="form-floating mb-3">
                    <input disabled={true} type="text" className={errors.contactName ? "form-control border border-danger" : "form-control"} id="contactName" name='contactName' value={inputOrder.name} onChange={handleChange} />
                    <label htmlFor="contactName"> Name</label>
                    {errors.name && <span className="ms-2 text-danger">{errors.name}</span>}
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <div className="form-floating ">
                            <input type="text" className={errors.country ? "form-control border border-danger" : "form-control"} id="country" name='country' value={inputOrder.country} onChange={handleChange} />
                            <label htmlFor="floatingPassword">Country</label>
                            {errors.country && <span className="ms-2 text-danger">{errors.country}</span>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-floating" >
                            <input type="text" className={errors.region ? "form-control border border-danger" : "form-control"} id="region" name='region' value={inputOrder.region} onChange={handleChange} />
                            <label htmlFor="floatingPassword">State/Province/Department</label>
                            {errors.region && <span className="ms-2 text-danger">{errors.region}</span>}
                        </div>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-6">
                        <div className="form-floating ">
                            <input type="text" className={errors.shipping_address ? "form-control border border-danger" : "form-control"} id="shipping_address" name='shipping_address' value={inputOrder.shipping_address} onChange={handleChange} />
                            <label htmlFor="floatingPassword">Street Address</label>
                            {errors.shipping_address && <span className="ms-2 text-danger">{errors.shipping_address}</span>}
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <div className="form-floating ">
                            <input type="number" className={errors.postal_code ? "form-control border border-danger" : "form-control"} id="postal_code" name='postal_code' value={inputOrder.postal_code} onChange={handleChange} />
                            <label htmlFor="floatingPassword">Postal Code</label>
                            {errors.postal_code && <span className="ms-2 text-danger">{errors.postal_code}</span>}
                        </div>
                    </div>
                    <div className="col-12 ">
                        <div className="form-floating ">
                            <input type="number" className={errors.phone ? "form-control border border-danger" : "form-control"} id="phone" name='phone' value={inputOrder.phone} onChange={handleChange} />
                            <label htmlFor="floatingPassword">Phone</label>
                            {errors.phone && <span className="ms-2 text-danger">{errors.phone}</span>}
                        </div>
                    </div>
                    <input onClick={saveUser} className='col btn btn-success mt-4 mb-2 text-center mx-5' type="submit" value="Confirm information" />
                </div>




            </form>
            </TransitionY>
        </>
    )
}

export default FormOrder;