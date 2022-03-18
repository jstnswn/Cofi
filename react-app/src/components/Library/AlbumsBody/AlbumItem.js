import React from 'react'

export default function AlbumItem({ album, idx }) {
    // console.log("album", album)

    

    return (
        <div
            className='album-item-container'
            style={{
                gridColumnStart: idx % 4 + 1
            }}
        >

            <div className='tile-image-container'>
                <img alt='album-tile' className='tile-art' src={album.image_url}/>
            </div>

            <div>
                <div className='song-title'>{album.title}</div>
                <div className='tile-artist'>{album.artist.name}</div>

            </div>

        </div>
    )
}
