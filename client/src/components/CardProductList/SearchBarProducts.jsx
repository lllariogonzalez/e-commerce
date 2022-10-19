import React from 'react';

const SearchBarProducts = ({setSearch}) => {
 


    return (
        <>
            <div className="input-group w-100 mx-auto" role="search">
                <input className="form-control me-0 bg-light" type="search"  onChange={(e) => setSearch(e.target.value)} placeholder="Search a product" aria-label="Search" />
            </div>
        </>
    )


}


export default SearchBarProducts;