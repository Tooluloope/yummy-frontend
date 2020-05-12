import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const OrderItem = ({id , pizzas}) => {

    return (
        <div className="flex sm:w-full lg:w-85  h-48 m-6 p-5 border justify-between items-center">
            { pizzas && pizzas.map(pizza =>{
             if (pizza.id === Number(id) ) {
                 return (
                     <Fragment key={id}>
                        <img className="max-w-xs h-full mr-4" src={pizza.url} alt={pizza.name} />
                        <div>
                            <p> € {pizza.price} </p>
                            <p>{pizza.name}</p>
                        </div>
                    </Fragment>
                );
             }
            }
        )}</div>
    );
};

OrderItem.propTypes = {
    id: PropTypes.string.isRequired,
    pizzas: PropTypes.array
};