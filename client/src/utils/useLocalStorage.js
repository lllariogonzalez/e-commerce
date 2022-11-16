import { useState } from "react";

export function useLocalStorage(key, initial) {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const products = window.localStorage.getItem(key)
           // console.log(JSON.parse(products))
           return products ? JSON.parse(products) : initial;
        } catch (error) {
            return initial;
        }
    });
    
    const setValue = (value) => {
        
        try {
            setStoredValue(value)
            window.localStorage.setItem( key , JSON.stringify(value) );
        } catch (error) {
            console.error(error);
        }
    }
    return [storedValue, setValue];
}