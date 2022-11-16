import React, {useState, useEffect} from "react";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react'
import ReactPaginate from 'react-paginate';
import UsersCard from './UsersCard';
import Transition from "../../Transition/Transition";



const GetAllUsers = () =>{

    const { getAccessTokenSilently } = useAuth0();
    const [page, setPage] = useState("0");
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    async function getUsersFromDb (page, search){
        try {
            const token = await getAccessTokenSilently()
            const result = await axios.get(`/user?page=${page}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTotalPages(result.data.totalPages)
            setUsers(result.data.users)
        } catch (error) {
            console.log("getAllOrders Error:", error)
        }
    }

    useEffect(()=>{
        getUsersFromDb(page, search)
    },[page, search])


    const handlePageClick = (event) => {
        setPage(event.selected)
    };


    async function blockUnblock (email, boolean){
        try {
            const token = await getAccessTokenSilently()
            await axios.put(`/user/block/${email}`, {block: boolean},  {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getUsersFromDb(page, search);
        } catch (error) {
            console.log("blockUnblock Error:", error)
        }
    }

    return(
        <Transition>
        <div>
            <input className="form-control mt-2 mb-2 bg-light w-25" type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search by Email" aria-label="Search" />
            <table className="table align-middle table-hover">
                <thead>
                    <tr>
                        <th scope="col" className="col-1">ID</th>
                        <th scope="col" className="col-1">Image</th>
                        <th scope="col" className="col-1 ps-4">Name</th>
                        <th scope="col" className="col-2">Email</th>
                        <th scope="col" className="col-1">Phone</th>
                        <th scope="col" className="col-1">Is Blocked</th>
                        <th scope="col" className="col-1">Block/Unblock</th>
                        <th scope="col" className="col-2">See orders</th>                    
                        
                    </tr>
                </thead>
                <tbody>
                    {users.length !== 0 ? users.map(user =>
                                                <UsersCard key={user.id} blockUnblock={blockUnblock} user={user} block/>
                                        ) : <tr className='text-danger'><th>Users not Found</th></tr>
                                        }
                </tbody>
            </table>
            
            <nav aria-label="navigation">
                { totalPages !==0 ?
                    <ReactPaginate
                        breakLabel=" . . ."
                        breakLinkClassName='btn btn-secondary text-decoration-none rounded shadow text-white fw-semibold me-1'
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel="<"
                        renderOnZeroPageCount={1}
                        className="pagination justify-content-center"
                        pageClassName="page-item "
                        pageLinkClassName="btn btn-secondary text-decoration-none rounded shadow text-white fw-semibold me-1 "
                        activeClassName="active"
                        activeLinkClassName="bg-danger border-danger text-white rounded shadow-sm "
                        previousClassName="page-item"
                        nextClassName="page-item"
                        previousLinkClassName="btn btn-secondary text-decoration-none rounded shadow text-white fw-semibold me-1"
                        nextLinkClassName="btn btn-secondary text-decoration-none rounded shadow text-white fw-semibold me-1"
                    />  
                : null }
            </nav>
        </div>
        </Transition>
    )
}

export default GetAllUsers