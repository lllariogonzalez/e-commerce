import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import ReactPaginate from 'react-paginate';
import AdminOrderCard from './AdminOrderCard';
import  {toast}  from 'react-toastify';
import Transition from '../../Transition/Transition';

const AdminOrderContainer = () => {


    const { getAccessTokenSilently } = useAuth0()
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0)
    const [orders, setOrders]=useState([])
    const [orderAs, setOrderAs] = useState("DESC")
    const [statusFilter, setStatusFilter] = useState("all")
    const availableStatus =["created", "pending", "in process", "delivered", "received", "cancelled"]


    
    async function getAllOrders(page, orderAs, statusFilter){
        const token = await getAccessTokenSilently()
        try {
            const result = await axios.get(`/order?size=12&page=${page}&orderAs=${orderAs}&filter=${statusFilter}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(result.data.orders)
            setTotalPages(result.data.totalPages)
        } catch (error) {
            console.log("getAllOrders Error:", error)
        }
    }



    useEffect(() =>{ 
        getAllOrders(page, orderAs, statusFilter)
    },[page, orderAs, statusFilter])

    const handlePageClick = (event) => {
        setPage(event.selected)
    };



    async function updateStatus(e, id){
        const token = await getAccessTokenSilently()
        const orderById = orders.find((order) => order.id === id)
        if (orderById.status === 'received' || orderById.status === 'cancelled') {
            toast.error(`The order is currently ${orderById.status}`, {
                position: "top-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                }); 
        } else {
            const body = { "updateStatus": e.target.value }
            try {
                await axios.put(`/order/${id}`, body, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                getAllOrders(page, orderAs, statusFilter);
            } catch (error) {
                console.log("Error update status:", error)
            }
        }
        
    }




    return (
      <>
        <Transition>
          <div className="container  p-2 mt-4">
            <div className="row justify-content-around">
              <select
                onChange={(e) => setOrderAs(e.target.value)}
                className="form-select mb-4 w-25"
              >
                <option value="">Order By</option>
                <option value="ASC">Older</option>
                <option value="DESC">Recent</option>
              </select>
              <select
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select mb-4 w-25"
              >
                <option value="all">Filter By Status (Default All)</option>
                <option value="received">Received</option>
                <option value="in process">In process</option>
                <option value="created">Created</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="row">
              {/* <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Client Email</th>
                                <th scope="col">Total</th>
                                <th scope="col">Status</th>
                                <th scope="col">Address</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length !== 0 ? orders.map(order =>
                                    <tr key={order.id}>
                                        <th scope="row">{order.id}</th>
                                            <td>{order.user_email}</td>
                                            <td>{order.total_payment}</td>
                                            <td>
                                                <select onChange={(e)=> updateStatus(e, order.id)} className="form-select mb-4 w-50">
                                                    <option selected>{order.status}</option>
                                                    {availableStatus.map(status=> !(status == order.status) ?
                                                    <option value={status}>{status}</option> : null
                                                        )}
                                                </select>
                                            </td>
                                            <td>{order.shipping_address}</td>
                                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                                    </tr>
                                ) : <p>Orders not Found</p>
                                }
                        </tbody>
                    </table> */}
              {orders.length !== 0 ? (
                orders.map((order) => (
                  <AdminOrderCard
                    key={order.id}
                    availableStatus={availableStatus}
                    updateStatus={updateStatus}
                    order={order}
                  />
                ))
              ) : (
                <div className="d-flex flex-column align-items-center mt-4">
                  <i className="fa-solid fa-circle-exclamation fs-4 text-danger"></i>
                  <p className="text-danger fw-bold fs-4 mt-2">
                    Without Orders
                  </p>
                </div>
              )}

              <nav aria-label="navigation">
                {totalPages !== 0 ? (
                  <ReactPaginate
                    breakLabel=" . . ."
                    breakLinkClassName="page-link"
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={1}
                    className="pagination justify-content-center"
                    pageClassName="page-item "
                    pageLinkClassName="btn btn-secondary text-decoration-none rounded shadow text-white fw-semibold me-1"
                    activeClassName="page-item"
                    activeLinkClassName="bg-danger border-danger text-white rounded shadow-sm "
                    previousClassName="page-item"
                    nextClassName="page-item "
                    previousLinkClassName="btn btn-secondary text-decoration-none rounded shadow text-white fw-semibold me-1"
                    nextLinkClassName="btn btn-secondary text-decoration-none rounded shadow text-white fw-semibold me-1"
                  />
                ) : null}
              </nav>
            </div>
          </div>
        </Transition>
      </>
    );
}
export default AdminOrderContainer;