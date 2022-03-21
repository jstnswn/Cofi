import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSong } from '../../store/active';
import { createSongLike, deleteSongLike } from '../../store/session';

export default function AlbumPlayerSongs({ song, idx }) {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);

    const [showOptions, setShowOptions] = useState(false);

    const seeOptions = () => setShowOptions(true);

    useEffect(() => {
        if (!showOptions) return;

        const hideOptions = (e) => {
            if (!e.target.classList.contains('dd')) setShowOptions(false);
        };

        document.addEventListener('click', hideOptions);

        return () => document.removeEventListener('click', hideOptions);
    }, [showOptions])



    const likedSongIds = user.liked.song_ids;
    // idx may be needed for edit options later on

    const likeSong = () => dispatch(createSongLike(song.id));
    const unlikeSong = () => dispatch(deleteSongLike(song.id));

    let likeIconClass;
    let toggleLike;

    // const likeIconClass = likedSongIds.includes(song.id)
    //     ? 'fas fa-heart'
    //     : 'far fa-heart';

    if (likedSongIds.includes(song.id)) {
        likeIconClass = 'fas fa-heart';
        toggleLike = unlikeSong;
    } else {
        likeIconClass = 'far fa-heart';
        toggleLike = likeSong;
    }

    const playSong = () => {
        dispatch(setSong(song))
    };

    return (
        <div
            className='album-player-song-box'
            onClick={playSong}
        >
            <div className='album-song-details'>
                <div className='player-song-title' aria-label={`${song.id}`}>{song.title}</div>
                <div className='player-song-artist'>{song.artist.name}</div>
            </div>
            <div className='song-options-container'>
                <i className='fa-solid fa-ellipsis' onClick={seeOptions}></i>

            {showOptions && (
                <div className='song-options dd'>
                        <i onClick={toggleLike} className={`${likeIconClass} dd`}></i>
                </div>
            )}
            </div>

        </div>
    )
}
