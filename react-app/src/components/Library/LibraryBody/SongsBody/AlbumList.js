import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getLibraryAlbumsArray } from '../../../../store/library/libraryAlbums';


export default function AlbumList({ closeModal, song, update }) {
    const libraryAlbums = useSelector(getLibraryAlbumsArray);

    console.log("song", song)

    return (
        <ul className='album-list-modal'>
            <li className='new-album'>New Album</li>
            {libraryAlbums.map((album, idx) => (
                <li onClick={() => update(song.id, album.id, song.album.id)} key={idx}>{album.title}</li>
            ))}
        </ul>
    )
}
