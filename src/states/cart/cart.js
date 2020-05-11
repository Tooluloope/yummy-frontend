import React, {createContext, useReducer} from "react";
import {removeAll, addNewItem, removeItem, increaseItem,decreaseItem, getStateFromLocalStorage } from "../../components/utils";
import PropTypes from "prop-types";

export const initialState = getStateFromLocalStorage() ? getStateFromLocalStorage() : {
  items: [],
  total:0
};

export const cartContext = createContext(initialState);

export const reducer = (state, action) => {
    
    const { payload } = action;
    switch (action.type) {
      case "ADD_NEW_ITEM":
       return addNewItem(state, payload);
      case "DECREASE_ITEM":
        return decreaseItem(state, payload);
      case "INCREASE_ITEM": 
        return increaseItem(state, payload);
      case "REMOVE_ITEM": 
        return removeItem(state, payload);
      case "REMOVE_ALL":
        return removeAll(); 
        
      default:
       return state;
}};

export const Store = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <cartContext.Provider value={{ state, dispatch }}>
        {children}
      </cartContext.Provider>
    );};


Store.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
])
};


