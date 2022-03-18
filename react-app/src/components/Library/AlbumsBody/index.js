import React from 'react'
import AlbumItem from './AlbumItem';
import './AlbumBody.css';

export default function AlbumsBody({ albums }) {
    console.log('albums: ', albums)

    return (
        <div className='library-albums-body-container'>
            {albums.map((album, idx) => (
                <AlbumItem key={idx} album={album} idx={idx}/>
            ))}
        </div>
    )
}
