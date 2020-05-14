import React, { useContext } from "react";
import PropTypes from "prop-types";
import { cartContext } from "../../states/cart/cart";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./menu.css";




export const MenuItem = ({pizza}) => {
    const {name, url, price, desc}  = pizza;
    const {  dispatch } = useContext(cartContext);

    const handleClick = () => {
        dispatch({type: "ADD_NEW_ITEM", payload: pizza});
    };

    return (
        <div style={{height:"400px"}} className=" relative overflow-hidden text-center py-4 sm:w-1/2 md:w-1/3 mx-4 hover-menu">
            <div style={{height:"300px"}} className=" overflow-hidden">
                <div  className="absolute z-20 w-full hover-item h-0 z-0 top-10">
                    <button onClick={handleClick} type='button' className=' opacity-0 z-0 hover-button  rounded border-green-600 focus:outline-none outline-none border duration-200 ease-in-out hover:border-green-600 transition hover:bg-white hover:text-green-600 bg-green-600 text-white uppercase p-4 text-xs'>Add to cart</button>
                </div>
            <LazyLoadImage  effect="blur" className=" h-auto m-auto" src={url} alt={name}/>
            </div>
            
            <div className="absolute bottom-0  w-full bg-gray-200 right-0 text-left pl-4">
                <p className='font-semibold pt-4 pb-2'>{name}</p>
                <span className="text-sm font-thin">{desc}</span>
                <p className="pb-2 pt-2 font-semibold text-lg">€ {price}</p>
            </div>
            
        </div>
    );
};

MenuItem.propTypes = {
    pizza: PropTypes.object
};