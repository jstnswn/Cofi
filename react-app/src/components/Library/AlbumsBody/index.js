import React from 'react'
import AlbumItem from './AlbumItem';
import './AlbumBody.css';

export default function AlbumsBody({ albums, user }) {
    console.log('albums: ', albums)

    return (
        <div className='library-albums-body-container'>
            {albums.map((album, idx) => (
                <AlbumItem user={user} key={idx} album={album} idx={idx}/>
            ))}
        </div>
    )
}
