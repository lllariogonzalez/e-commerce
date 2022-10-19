import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardProduct from './CardProduct';
import FilterAndOrder from "../FilterAndOrderProducts/FilterAndOrder";
import { getAllProducts } from '../../redux/actions';
import PaginationProducts from './Pagination';
import SearchBarProducts from './SearchBarProducts'




const CardProductsList = () => {

    const dispatch = useDispatch();
    const totalPages = useSelector(state => state.products.totalPages);
    const products = useSelector(state => state.products.products);


    const [size, setSize] = useState(8);
    const [page, setPage] = useState(0);
    const [categoryFilter, setCategoryFilter] = useState(undefined);
    const [sort, setSort] = useState(undefined);
    const [search, setSearch] = useState(undefined);
    
    function setPagePagination(n) {
        setPage(n)
    }
    function setCategory(category) {
        setCategoryFilter(category);
    }
    function setSortOrder(sort){
        setSort(sort);
    }

    useEffect(() => {
        dispatch(getAllProducts(size, page,categoryFilter,sort,search));
    }, [dispatch, size, page, categoryFilter, sort,search])

    return (
        <>
            <div className="container mt-4">
                <div className="row g-4">
                    <div className="col-lg-3 col-md-12">
                        <FilterAndOrder setPage={setSize} sort={sort} setSortOrder={setSortOrder} setCategory = {setCategory}/>
                    </div>
                    <div className="col-lg-9 col-md-12">
                        <div className='container bg-light border shadow p-3 mb-3 '>
                            <SearchBarProducts  setSearch={setSearch} />
                        </div>
                        <Container className="bg-light border shadow p-3">
                            <Row>
                                {
                                    products ? products.map(product => (
                                        <Col key={product.id} sm={6} md={6} lg={4} xl={3} className='mb-4'>
                                            <CardProduct  key={product.id} product={product} />
                                        </Col>
                                    )) : (<p>Loading . . .</p>)
                                }

                                {
                                    totalPages===0 && ( <p> {`The product with the name '${search}' does not exist in the category '${categoryFilter}'`} </p>) 
                                }
                            </Row>

                            <div className="container mx-auto">
                                <PaginationProducts currentPage={ page + 1 } setPagePagination={setPagePagination} totalPages={totalPages} />
                            </div>

                        </Container>

                    </div>
                </div>
            </div>

        </>
    )

}

export default CardProductsList;