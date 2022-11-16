import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/actions'
import Transition from '../../Transition/Transition';
import { toast } from 'react-toastify';

export default function Categories() {


    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();
    const [id, setId] = React.useState();
    const categoriesAll = useSelector(state => state.categories);

    const [open, setOpen] = React.useState(false);

    const closeModal = () => {
        setOpen(false)
        return;
    };

    React.useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])


    const deleteCategory = async (id) => {
        setOpen(o => !o)
        setId(id);
    }

    const deleteOnClick = async (id) => {
        const token = await getAccessTokenSilently()

        try {
            const result = await axios.delete(`/category/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(result.data);
        } catch (error) {

        }
        setOpen(false)
        dispatch(getCategories())
    }


    return (
        <Transition>
        <div className='container-fluid mt-4'>
            <div className="row">
                <div className="col-12 bg-light border border-secondary px-2 rounded shadow">
                    <table className='table  table-hover text-center'>
                        <thead>
                            <tr>
                                <th className='fw-semibold fs-6'>Id</th>
                                <th className='fw-semibold fs-6'>Category</th>
                                <th><Link to='/Dashboard/Categories/Create' className="btn btn-danger fw-bold"><i className="me-2 fa-solid fa-plus"></i>New Category</Link></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                categoriesAll !== 0 ? categoriesAll.map(category =>
                                (
                                    <tr key={category.id}>
                                        <td className="fw-bold">{category.id}</td>
                                        <td className="fw-bold">{category.category}</td>
                                        <td className="">
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button onClick={() => deleteCategory(category.id)} type="button" className="btn btn-sm btn-danger"><i className="fa-solid fa-trash"></i></button>
                                                <Link to={`/Dashboard/Categories/Update/${category.id}/${category.category}`} type="button" className="btn btn-sm btn-warning"><i className="fa-solid fa-pen-to-square"></i></Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) :
                                    (<tr><td colSpan={3} > No Categories </td></tr>)
                            }



                        </tbody>
                    </table>


                </div>
            </div>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} >
                <div className="row border border-dark rounded py-4 m-0">
                    <div className="col-12 text-center py-4 text-dark">
                        <i className="fa-solid fa-circle-question fa-4x"></i>
                    </div>
                    <div className="col-12">
                        <h5 className="text-dark text-center font-weight-bold py-3">Are you sure to delete the category?</h5>
                    </div>
                    <div className="col-12 text-center">
                        <div className="btn-group mx-auto" role="group" aria-label="Basic example">
                            <button onClick={() => deleteOnClick(id)} type="button" className="btn btn-success fs-6"> <i className="fa-solid fa-square-check fa-xl me-2"></i> Yes</button>
                            <button onClick={() => setOpen(false)} type="button" className="btn btn-danger fs-6"> <i className="fa-solid fa-square-xmark fa-xl me-2"></i> No</button>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
        </Transition>
    )
}