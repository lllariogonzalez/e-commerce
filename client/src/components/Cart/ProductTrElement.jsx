import React, { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { deleteCartGlobal } from '../../redux/actions';


function ProductTrElement(props) {
    const { id, price, stock, Offer } = props.product;
    const priceOffer = Offer?.active === "true" ? Math.trunc(price*(1-Offer.discount/100)) : price;
    const [unit, setUnit] = useState(Number(props.order[id]?.split("|")[0])||1);
    const dispatch = useDispatch();

    useEffect(()=>{
        props.setOrder(state=>{ return {...state, [id]: `${unit}|${priceOffer*unit}`}})
    }, [unit]);
    
    function removeCart(id) {
        dispatch(deleteCartGlobal(id));
        props.setOrder(state=>{ return {...state, [id]: `${0}|${price*0}`}})
    }
    
    function handleClick ( e ){
        
        const cuantity = e.target.value
        if(cuantity <= stock) {
            setUnit(cuantity);
        }else{
            toast.error('Insufficient Stock!', {
                position: "top-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                }); 
        }

        // setRender(!render)
        // props.editCart(e.target.value ,id )
    }

    return (
        <tr key={props.product.id}>
            <td>
                <Link to={`/product/${props.product.id}`}>
                    <img
                        src={props.product.image}
                        alt="productImg"
                        style={{ maxHeight: '5em' }}
                    />
                </Link>
            </td>
            <td className="align-middle" >
                <Link className="text-decoration-none text-dark fw-semibold fs-6 " to={`/product/${props.product.id}`}>{props.product.name}</Link>
            </td>
            {Offer?.active
            ?<td className="align-middle fw-semibold text-nowrap" >$ {priceOffer}</td>
            :<td className="align-middle fw-semibold text-nowrap" >$ {props.product.price}</td>
            }

            <td className="align-middle" style={{ maxWidth: '1em', minHeight: '1em' }} >
                <input
                    className="form-control form-control-sm text-center fw-bold"
                    type="number"
                    id="qty"
                    name="qty"
                    min={1}
                    max={props.product.stock}
                    onChange={(e) => handleClick( e, props.product.id ) }
                    defaultValue={unit}

                />
            </td>

            {!props.isWish ? (
                <td className="subTotalShow align-middle fw-semibold text-nowrap">$ {priceOffer * unit}</td>
            ) : (
                ""
            )}
            <td className="align-middle">

                <Button
                    variant="dark"
                    size="sm"
                    className="ms-2"
                    onClick={() => removeCart(props.product.id) }
                >
                    <i className="fa-solid fa-xmark"></i>
                </Button>

                {!props.isWish ? (
                    ""
                ) : (
                    <Button
                        variant="dark"
                        size="sm"
                        className="ms-2"

                    >

                    </Button>
                )}
            </td>
        </tr>
    );
}


export default ProductTrElement;
//export default connect( null, mapDispatchToProps)(ProductTrElement);
