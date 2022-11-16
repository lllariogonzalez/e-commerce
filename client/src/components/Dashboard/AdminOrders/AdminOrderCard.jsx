import React from 'react';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router-dom';

const AdminOrderCard = ({ order, updateStatus, availableStatus }) => {

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [orderById, setOrderById] = useState('')
    const [user, setUser] = useState('')
    const closeModal = () => {
        setOpen(false)
        setOrderById('')
    };
    const { getAccessTokenSilently } = useAuth0();

    async function getOrder() {
        const id = order.id;
        const token = await getAccessTokenSilently()
        try {
            setOpen(o => !o)
            let result = await axios.get(`/order/id/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrderById(result.data)
            let userName = await axios.get(`/user/${order.user_email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(userName.data)
        } catch (error) {
            console.log("getOrderById Error:", error)
        }
    }

    function handleClick(id) {
        history.push(`/product/${id}`)
    }

    return (
        <div className="col-12">
            <div className="card mb-3 mx-2 p-2  shadow " style={ {backgroundColor:'#F3FFE9', borderColor :'#91AF78' } } >
                <div className="row g-0">

                    <div className="col-12">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="card-text  m-0 fs-5 text-muted" >ID : <span className='fw-bold fs-5 text-muted'> {order.id}</span> </div>
                                        </div>
                                        <div className="col-6">
                                            <p> Status:
                                                {order.status === 'created' && (<> <span style={{ backgroundColor: '#000000' }} className=" text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-cart-shopping"></i> {order.status}</span> </>)}
                                                {order.status === 'pending' && (<> <span style={{ backgroundColor: '#facc25' }} className=" text-black text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-spinner"></i> {order.status}</span> </>)}
                                                {order.status === 'in process' && (<> <span style={{ backgroundColor: '#2967e3' }} className=" text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-box-open"></i> {order.status}</span> </>)}
                                                {order.status === 'delivered' && (<> <span style={{ backgroundColor: '#de7f12' }} className=" text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-truck"></i> {order.status}</span> </>)}
                                                {order.status === 'received' && (<> <span style={{ backgroundColor: '#128305' }} className="text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-house-circle-check"></i> {order.status}</span> </>)}
                                                {order.status === 'cancelled' && (<> <span style={{ backgroundColor: '#830505' }} className="text-white text-uppercase  py-1 px-2 rounded"><i className="fa-solid fa-ban"></i> {order.status}</span> </>)}

                                            </p>
                                        </div>
                                        <div className="col-12 text-start">
                                            <div className="card-text m-0"> Total payment : $ <span className="fw-bold fs-5 text-success">{order.total_payment}</span></div>
                                        </div>
                                        <div className="col-12 text-start">
                                            <div className="card-text m-0"> Shipping address : {order.shipping_address}</div>
                                        </div>
                                        <div className="col-md-6 text-start">
                                        <p className="card-text fw-semibold text-uppercase mt-2"><span className=""> date created :{new Date(order.createdAt).toLocaleString()}</span></p>
                                        </div>
                                        <div className="col-md-6 text-start">
                                        <p className="card-text fw-semibold text-uppercase mt-2"><span className="">last update : {new Date(order.updatedAt).toLocaleString()} </span></p>
                                        </div>
                                    </div>


                                    
                                </div>
                                <div className="col mt-4">
                                    {/* <p> Order status:
                                        {order.status === 'created' && (<> <span style={{ backgroundColor: '#000000' }} className=" text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-cart-shopping"></i> {order.status}</span> </>)}
                                        {order.status === 'pending' && (<> <span style={{ backgroundColor: '#facc25' }} className=" text-black text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-spinner"></i> {order.status}</span> </>)}
                                        {order.status === 'in process' && (<> <span style={{ backgroundColor: '#2967e3' }} className=" text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-box-open"></i> {order.status}</span> </>)}
                                        {order.status === 'delivered' && (<> <span style={{ backgroundColor: '#de7f12' }} className=" text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-truck"></i> {order.status}</span> </>)}
                                        {order.status === 'received' && (<> <span style={{ backgroundColor: '#128305' }} className="text-white text-uppercase  py-1 px-2 rounded"> <i className="fa-solid fa-house-circle-check"></i> {order.status}</span> </>)}
                                        {order.status === 'cancelled' && (<> <span style={{ backgroundColor: '#830505' }} className="text-white text-uppercase  py-1 px-2 rounded"><i className="fa-solid fa-ban"></i> {order.status}</span> </>)}

                                    </p> */}
                                    <select onChange={(e) => updateStatus(e, order.id)} className="form-select text-uppercase w-100">
                                        <option  >{order.status}</option>
                                        {availableStatus.map(status => !(status === order.status) ?
                                            <option  key={status} value={status}>{status}</option> : null
                                        )}
                                    </select>
                                    <button type="button" className="btn btn-success my-2 w-100" onClick={() => getOrder()}>View detail</button>
                                    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                                        <div className="modal d-block position-relative">
                                            <button type="button" className=" close btn btn-dark mb-2" onClick={closeModal}>Close</button>
                                            <p className='text-center fw-bold my-0'>Order #{order.id}</p>
                                            <p className='text-center fw-bold my-0'>{user.name}</p>
                                            <p className='text-center fw-bold my-0'>{user.email}</p>
                                            <p className='text-center fw-bold'>Tel. {user.phone}</p>
                                            <Table striped bordered hover responsive="sm">
                                                <thead>
                                                    <tr className='bg-danger text-white'>
                                                        <th>Product id</th>
                                                        <th>Brand</th>
                                                        <th colSpan={2}>Name</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {typeof orderById.Products === 'object' ? orderById.Products.map((el) => {
                                                        return (
                                                            <tr key={el.id} role="button" onClick={() => handleClick(el.id)}>
                                                                <td>{el.id}</td>
                                                                <td>{el.brand}</td>
                                                                <td colSpan={2}>{el.name}</td>
                                                                <td>$ {el.price}</td>
                                                                <td>{el.OrderDetail.units}</td>
                                                            </tr>
                                                        )
                                                    }) : <h4 className="dropdown-item">No orders</h4>}
                                                </tbody>
                                            </Table>
                                            <p className='text-center fw-bold'>Total order: $ {order.total_payment}</p>
                                        </div>
                                    </Popup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminOrderCard;