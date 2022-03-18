import React from 'react';
import './LibrarySidebar.css'

export default function LibrarySidebar({ libraryDisplay, setLibraryDisplay}) {
    return (
        <div className='sidebar bottom-sidebar'>
            <div className='sidebar-button-container'>
                <button className='sidebar-button' onClick={() => setLibraryDisplay('albums')}>Albums</button>
                <i className={`fas fa-circle-notch selector ${libraryDisplay === 'albums' ? 'active' : ''}`}></i>
            </div>
            <div className='sidebar-button-container'>
                <button className='sidebar-button' onClick={() => setLibraryDisplay('songs')}>Songs</button>
                <i className={`fas fa-circle-notch selector ${libraryDisplay === 'songs' ? 'active' : ''}`}></i>
            </div>
        </div>
    )
};
