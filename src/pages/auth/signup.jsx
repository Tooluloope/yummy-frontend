import React, { useState, useContext } from "react";
import phone  from "../../assets/undraw_personalization_triu.svg";
import wave  from "../../assets/wave.png";
import profile  from "../../assets/undraw_profile_pic_ic5t.svg";
import "./auth.css";
import { Input, ButtonAuth } from "../../components/inputs/input";
import { Link } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../states/auth/auth.context";




export const SignUp = () => {
    const initialState = {
        user: {
            username: "",
            password:"",
            email: "",
            password2: "",
            fullname: ""
        },
        errors: {},
        submitted: false
    };
    const [data, setData] = useState(initialState);
    
    const {dispatch} = useContext(userContext);
    


    const handleChange = event => {
        const { user } = data;
        user[event.target.name] = event.target.value;
        setData({...data, user});
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        const { user: { username, password, fullname, email, password2 }} = data;


        if (!username || !password || !fullname || !email || !password2) {
            errors.message = "All fields are required";
            setData({...data, errors});
            return;
        }

        if (password.length < 8) {
            errors.message = "Password must be at least 8 characters!";
            setData({...data, errors});
            return;
        }

        if (password !== password2) {
            errors.message = "Both Passwords must be the same";
            setData({...data, errors});
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/signup", data.user );
            const status = res.status;
            const result = await res.data;

            if (status === 200 | status === 201) {
                dispatch({type: "REGISTER_SUCCESS", payload: result});
                setData({...initialState, submitted: true});

            }
            else {
                dispatch({type: "REGISTER_FAIL"});
                setData({...data, errors:{message : result.toString()}});
            }
        } catch (error) {
            dispatch({type: "REGISTER_FAIL"});
            setData({...data, errors:{message : error.toString()}});

        }

    };

    const {submitted, errors, user: { username, password, fullname, email, password2 }} = data;
    
    return(
    <>
        <img style={{zIndex: "-1"}} src={wave} alt="wave" className="fixed bottom-0 left-0  h-full wave"/>
        <div className=' m-auto h-screen'>

            
            <div className = 'grid contain  h-full pl-8 pr-8'>
                <div className=' h-full flex justify-end items-center img'>
                    <img width={"500px"} src={phone} alt="signup" className='z-10 '/>
                </div>

                <div className=' content  h-full flex justify-start items-center text-center'>
                    <form style={{width: "360px"}}>
                        <img src={profile} alt="profile" className='h-24 m-auto'/>
                        <h2 className='text-center mt-4 mb-4 ml-0 mr-0 uppercase text-5xl'>Welcome</h2>
                        {submitted && <p className='text-green-500 mb-2'>Registered Successfully</p>}
                        {errors && <p className='text-red-500 mb-2'>{errors.message}</p>}

                        <Input error={errors.fullname}  onChange={handleChange} value={fullname}   name='fullname' type='text' label='Fullname' icon = 'address-book' required/>

                        <Input error={errors.username}  onChange={handleChange} value={username}   name='username' type='text' label='Username' icon = 'user' required/>
                        
                        <Input error={errors.email}    onChange={handleChange} value={email}   name='email' type='text' label='Email Address' icon = 'at' required/>
                    
                        <Input error={errors.password}  onChange={handleChange} value={password} name='password' type='password' label='Password' icon = 'lock' required/>

                        <Input error={errors.password2} onChange={handleChange} value={password2} name='password2' type='password' label='Check Password' icon = 'lock' required/>

                        <Link className="block text-right no-underline text-gray-500 duration-300 hover:text-green-300" to="/login">Alread a User? Sign In</Link>
                        
                        <ButtonAuth  className='text-xl text-white uppercase cursor-pointer  mt-1 block w-full h-12 outline-none border-none bg-green-500' value='Sign up' type="submit" handleClick={onSubmit} />

                    </form>
                </div>
            </div>
        </div>
    </>
);};