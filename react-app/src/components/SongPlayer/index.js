import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSong } from '../../store/active';
import './SongPlayer.css';

export default function SongPlayer({ song }) {
    const dispatch = useDispatch();

    const user = useSelector(({ session }) => session.user);
    const likedSongIds = user.liked.song_ids;

    const [showOverlay, setShowOverlay] = useState(false);

    const playSong = () => dispatch(setSong(song));

    const likeIconClass = likedSongIds.includes(song.id)
        ? 'fas fa-heart'
        : 'far fa-heart';

    return (
        <div
            className='song-player'
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
        >
            <div className='song-player-image-container'>
                <img
                    alt='featured song artwork'
                    className='song-player-image'
                    src={song.image_url}
                    onClick={playSong}
                />
            </div>
            {/* {showOverlay && ( */}
            <div className='song-player-overlay' onClick={playSong}>
                <i className={`${likeIconClass} heart`}></i>

                {/* <div> */}
                    <p className='song-title'>{song.title}</p>
                    <p className='song-artist'>{song.artist.name}</p>

                {/* </div> */}
            </div>

            {/* )} */}

        </div>
    )
}
