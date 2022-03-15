import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function AlbumPlayerSongs({ song, idx }) {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className='album-player-song-box'
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
