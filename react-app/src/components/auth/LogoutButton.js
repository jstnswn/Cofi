import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className='profile-dropdown-box logout dd'>
      <i className='fas fa-sign-out' onClick={onLogout}></i>
      <div onClick={onLogout}>Logout</div>
    </div>
  )
};

export default LogoutButton;
