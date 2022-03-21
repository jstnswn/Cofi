import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getLibraryAlbumsArray } from '../../../../store/library/libraryAlbums';


export default function AlbumList({ closeModal, song, update }) {
    const libraryAlbums = useSelector(getLibraryAlbumsArray);

    return (
        <ul className='album-list-modal'>
            <li className='new-album'>New Album</li>
            {libraryAlbums.map((album, idx) => (
                <li onClick={() => update(song, album.id)} key={idx}>{album.title}</li>
            ))}
        </ul>
    )
}
