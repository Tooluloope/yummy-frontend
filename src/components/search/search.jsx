import React from "react";
import PropTypes from "prop-types";



const SearchBar = ({searchParam}) => {


    return (
        <input className="appearance-none leading-normal focus:shadow-outline block m-auto focus:outline-none outline-none w-10/12 sm:w-85 border p-4 rounded-lg" onChange = {(e) => searchParam(e.target.value)}  placeholder='Search for your Fav Pizza' />
    );
};

export default SearchBar;

SearchBar.propTypes = {
    searchParam: PropTypes.func

};

