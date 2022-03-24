import React from 'react';
import AlbumPlayerAlbum from './AlbumPlayerAlbum';
import AlbumPlayerSongs from './AlbumPlayerSongs';
import './AlbumPlayer.css';

export default function AlbumPlayer({ album }) {
    const songs = album ? album.songs : [];

    const last = songs?.length - 1;
    return (
        <div id='album-player'>

            <AlbumPlayerAlbum album={album} />

            <div className='album-player scroll-wrapper'>

                {/* <div className='album-player-songs-wrapper'> */}
                    <div className='album-player-songs-container'>
                        {songs?.map((song, idx) => (
                            <AlbumPlayerSongs key={idx} song={song} idx={idx} last={last} />
                        ))}
                    </div>

                {/* </div> */}
            </div>

        </div>
    )
}
