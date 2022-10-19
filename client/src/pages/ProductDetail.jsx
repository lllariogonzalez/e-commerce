import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, flagUpdate } from "../redux/actions";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import CloseButton from 'react-bootstrap/CloseButton';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";



export default function ProductDetail(props) {

  const dispatch = useDispatch();
  const id = props.match.params.id;
  const history = useHistory()

  useEffect(() => {
    dispatch(getDetails(id))
  }, [dispatch, id])

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const deleteP = async (id) => {
    const token =  await getAccessTokenSilently();
    try {
        await axios.delete(`/product/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        alert("Product Removed")
    } catch (error) {
        console.log(error)
    }
    history.push("/")
  }

  const updateProduct = () => {
    dispatch(flagUpdate(true, id))
    history.push('/create');
  }

  const productDetail = useSelector((state) => state.details)

  return (
    <>
      <Nav />
      <div className="container mt-4">

        <Card className="border border-danger shadow" >
          <Card.Header className="text-center align-items-center text-uppercase py-0 px-3 bg-danger text-white fw-semibold">
          <Card.Title className="d-flex justify-content-between fs-3 align-items-center"> 
            {productDetail.name} 
            {isAuthenticated && <Button type="button" class="btn text-danger" variant="light" onClick={() => deleteP(id)}>Remove Product</Button>}
            {isAuthenticated && <Button type="button" class="btn text-white" variant="light" onClick={() => updateProduct()}>Update Product</Button>}
            <div>
              <Link to="/">
                <Button className="m-3 fw-bold text-danger" variant="light">X</Button>
              </Link>
            </div>
          </Card.Title>


          </Card.Header>
          <Card.Body className="text-center">
            
            <Card.Img  style={ {width : 'auto', maxHeight : '25em', marginTop: '2em', marginBottom:'2em'} } className="rounded" src={productDetail.image} />
            <Card.Subtitle className="mt-3 mb-3 text-muted fs-5 w-70 mx-auto">
              <b className="text-danger">Description:</b> {productDetail.description}
            </Card.Subtitle>
            <p className="text-center text-muted start lh-1 mb-4">
              <b className="text-danger">Category: </b>{productDetail.category}

            </p>
            <p className="text-center text-muted start lh-1 fw-semibold mb-4">
              <b className="text-danger">In Stock:</b> {productDetail.stock}
            </p>

            <p className="text-center  text-danger fs-4">Price: ${productDetail.price}</p>
            <div className="row text-center">
              <div className="col-6">
                <Button className="px-5 py-2" variant="danger"> <i class="fa-solid fa-heart-circle-plus"></i> </Button>
              </div>
              <div className="col-6">
                <Button className="px-5 py-2" variant="danger"> <i class="fa-solid fa-cart-plus"></i> </Button>
              </div>
            </div>
          </Card.Body>
        </Card>


      </div>
      <Footer />
    </>
  );
}