import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import FormOrder from './FormOrder';
import OrderDetailsProduct from './OrderDetailsProduct';
import { useAuth0 } from '@auth0/auth0-react';
import { clearCart } from '../../redux/actions';
import { useLocalStorage } from '../../utils/useLocalStorage';
import jsPDF from 'jspdf';
import logoTech from '../Nav/images/Logo.png';
import logoShipp from './shipping.png';
import Transition from "../Transition/Transition";


const Order = () => {

    const { user } = useAuth0();
    const { getAccessTokenSilently } = useAuth0();

    const dispatch = useDispatch();
    const productsCart = useSelector( state => state.cart);
    
    const quantityOrder = useSelector(state => state.currentOrder);
    const totalCart = useSelector(state => state.totalPayment)
    const [shippingCheck, setShippingCheck] = useState('');
    const [check, setCheck] = useState(false);
    const [units, setUnits] = useLocalStorage('units', {});
    const [cart, setCart] = useLocalStorage('cart', []);

    const totalProducts = productsCart.map((product) => {
        return {
            ...product,
            qty: quantityOrder[product.id]
        }
    })

    const orderProducts = totalProducts.map((product) => {
        return {
            id: product.id,
            quantity: product.qty
        }
    })
    const finalOrder = {
        user_email: user ? user.email : '',
        total_payment: totalCart,
        shipping_address: shippingCheck,
        status: "created",
        products: orderProducts
    }

    function handleCheck(e) {
        setCheck(true);
    }

    //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--* INICIO DE P D F S -*-*-*-*-*-*-*-*-*-*-*---

    const getPdf = ()=> {
    const docPdf = new jsPDF("p", "mm", "letter");

    var centerText = function(text, y) {
        var textWidth = docPdf.getStringUnitWidth(text) * docPdf.internal.getFontSize() / docPdf.internal.scaleFactor;
        var textOffset = (docPdf.internal.pageSize.width - textWidth) / 2;
        docPdf.text(textOffset, y, text);
    }


    docPdf.setFillColor(165,35,35);
    docPdf.rect(0,0,250,20,'F');


    var logo = new Image();
    logo.src = logoTech;
    docPdf.addImage(logo, 'PNG', 5, 0, 15, 15);


    docPdf.setFontSize(18);
        docPdf.setTextColor(255,255,255);

        centerText('TECNOSHOP',10);    

    docPdf.setFontSize(13);
    docPdf.setFontStyle('normal');
    docPdf.setTextColor(0,0,0);
        centerText('PURCHASE ORDER',17)   



    var logos = new Image();
        logos.src = logoShipp;
        docPdf.addImage(logos, 'PNG', 105, 22, 10, 10);

    docPdf.setFontSize(10);
        centerText('(Shipping Address)',35);

    docPdf.setFontSize(12);
    docPdf.setFont('Arial','italic');
        centerText(finalOrder.shipping_address,40);


    docPdf.setFontSize(12);
    docPdf.setFontStyle('normal');
        docPdf.text("Id:",10,55)
        docPdf.text("Name:",30,55)
        docPdf.text("Quantity:",110,55)
        docPdf.text("Price:",150,55)
        docPdf.text("Import:",180,55)
    const posy = 60;
    const posx = 10;
    docPdf.line(5,57 ,210,57);

    docPdf.setFontSize(10);
     for (let i = 0;i < totalProducts.length;i++) {
        let p = totalProducts[i];
        if (i%2 !==0) {

            docPdf.setFillColor(250, 250, 250);
            docPdf.rect(posx-5,posy+2+ (i+1) * 10,210,10, 'F');
        } else {
            docPdf.setFillColor(255, 248, 220);
            docPdf.rect(posx-5,posy+2+ (i+1) * 10,210,10, 'F');
        }





        docPdf.text(p.id.toString(),    posx,       posy + (i+1) * 10 );
        docPdf.text(p.name,             posx + 20,  posy + (i+1) * 10);
        docPdf.text(p.qty,              posx + 108, posy + (i+1) * 10, );
        docPdf.text('$ ' + p.price.toString(), posx + 140, posy + (i+1) * 10); 
        let imp = p.qty * p.price;
        docPdf.text('$ ' + imp.toString(), posx + 170, posy + (i+1) * 10); 


    } 

        docPdf.setDrawColor(0);

        docPdf.setFillColor(165,35,35);
        docPdf.setTextColor(255,255,255);
            docPdf.rect(175, posy + 25 + (totalProducts.length-1) * 10 , 25, 10, 'F')

        docPdf.setFontSize(12);
            docPdf.text('$ '+ finalOrder.total_payment.toString(),180,posy + 20 + totalProducts.length * 10);
        docPdf.save("Orderpdf");

    }

    //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--* FIN DE P D F S -*-*-*-*-*-*-*-*-*-*-*---

    async function mercadopago() {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.post('/order', finalOrder, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const id = response.data;
            /* getPdf(); */
            dispatch(clearCart());
            setUnits({});
            setCart([]);
            let checkoutURL = await axios.post('/checkout', { totalProducts, id });
            window.location.replace(`${checkoutURL.data}`)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Nav />
            <Transition>
            <div className="container mt-4 " >
                <h2>Order</h2>
                <div className="row g-4">
                    <div className="col-xl-7 col-md-8  border border-secondary   rounded bg-light shadow me-4 p-4">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button text-dark     fw-bold " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Check your personal information
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        <FormOrder setShippingCheck={setShippingCheck}/>

                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="row">
                            <div className="col">
                                <div className="border rounded mt-4 py-4 px-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value={check} id="flexCheckIndeterminate" onChange={handleCheck}/>
                                        <label className="form-check-label fs-6 fw-bold" htmlFor="flexCheckIndeterminate">
                                            I have read and accept store polices
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-4 text-end">
                                <button disabled={shippingCheck === '' || check === false} type="button" className="btn btn-success px-5 py-3 fw-semibold fs-5" onClick={mercadopago}>Place your order</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-3  border border-secondary rounded bg-light shadow p-4">
                        <OrderDetailsProduct products={totalProducts ? totalProducts : [] } totalPay={ productsCart ? productsCart.length : 0}  />

                    </div>
                </div>

            </div>
            </Transition>
            <Footer />

        </>
    )
}

export default Order;
