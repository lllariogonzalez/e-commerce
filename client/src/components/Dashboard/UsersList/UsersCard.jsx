import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './UsersCard.css'


const UsersCard = ({user, blockUnblock}) => {

    const { getAccessTokenSilently } = useAuth0();
    const [userOrders, setUserOrders] = useState([])
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    async function getUserOrders(userEmail) {
        const token = await getAccessTokenSilently()
        try {
            setOpen(o => !o)
            var result = await axios.get(`/order/email/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserOrders(result.data)
        } catch (error) {
            console.log("getUserOrders Error:", error)
        }
    }

    return(<>
            <tr>
                <td className='fw-semibold col-1'>{user.id}</td>
                <td width={'6em'} className='text-center col-1'>
                    <img style={{ maxWidth: '4em', maxHeight: '4em', minWidth: '3em', minHeight: '3em', borderRadius: '50%'}} src={ user.image ||'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png' } alt="IMG_PRODUCT" />
                </td>
                <th className='col-2 ps-4'>{user.name}</th>
                <td className='fw-semibold col-2'>{user.email}</td>
                <td className="col-1">{user.phone}</td>
                {user.block == false ? <td className='col-1'>No</td> : <td className='col-1'>Yes</td>}
                {user.block == false ? 
                    <td className='col-1'>
                        <button className='btn btn-danger' onClick={() => blockUnblock(user.email, true)}>Block</button>
                    </td> 
                : <td className='col-1'>
                    <button className='btn btn-danger' onClick={() => blockUnblock(user.email, false)}>Unblock</button>
                    </td>
                }
                <td className='col-2' >
                    <button type="button" className="btn btn-success" onClick={() => getUserOrders(user.email)}>See client Orders</button>
                    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                        <div className="modal d-block position-relative">
                            <button type="button" className=" close btn btn-dark mb-2" onClick={closeModal}>Close
                            </button>
                                <tr className='mt-2'>
                                    <th className='col-1'>Order id</th>
                                    <th className='col-1'>Total Payment</th>
                                    <th className='col-1'>Status</th>
                                    <th className='col-2'>Shipping Address</th>
                                    <th className='col-2'>Date Created</th>
                                </tr>
                                {typeof userOrders == "object" ? userOrders.map(order =>
                                    
                                    <tr key={order.id}>
                                        <td className='col-1'>{order.id}</td>
                                        <td className='col-1'>{order.total_payment}</td>
                                        <td className='col-1'>{order.status.charAt(0).toUpperCase() + order.status.slice(1, order.status.length)}</td>
                                        <td className='col-2'>{order.shipping_address}</td>
                                        <td className='col-2'>{new Date(order.createdAt).toLocaleString()}</td>
                                    </tr>
                                ) : <div className='d-flex flex-column align-items-center mt-4'>
                                <i class="fa-solid fa-circle-exclamation fs-4 text-danger"></i>
                                <p className='text-danger fw-bold fs-4 mt-2'>Without Orders</p>
                            </div>}
                        </div>
                    </Popup>
                </td>
            </tr>
        </>
    )
}

export default UsersCard;