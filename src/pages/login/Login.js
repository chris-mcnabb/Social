import React, {useContext, useRef} from 'react';
import './login.css'
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core";

const Login = () => {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, dispatch} = useContext(AuthContext)
    const handleClick = (e) => {
        e.preventDefault()
       loginCall({email: email.current.value, password: password.current.value}, dispatch);
    }
    console.log(user)
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Happy Dog</h3>
                    <span className="loginDesc">Connect with friends around the world on Happy Dog </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick} >
                        <input
                            type='email'
                            required
                            placeholder="Email"
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            type ='password'
                            required
                            minLength='6'
                            placeholder="Password"
                            className="loginInput"
                            ref={password}
                        />
                        <button type='submit' className="loginButton" disabled={isFetching}>
                            {isFetching ? <CircularProgress color='#1775ee' size='20px'/>  : 'Log In'}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>

                           <button className="loginRegisterButton">
                               {isFetching ? <CircularProgress color='#1775ee' size='20px'/>  : 'Create a New Account'}
                           </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
