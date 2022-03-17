import React from 'react';
import './HomeSidebar.css';

export default function HomeSidebar({ setHomeDisplay, homeDisplay }) {
    return (
        <div className='sidebar bottom-sidebar'>
            <div className='sidebar-button-container'>
                <button className='sidebar-button' onClick={() => setHomeDisplay('albums')}>Albums</button>
                <i className={`fas fa-circle-notch selector ${homeDisplay === 'albums' ? 'active' : ''}`}></i>
            </div>
            <div className='sidebar-button-container'>
                <button className='sidebar-button' onClick={() => setHomeDisplay('songs')}>Songs</button>
                <i className={`fas fa-circle-notch selector ${homeDisplay === 'songs' ? 'active' : ''}`}></i>
            </div>
        </div>
    )
}
