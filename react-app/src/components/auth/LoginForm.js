import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
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
      {/* <div> */}
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      {/* </div> */}
      {/* <div> */}
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      {/* </div> */}
      {/* <div> */}
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>


      {/* </div> */}
        <button onClick={loginDemoUser}>Demo</button>
    </form>
  );
};

export default LoginForm;
