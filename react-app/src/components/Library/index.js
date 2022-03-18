import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getLibraryAlbumsArray, getLibrarySongsArray, loadLibrary } from '../../store/library';
import AlbumsBody from './AlbumsBody';
import './Library.css';
import LibrarySidebar from './LibrarySidebar';
import SongsBody from './SongsBody';
import SongsList from './SongsBody';

export default function Library() {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);
    const songs = useSelector(getLibrarySongsArray);
    const albums = useSelector(getLibraryAlbumsArray);
    const history = useHistory();
    const location = useLocation();
    console.log('location: ', location)

    const [libraryDisplay, setLibraryDisplay] = useState('songs');

    useEffect(() => {
        if (libraryDisplay === 'albums') history.push(`/library/${user.username}/albums`);
        if (libraryDisplay === 'songs') history.push(`/library/${user.username}/songs`);
    },[libraryDisplay, history, user])


    useEffect(() => {
        dispatch(loadLibrary())
    }, [dispatch])

    const params = useParams();
    console.log("params", params)

    let libraryBody;

    if (location.pathname === `/library/${user.username}/albums`) libraryBody = <AlbumsBody albums={albums}/>
    else if (location.pathname === `/library/${user.username}/songs`) libraryBody = <SongsBody songs={songs}/>

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
                    {/* <div className='library-body-header'>
                        <p className='song-title column-title'>Title</p>
                        <p className='song-artist column-title'>Artist</p>
                        <p className='song-album column-title'>Album</p>
                    </div>
                    <div className='library-body-container'>
                        {songs.map((song, idx) => (

                            <SongsList key={idx} song={song}/>
                        ))}
                    </div> */}
                    {libraryBody}

                </div>
            </div>
            <LibrarySidebar libraryDisplay={libraryDisplay} setLibraryDisplay={setLibraryDisplay}/>
        </div>
    )
}
