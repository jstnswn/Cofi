import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { formatError } from './utils';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [usernameErrors, setUsernameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passErrors, setPassErrors] = useState([]);
  const [repeatPassError, setRepeatPassError] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const resetErrors = () => {
    setUsernameErrors([]);
    setEmailErrors([]);
    setPassErrors([]);
    setRepeatPassError('');
  }

  useEffect(() => {
    if (!errors.length) return;
    resetErrors();

    for (let error of errors) {
      const formatted = formatError(error);
      if (error.includes('Username')) setUsernameErrors(prev => [formatted, ...prev]);
      if (error.includes('Email')) setEmailErrors(prev => [formatted, ...prev]);
      if (error.includes('Password')) setPassErrors(prev => [formatted, ...prev]);
    }

  }, [errors])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else if (password !== repeatPassword) {
      setRepeatPassError('Passwords do not match');
    } else {
      resetErrors();

    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='signup-form form' onSubmit={onSignUp}>

      <h2>Sign Up</h2>

      <div className='form-content'>
        <label>User Name</label>
        <div className='input-container'>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
          {username.length > 25 && (
            <div
              className={`word-counter ${usernameErrors.length ? 'active' : ''}`}
              style={{
                color: username.length > 30 ? 'red' : 'white'
              }}
              >{username.length}/30</div>
          )}
          {usernameErrors && usernameErrors.map((error, idx) => <p key={idx}>{error}</p>)}
        </div>

        <label>Email</label>
        <div className='input-container'>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
          {email.length > 250 && (
            <div
              className={`word-counter ${emailErrors.length ? 'active' : ''}`}
              style={{
                color: email.length > 255 ? 'red' : 'white'
              }}
            >{email.length}/255</div>
          )}
          {emailErrors && emailErrors.map((error, idx) => <p key={idx}>{error}</p>)}
        </div>

        <label>Password</label>
        <div className='input-container'>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
          {passErrors && passErrors.map((error, idx) => <p key={idx}>{error}</p>)}
        </div>

        <label>Repeat Password</label>
        <div className='input-container'>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          {repeatPassError && <p>{repeatPassError}</p>}
        </div>

        <button
          type='submit'
          // style={{
          //   opacity: errors.length ? .5 : 1
          // }}
          >Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
