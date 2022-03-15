import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginModal from './Login';
import './NavBar.css';
import NotificationButton from './Notifications';
import ProfileButton from './ProfileButton';
import SignupModal from './Signup';

export default function NavBar() {
  const user = useSelector(({ session }) => session.user);

  const sessionLinks = user
    ? (
      <>
        <NavLink className='library-link' to='/'>Library</NavLink>
        <div>Upload</div>
        <div className='nav-icon-container'>
          <NotificationButton />
          <ProfileButton user={user}/>
        </div>
      </>
    )
    : (
      <div className='nav-auth-container'>
      <LoginModal />
      <SignupModal />
      </div>
    )

  return (
    <nav id='navbar'>
      <NavLink className='home-link' exact to='/'>Home</NavLink>
      {sessionLinks}
    </nav>
  )
}
