import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context';
import { useHistory, NavLink } from 'react-router-dom';



function Signup({ setOpen }) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let errors = useState([]);
  const setErrors = errors[1]
  const { fetchWithCSRF, setCurrentUserId } = useContext(AuthContext);
  let history = useHistory();

    const handleClose = () => {
      setOpen(false)
    }

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "email":
        setEmail(value);
        return;
      case "password":
        setPassword(value);
        return;
      case "firstName":
        setFirstName(value);
        return;
      case "lastName":
        setLastName(value);
        return;
      default:
        return;
    }
  }

  async function signupUser() {
    const response = await fetchWithCSRF('/api-user/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      })
    });

    const responseData = await response.json();
    if (!response.ok) {
      setErrors(responseData.errors);
    } else {
      setCurrentUserId(responseData.current_user_id)
      history.push(`/`)
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    signupUser();
  }

  return (
    <div className='auth signup'>
      <div className='dialog'>
        <div className='content'>
          <button onClick={handleClose} className='exit'>x</button>
          <h1 className='title'>Welcome</h1>
          <form className='form'>
            <label className='label' htmlFor="email">Email</label>
            <input
              id='email'
              type='email'
              onChange={handleChange}
            />
            <label className='label' htmlFor="password">Password</label>
            <input
              id='password'
              type='password'
              onChange={handleChange}
            />
            <label className='label' htmlFor="firstName">First Name</label>
            <input
              id='firstName'
              type='text'
              onChange={handleChange}
            />
            <label className='label' htmlFor="lastName">Last Name</label>
            <input
              id='lastName'
              type='text'
              onChange={handleChange}
            />
            <div className='light btns'>
              <button onClick={handleSignUp} className='light btn'>Sign Up</button>
              <NavLink className='light btn' to="/landing">Login Instead</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
