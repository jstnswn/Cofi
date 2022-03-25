import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import './LibrarySidebar.css'

export default function LibrarySidebar() {
    const history = useHistory();
    const location = useLocation();
    const user = useSelector(({ session }) => session.user);

    const likedParam = location.pathname.split('/')[4] === 'liked';
    const selection = location.pathname.split('/')[3];

    const toggleOffLiked = () => {
        if (!likedParam) return;
        history.push(location.pathname.split('/').slice(0, 4).join('/'));
    };

    const toggleOnLiked = () => {
        if (likedParam) return;
        history.push(`${location.pathname}/liked`)
    }

    const defaultActive = selection
        ? ''
        : 'active'

    return (
        <div className='sidebar bottom-sidebar'>
            <div>
                <div className='sidebar-button-container'>
                    <button className='sidebar-button' onClick={() => history.push(`/library/${user.username}/albums`)}>Albums</button>
                    <i className={`fas fa-circle-notch selector ${selection === 'albums' ? 'active' : ''}`}></i>
                </div>
                <div className='sidebar-button-container'>
                    <button className='sidebar-button' onClick={() => history.push(`/library/${user.username}/songs`)}>Songs</button>
                    <i className={`fas fa-circle-notch selector ${defaultActive} ${selection === 'songs' ? 'active' : ''}`}></i>
                </div>
                <div className='sidebar-button-container'>
                    <button className='sidebar-button' onClick={() => history.push(`/library/${user.username}/playlists`)}>Playlists</button>
                    <i className={`fas fa-circle-notch selector ${selection === 'playlists' ? 'active' : ''}`}></i>
                </div>
            </div>

            <div className='content-toggle-container'>
                {/* <p onClick={toggleOffLiked}>Owned</p>
                <p onClick={toggleOnLiked}>Liked</p> */}
                <NavLink to={`/library/${user.username}/${selection}`}>Owned</NavLink>
                <NavLink to={`/library/${user.username}/${selection}/liked`}>Liked</NavLink>

            </div>
        </div>
    )
};
