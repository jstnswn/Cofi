import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => setShowMenu(true);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!showMenu) return;
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])


    

  return (
    <div className='profile-button-container'>
          <i className='fa-solid fa-circle-user profile-icon'></i>
    </div>
  )
}
