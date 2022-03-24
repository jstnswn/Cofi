import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div onClick={onLogout} className='profile-dropdown-box logout dd'>
      <i className='fas fa-sign-out'></i>
      <div >Logout</div>
    </div>
  )
};

export default LogoutButton;
