import React, { useContext } from "react";
import PropTypes from "prop-types";
import { cartContext } from "../../states/cart/cart";



export const MenuItem = ({pizza}) => {
    const {name, url, price}  = pizza;
    const {  dispatch } = useContext(cartContext);

    const handleClick = () => {
        dispatch({type: "ADD_NEW_ITEM", payload: pizza});
    };

    return (
        <div className=" text-center py-4 sm:w-1/2 md:w-1/3 px-4">
            <img className=" h-auto m-auto" src={url} alt={name}/>
            <p className='font-semibold pt-4 pb-2'>{name}</p>
            <p className="pb-2">$ {price}</p>

            <button onClick={handleClick} type='button' className=' focus:outline-none outline-none border duration-200 ease-in-out hover:border-green-600 transition hover:bg-white hover:text-green-600 bg-green-600 text-white uppercase p-4 text-xs'>Add to cart</button>

        </div>
    );
};

MenuItem.propTypes = {
    pizza: PropTypes.object
};