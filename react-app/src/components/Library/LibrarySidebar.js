import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LibrarySidebar.css'

export default function LibrarySidebar({ libraryDisplay, setLibraryDisplay}) {
    const history = useHistory();
    const user = useSelector(({ session }) => session.user);
    return (
        <div className='sidebar bottom-sidebar'>
            <div className='sidebar-button-container'>
                <button className='sidebar-button' onClick={() => history.push(`/library/${user.username}/albums`)}>Albums</button>
                <i className={`fas fa-circle-notch selector ${libraryDisplay === 'albums' ? 'active' : ''}`}></i>
            </div>
            <div className='sidebar-button-container'>
                <button className='sidebar-button' onClick={() => history.push(`/library/${user.username}/songs`)}>Songs</button>
                <i className={`fas fa-circle-notch selector ${libraryDisplay === 'songs' ? 'active' : ''}`}></i>
            </div>
        </div>
    )
};
