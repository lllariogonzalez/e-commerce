import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { addCartGlobal, getTotalFav } from '../../redux/actions';
import './CardProduct.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import GlitchText from '../GlitchText/GlitchText';

const CardProduct = ({ product }) => {

    const dispatch = useDispatch();
    const cartGlobal = useSelector((state) => state.cart);
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const favTotal = useSelector(state=>state.totalFav)

    const addFavorite = async (e, id) => {
        e.preventDefault();
        const token = await getAccessTokenSilently();
        const result = await axios.post('/favourites',
            {
                "email": user.email,
                "favs": [id]
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (result.status === 200 && !favTotal.find(f=>f.id===id)) {
            try {
                const token2 = await getAccessTokenSilently();
                dispatch(getTotalFav(user.email, token2))
                toast.success('Added to Fav!', {
                    position: "top-right",
                    autoClose: 1200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                console.log(error)
            }
        }else{
            toast.error('Already added!', {
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
        


    }

    const addCart = (e, id) => {
        e.preventDefault();
        const exist = cartGlobal.find(i => i.id === product.id)
        if (!exist) {
            dispatch(addCartGlobal(product));

            toast.success('Added to Cart!', {
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
            toast.error('Already added!', {
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
    }


    return (
        <Link to={`/product/${product.id}`} className='card cardProduct h-100 text-decoration-none shadow '>
            { product.Offer?.active === "true" && product.stock !== 0 && (<GlitchText disc={product.Offer.discount} />)  }
            <div className={product.stock === 0 ? "row h-100 align-items-center opacity-50" : "row h-100 align-items-center"}>
                <div className="col mx-auto align-middle"  >
                    <Card.Img variant="top" src={product.image} style={{ maxWidth: '90%', minWidth: '100%', minHeight: '100%' }} className="img-product img-fluid w-50  mx-auto d-block p-3" />
                </div>
            </div>

            <Card.Body>

            {product.stock === 0 &&
                    <div className='d-flex flex-column align-items-center'>
                        <i className="fa-solid fa-circle-exclamation text-danger fw-bold fs-3"></i>
                        <p className='text-danger fs-3 text-center text-nowrap'>SOLD OUT</p>
                    </div>
                }
                <Card.Title className="text-center text-danger"> {product.name} </Card.Title>
                

                <p className="card-text text-center fw-light text-muted start lh-1" >{product.category}</p>
                { product.Offer?.active === "true" && product.stock !== 0 && (  <p className='m-0 p-0 fw-bold text-center fs-4 text-danger' > $ { Math.trunc( (product.price - (product.price * (product.Offer.discount/100))) )}</p> ) }
                {
                    product.stock !== 0 && product.Offer?.active === "true" ? 
                    (<p className="card-text text-center  text-danger fs-4 text-decoration-line-through">${product.price}</p>) 
                    :
                    product.stock === 0 ? '' : (<p className="card-text text-center  text-danger fs-4">${product.price}</p>) 
                }
                
                {product.stock !== 0 && <p className="card-text text-center fw-light text-muted start lh-1" >{product.brand}</p>}
                <div className="row text-center">
                    <div className="col-6">
                        <Button variant="danger" disabled={!isAuthenticated} onClick={(e) => addFavorite(e, product.id)} className='btns-card-product'> <i className="fa-solid fa-heart-circle-plus fa-xl"></i> </Button>
                    </div>
                    <div className="col-6">
                        <Button variant="danger" onClick={(e) => addCart(e)} className='btns-card-product' disabled={product.stock === 0}> <i className="fa-solid fa-cart-plus fa-xl"></i> </Button>
                    </div>
                </div>

            </Card.Body>
        </Link>
    )
}
export default CardProduct;