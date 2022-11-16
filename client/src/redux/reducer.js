import { SET_MODAL, GET_CATEGORIES, GET_USER, GET_PRODUCTS, GET_DETAILS, DELETE_PRODUCT, ADD_CART, DELETE_CART, CLEAR_CART, GET_ITEMS_LOCAL, SET_TOTAL_PAYMENT, SET_CURRENT_ORDER, SET_PROFILE_IMG, GET_TOTAL_FAV, GET_REVIEWS,DELETE_REVIEWS, GET_OFFERS } from "./actions";


const stateInitial = {
    products: {},
    details: {},
    cart: [],
    totalPayment: 0,
    currentItem: null,
    currentOrder: {},
    profileImg: null,
    user: {},
    categories: [],
    totalFav: [],
    reviews: {},
    offers: [],
    modalShow: true
};

export default function rootReducer(state = stateInitial, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                products: action.payload
            }
        case GET_DETAILS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                details: action.payload
            }
            case GET_REVIEWS:
                return {
                    ...JSON.parse(JSON.stringify(state)),
                    reviews: action.payload,
                }
            //     case DELETE_REVIEWS:
            // return {
            //     ...JSON.parse(JSON.stringify(state)),
            //     reviews: state.reviews.filter((r) => r.id !== action.payload),
            // }
        case DELETE_PRODUCT:
            return {
                ...JSON.parse(JSON.stringify(state)),
                products: state.products.filter((p) => p.id !== action.payload),
            }
        case ADD_CART:
            return {
                ...JSON.parse(JSON.stringify(state)),
                cart: [...JSON.parse(JSON.stringify(state.cart)), action.payload]
            }
        case DELETE_CART:
            return {
                ...JSON.parse(JSON.stringify(state)),
                cart: state.cart.filter((p) => p.id !== action.payload)
            }
        case SET_TOTAL_PAYMENT:
            return {
                ...JSON.parse(JSON.stringify(state)),
                totalPayment: action.payload
            }
        case CLEAR_CART:
            return {
                ...JSON.parse(JSON.stringify(state)),
                cart: []
            }
        case GET_ITEMS_LOCAL:
            return {
                ...JSON.parse(JSON.stringify(state)),
                cart: action.payload,
            }
        case SET_CURRENT_ORDER:
            return {
                ...JSON.parse(JSON.stringify(state)),
                currentOrder: action.payload,
            }
        case SET_PROFILE_IMG:
            return {
                ...JSON.parse(JSON.stringify(state)),
                profileImg: action.payload,
            }
        case GET_USER:
            return {
                ...JSON.parse(JSON.stringify(state)),
                user: action.payload,
            }
        case GET_CATEGORIES:
            return {
                ...JSON.parse(JSON.stringify(state)),
                categories: action.payload,
            }
        case GET_TOTAL_FAV:
            return {
                ...JSON.parse(JSON.stringify(state)),
                totalFav: action.payload,
            }
        case GET_OFFERS:
            return {
             ...JSON.parse(JSON.stringify(state)),
             offers: action.payload,
            }
        case SET_MODAL:
            return {
                ...JSON.parse(JSON.stringify(state)),
                modalShow: action.payload,
            }
        default:
            return state;
    }
}