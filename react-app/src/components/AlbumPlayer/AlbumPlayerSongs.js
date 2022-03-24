import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../context/Modal';
import { setSong } from '../../store/active';
import { addToPlaylist } from '../../store/playlists';
import { createSongLike, deleteSongLike } from '../../store/session';
import PlaylistList from '../Library/LibraryBody/SongsBody/PlaylistList';

export default function AlbumPlayerSongs({ song, idx, last }) {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);

    const [showOptions, setShowOptions] = useState(false);
    const [showPlaylists, setShowPlaylists] = useState(false);

    const seeOptions = (e) => {
        e.stopPropagation();
        setShowOptions(true);
    }

    useEffect(() => {
        if (!showOptions) return;

        const hideOptions = (e) => {
            if (!e.target.classList.contains('dd')) setShowOptions(false);
        };

        document.addEventListener('click', hideOptions);

        return () => document.removeEventListener('click', hideOptions);
    }, [showOptions])

    const openPlaylists = (e) => {
        e.stopPropagation();
        setShowPlaylists(true);
    };

    const addSongToPlaylist = (playlistId) => {
        dispatch(addToPlaylist(song, playlistId));
        setShowPlaylists(false);
    };

    const likedSongIds = user.liked.song_ids;
    // idx may be needed for edit options later on

    const likeSong = (e) => {
        e.stopPropagation();
        dispatch(createSongLike(song.id));
    }
    const unlikeSong = (e) => {
        e.stopPropagation();
        dispatch(deleteSongLike(song.id));
    }

    let likeIconClass;
    let toggleLike;
    let likeText;

    // const likeIconClass = likedSongIds.includes(song.id)
    //     ? 'fas fa-heart'
    //     : 'far fa-heart';

    if (likedSongIds.includes(song.id)) {
        likeIconClass = 'fas fa-heart icon';
        toggleLike = unlikeSong;
        likeText = 'Unlike';
    } else {
        likeIconClass = 'far fa-heart icon';
        toggleLike = likeSong;
        likeText = 'Like';
    }

    const playSong = () => {
        dispatch(setSong(song))
    };

    return (
        <div
            className={`album-player-song-box ${last === idx ? 'last' : ''}`}
            onClick={playSong}
        >
            <div className='album-song-details'>
                <div className='player-song-title' aria-label={`${song.id}`}>{song.title}</div>
                <div className='player-song-artist'>{song.artist.name}</div>
            </div>
            <div className='song-options-container'>
                <i className='fa-solid fa-ellipsis' onClick={seeOptions}></i>

                {showOptions && (
                    <ul className='song-options dd'>
                        <li onClick={toggleLike} className='dd'>{likeText}<span  className={`${likeIconClass} dd`}></span></li>
                        <li onClick={openPlaylists} className='dd'>Add to playlist<span className='fad fa-list-music icon'></span></li>
                    </ul>
                )}
            </div>

                {showPlaylists && (
                    <Modal onClose={() => setShowPlaylists(false)}>
                        <PlaylistList song={song} addSongToPlaylist={addSongToPlaylist}/>
                    </Modal>
                )}
        </div>
    )
}
