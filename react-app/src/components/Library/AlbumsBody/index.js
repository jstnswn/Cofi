import React from 'react'
import AlbumItem from './AlbumItem';
import './AlbumBody.css';

export default function AlbumsBody({ albums, user }) {

    return (
        <>
            <div className='library-album-body-header'></div>
            <div className='library-albums-body-container'>
                {albums.map((album, idx) => (
                    <AlbumItem user={user} key={idx} album={album} idx={idx} />
                ))}
            </div>
        </>
    )
}
