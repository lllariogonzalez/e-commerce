import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getOffers } from '../../redux/actions';
import Accordion from 'react-bootstrap/Accordion';
import './FilterAndOrder.css'


const FilterAndOrder = (props) => {

    const categories = useSelector(state => state.categories);
    const offers = useSelector(state => state.offers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories(""));
        dispatch(getOffers());
    }, []);

    useEffect(() => {
        if (!props.brands.find(brand => brand === props.brandsSelected)) props.setBrandsSelected('')
    }, [props.brands]);

    return (


        <div id='filter' className='border shadow rounded '>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Offers</Accordion.Header>
                    <Accordion.Body>

                        <div className='row mx-1 my-1'>
                            <div className="col-xl-12 col-md-6 col-sm-6 col-6 form-check">
                                <input checked={props.check} className="form-check-input" type="radio" name="offer" id="allOffer" onChange={(e) => { props.setOffer('') }} />
                                <label className="form-check-label fw-semibold" htmlFor="allOffer">
                                    All
                                </label>
                            </div>
                            {offers && offers.filter(o => o.active === "true").map(o => (
                                <div key={o.id} className="col-xl-12 col-md-6 col-sm-6 col-6 form-check">
                                    <input className="form-check-input" type="radio" name="offer" id={o.event} onChange={(e) => { props.setOffer(o.id) }} />
                                    <label className="form-check-label fw-semibold" htmlFor={o.event}>
                                        {`${o.event[0].toUpperCase()}${o.event.slice(1)} ${o.discount}%`}
                                    </label>
                                </div>
                            ))}
                        </div>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Categories</Accordion.Header>
                    <Accordion.Body>
                        <div className='row mx-1 my-1'>
                            <div className="col-xl-12 col-md-6 col-sm-6 col-6 form-check">
                                <input className="form-check-input" type="radio" name="category" id="all" onChange={(e) => { props.setCategory(0) }} />
                                <label className="form-check-label fw-semibold" htmlFor="all">
                                    All
                                </label>
                            </div>
                            {categories.map(element => {
                                return (
                                    <div key={element.id} className="col-xl-12 col-md-6 col-sm-6 col-6 form-check">
                                        <input className="form-check-input" type="radio" name="category" id={element.id} onChange={(e) => { props.setCategory(element.id) }} />
                                        <label className="form-check-label fw-semibold" htmlFor={element.id}>
                                            {`${element.category[0].toUpperCase()}${element.category.slice(1)} `}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Brands</Accordion.Header>
                    <Accordion.Body>

                        <div className='row mx-1 my-1'>
                            <div className="col-xl-12 col-md-6 col-sm-6 col-6 form-check">
                                <input checked={props.check} className="form-check-input" type="radio" name="brand" id="allBrands" onChange={(e) => { props.setBrandsSelected('') }} />
                                <label className="form-check-label fw-semibold" htmlFor="allBrands">
                                    All
                                </label>
                            </div>
                            {props.brands && props.brands.map(b => (
                                <div key={b} className="col-xl-12 col-md-6 col-sm-6 col-6 form-check">
                                    <input className="form-check-input" type="radio" name="brand" id={b} onChange={(e) => { props.setBrandsSelected(e.target.id) }} />
                                    <label className="form-check-label fw-semibold" htmlFor={b}>
                                        {b}
                                    </label>
                                </div>
                            ))}


                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}


export default FilterAndOrder;