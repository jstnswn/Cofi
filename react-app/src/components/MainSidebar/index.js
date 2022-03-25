import React from 'react';
import AlbumUploadModal from '../Upload/AlbumUpload';
import PlaylistUploadModal from '../Upload/PlaylistUpload';
import SongUploadModal from '../Upload/SongUpload';
import './MainSidebar.css';

export default function MainSidebar() {
    return (
        <div id='main-sidebar'>
            <div className='content-container'>
                <div>
                    <SongUploadModal />
                    <i className='fas fa-music icon'></i>
                </div>
                <div>
                    <AlbumUploadModal />
                    <i className='fad fa-album icon'></i>
                </div>
                <div>
                    <PlaylistUploadModal />
                    <i className='fad fa-list-music icon'></i>
                </div>
            </div>
        </div>
    )
}
