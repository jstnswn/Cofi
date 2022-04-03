import React from 'react'
import { useSelector } from 'react-redux';
import { getLibraryAlbumsArray } from '../../../../store/library/libraryAlbums';


export default function AlbumList({ song, update }) {
    const libraryAlbums = useSelector(getLibraryAlbumsArray);

    return (
        <ul className='album-list-modal'>
            <li>Albums</li>
            {libraryAlbums.map((album, idx) => (
                <li onClick={() => update(song, album.id)} key={idx}>{album.title}</li>
            ))}
        </ul>
    )
}
