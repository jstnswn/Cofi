import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import LoginModal from '../auth/LoginModal';
import './NavBar.css';
import NotificationButton from './Notifications';
import ProfileButton from './ProfileButton';
import SignupModal from '../auth/SignupModal';
import SongUploadModal from '../Upload/SongUpload';

export default function NavBar() {
  const user = useSelector(({ session }) => session.user);
  const location = useLocation();
  const inLibrary = location.pathname.split('/')[1] === 'library';

  const sessionLinks = user
    ? (
      <>
        <NavLink className={`library-link ${inLibrary ? 'selected' : ''}`} activeClassName='selected' to={`/library/${user.username}/songs`}>Library</NavLink>
        {/* <SongUploadModal /> */}
        {/* <div className='about-links'> */}
        <a href='https://github.com/jstnswn' target='_blank' rel='noopener noreferrer'><i className='fab fa-github about-icons'></i></a>
        <a href='https://www.linkedin.com/in/jstnswn/' target='_blank' rel='noopener noreferrer'><i className='fab fa-linkedin about-icons'></i></a>

        {/* </div> */}
        <div className='nav-icon-container'>
          {/* <NotificationButton /> */}
          <ProfileButton user={user}/>
        </div>
      </>
    )
    : (
      <>
        <a href='https://github.com/jstnswn' target='_blank' rel='noopener noreferrer'><i className='fab fa-github about-icons'></i></a>
        <a href='https://www.linkedin.com/in/jstnswn/' target='_blank' rel='noopener noreferrer'><i className='fab fa-linkedin about-icons'></i></a>
        <div className='nav-auth-container'>
          <LoginModal />
          <SignupModal />
        </div>
      </>
    )

  return (
    <nav id='navbar'>
      <NavLink className='home-link' activeClassName='selected' exact to='/'>Home</NavLink>
      {sessionLinks}
    </nav>
  )
}
