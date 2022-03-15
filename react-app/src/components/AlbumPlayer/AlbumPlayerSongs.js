import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSong } from '../../store/active';

export default function AlbumPlayerSongs({ song, idx }) {
    const dispatch = useDispatch();

    // idx may be needed for edit options later on
    // const [isHovered, setIsHovered] = useState(false);

    const playSong = () => {
        dispatch(setSong(song))
    };

    return (
        <div
            className='album-player-song-box'
            onClick={playSong}
        >
            <div className='album-song-details'>
                <div className='player-song-title' aria-label={`${song.id}`}>{song.title}</div>
                <div className='player-song-artist'>{song.artist.name}</div>
            </div>
            <div className='song-options-container'>
                <i className='fa-solid fa-ellipsis'></i>
            </div>
        </div>
    )
}
