import React from 'react';
import { useHistory } from 'react-router-dom';
import AlbumUploadModal from '../Upload/AlbumUpload';
import PlaylistUploadModal from '../Upload/PlaylistUpload';
import SongUploadModal from '../Upload/SongUpload';
import './MainSidebar.css';

export default function MainSidebar() {
    const history = useHistory();
    console.log("HISTORY: ", history);
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

            <section className='nav-button-container'>
                <div>
                    <i className='far fa-angle-left' onClick={() => history.goBack()}></i>
                </div>
                <div>
                    <i className='far fa-angle-right' onClick={() => history.goForward()}></i>
                </div>
            </section>
        </div>
    )
}
