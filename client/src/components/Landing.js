import React, { useState, useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { AuthContext } from '../context';
import Login from './auth/Login'
import Signup from './auth/Signup'
import '../styles/landing.css'
import '../styles/signup.css'


const Landing = () => {
    let [loginOpen, setLoginOpen] = useState(false);
    let [signupOpen, setSignupOpen] = useState(false);

    const handleLoginOpen = () => {
        setLoginOpen(true);
    }

    const handleSignupOpen = () => {
        setSignupOpen(true);
    }

    return (
        <div className='page landing'>
            <div className='body'>
                <div className='title'>boards</div>
                <div className='btns'>
                    {/* <NavLink
                        variant="contained"
                        to="/signup"
                        className='signup btn'>
                        I'm new
                </NavLink> */}
                    <button className='signup btn' onClick={handleSignupOpen}>I'm new!</button>
                    <button className='login btn' onClick={handleLoginOpen}>Sign in</button>
                </div>
            </div>
            <dialog className='mask' open={loginOpen}>
                    <Login setOpen={setLoginOpen} />
            </dialog>
            <dialog className='mask' open={signupOpen}>
                    <Signup setOpen={setSignupOpen} />
            </dialog>
        </div>
    )
}

export default Landing;
