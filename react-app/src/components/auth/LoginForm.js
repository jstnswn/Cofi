import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import { formatError } from './utils';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [errorrs, setErrorrs] = useState({});
  const [passErrors, setPassErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      for (let error of data) {
        const formatted = formatError(error);
        if (error.includes('credentials')) setPassErrors(prev => [formatted, ...prev]);
        if (error.includes('Email')) setEmailErrors(prev => [formatted, ...prev]);
      }
      setErrors(data);
    }
    // if (!errors.length) return <Redirect to='/' />;
    if (!errors.length) history.push('/')
  };

  const loginDemoUser = async (e) => {
    e.preventDefault()
    dispatch(login('demo@aa.io', 'password'))
      .then(() => history.push('/'))


  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='login-form form' onSubmit={onLogin}>
      <div className='file-input-container'>
        <h2>Log In</h2>

      </div>
      <div className='form-content'>
        <label htmlFor='email'>Email</label>
        <div className='input-container'>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required
          />
          {emailErrors.map((error, idx) => <div key={idx}>{error}</div>)}

        </div>
        <label htmlFor='password'>Password</label>
        <div className='input-container'>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            required
          />

          {passErrors.map((error, idx) => <div key={idx}>{error}</div>)}
        </div>

        <div className='login-buttons'>
          <button type='submit'>Login</button>

          <button className='demo' onClick={loginDemoUser}>Demo</button>
        </div>

      </div>
    </form>
  );
};

export default LoginForm;
