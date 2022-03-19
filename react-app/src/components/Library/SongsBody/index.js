import React from 'react'
import SongItem from './SongItem';
import './SongBody.css';
import { useParams } from 'react-router-dom';

export default function SongsBody({ libraryItems, user }) {
    const { albumId } = useParams();
    let songs;

    if (albumId) {
        songs = libraryItems.albums.byIds[albumId].songs
    } else {
        songs = Object.values(libraryItems.songs.byIds);
    }

    return (
        <>
            <div className='library-song-body-header'>
                <p className='song-title column-title'>Title</p>
                <p className='song-artist column-title'>Artist</p>
                <p className='song-album column-title'>Album</p>
            </div>
            <div className='library-songs-body-container'>
                {songs.map((song, idx) => (song.albums?.length
                    ? (song.albums.map((album, idx) => <SongItem key={idx} song={song} album={album} user={user}/>))
                    : (<SongItem key={idx} song={song} />)))}
            </div>
        </>
    )
}
