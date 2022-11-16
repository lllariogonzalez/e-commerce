import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardProduct from './CardProduct';
import FilterAndOrder from "../FilterAndOrderProducts/FilterAndOrder";
import { getAllProducts, getOffers } from '../../redux/actions';
import PaginationProducts from './Pagination';
import SearchBarProducts from './SearchBarProducts';
import axios from 'axios';
import { nameCategory } from '../../utils/nameCategory';
import Loading from '../Loading/Loading';
import SocialBar from '../SocialBar/SocialBar';


const CardProductsList = () => {

    const dispatch = useDispatch();
    const totalPages = useSelector(state => state.products.totalPages);
    const products = useSelector(state => state.products.products);
    const categories = useSelector(state => state.categories);

    const [size, setSize] = useState(12);
    const [page, setPage] = useState(0);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sort, setSort] = useState(undefined);
    const [search, setSearch] = useState(undefined);
    const [brandsSelected, setBrandsSelected] = useState();
    const [brands, setBrands] = useState();
    const [offer, setOffer] = useState();

    function setPagePagination(n) {
        setPage(n)
        window.scroll(0,0);        
    }
    function setCategory(category) {
        setCategoryFilter(category);
    }
    function setSortOrder(sort){
        setSort(sort);
    }

    useEffect(() => {
        dispatch(getAllProducts(size, page, categoryFilter, sort, search, brandsSelected, offer));
    }, [dispatch, size, page, categoryFilter, sort, search, brandsSelected, offer])

    useEffect(() => {
        axios.get(`/product/brand?category=${categoryFilter ? categoryFilter :''}`)
            .then(response => setBrands(response.data))
    }, [categoryFilter])

    useEffect(()=>{
        dispatch(getOffers());        
    },[])

    return (
      <>
        <div className="container mt-4">
          <div className="row g-4">
            <div className="col-lg-3 col-md-12">
              {brands !== undefined && (
                <FilterAndOrder
                  setOffer={setOffer}
                  brands={brands}
                  brandsSelected={brandsSelected}
                  setBrandsSelected={setBrandsSelected}
                  setCategory={setCategory}
                />
              )}
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="container bg-white border shadow p-3 mb-3 rounded">
                <SearchBarProducts
                  sort={sort}
                  setPage={setSize}
                  setSortOrder={setSortOrder}
                  setSearch={setSearch}
                />
              </div>
              <Container className="m-0 p-0">
                <Row>
                  {products ? (
                    products.map((product) => (
                      <Col
                        key={product.id}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className="mb-4"
                      >
                        <CardProduct key={product.id} product={product} />
                      </Col>
                    ))
                  ) : (
                    <Loading height={"250px"} text={"true"} />
                  )}

                  {totalPages === 0 &&
                    (categoryFilter !== "" &&
                    nameCategory(categories, categoryFilter) !== undefined ? (
                      <div className="d-flex flex-column align-items-center mt-4">
                        <p className="text-danger fw-bold fs-4 mt-2">
                          {" "}
                          {`The product with the name '${search}' does not exist in ${nameCategory(
                            categories,
                            categoryFilter
                          )} category`}{" "}
                        </p>
                      </div>
                    ) : (
                      <div className="d-flex flex-column align-items-center mt-4">
                        <p className="text-danger fw-bold fs-4 mt-2">
                          {`The product with the name '${search}' does not exist`}
                        </p>
                      </div>
                    ))}
                </Row>

                <div className="container mx-auto">
                  <PaginationProducts
                    currentPage={page + 1}
                    setPagePagination={setPagePagination}
                    totalPages={totalPages}
                  />
                </div>
              </Container>
            </div>
          </div>
        </div>
        <SocialBar />
      </>
    );

}

export default CardProductsList;