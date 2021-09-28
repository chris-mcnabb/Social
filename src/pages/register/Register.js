import React, {useRef} from 'react';
import './register.css'
import {loginCall} from "../../apiCalls";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const repeatPassword = useRef();
    const history =useHistory();
    const handleClick = async (e) => {
        e.preventDefault()
        if(repeatPassword.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match!")
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post('/auth/register', user);
                history.push('/login');
            }catch(err){
                console.log(err)
            }
        }
    }
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
                            placeholder="Username"
                            required
                            ref={username}
                            className="loginInput"/>
                        <input
                            placeholder="Email"
                            required
                            ref={email}
                            className="loginInput"
                            type='email'
                        />
                        <input
                            placeholder="Password"
                            required
                            ref={password}
                            className="loginInput"
                            type='password'
                            minLength='6'
                        />
                        <input
                            placeholder="Enter Password Again"
                            required
                            ref={repeatPassword}
                            className="loginInput"
                            type='password'
                        />
                        <button type='submit' className="loginButton">
                           Sign Up
                        </button>
                        <Link to = {"/login"} className="linkLoginRegisterButton">
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
