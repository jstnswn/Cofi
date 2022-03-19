import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSong } from '../../store/active';
import './PlayableTile.css';

export default function PlayableTile({ item, option }) {
    const dispatch = useDispatch()
    const [isShown, setIsShown] = useState();

    const song = option === 'songs'
        ? item
        : item.songs[0]

    const playSong = () => {
        if (song) dispatch(setSong(song));
    }

    return (
        <div
            className='playable-tile'
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
         >
            <div className='tile-image-container' onClick={playSong}>

                <img alt='content art' className='tile-art' src={item.image_url} />

            </div>
            <div>
                <div className='item-title'>{item.title}</div>
                <div className='tile-artist'>{item.artist?.name}</div>
            </div>
        </div>
    )
}
