import React, { useState, useContext, useEffect } from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { userContext } from "../../states/auth/auth.context";
import { Input, Button } from "../inputs/input";
import { CartItem } from "./cart-item";
import { cartContext } from "../../states/cart/cart";
import {usdToEuros} from "../utils";
import Axios from "axios";



export const NavBar = () => {
    const { state, dispatch: cartDispatch } = useContext(cartContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [fullname, setFullname] = useState(false);
    const  isAuthenticated  = useAuth();
    const {state: {user}, dispatch} = useContext(userContext);
    const initialState = {
        user: {
            name: "",
            email: "",
            address: ""
        },
        errors: null,
        submitted: false,
        submitting: false
    };
    const [data, setData] = useState(initialState);


    
    useEffect(() => {
        if (user) {
            setFullname(user.fullname);
        }
    }, [user]);

    const Logout = () => {    
        dispatch({
            type:"LOGOUT_SUCCESS"
        });
    
    };

    const handleCheckOut = () => {
        setIsFormOpen(true);
    };
    const handleSubmit = async (e) => {
        setData({...data, submitting: true});
        e.preventDefault();
        const { user } = data;
        const ids = state.items.map(item => `https://yummy-pizzapi.herokuapp.com/api/pizzas/${item.id}/`);
        const order = {...user, item:ids, total:state.total};
        try {
            await Axios.post("https://mypizzapps.herokuapp.com/api/orders/", order);
            
            cartDispatch({type: "REMOVE_ALL"});
            setData({...data, errors: null, submitted: true});
            setTimeout(() => {
                setData(initialState);
                setIsFormOpen(false);
                setIsCartOpen(false);
            }, 1000);

        } catch (error) {
            setData({...data, errors: error.toString()});
        }
        

        
        
    };
    const handleChange = event => {
        const { user } = data;
        user[event.target.name] = event.target.value;
        setData({...data, user});
    };

    // Remember to take care of {submitted, errors,}
    const {submitting, submitted, errors, user: { name, address, email }} = data;
    const enabled = name.length > 0 && address.length > 0 && email.length > 0;


    return (
        <>
        {/* Main Nav Bar Header */}
            <header className='bg-green-600 sm:flex  sm:items-center sm:px-4 sm:py-3 flex-wrap'>
                <div className='flex justify-between items-center px-4 py-3 flex-grow'>
                    <div>
                        <img className=" h-12" src={logo}  alt="Logo"/>
                    </div>
                    <div className="flex sm:inline-block">
                        <div onClick = {() => setIsCartOpen(!isCartOpen)} className="flex flex-row cursor-pointer truncate p-2 px-4  rounded">
                            <div></div>
                            <div className="flex flex-row-reverse ml-2 w-full">
                                <div slot="icon" className="relative">
                                    <div className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white">{state.items.length}</div>
                                    <svg className='feather feather-shopping-cart w-6 h-6 mt-2"block text-white hover:text-white focus:text-white focus:outline-none' xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <button aria-pressed="false"  type="button" onClick = {() => setIsOpen(!isOpen)} className='block text-white hover:text-white focus:text-white focus:outline-none sm:hidden '>
                        <svg className="  h-6 w-6 fill-current" viewBox="0 0 24 24">
                            {isOpen && <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>}
                            {!isOpen && <path  fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>}
                        </svg>
                        </button>
                    </div>
                </div>
                <nav className={`${isOpen? "block" : "hidden "} duration-500 px-2 pt-2 pb-4 sm:flex sm:p-0`}>
                    <NavLink exact activeClassName="bg-green-400" className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400 mr-3' to='/'>Home </NavLink>
                    { isAuthenticated && <NavLink activeClassName="bg-green-400" className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400 mr-3' to='/orders'>Orders </NavLink>}
                    { isAuthenticated && <NavLink activeClassName="bg-green-400" onClick = {() => Logout()} className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400 mr-3' to='/login'>logout </NavLink>}
                    { !isAuthenticated && <NavLink activeClassName="bg-green-400" className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400 mr-3' to='/login'>Login </NavLink>}
                    { !isAuthenticated && <NavLink activeClassName="bg-green-400" className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400 mr-3' to='/signup'>Sign Up </NavLink>}
                    { isAuthenticated && <NavLink activeClassName="bg-green-400" className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400 mr-3' to='/signup'>{fullname ? fullname : null} </NavLink>}


                </nav>

            </header>


            {/*  Shopping Cart Side Bar Header */}

            <div style={{borderLeft: "1px solid black"}} className={ `${isCartOpen ? "trans" : "no-trans "}  h-screen bg-white fixed bg-white z-40 overflow-auto top-0 right-0 w-75 sm:w-100 block transition-transform duration-500 ease-in-out`}>
                <div className=" sm:py-9 py-6 px-4 mb-5 flex justify-between items-center bg-gray-900">
                    <h3 className="text-white uppercase">Shopping Cart</h3>
                    <button className="bg-transparent border-none text-white text-sm flex items-center outline-none" onClick = {() => setIsCartOpen(false)}>
                        Close
                        <svg className="text-white pl-2" width="25" height="10" viewBox="0 0 514 28" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <rect width="514" height="28" rx="14" fill="white"/>
                        </svg>
                    </button>
                </div>
                {state.items.length > 0 ? state.items.map(item => <CartItem key={item.name} item={item} />) :
                <div>
                    <i className="fas fa-cart-arrow-down"></i>
                    <p>No Product in this cart</p>
                </div>
                }
                
                {state.items.length > 0 ? 
                (<>
                    <div className='flex px-2 pt-4 justify-between items-center' >
                        <p>Delivery</p>
                        <div>
                            <p>$ 15</p>
                        </div>
                    </div>
                    <div className='flex px-2 py-4 justify-between items-center' >
                        <p>Total</p>
                        <div>
                            <p>$ {parseFloat(state.total).toFixed(2)}</p>
                            <p>€ {usdToEuros(state.total)}</p>
                        </div>

                    </div>
                    
                    <div className="p-4 justify-center flex">
                        <Button handleClick = {handleCheckOut} value={`Checkout $${parseFloat(state.total).toFixed(2)} `} type='button' />
                        
                    </div>
                </>) : null}
            </div>

            {/*  Checkout Form Side Bar Header */}
            
            <div style={{borderLeft: "1px solid black"}} className={ `${isFormOpen ? "trans" : "no-trans"} h-screen bg-white fixed bg-white z-50 overflow-auto top-0 right-0 w-75 sm:w-100 block transition-transform duration-500 ease-in-out`}>                
                <div className=" sm:py-9 py-6 px-4 mb-5 flex justify-between items-center bg-gray-900">
                    <h3 onClick = {() => setIsFormOpen(false)} className="text-white uppercase cursor-pointer">&larr; back</h3>
                    
                </div>
                <form className="sm:w-85 m-auto w-64">
                    {submitted && <p className='text-green-500 mb-2'>Checkout Successfully</p>}
                    {errors && <p className='text-red-500 mb-2'>{errors}</p>}

                    <Input  readOnly  value = {`$ ${state.total}`}   name='amount' type='text' label='Amount' icon = 'credit-card'/>

                    <Input onChange={handleChange} value = {name} name='name' type='text' label='Full Name' icon = 'address-book' required/>
                    
                    <Input onChange={handleChange}   value = {email}    name='email' type='text' label='Email Address' icon = 'at' required/>
                
                    <Input onChange={handleChange} value = {address}    name='address' type='text' label='Address' icon = 'map-marker' required/>


                    <Button handleClick = {handleSubmit} value="Submit" type='submit' disabled={!enabled}>
                        {submitting && <span className='pl-2'><i className="fas fa-spinner"></i></span>}
                    </Button>


                </form>

            </div>
        </>
    );
};