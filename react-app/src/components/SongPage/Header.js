import React, { useEffect, useState } from 'react'

export default function Header({ album }) {

    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (!showDropdown) return;

        const closeDropdown = () => setShowDropdown(false)
        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener('click', closeDropdown);
    }, [showDropdown])

    return (
        <div id='library-header'>

            <div className='header-image-container'>
                <img
                    alt='library cover'
                    className='library-header-image'
                    src={album.image_url}
                />
                <div className='header-title-container'>
                    <h2 className='library-header-title'>{album.title}</h2>
                </div>
            </div>
        </div>
    )
}
