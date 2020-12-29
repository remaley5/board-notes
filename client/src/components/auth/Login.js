import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {AuthContext} from '../../context';


const Login = ({ setOpen }) => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [errors, setErrors] = useState([])
    const { fetchWithCSRF, setCurrentUserId} = useContext(AuthContext);
    let history = useHistory();

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        loginUser(email, password);
    }

    const handleDemoSubmit = (e) => {
        e.preventDefault();
        loginUser("ian@aa.io", "password");
    }

    const handleClose = () => {
        setOpen(false)
    }

    async function loginUser(email, password) {
        const response = await fetchWithCSRF('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        })

        const responseData = await response.json();
        if (!response.ok) {
            setErrors(responseData.errors);
        } else {
            setOpen(false);
            setCurrentUserId(responseData.current_user_id)
            history.push('/')
        }
    }

    return (
        <div className='auth login'>
            <div className='dialog'>
                <div className='content'>
                    <button onClick={handleClose} className='exit'>x</button>
                    <h1 className='title'>Sign in</h1>
                    <div className='errors'  onClose={handleClose}>
                        {errors.length ? errors.map((err) => <li key={err}>{err}</li>) : ''}
                    </div>
                    <div className='form'>
                        <label className='label' htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleEmailChange}
                        />
                        <label className='label' htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className='light btns'>
                        <button className='light btn' onClick={handleSubmit}>login</button>
                        <button className='light btn' onClick={handleDemoSubmit}>Demo</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
