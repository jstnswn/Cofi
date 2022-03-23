import React from 'react';
import AlbumPlayerAlbum from './AlbumPlayerAlbum';
import AlbumPlayerSongs from './AlbumPlayerSongs';
import './AlbumPlayer.css';

export default function AlbumPlayer({ album }) {
    const songs = album ? album.songs : [];

    return (
        <div id='album-player'>

            <AlbumPlayerAlbum album={album}/>

            <div className='album-player-songs-container'>
                {songs?.map((song, idx) => (
                    <AlbumPlayerSongs key={idx} song={song} idx={idx} />
                ))}
            </div>

        </div>
    )
}
