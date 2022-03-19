import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LibrarySidebar.css'

export default function LibrarySidebar() {
    const history = useHistory();
    const user = useSelector(({ session }) => session.user);

    const [libraryDisplay, setLibraryDisplay] = useState('songs');

    const toggleAlbums = () => {
        history.push(`/library/${user.username}/albums`)

    };



    const selection = history.location.pathname.split('/')[3];

    const defaultActive = selection
        ? ''
        : 'active'

    return (
        <div className='sidebar bottom-sidebar'>
            <div className='sidebar-button-container'>
                <button className='sidebar-button' onClick={() => history.push(`/library/${user.username}/albums`)}>Albums</button>
                <i className={`fas fa-circle-notch selector ${selection === 'albums' ? 'active' : ''}`}></i>
            </div>
            <div className='sidebar-button-container'>
                <button className='sidebar-button' onClick={() => history.push(`/library/${user.username}/songs`)}>Songs</button>
                <i className={`fas fa-circle-notch selector ${defaultActive} ${selection === 'songs' ? 'active' : ''}`}></i>
            </div>
        </div>
    )
};
