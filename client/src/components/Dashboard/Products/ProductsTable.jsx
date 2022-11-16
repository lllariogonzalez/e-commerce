import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { getAllProducts } from '../../../redux/actions';
import { useAuth0 } from '@auth0/auth0-react'
import axios from "axios";
import ReactPaginate from 'react-paginate';
import ProductsTableRow from './ProductTableRow';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SearchBarProducts from '../../CardProductList/SearchBarProducts';
import Transition from '../../Transition/Transition';


const ProductsTable = ({ itemsPerPage }) => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const totalPages = useSelector(state => state.products.totalPages);
    const [size, setSize] = useState(12);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState(undefined);
    const [sort, setSort] = useState(undefined);
    const { getAccessTokenSilently } = useAuth0()
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [id, setId] = useState();

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getAllProducts(size, page, null, sort, search));
    }, [size, page, dispatch, search, sort])

    const handlePageClick = (event) => {
        setPage(event.selected)
    };

    const deleteP = async (id) => {
        const token = await getAccessTokenSilently();
        try {
            await axios.delete(`/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setShow(false)
            //Toast 

        } catch (error) {
            //Toast Error
        }
        dispatch(getAllProducts());
    }

    const updateProduct = (props) => {
        history.push({ pathname: '/Dashboard/Products/Update', state: props })
    }

    const setPageSize = (size) => {
        setSize(size);
        setPage(0)
    }

    return (
        <>
            <Transition>
                <div className="container-fluid mt-4 mx-auto ">
                    <div className="col-12 d-flex justify-content-center mx-auto my-4">
                        <div className="row w-100 align-items-center">
                            <div className="col-8"><SearchBarProducts sort={sort} setSortOrder={setSort} setPage={setPageSize} setSearch={setSearch} /> </div>
                            <div className="col-4 align-middle "> <Link to={'/Dashboard/Products/Create'} className="btn btn-danger py-2">  <i className="fa-solid fa-plus me-2"></i> Create Product</Link> </div>

                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle table-hover ">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Brand</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>

                                {products && products.map(p => (
                                    <ProductsTableRow key={p.id} p={p} deleteP={deleteP} updateProduct={updateProduct} setShow={setShow} setId={setId} />
                                ))}
                            </tbody>

                        </table>
                    </div>
                    <nav aria-label="navigation">
                        {totalPages !== 0 ?
                            <ReactPaginate
                                breakLabel="..."
                                breakLinkClassName='btn btn-secondary text-decoration-none rounded shadow text-white fw-semibold me-1'
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={1}
                                marginPagesDisplayed={2}
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
                            : (<>  {`The product '${search}' doesn' t exist`}  </>)}

                    </nav>
                </div>
            </Transition>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>the data is permanently deleted from the database</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => deleteP(id)}>
                        YES
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        NO
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default ProductsTable;