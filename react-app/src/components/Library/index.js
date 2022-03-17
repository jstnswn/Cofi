import React from 'react';
import './Library.css';
import LibrarySidebar from './LibrarySidebar';

export default function Library() {
    return (
        <div id='library-wrapper'>
            <div className='main-wrapper'>
                <div id='library-header'></div>
                <div id='library-body'></div>
            </div>
            <LibrarySidebar />
        </div>
    )
}
