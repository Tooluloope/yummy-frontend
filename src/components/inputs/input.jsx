/* eslint-disable no-debugger */
import React from "react";
import PropTypes from "prop-types";


export const ButtonAuth = ({value, className, type,handleClick } ) => {

    return(
        
        <input  style={{borderRadius: "25px"}} type={type} className={className}  onClick={handleClick} value={value}></input>
    );
};

export const Button = ({value, type, handleClick } ) => {

    return(
        <button onClick={handleClick} type={type} className="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
            hover:bg-green-700 hover:text-green-100 
            bg-green-100 
            text-green-700 
            border duration-200 ease-in-out 
            border-green-600 transition">{value}
        </button>
        
    );
};

export const Input = ({name, label, type, icon, onChange, value , ...props}) => {
  
    return(
       

        <>
            <div style = {{gridTemplateColumns: "7% 93%", }}  className={`input-div ${ value && value.length > 0 ? "focus": null} border-b-2 border-gray-400 relative grid mt-0 mb-6 pt-1 pb-1 border-solid`}>
                <div className=" text-gray-400 flex justify-center items-center relative h-12">
                    <i className={`fas fa-${icon} duration-1000`}></i>
                </div>
                <div className="justify-center relative h-12">
                    <label className='text-gray-600 text-lg absolute duration-1000' htmlFor={name}>{label}</label>
                    <input {...props} id={name} onChange={onChange} value = {value} name = {name} type={type} className="input" />
                </div>
            </div>
        </>
            
               
);};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["text", "number", "password"]),
    icon: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

ButtonAuth.propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

Button.propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};