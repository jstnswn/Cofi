import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LogoutButton from '../auth/LogoutButton';

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => setShowMenu(true);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!showMenu) return;
            if (!e.target.classList.contains('dd')) setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])




  return (
    <div className='profile-button-container'>
          <i className='fa-solid fa-circle-user profile-icon' onClick={openMenu}></i>

          {showMenu && (
              <div className='user-dropdown dd'>

                  <div className='profile-dropdown-single dd'>{user.username}</div>
                  {/* <div>{user.email}</div> */}
                  <div className='dd'>
                      <LogoutButton />
                  </div>
              </div>
          )}
    </div>
  )
}
