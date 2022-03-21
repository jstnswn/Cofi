import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSong } from '../../store/active';
import './PlayableTile.css';

export default function PlayableTile({ item, option }) {
    const dispatch = useDispatch()
    const [hovered, setHovered] = useState();

    const song = option === 'songs'
        ? item
        : item.songs[0]

    const playSong = () => {
        if (song) dispatch(setSong(song));
    }

    return (
        <div
            className='playable-tile'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className='tile-image-container' onClick={playSong}>

                <img alt='content art' className='tile-art' src={item.image_url} />

            </div>
            <div className='tile-footer'>
                <div className='info-container'>
                    <div className='item-title'>{item.title}</div>
                    <div className='tile-artist'>{item.artist?.name}</div>

                </div>
                <div className='icon-container'>
                    {hovered && <i className='far fa-heart'></i>}
                </div>
            </div>
        </div>
    )
}
