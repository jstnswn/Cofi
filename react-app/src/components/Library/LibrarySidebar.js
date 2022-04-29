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


    return (
        <div className='sidebar bottom-sidebar'>
            <div className='content-toggle-container'>
                <NavLink to={`/library/${user.username}/${selection}`} activeClassName={!likedParam ? 'active' : ''} >Owned</NavLink>
                {selection !== 'playlists'
                    ? <NavLink to={`/library/${user.username}/${selection}/liked`} activeClassName='active' exact={true}>Liked</NavLink>
                    : <span>Liked</span>
                }
            </div>

            <div>
                <div className='sidebar-button-container'>
                    <NavLink className='sidebar-button' activeClassName='active' to={`/library/${user.username}/albums${likedParam ? '/liked' : ''}`}>Albums
                        <i className='fas fa-circle-notch selector'></i>
                    </NavLink>
                </div>
                <div className='sidebar-button-container'>
                    <NavLink className='sidebar-button' activeClassName='active' to={`/library/${user.username}/songs${likedParam ? '/liked' : ''}`}>Songs
                        <i className='fas fa-circle-notch selector'></i>
                    </NavLink>
                </div>
                {!likedParam && (
                    <div className='sidebar-button-container'>
                        <NavLink className='sidebar-button' activeClassName='active' to={`/library/${user.username}/playlists`}>Playlists
                            <i className='fas fa-circle-notch selector'></i>
                        </NavLink>
                    </div>
                )}
            </div>


        </div>
    )
};
