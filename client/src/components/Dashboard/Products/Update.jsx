import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import isAdmin from '../../../utils/isAdmin';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/actions';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Transition from '../../Transition/Transition';

export default function Update(){
   
    const location = useLocation();
    const history = useHistory();
    const categories = useSelector(state=>state.categories);
    const {id, name, image, description, price, CategoryId, stock, brand} = location.state ? location.state : '';

    const [open, setOpen] = useState(false);

    const closeModal = () =>{
        history.goBack();
        setOpen(false)
        return;
    };

    const [input, setInput]= useState({
        name: id ? name : '',
        image: id ? image : '',
        description: id ? description : '',
        price: id ? price: 0,
        CategoryId: id ? CategoryId : '',
        stock: id ? stock : 0,
        brand: id ? brand : '',
    });

    const [errors, setErrors] = useState({
        name: 'Enter a valid name',
        image: 'Enter a valid url',
        description: 'Enter a description',
        price: 'Enter a value higher than 0',
        CategoryId: 'Select one category',
        stock: 'Enter a value higher than 0',
        brand: 'Enter a valid brand name'
    })

    const [admin, setAdmin] = useState();
    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();
    
    useEffect(()=>{
        isAdmin(getAccessTokenSilently).then((res)=>setAdmin(res)).catch(()=>setAdmin(false));
        if(admin===false){
            setOpen(o => !o)
        }
        if(categories.length===0) dispatch(getCategories()); 
    },[admin]);

    function validate(input) {
        if(!input.name || input.name.length < 3) {
            errors.name = 'Enter a valid name';
        } else {
            errors.name = '';
        }

        if(!input.image || input.image.length < 5) {
            errors.image = 'Enter a valid url'
        } else {
            errors.image = '';
        }

        if(!input.description || input.description.length < 10) {
            errors.description = 'Enter a description'
        } else {
            errors.description = '';
        }

        if(!input.price || input.price <= 0) {
            errors.price = 'Enter a value higher than 0'
        } else {
            errors.price = '';
        }

        if(!input.CategoryId) {
            errors.CategoryId = 'Select one category'
        } else {
            errors.CategoryId = '';
        }

        if(!input.stock || input.stock <= 0) {
            errors.stock = 'Enter a value higher than 0'
        } else {
            errors.stock = '';
        }

        if(!input.brand || input.brand.length < 2) {
            errors.brand = 'Enter a valid brand name'
        } else {
            errors.brand = '';
        }
        return errors;
    }

    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value
            })
        )
    }

    async function handleClick(e) {
        try {
            const token = await getAccessTokenSilently();
            if (id) {
                await axios.put(`/product/${id}`,input, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success("Product updated successfully");
            } else {
                await axios.post('/product', input, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success("Product created successfully");
            }
        } catch (error) {
            toast.error("Error, please enter valid information")
        }
        setInput({
            name: '',
            image: '',
            description: '',
            price: 0,
            CategoryId: '',
            stock: 0,
            brand: ''
        })
        history.push("/Dashboard/Products")
    }

    return (
        <Transition>
        <div>
            {id ? <h1 className="text-center py-2  text-danger">Update product</h1> : <h1 className="text-center py-5 text-danger">Create new product</h1>}
            <Form className="w-75 mx-auto">
                <Form.Group className="mb-3" controlId="productName">
                    <Form.Label>Name</Form.Label>        
                    <Form.Control type="text" name="name" value={input.name} onChange={(e) => handleChange(e)} placeholder="Enter a name"/>
                    {errors.name && <Form.Text className="text-muted">Enter a valid name</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="productImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="url" name="image" value={input.image} onChange={(e) => handleChange(e)} placeholder="Enter an URL"/>
                    {errors.image && <Form.Text className="text-muted">Enter a valid url</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="productDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={2} name="description" value={input.description} onChange={(e) => handleChange(e)} placeholder="Enter a description"/>
                    {errors.description && <Form.Text className="text-muted">Enter a description</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="productPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value ={input.price} onChange={(e) => handleChange(e)} placeholder="Enter a price"/>
                    {errors.price && <Form.Text className="text-muted">Enter a value higher than 0</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="productCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="CategoryId" onChange={(e) => handleChange(e)}>
                        <option>Select a category</option>
                        {categories.map(c=>{
                            return(
                                <option key={c.id} value={c.id}>{c.category}</option>
                            )
                        })}
                    </Form.Control>
                    {errors.CategoryId && <Form.Text className="text-muted">Select one category</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="productStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" name="stock" value={input.stock} onChange={(e) => handleChange(e)} placeholder="Set an initial stock"/>
                    {errors.stock && <Form.Text className="text-muted">Enter a value higher than 0</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="productBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" name="brand" value={input.brand} onChange={(e) => handleChange(e)} placeholder="Enter a brand" />
                    {errors.brand && <Form.Text className="text-muted">Enter a valid brand name</Form.Text>}
                </Form.Group>
            </Form>

            <div className="d-flex justify-content-around py-3 w-50 mx-auto">
                <Button variant="danger" type="submit"  onClick={(e) => history.push('/Dashboard/Products')}><i className="fa-solid fa-left-long"></i></Button>{' '}
                <Button variant="danger" type="submit"  onClick={(e) => handleClick(e)} 
                disabled={(errors.name || errors.image || errors.description || errors.price || errors.CategoryId || errors.stock || errors.brand) ? true : ''}
                >Submit</Button>{' '}
            </div>
            <ToastContainer/>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <h2 className="text-danger text-center font-weight-bold">"You dont have the necesary permissions"</h2>
            </Popup>
        </div>
        </Transition>
    )
}