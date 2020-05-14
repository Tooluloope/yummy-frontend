import React from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const OrderItem = ({id , pizzas}) => {

    return (
        <>
            { pizzas && pizzas.map(pizza => {
             if (pizza.id === Number(id) ) {
                const {id,name, url, price, desc}  = pizza;
                 return (
                    <div key = {id} style={{height:"400px"}} className=" relative overflow-hidden text-center py-4 sm:w-1/2 md:w-1/3 mx-4">
                        <div style={{height:"350px"}} className=" overflow-hidden">
                            <LazyLoadImage  effect="blur" className=" h-auto m-auto" src={url} alt={name}/>
                        </div>
                        <div className="absolute bottom-0  w-full bg-green-200 right-0 text-left pl-4">
                            <p className='font-semibold pt-4 pb-2'>{name}</p>
                            <span className="text-sm font-thin">{desc}</span>
                            <p className="pb-2 pt-2 font-semibold text-lg">€ {price}</p>
                        </div>
                
                    </div>


                );
             }
             else {
                 return;
             }
            }
        )}
        </>
    );
};

OrderItem.propTypes = {
    id: PropTypes.string.isRequired,
    pizzas: PropTypes.array
};