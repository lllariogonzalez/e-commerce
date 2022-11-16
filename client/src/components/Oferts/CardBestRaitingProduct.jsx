import React from 'react';
import Star from '../Reviews/Star';


export default function CardBestRaitingProduct({p}) {
    return (
        <div className="card h-100">
            <div className="row align-items-center">
                <div className="col-6">
                    <img src={p.image} style={{ maxWidth: '7em', minWidth: '5em', minHeight: '5em', maxHeight: '7em' }} alt="IMG_PRODUCT" />
                </div>
                <div className="col-6 text-center p-3">

                    <div className="d-flex justify-content-center">
                        {
                            [1,2,3,4,5].map( (n) => { 
                                if ( n <= p.rating ) return <Star  key={n} state={true}  />
                                else return  <Star  key={n} state={false} />
                            })
                        }
                    </div>
                    <span className='d-block fw-semibold'>{p.name}</span>
                    <span className='d-block fw-bold fs-5 text-danger'> $ {p.price}</span>
                </div>
            </div>
        </div>
    )
}