import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSongAndSetQueue, setSong } from '../../store/active';
import { createSongLike, deleteSongLike } from '../../store/session';
import './SongPlayer.css';

export default function SongPlayer({ song }) {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);
    const likedSongIds = user.liked.song_ids;

    const playSong = (e) => {
        e.stopPropagation();
        dispatch(loadSongAndSetQueue(song));
    };

    const likeSong = (e) => {
        e.stopPropagation();
        dispatch(createSongLike(song.id));
    };

    const unlikeSong = (e) => {
        e.stopPropagation();
        dispatch(deleteSongLike(song.id));
    }

    let likeIconClass;
    let toggleLike;

    if (likedSongIds.includes(song.id)) {
        likeIconClass = 'fas fa-heart';
        toggleLike = unlikeSong;
    } else {
        likeIconClass = 'far fa-heart';
        toggleLike = likeSong;
    }

    return (
        <div
            className='song-player'
        >
            <div className='song-player-image-container'>
                <img
                    alt='featured song artwork'
                    className='song-player-image'
                    src={song.image_url}
                    onClick={playSong}
                />
            </div>
            <div className='song-player-overlay' onClick={playSong}>
                <i onClick={toggleLike} className={`${likeIconClass} heart`}></i>

                    <p className='song-title'>{song.title}</p>
                    <p className='song-artist'>{song.artist.name}</p>

            </div>
        </div>
    )
}
