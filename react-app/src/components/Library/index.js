import React from 'react';
import './Library.css';
import LibrarySidebar from './LibrarySidebar';

export default function Library() {
    return (
        <div id='library-wrapper'>
            <div className='main-wrapper'>
                <div id='library-header'>
                    <div className='header-image-container'>
                        <img
                            alt='library cover'
                            className='library-header-image'
                            src='https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png'
                        />
                    </div>
                    <h2 className='library-header-title'>Your Collection</h2>
                </div>
                <div id='library-body'>
                    <div className='library-body-header'>
                        <p className='song-title column-title'>Title</p>
                        <p className='song-artist column-title'>Artist</p>
                        <p className='song-album column-title'>Album</p>
                    </div>
                    <div className='library-body-container'>
                        <div className='song-list'>
                            songs
                        </div>
                        <div className='artist-list'>
                            artists
                        </div>
                        <div className='album-list'>
                            albums
                        </div>
                    </div>

                </div>
            </div>
            <LibrarySidebar />
        </div>
    )
}
