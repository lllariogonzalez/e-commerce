import axios from 'axios';
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../../redux/actions';
import Transition from '../../Transition/Transition';
import { toast } from 'react-toastify';

export default function FormCategory({ match }) {

    const history = useHistory();


    let { id, categorySelected } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [category, setCategory] = useState(categorySelected ? categorySelected : '');
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false)
        return;
    };

    const [errors, setErrors] = useState(!id ? 'Category is Requerid' : '')

    function validate(category) {
        let letErrors;
        if (category === "") {
            letErrors = 'Category is Requerid';
        } else if (!/^[A-Z]+$/i.test(category)) {
            letErrors = 'Category is Invalid';
        }
        else {
            letErrors = '';
        }
        return letErrors;
    }


    const saveCategory = async (e) => {
        e.preventDefault();
        const token = await getAccessTokenSilently()
        if (!id) {

            try {
                const result = await axios.post(`/category/${category}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })           
                if (result.status === 200) {
                    setCategory('');
                    dispatch(getCategories())
                    history.goBack();
                    toast.success(`${result.data.category} Category Created `)
                }
            } catch (error) {
                setCategory('');
                dispatch(getCategories())
                setErrors('Category is Requerid');
                toast.error(`Category already exist`)
            }


        } else {
            const result = await axios.put(`/category/${id}/${category}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (result.statusText === "OK") {
                setCategory('');
                toast.success(result.data);
                history.goBack();
            } else {
                setCategory('');
            }

        }

    }

    const handleInputCategory = function (e) {
        setCategory(e.target.value);
        setErrors(
            validate(e.target.value)
        )
    }

    return (
        <>
            <Transition>
                <div className="container-fluid mt-4">
                    <h3 className="text-center"> {id ? 'Update category' : 'New Category'}</h3>
                    <form action="" className='text-center' onSubmit={saveCategory}>
                        <div className="form-floating mb-3 mx-auto w-50">
                            <input type="text"
                                className={errors ? 'form-control  mx-auto is-invalid' : 'form-control  mx-auto'}
                                id="category" name="category"
                                value={category}
                                onChange={(e) => handleInputCategory(e)}
                                placeholder='laptop'
                            />
                            <label htmlFor="categoryName" className="mx-auto">Category Name</label>
                            {errors && (<p className="mt-2 text-danger fw-semibold"> {errors} </p>)}
                        </div>
                        <div className="d-flex justify-content-around py-3 w-50 mx-auto">
                            <button className="btn btn-danger text-center" type="submit" onClick={(e) => history.push('/Dashboard/Categories')}><i className="fa-solid fa-left-long"></i></button>{' '}
                            <button disabled={errors && true} type="submit" className="btn btn-danger text-center">Submit</button>
                        </div>

                    </form>
                </div>
                <Popup open={open} closeOnDocumentClick onClose={closeModal} >
                    {!id ? (
                        <h2 className="text-danger text-center font-weight-bold">The Category has been Registered</h2>
                    ) : (
                        <h2 className="text-danger text-center font-weight-bold">The Category has been Updated</h2>
                    )}

                </Popup>
            </Transition>
        </>
    )
}