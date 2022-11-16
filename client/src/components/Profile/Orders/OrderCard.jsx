import React from 'react'
import axios from 'axios'
import useLoginEmail from '../../../utils/useLoginEmail'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import ModalComentProduct from './ModalComentProduct'
import jsPDF from 'jspdf';
import logoTech from '../../Nav/images/Logo.png';
import logoShipp from './shipping.png';
import Loading from '../../Loading/Loading'
import Popup from 'reactjs-popup';


const OrderCard = ({ getUserOrders, order, userData, userOrders, userEmail }) => {
    
    const [modalShow, setModalShow] = useState(false);
    const [loadpdf, setLoadpdf] = useState(true);
    const {getAccessTokenSilently} = useAuth0();

    async function payment(orderId) {
        const order = userOrders.find((el) => el.id === Number(orderId));
        const id = orderId;
        const totalProducts = order.Products.map((product) => {
            return ({
                name: product.name,
                price: product.price,
                qty: product.OrderDetail.units,
                image: product.image
            })
        });
        let checkoutURL = await axios.post('/checkout', { totalProducts, id });
        window.location.replace(`${checkoutURL.data}`)
    }

    //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--* INICIO DE P D F S -*-*-*-*-*-*-*-*-*-*-*---

    const getPDF = (order)=> {
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
            centerText(order.shipping_address ,40);

        docPdf.setFontSize(12);
        docPdf.setFont('Arial','italic');
            centerText("Status: " + order.status.toUpperCase() ,45);
    
    
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
         for (let i = 0;i < order.Products.length;i++) {
            let p = order.Products[i];
            if (i%2 !==0) {
    
                docPdf.setFillColor(250, 250, 250);
                docPdf.rect(posx-5,posy+2+ (i+1) * 10,210,10, 'F');
            } else {
                docPdf.setFillColor(255, 248, 220);
                docPdf.rect(posx-5,posy+2+ (i+1) * 10,210,10, 'F');
            }
    
    
    
    
    
            docPdf.text(p.id.toString(),    posx,       posy + (i+1) * 10 );
            docPdf.text(p.name,             posx + 20,  posy + (i+1) * 10); 
            docPdf.text(p.OrderDetail.units.toString(),              posx + 108, posy + (i+1) * 10, );
            docPdf.text('$ ' + p.price.toString(), posx + 140, posy + (i+1) * 10); 
            let imp = p.OrderDetail.units * p.price;
            docPdf.text('$ ' + imp.toString(), posx + 170, posy + (i+1) * 10); 
    
    
        } 
    
            docPdf.setDrawColor(0);
    
            docPdf.setFillColor(165,35,35);
            docPdf.setTextColor(255,255,255);
                docPdf.rect(175, posy + 25 + (order.Products.length-1) * 10 , 25, 10, 'F')
    
            docPdf.setFontSize(12);
                docPdf.text('$ '+ order.total_payment.toString(),180,posy + 20 + order.Products.length * 10);
                                
            docPdf.save("Orderpdf");
    
        }
    
        //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--* FIN DE P D F S -*-*-*-*-*-*-*-*-*-*-*---
    
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        getUserOrders();
    }, [open])

    const closeModal = () => {
        setOpen(false)
        return;
    };

    const handleCancelled= async()=>{
        try {
            const token = await getAccessTokenSilently()
            const result = await axios.put(`/order/status/${order.id}`, { status: "rejected" },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        setOpen(false)
        }catch(error){
            console.log(error.message);
        }
    }

    const cancelledOnClick = async () => {
        setOpen(o => !o)
    }


    return (
        <div>
            <div className='col-12 mb-3 '>
                <div style={{ backgroundColor: '#FDEDEC' }} className="card shadow border-gray p-2 mb-5">
                        <div className="row">
                            {/* Order ID */}
                            <div className="col-xl-6 col-sm-4 text-center mx-auto py-2">
                                <span className=' text-sm fw-semibold  bg-danger text-white px-4 rounded'>ID: {order.id} </span>
                            </div>
                            {/* Order Status */}
                            <div className="col-xl-6 col-sm-8 text-danger fs-6 fw-bold text-center py-2">
                                <p> status:
                                    {order.status === 'created' && (<> <span style={{ backgroundColor: '#000000' }} className=" text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-cart-shopping"></i> {order.status}</span> </>)}
                                    {order.status === 'pending' && (<> <span style={{ backgroundColor: '#facc25' }} className=" text-black text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-spinner"></i> {order.status}</span> </>)}
                                    {order.status === 'in process' && (<> <span style={{ backgroundColor: '#2967e3' }} className=" text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-box-open"></i> {order.status}</span> </>)}
                                    {order.status === 'delivered' && (<> <span style={{ backgroundColor: '#de7f12' }} className=" text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-truck"></i> {order.status}</span> </>)}
                                    {order.status === 'received' && (<> <span style={{ backgroundColor: '#128305' }} className="text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-house-circle-check"></i> {order.status}</span> </>)}
                                    {order.status === 'cancelled' && (<> <span style={{ backgroundColor: '#830505' }} className="text-white text-uppercase  py-1 px-2 rounded"><i className="fa-solid fa-ban"></i> {order.status}</span> </>)}

                                </p>
                            </div>
                            {/* shipping information */}
                            <div className="col-12 mb-3">
                                <div className=' card position-relative mx-3 border border-danger'>
                                    <span className="position-absolute mx-5  top-0 start-0 translate-middle badge rounded bg-danger">
                                        Shipping Information
                                    </span>
                                    <div className="row m-2">
                                        <div className="col-12 mt-1"><span>{order.shipping_address}</span></div>
                                    </div>
                                </div>
                            </div>
                            {/* Products */}
                            <div className="col-12 mb-3">
                                <div className='card position-relative mx-3 border border-danger'>
                                    <span className="position-absolute mx-3 mb-2 top-0 start-0 translate-middle badge rounded bg-danger">
                                        Products
                                    </span>
                                    <span className="position-absolute mx-3 fs-6 px-3 top-100 start-50 translate-middle badge rounded bg-danger">
                                        $ {order.total_payment}
                                    </span>
                                    <div className='m-2'>
                                        {order.Products.map(product =>
                                            <div key={product.id} className="row text-center mb-2">
                                                <div className="col-2"> <img style={{ maxHeight: '3em', maxWidth: '3em', minHeight: '1em', minWidth: '2em' }} src={product.image} alt="" /> </div>
                                                <div className="col-4"><span className='fw-bold text-wrap'>{product.name}</span> </div>
                                                {product.Offer?.active === "true" ? <div className="col-2"><span className='fw-bold'>{Math.trunc(product.price * (1 - product.Offer.discount / 100))}</span></div>
                                                    : <div className="col-2"><span className='fw-bold'>{product.price}</span></div>}
                                                <div className="col-2"><span className='fw-bold'>{product.OrderDetail.units}</span></div>
                                                {product.Offer?.active === "true" ? <div className="col-2"><span className='fw-bold'>$ {product.OrderDetail.units * Math.trunc(product.price * (1 - product.Offer.discount / 100))}</span></div>
                                                    : <div className="col-2"><span className='fw-bold'>$ {product.OrderDetail.units * product.price}</span> </div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mx-auto">
                                {order.status === 'created' && <button value={order.id} className="my-2 btn btn-warning fw-bold text-dark mx-3" onClick={(e) => payment(e.target.value)}>
                                    Continue payment process
                                </button>}
                                {
                                    order.status === 'received' &&
                                    (<button disabled={order.status === 'received' ? false : true} className='"my-2 btn  btn-dark  fw-bold mx-3' onClick={() => setModalShow(true)}>
                                        <i className="fa-sharp fa-solid fa-comment-dots me-2"></i>Comment
                                    </button>)
                                }
                                {order.status === 'created' &&
                                    <button className='btn btn-danger mx-2 fw-bold ' onClick={cancelledOnClick}>
                                        <i class="fa-solid fa-ban me-2"></i>Cancel
                                    </button>
                                }

                                {
                                loadpdf && order.id && order.status !== 'cancelled' ?
                                <button className='btn btn-success mx-2 fw-bold ' onClick={()=>{
                                    setLoadpdf(false);
                                    setTimeout(()=>{
                                        getPDF(order);
                                    }, 1000)
                                    setTimeout(() => {
                                        setLoadpdf(true);
                                    }, 3000);
                                    }}>
                                    <i className="fa-solid fa-file-pdf me-2"></i>Download
                                </button>
                                : order.status !== 'cancelled' ? <Loading size={"50px"} height={"50px"} /> : <></>
                                }

                            </div>
                        </div>
                        <ModalComentProduct
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            products={order.Products}
                            email={userEmail}
                            idOrder={order.id}
                            block={userData.block}
                        />
                    </div>
            </div>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} >
                <div className="row border border-dark rounded py-4 m-0">
                    <div className="col-12 text-center py-4 text-dark">
                        <i class="fa-solid fa-circle-question fa-4x"></i>
                    </div>
                    <div className="col-12">
                        <h5 className="text-dark text-center font-weight-bold py-3">Sure you want to cancel the order</h5>
                    </div>
                    <div className="col-12 text-center">
                        <div class="btn-group mx-auto" role="group" aria-label="Basic example">
                            <button onClick={() => handleCancelled()} type="button" class="btn btn-success fs-6"> <i className="fa-solid fa-square-check fa-xl me-2"></i> Yes</button>
                            <button onClick={() => setOpen(false)} type="button" class="btn btn-danger fs-6"> <i className="fa-solid fa-square-xmark fa-xl me-2"></i> No</button>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}
export default OrderCard;
