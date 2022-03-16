import React from 'react';
import './HomeSidebar.css';

export default function HomeSidebar({ setHomeDisplay }) {
    return (
        <div className='sidebar'>
            <button onClick={() => setHomeDisplay('albums')}>Albums</button>
            <button onClick={() => setHomeDisplay('songs')}>Songs</button>
        </div>
    )
}
