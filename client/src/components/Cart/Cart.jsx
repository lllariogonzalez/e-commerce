import React from "react";
import { Container, Table, Row } from "react-bootstrap";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import ProductTrElement from './ProductTrElement';
import { useLocalStorage } from '../../utils/useLocalStorage';
import CardPrice from "./CartPrice";
import { useDispatch, useSelector } from "react-redux";
import getCartLocalStorage from "../../utils/getCartLocalStorage";
import { clearCart, deleteCartGlobal, getItemsLocal } from "../../redux/actions";
import Button from "react-bootstrap/Button";
import Transition from "../Transition/Transition";

export const Cart = () => {

  const products = useSelector(state=>state.cart);
  const dispatch = useDispatch();

  const [cart, setCart] = useLocalStorage('cart', []);
  const [units, setUnits] = useLocalStorage('units', {});
  const [order, setOrder] = useState(units || {});

  useEffect(()=>{
    getCartLocalStorage(products.map(i=>i.id)).then((data)=>dispatch(getItemsLocal(data)));
  },[])

  useEffect(()=>{
      setUnits(order);
  }, [order]);

  function removeCart(id) {
    dispatch(deleteCartGlobal(id));
  }

  return (
    <div>
      <Nav />
      <Transition>
      <div style={{minHeight: "65vh"}} className="">
        <Container className="card mb-5 mt-4 rounded border border-secondary p-3 shadow  bg-light">
          <h5 className="text-left mb-4 ps-2">Cart List</h5>
          <Row className="mx-1" >
            <div className="col-xl-8  col-md-12 col-sm-12 cartShow">
              <Table className='rounded bg-light overflow-hidden border border-secondary' bordered hover responsive="md">
                <thead>
                  <tr>
                    <th>Product Img</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Sub Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  {products.length ? products.map((product, idx) => (
                      <ProductTrElement
                        product={product}
                        key={product.id}
                        isCart={true}
                        // editCart={editCart}
                        removeCart={removeCart}
                        setOrder={setOrder}
                        order={order}
                      />
                  )) :
                    (<>
                      <tr >
                        <td colSpan={6}>
                          <p className="text-center fs-5 my-2">You have no product in the Cart</p>
                        </td>
                      </tr>
                    </>)}
                </tbody>

                 
               {/* {console.log(cart)} */}
              </Table>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="dark"
                    size="sm"
                    className="ms-1"
                    onClick={() => {
                      dispatch(clearCart());
                      setCart([]);
                      setOrder({});
                    }}
                    >
                    Clear Cart
                  </Button>
                </div>
            </div>
            <CardPrice order={order} />
          </Row>
        </Container>
      </div>
      </Transition>
      <Footer />
    </div>


  )
}

