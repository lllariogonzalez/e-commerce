import React from 'react';

export default function CardOfferProduct({p}) {

    return (
        <div className="col-xl-4 col-md-6 my-4">
            <div className="card p-2 border shadow">
                <div className="row">
                    <div className="col-xl-6">
                        <img style={{ maxWidth: '10em', maxHeight: '10em' }} src={p.image} alt="IMG_PRODUCT_OFERT" />
                    </div>
                    <div className="col-xl-6 text-end">
                        <h4 className='text-danger fs-5 text-wrap'>{p.name}</h4>
                        <p className='m-0 p-0 fw-semibold  fs-6 ' > {p.Offer.discount}% <span className='text-decoration-line-through'>$ {p.price}</span></p>
                        <p className='m-0 p-0 fw-bold fs-5 text-danger' >$ { Math.trunc( (p.price - (p.price * (p.Offer.discount/100))) )}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}