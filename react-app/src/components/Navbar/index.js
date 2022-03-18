import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginModal from '../auth/LoginModal';
import './NavBar.css';
import NotificationButton from './Notifications';
import ProfileButton from './ProfileButton';
import SignupModal from '../auth/SignupModal';
import SongUploadModal from '../Upload/SongUpload';

export default function NavBar() {
  const user = useSelector(({ session }) => session.user);

  const sessionLinks = user
    ? (
      <>
        <NavLink className='library-link' activeClassName='selected' to={`/library/${user.username}`}>Library</NavLink>
        {/* <SongUploadModal /> */}
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
      <NavLink className='home-link' activeClassName='selected' exact to='/'>Home</NavLink>
      {sessionLinks}
    </nav>
  )
}
