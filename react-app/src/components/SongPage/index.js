import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAlbum } from '../../store/albums';
import { orderContent } from '../utils';
import Song from './Song';

export default function SongPage() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState();
    const { albumId } = useParams();

    const albums = useSelector(({ albums }) => albums);

    const scrollContainer = useRef(null);

    useEffect(() => {
        (async () => {
            await dispatch(getAlbum(albumId))
            setLoaded(true);
        })()
    }, [dispatch, albumId])

    let songs;

    if (albums) {
        songs = orderContent(albums[albumId]);
    }

    if (!loaded) return null;

    const last = songs?.length - 1;

    return (
        <>
            <div className='library-song-body-header'>
                <p className='song-title column-title'>Title</p>
                <p className='song-artist column-title'>Artist</p>
                <p className='song-album column-title'>Album</p>
            </div>

            <div ref={scrollContainer} className='library-body-container'>
                <div className='library-songs-body-container'>
                    {songs.map((song, idx) => <Song key={idx} idx={idx} song={song} last={last} />)}
                    {songs.length === 0 && (
                        <div className='placeholder-message'>
                            <h3>This album has no songs.</h3>
                            {/* <h4>{placeholderMessage}</h4> */}
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}
