import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";


export default function RelatedProducts({ relatedProducts, productId }){

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1200, min: 757 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 757, min: 0 },
            items: 1
        }
      };

    return(
        <Card className="border shadow mt-2">
            <div className="row text-center">
                <h3 className="fs-3 fw-semibold mt-2 mb-2">Products related to this item</h3>
            </div>
            <div className="row justify-content-center">
                <div className="col-11 pb-2">
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={1000}
                    customTransition="transform 1000ms ease-in-out"
                    transitionDuration={2000}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    arrows={false}
                    >
                    {relatedProducts ? relatedProducts.map(rp => rp.id !== productId ?
                        <div key={rp.id} className="text-center ">
                            <Link to={`/product/${rp.id}`} className="text-decoration-none text-dark">
                                    <Card.Img
                                        className="rounded "
                                        src={rp.image}
                                        style={{
                                            width: "auto",
                                            height: "auto",
                                            maxWidth: "15em",
                                            maxHeight: "10em",
                                            marginTop: "1em",
                                            marginBottom: "1em",
                                        }}/>
                                    <h5 className="row justify-content-center">{rp.name}</h5>
                                    <h6 className="row justify-content-center">${rp.price}</h6>
                            </Link>
                        </div>
                    : null ) : null}
                </Carousel>
                </div>
            </div>
        </Card>
    )
}