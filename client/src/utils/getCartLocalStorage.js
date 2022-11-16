import axios from 'axios';

const getCartLocalStorage = (arrayId)=>{
    const promises = arrayId.map((id)=> axios(`/product/${id}`));
    const result = Promise.all(promises).then(arr=>arr.map(res=>res.data));
    return result;
}

export default getCartLocalStorage;