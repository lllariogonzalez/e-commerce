import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../../../redux/actions';
import { nameCategory } from '../../../utils/nameCategory';


export default function ProductsTableRow({ p, deleteP, updateProduct, setShow, setId }) {

    const categories = useSelector(state=>state.categories);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        if(categories.length===0) dispatch(getCategories()); 
    },[]);

    function delPro() {
        setShow(true);
        setId(p.id);

    }

    function uploadImage(id){
        history.push({ pathname: '/Dashboard/Products/Image', state: id })
    }

    return (
        <>
            <tr key={p.id}>
                <td scope="row" width={'6em'} className='text-center'>
                    <img style={{ maxWidth: '5em', maxHeight: '5em', minWidth: '3em', minHeight: '3em' }} src={p.image} alt="IMG_PRODUCT" />

                </td>
                <th className=''>{p.name}</th>
                <td className='fw-semibold'>{p.price}</td>
                <td className='fw-semibold'>{nameCategory(categories, p.CategoryId)}</td>
                <td className='fw-semibold'>{p.brand}</td>
                <td className='fw-semibold'>
                    <span className='bg-secondary p-1 rounded-pill fw-bold text-white'> {p.stock} </span> 
                </td>



                <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-sm btn-primary" onClick={delPro}><i className="fa-solid fa-trash"></i></button>
                        <button type="button" className="btn btn-sm btn-link" onClick={()=> uploadImage(p.id)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16">
  <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
  <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
</svg></button>
                        <button type="button" className="btn btn-sm btn-warning" onClick={() => updateProduct(
                            {
                                id: p.id,
                                name: p.name,
                                image: p.image,
                                brand: p.brand,
                                description: p.description,
                                price: p.price,
                                CategoryId: p.CategoryId,
                                stock: p.stock,
                            })
                        }><i className="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </td>
            </tr>



        </>
    )
}
