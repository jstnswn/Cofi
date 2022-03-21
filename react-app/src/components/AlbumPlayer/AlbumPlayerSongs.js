import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSong } from '../../store/active';

export default function AlbumPlayerSongs({ song, idx }) {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);

    const [showOptions, setShowOptions] = useState(false);

    const seeOptions = () => setShowOptions(true);

    useEffect(() => {
        if (!showOptions) return;

        const hideOptions = () => setShowOptions(false);

        document.addEventListener('click', hideOptions);

        return () => document.removeEventListener('click', hideOptions);
    }, [showOptions])



    const likedSongIds = user.liked.song_ids;
    // idx may be needed for edit options later on

    const likeIconClass = likedSongIds.includes(song.id)
        ? 'fas fa-heart'
        : 'far fa-heart';

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
                <div className='song-options'>
                    <i className={likeIconClass}></i>
                </div>
            )}
            </div>

        </div>
    )
}
