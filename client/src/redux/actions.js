import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DETAILS = "GET_DETAILS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART";
export const ORDER_DETAIL = "ORDER_DETAIL";
export const CLEAR_CART = "CLEAR_CART";
export const GET_ITEMS_LOCAL = "GET_ITEMS_LOCAL";
export const SET_TOTAL_PAYMENT = "SET_TOTAL_PAYMENT";
export const SET_CURRENT_ORDER = "SET_CURRENT_ORDER";
export const SET_PROFILE_IMG = "SET_PROFILE_IMG";
export const GET_USER = "GET_USER";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_TOTAL_FAV = "GET_TOTAL_FAV";
export const GET_REVIEWS = "GET_REVIEWS";
export const SET_MODAL = "SET_MODAL";

//export const DELETE_REVIEWS = "DELETE_REVIEWS";
export const GET_OFFERS = "GET_OFFERS";


export const getOffers = () => {
 return async function (dispatch){
  try {
   const result = await axios.get('/offer');
   return dispatch({ type: GET_OFFERS, payload: result.data });
  } catch (error) {
   console.log(error);
  }
 }
}

export const getCategories = () => {

    return async function (dispatch) {
        try {
            const result = await axios.get(`/category`);
            return dispatch({ type: GET_CATEGORIES, payload: result.data });
        } catch (error) {
            console.log(error);
        }
    }
}

export const addCartGlobal = (item) => {
    return {
        type: ADD_CART,
        payload: item
    }
}

export const setModal = (boolean) => {
    return {
        type: SET_MODAL,
        payload: boolean
    }
}

export const setProfileImg = (img) => {
    return {
        type: SET_PROFILE_IMG,
        payload: img
    }
}

export const setTotalPayment = (total) => {
    return {
        type: SET_TOTAL_PAYMENT,
        payload: total
    }
}

export const setCurrentOrder = (currentOrder) => {
    return {
        type: SET_CURRENT_ORDER,
        payload: currentOrder
    }
}

export const getItemsLocal = (items) => {
    return {
        type: GET_ITEMS_LOCAL,
        payload: items
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART,
    }
}

export const deleteCartGlobal = (id) => {
    return {
        type: DELETE_CART,
        payload: id
    }
}
// export const deleteReviews = (id) => {
//     return {
//         type: DELETE_REVIEWS,
//         payload: id
//     }
// }

export const orderDetail = (total) => {
    return {
        type: ORDER_DETAIL,
        payload: total
    }
}

export const getAllProducts = (size, page, filterCategory, sort, search, brands, disc) => {
    var queryCat = '';
    var querySortPrice = '';
    var querySearch = '';
    var queryBrands = '';
    var queryDisc = '';
    var queryOffer = '';


    if (filterCategory) queryCat = `&cat=${filterCategory}`;
    if (sort) querySortPrice = `&ordprice=${sort}`;
    if (search) querySearch = `&search=${search}`;
    if (brands) queryBrands = `&brand=${brands}`;
    if(disc) queryDisc = `&disc=${disc}`;

    return async function (dispatch) {
        try {
            const result = await axios.get(`/product?size=${size}&page=${page}${queryCat}${querySortPrice}${querySearch}${queryBrands}${queryDisc}`);
            return dispatch({ type: GET_PRODUCTS, payload: result.data });
        } catch (error) {
            console.log(error);
        }
    }
};


export const getDetails = (id) => {

    return async function (dispatch) {
        try {
            var json = await axios.get("/product/" + id);

            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getReviews = (id) => {

    return async function (dispatch) {
        try {
           
            const result = await axios.get("/review/" + id +'?order=DESC');
            return dispatch({ type: GET_REVIEWS, payload: result.data });
        } catch (error) {
            console.log(error);
        }
    }
}


export const getUser = (email, token) => {

    return async function (dispatch) {
        try {
            const json = await axios.get(`/user/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return dispatch({
                type: GET_USER,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export function getTotalFav(email,token) {

    return async function (dispatch) {
        try {
           
            const result = await axios.get(`/favourites?email=${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let data = [];
            if(typeof result.data === "object"){
                data = result.data
            }
            return dispatch({
                type: GET_TOTAL_FAV,
                payload: data
            })
        } catch (error) {
            console.log( ' : error : '+error)
        }
    }


}
