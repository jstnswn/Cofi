import React from 'react'
import SongItem from './SongItem';
import './SongBody.css';
import { useParams } from 'react-router-dom';
import { orderContent, sortSongsArray } from '../../../utils';
import { useSelector } from 'react-redux';

export default function SongsBody() {
    const { albumId } = useParams();
    const libraryItems = useSelector(({ library }) => library);
    let songs;

    if (albumId) {
        songs = sortSongsArray(libraryItems.albums.byIds[albumId].songs)
    } else {
        songs = orderContent(libraryItems.songs);
    }

    return (
        <>
            <div className='library-song-body-header'>
                <p className='song-title column-title'>Title</p>
                <p className='song-artist column-title'>Artist</p>
                <p className='song-album column-title'>Album</p>
            </div>

            <div className='library-body-container'>
                <div className='library-songs-body-container'>
                    {songs.map((song, idx) => (song.albums?.length
                        ? (song.albums.map((album, idx) => <SongItem key={idx} song={song} album={album}/>))
                        : (<SongItem key={idx} song={song}/>)))}
                </div>

            </div>
        </>
    )
}
