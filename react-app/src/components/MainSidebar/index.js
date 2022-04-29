import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PathContext } from '../../context/PathContext';
import AlbumUploadModal from '../Upload/AlbumUpload';
import PlaylistUploadModal from '../Upload/PlaylistUpload';
import SongUploadModal from '../Upload/SongUpload';
import './MainSidebar.css';


export default function MainSidebar() {
    const { goBack, goForward, cannotForward, cannotBack } = useContext(PathContext);

    const prevHistory = () => {
        goBack();
    };

    const forwardHistory = () => {
        goForward();
    };

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
                <div className={cannotBack ? 'faded' : ''}>
                    <i className='far fa-angle-left' onClick={prevHistory}></i>
                </div>
                <div className={cannotForward ? 'faded' : ''}>
                    <i className='far fa-angle-right' onClick={forwardHistory}></i>
                </div>
            </section>
        </div>
    )
}
