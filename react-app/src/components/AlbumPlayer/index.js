import React, { useState } from 'react';
import AlbumPlayerAlbum from './AlbumPlayerAlbum';
import AlbumPlayerSongs from './AlbumPlayerSongs';
import './AlbumPlayer.css';

export default function AlbumPlayer({ album }) {
    const [openedMenu, setOpenedMenu] = useState(null);
    const [toCloseMenu, setToCloseMenu] = useState(null);
    const songs = album ? album.songs : [];

    const last = songs?.length - 1;
    return (
        <div id='album-player'>

            <AlbumPlayerAlbum album={album} />

            <div className='album-player scroll-wrapper'>

                    <div className='album-player-songs-container'>
                        {songs?.map((song, idx) => (
                            <AlbumPlayerSongs
                                key={idx}
                                song={song}
                                idx={idx}
                                last={last}
                                openedMenu={openedMenu}
                                setOpenedMenu={setOpenedMenu}
                                toCloseMenu={toCloseMenu}
                                setToCloseMenu={setToCloseMenu}/>
                        ))}
                    </div>
            </div>

        </div>
    )
}
