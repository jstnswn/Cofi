import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLibrarySongsArray, loadLibrary } from '../../store/library';
import './Library.css';
import LibrarySidebar from './LibrarySidebar';
import SongsList from './SongsList';

export default function Library() {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);
    const songs = useSelector(getLibrarySongsArray);

    const [libraryDisplay, setLibraryDisplay] = useState('songs');


    useEffect(() => {
        dispatch(loadLibrary())
    }, [dispatch])

    const params = useParams();


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
                        {songs.map((song, idx) => (

                            <SongsList key={idx} song={song}/>
                        ))}
                    </div>

                </div>
            </div>
            <LibrarySidebar libraryDisplay={libraryDisplay} setLibraryDisplay={setLibraryDisplay}/>
        </div>
    )
}
