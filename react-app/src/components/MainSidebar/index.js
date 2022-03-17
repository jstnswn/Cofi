import React from 'react';
import SongUploadModal from '../Upload/SongUpload';
import './MainSidebar.css';

export default function MainSidebar() {
    return (
        <div id='main-sidebar'>
            <div>
                <SongUploadModal />
                <i className='fas fa-music icon'></i>
            </div>
            <div>
                <div>
                    Create Album </div>
                <i className='fad fa-album icon'></i>
            </div>
        </div>
    )
}
