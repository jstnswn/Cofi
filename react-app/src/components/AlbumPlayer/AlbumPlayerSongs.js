import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../context/Modal';
import { loadSongAndSetQueue, setSong } from '../../store/active';
import { addToPlaylist, getPlaylistsArray } from '../../store/playlists';
import { createSongLike, deleteSongLike } from '../../store/session';
import PlaylistList from '../Library/LibraryBody/SongsBody/PlaylistList';

export default function AlbumPlayerSongs({ song, idx, last, openedMenu, setOpenedMenu, setToCloseMenu, toCloseMenu }) {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);
    const playlists = useSelector(getPlaylistsArray);

    const [showOptions, setShowOptions] = useState(false);
    const [showPlaylists, setShowPlaylists] = useState(false);

    const seeOptions = async (e) => {
        e.stopPropagation();

        // Check if prev menu is open,
            // if so, close that menu first
        if (typeof openedMenu === 'number') {
            setToCloseMenu(openedMenu)
        }

        setShowOptions(true);
        setOpenedMenu(idx);
    };

    useEffect(() => {
        if (toCloseMenu === idx) setShowOptions(false)
    }, [toCloseMenu, openedMenu, idx])

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
        if (playlists.length) setShowPlaylists(true);
    };

    const addSongToPlaylist = (playlistId) => {
        dispatch(addToPlaylist(song, playlistId));
        setShowPlaylists(false);
    };

    const likedSongIds = user.liked.song_ids;

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
        dispatch(loadSongAndSetQueue(song));
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
                        {playlists.length > 0 && <li onClick={openPlaylists} className='dd'>Add to playlist<span className='fad fa-list-music icon'></span></li>}
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
