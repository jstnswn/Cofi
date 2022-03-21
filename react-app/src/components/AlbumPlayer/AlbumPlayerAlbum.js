import React, { useState } from 'react'

export default function AlbumPlayerAlbum({ album }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className='album-player-album'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className='album-player-image-container'>
                <img
                    className='album-player-image'
                    alt='album cover'
                    src={album.image_url}
                />
                <div className='icon-container'>
                    {hovered && <i className='far fa-heart heart'></i>}

                </div>
            </div>
        </div>
    )
}
