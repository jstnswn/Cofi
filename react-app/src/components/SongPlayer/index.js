import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSong } from '../../store/active';
import './SongPlayer.css';

export default function SongPlayer({ song }) {
    const dispatch = useDispatch();
    const [showOverlay, setShowOverlay] = useState(false);

    const playSong = () => dispatch(setSong(song));

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
                <i className='far fa-heart heart'></i>

                {/* <div> */}
                    <p className='song-title'>{song.title}</p>
                    <p className='song-artist'>{song.artist.name}</p>

                {/* </div> */}
            </div>

            {/* )} */}

        </div>
    )
}
