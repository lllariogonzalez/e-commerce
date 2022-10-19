import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import checkPermissions from '../utils/checkPermissions';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { flagUpdate } from '../redux/actions';

export default function FormCreate(){

    const history = useHistory();
    const dispatch = useDispatch();
    const flag = useSelector((state) => state.flagUpdate);
    let inputDetail = useSelector((state) => state.details);

    const [input, setInput]= useState({
        name: flag.flag ? inputDetail.name : '',
        image: flag.flag ? inputDetail.image : '',
        description: flag.flag ? inputDetail.description : '',
        price: flag.flag ? inputDetail.price: 0,
        category: flag.flag ? inputDetail.category : '',
        stock: flag.flag ? inputDetail.stock : 0,
        brand: flag.flag ? inputDetail.brand : '',
    });

    const [errors, setErrors] = useState({
        name: 'Enter a valid name',
        image: 'Enter a valid url',
        description: 'Enter a description',
        price: 'Enter a value higher than 0',
        category: 'Select one category',
        stock: 'Enter a value higher than 0',
        brand: 'Enter a valid brand name'
    })

    const { getAccessTokenSilently } = useAuth0();
    
    useEffect(()=>{
        checkPermissions(getAccessTokenSilently, history);
    },[]);

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

        if(!input.category) {
            errors.category = 'Select one category'
        } else {
            errors.category = '';
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
            if (flag.flag) {
                await axios.put(`/product/${flag.id}`,input, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('Product updated successfully');
            } else {
                await axios.post('/product', input, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('Product created successfully');
            }
        } catch (error) {
            alert(error.response.data.error);
        }
        dispatch(flagUpdate(false, null))
        setInput({
            name: '',
            image: '',
            description: '',
            price: 0,
            category: '',
            stock: 0,
            brand: ''
        })
        history.push('/');
    }

    return (
        <div>
         <Nav />
            {flag.flag ? <h1 className="text-center py-5 text-danger">Update product</h1> : <h1 className="text-center py-5 text-danger">Create new product</h1>}
            <Form className="w-50 mx-auto">
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
                    <Form.Control as="select" name="category" onChange={(e) => handleChange(e)}>
                        <option>Select a category</option>
                        <option value="smartphones">Smartphones</option>
                        <option value="laptops">PC Laptops</option>
                        <option value="tablets">Tablets</option>
                        <option value="smartwatches">Smartwatches</option>
                        <option value="speakers">Speakers</option>
                        <option value="tv">TVs</option>
                    </Form.Control>
                    {errors.category && <Form.Text className="text-muted">Select one category</Form.Text>}
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
                <Button variant="danger" type="submit"  onClick={(e) => history.push('/')}>Home</Button>{' '}
                <Button variant="danger" type="submit"  onClick={(e) => handleClick(e)} 
                disabled={(errors.name || errors.image || errors.description || errors.price || errors.category || errors.stock || errors.brand) ? true : ''}
                >Submit</Button>{' '}
            </div>
          <Footer />
        </div>
    )
}