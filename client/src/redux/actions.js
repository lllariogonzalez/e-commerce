import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DETAILS = "GET_DETAILS";
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const FLAG_UPDATE = "FLAG_UPDATE";
export const SET_SEARCH = "SET_SEARCH";




export const getAllProducts = (size, page, filterCategory,sort,search) => {
    var queryCat = '';
    var querySortPrice ='';
    var querySearch = '';
    if (filterCategory) queryCat = `&cat=${filterCategory}`;
    if (sort)  querySortPrice = `&ordprice=${sort}`;
    if (search)  querySearch = `&search=${search}`;

    
    return async function (dispatch) {
        try {
            const result = await axios.get(`/product?size=${size}&page=${page}${queryCat}${querySortPrice}${querySearch}`);
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

export const flagUpdate = (flag, id) => {
    return {
        type: FLAG_UPDATE,
        payload: {
            flag,
            id
        }
    }
}

export const searchProduct = (product) => {
    return async function (dispatch) {
        try {
            const result = await axios.get(`/product?search=${product}`);
            return dispatch({ type: GET_PRODUCTS, payload: result.data });
        } catch (error) {
            return dispatch({ type: GET_PRODUCTS, payload: error.response.data })
        }
    }
}

export const setSearchNameProduct = (name) =>{
    return  function (dispatch) {
        return dispatch({ type: SET_SEARCH, payload:name });
    }
}