import React from 'react'

export default function AlbumPlayerAlbum({ album }) {
    return (
        <div className='album-player-album'>
            <div className='album-player-image-container'>
                <img
                    className='album-player-image'
                    alt='album cover'
                    src={album.image_url}
                />
            </div>
        </div>
    )
}
