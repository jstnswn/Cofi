import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSong } from '../../../store/active';
import './PlayableTile.css';

export default function PlayableTile({ song }) {
    const dispatch = useDispatch()
    const [isShown, setIsShown] = useState();
    console.log("song", song)

    const playSong = () => dispatch(setSong(song?.songs[0]));

    return (
        <div
            className='playable-tile'
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
         >
            <div className='tile-image-container' onClick={playSong}>

                <img alt='content art' className='tile-art' src={song.image_url} />

            </div>
            <div>
                <div className='song-title'>{song.title}</div>
                <div className='tile-artist'>{song.artist?.name}</div>
            </div>
        </div>
    )
}
