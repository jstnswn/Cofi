import React from 'react'
import AlbumItem from './AlbumItem';
import './AlbumBody.css';
import { useSelector } from 'react-redux';
import { orderContent } from '../../utils';

export default function AlbumsBody({ user }) {
    const library = useSelector(({ library }) => library);
    const albums = orderContent(library.albums);
    // const albums = Object.values(library.albums.byIds);

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
