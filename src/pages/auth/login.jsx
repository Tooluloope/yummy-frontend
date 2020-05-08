import React, { useState, useContext } from "react";
import phone  from "../../assets/undraw_personalization_triu.svg";
import wave  from "../../assets/wave.png";
import profile  from "../../assets/undraw_profile_pic_ic5t.svg";
import "./auth.css";
import { Input, ButtonAuth } from "../../components/inputs/input";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../states/auth/auth.context";
import { querystring } from "../../components/routes/authenticatedRoutes";




export const Login = () => {
    // Initial State of the app during login
    const initialState = {
        user: {
            password:"",
            email: "",
        },
        errors: {},
        submitted: false
    };
    const [data, setData] = useState(initialState);
    const {dispatch} = useContext(userContext);
    const history = useHistory();


    

// handles Event changes in the fields
    const handleChange = event => {
        const { user } = data;
        user[event.target.name] = event.target.value;
        setData({...data, user});
    };

    // Handles the form Submit logic
    const onSubmit = async (event) => {
        event.preventDefault();

        const {errors, user: { password,email }} = data;
    

        if ( !email || !password){
            errors.message = "All fields are required";
            setData({...data, errors});
           return;
        } 
            
        
        if (password.length < 8){
            errors.message = "Password must be at least 8 characters!";
            setData({...data, errors});
            return;
        } 
            
     
        try {
            
            const res = await axios.post("http://localhost:5000/signin", data.user );
            const status = res.status;
            const result = await res.data;

            if (status === 200 | status === 201) {

                dispatch({type: "LOGIN_SUCCESS", payload: result});

                setData({...initialState, submitted: true});

                const redirect = querystring("redirect") || "/";
                history.push(redirect);
                

            }
            else {
                dispatch({type: "LOGIN_FAIL"});
                setData({...data, errors:{message : result.toString()}});
            }
        } catch (error) {
            dispatch({type: "LOGIN_FAIL"});
            setData({...data, errors:{message : error.toString()}});
        }

    };

    const {submitted, errors, user: {  email, password }} = data;
    
    return(
    <>
        <img style={{zIndex: "-1"}} src={wave} alt="wave" className="fixed bottom-0 left-0  h-full wave"/>
        <div className=' m-auto h-screen'>

            
            <div className = 'grid contain  h-full pl-8 pr-8'>
                <div className=' l h-full flex justify-end items-center img'>
                    <img width={"500px"} src={phone} alt="signup" className='z-10'/>
                </div>

                <div className='  h-full flex justify-start items-center text-center content'>
                    <form style={{width: "360px"}}>
                        <img src={profile} alt="profile" className='h-24 m-auto'/>
                        <h2 className='text-center mt-4 mb-4 ml-0 mr-0 uppercase text-5xl'>Welcome</h2>
                        {submitted && <p className='text-green-500 mb-2'>Login Successfully</p>}
                        {errors && <p className='text-red-500 mb-2'>{errors.message}</p>}
                        <Input     onChange={handleChange} value={email}   name='email' type='text' label='Email Address' icon = 'at' required/>
                    
                        <Input   onChange={handleChange} value={password} name='password' type='password' label='Password' icon = 'lock' required/>


                        <Link className=" float-left text-xs inline-block text-right no-underline text-gray-500 duration-300 hover:text-green-300" to="#">Forgot Password?</Link>
                        <Link className=" float-right text-xs inline-block text-left no-underline text-gray-500 duration-300 hover:text-green-300" to="/signup">New? Sign Up</Link>

                        <ButtonAuth  className='text-xl text-white uppercase cursor-pointer  mt-1 block w-full h-12 outline-none border-none bg-green-500 mt-3' value='Login' type="submit" handleClick={onSubmit} />

                    </form>
                </div>
            </div>
        </div>
    </>
);};