import React from "react";
import PropTypes from "prop-types";



const SearchBar = ({searchParam , name, label}) => {


    return (
        <>
            <label className="h-0 invisible w-0 text-center" htmlFor={name}>{label}</label>
            <input id={name} className="appearance-none leading-normal focus:shadow-outline block m-auto focus:outline-none outline-none w-10/12 sm:w-85 border p-4 rounded-lg" onChange = {(e) => searchParam(e.target.value)}  placeholder='Search for your Fav Pizza' />
        </>
    );
};

export default SearchBar;

SearchBar.propTypes = {
    searchParam: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string

};

