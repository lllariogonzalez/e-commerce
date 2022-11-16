import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartGlobal, getCategories, getDetails, getTotalFav } from "../redux/actions";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useLocalStorage } from "../utils/useLocalStorage";
import Star from '../components/Reviews/Star';
import Comment from '../components/Reviews/Comment';
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import AddComment from "../components/Reviews/AddComment";
import { getReviews } from "../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import isAdmin from "../utils/isAdmin";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Transition from "../components/Transition/Transition";

export default function ProductDetail(props) {

  const dispatch = useDispatch();
  const cartGlobal = useSelector((state) => state.cart);
  const id = props.match.params.id;
  const history = useHistory()
  const [cart, setCart] = useLocalStorage('cart', '');
  const [admin, setAdmin] = useState();
  const productDetail = useSelector((state) => state.details)
  const productReviews = useSelector((state) => state.reviews[0])
  const categories = useSelector((state) => state.categories)
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [relatedProducts, setRelatedProducts] = useState([])
  
  const [images, setImages] = useState([])
  const [showImage, setShowImage] = useState("")
  const favTotal = useSelector(state=>state.totalFav);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
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
  
  useEffect(() => {
    dispatch(getDetails(id))
    dispatch(getReviews(id))
    dispatch(getCategories())

    isAdmin(getAccessTokenSilently)
      .then((res) => setAdmin(res))
      .catch(() => setAdmin(false));
  }, [dispatch, id])

  useEffect(()=>{
    getImages(id)
    getRelatedProducts(productDetail.CategoryId, productDetail.price)
  },[id, productDetail]);
  

  const addCart = (e, product) => {
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

  function nameCategory(id) {
    const categoryName = categories.find((category) => category.id === id)
    return categoryName && categoryName.category;
  }

  async function getImages(id){
    try {
      const result = await axios.get(`/image/${id}`);
      setShowImage(productDetail.image);
      setImages([{ image: productDetail.image }, ...result.data]);
    } catch (error) {
      console.log("getImages Error:", error)
    }
  }

  async function getRelatedProducts(categoryId, price){
    if(categoryId && price){
      try {
        const result= await axios.get(`/product/similarprice?cat=${categoryId}&price=${price}`)
        setRelatedProducts(result.data)
      } catch (error) {
        console.log("getRelatedProducts error", error)
      }
    }
  }

  const handleDelete = async (idReview) => {
    const token = await getAccessTokenSilently();
    try {
      await axios.delete(`/review/${idReview}`, {

        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Comment delete successfully");
    }
    catch (error) {
    }
    history.push('/')
  }

  return (
    <>
      <Nav />
      <Transition>
      <div className="container mt-4">
        <Card className="border shadow">
          <Card.Body className="text-center">
          <Link to="/" type="button" className="btn btn-danger border shadow-sm rounded fs-5 px-2 py-0" style={ {float: 'right'} } aria-label="Close">↩</Link>
            <div className="row p-3">
              <div className="col-xl-6">
                <Card.Img
                  style={{
                    width: "auto",
                    maxWidth: "25em",
                    maxHeight: "25em",
                    marginTop: "2em",
                    marginBottom: "2em",
                  }}
                  className="rounded"
                  src={showImage}
                />
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={1500}
                    keyBoardControl={true}
                    customTransition="transform 1000ms ease-in-out"
                    transitionDuration={1500}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    >
                      {images ? images.map((i, idx) =>
                      <div key={idx} className="rounded"
                                style={{
                                  width: "auto",
                                  height: "auto",
                                  maxWidth: "10em",
                                  maxHeight: "5em",
                                  marginTop: "1em",
                                  marginBottom: "1em",
                                }}
                                onClick={() => setShowImage(i.image)}
                                > 
                                <Card.Img
                                  src={i.image}
                                  style={{
                                    width: "auto",
                                    maxHeight: "5em",
                                  }}/>
                      </div>
                      ) : null}
                  </Carousel>
              </div>
              <div className="col-xl-6">
                <h3 className="text-start fs-2 fw-semibold"> {productDetail.name}</h3>
                { productDetail.Offer?.active === "true" && 
                (<span  className="text-muted fw-bold p-2 text-uppercase fs-5" style={ {float: 'left'}} > 
                  In Offert  {productDetail.Offer.discount}% 
                </span>)  }

                {
                    productDetail.Offer?.active === "true" ? 
                    (<p className="card-text text-start  text-danger fs-4 text-decoration-line-through">${productDetail.price}</p>) 
                    :
                     (<p className="card-text text-start  text-danger fs-4">${productDetail.price}</p>) 
                }
                {
                    productDetail.Offer?.active === "true" ? 
                    (<p className="text-start  text-danger fs-4">
                    Price: ${Math.trunc(productDetail.price*(1-productDetail.Offer.discount/100))}
                    </p>)
                  :
                     (<p className="text-start  text-danger fs-4">
                     Price: ${productDetail.price}
                   </p>) 
                }
                
                <p className="text-start text-muted start lh-1 mb-4">
                  <b className="text-danger">Category: </b>
                  {nameCategory(productDetail.CategoryId)}
                </p>
                <p className="text-start text-muted start lh-1 fw-semibold mb-4">
                  <b className="text-danger">In Stock:</b> {productDetail.stock}
                </p>
                <p className="text-start text-muted start lh-1 fw-semibold mb-4">
                  <b className="text-danger">Brand:</b> {productDetail.brand}
                </p>

                <div>
                  <div className="d-flex flex-row justify-content-center">
                    {productReviews
                      ? [...Array(Math.round(productReviews.rating))].map(
                        (el, i) => <Star key={i} state={true} size="big" />
                        )
                        : ""}
                    {productReviews
                      ? [...Array(5 - Math.round(productReviews.rating))].map(
                        (el, i) => <Star  key={i} state={false} size="big" />
                        )
                        : ""}
                  </div>

                  {productReviews ? (
                    <div>{Math.round(productReviews.rating)} of 5</div>
                    ) : (
                      <div>0 of 5</div>
                      )}
                </div>
                <Card.Subtitle className="mt-3 mb-3 text-muted fs-5 w-70 mx-auto">
                  <b className="text-danger">Description:</b>{" "}
                  {productDetail.description}
                </Card.Subtitle>
                <div className="row text-center">
                  <div className="col-6">
                    <Button disabled={!isAuthenticated} className="px-3 py-3 rounded-4 " variant="danger"
                    onClick={(e) => addFavorite(e, productDetail.id)}>
                      {" "}
                      <i className="fa-solid fa-heart-circle-plus fa-xl"></i>{" "}
                    </Button>
                  </div>
                  <div className="col-6">
                    <Link to="/cart" style={{pointerEvents: productDetail.stock === 0 ? 'none' : 'auto'}}>
                      <Button
                        className="px-3 py-3 rounded-4 "
                        variant="danger"
                        onClick={(e) => addCart(e, productDetail)}
                        disabled={productDetail.stock === 0}
                        >
                        {" "}
                        <i className="fa-solid fa-cart-plus fa-xl"></i>{" "}
                      </Button>
                    </Link>
                  </div>
                </div>


              </div>
              <div className="col-xl-12">
                <Card.Subtitle className="mt-5 mb-3 text-muted fs-5 w-70 mx-auto">
                  Customer reviews
                </Card.Subtitle>
                <div className="d-flex flex-column align-items-center">
                  {productReviews && productReviews.Reviews.length > 0 ? (
                    productReviews.Reviews.map((review) => (
                      
                      <Comment
                      key={review.id}
                      rating={review.rating}
                      comment={review.comment}
                      id={review.id}
                      createdAt={review.createdAt}
                      image={review.image}
                      handleDelete={handleDelete}
                      />
                      
                    ))
                  ) : (
                    <p className="text-danger fs-3 mt-2">There are no comments</p>
                  )}
                </div>

              </div>
              <div className="col-xl-6">
                
              </div>
            </div>
          </Card.Body>
        </Card>
        <RelatedProducts relatedProducts={relatedProducts} productId={productDetail.id}/>
      </div>
      </Transition>
      <Footer />
      <ToastContainer />
    </>
  );
}