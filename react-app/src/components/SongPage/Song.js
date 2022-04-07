import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { loadSongAndSetQueue } from '../../store/active';
import { addToPlaylist } from '../../store/playlists';
import { createSongLike, deleteSongLike } from '../../store/session';
import PlaylistList from '../Library/LibraryBody/SongsBody/PlaylistList';

export default function Song({ song, last, idx }) {
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showPlaylists, setShowPlaylists] = useState(false);

    const session = useSelector(({ session }) => session);
    const user = session.user;
    const album = song.album;

    const bottomOfList = idx >= last - 1;

    const openPlaylists = () => setShowPlaylists(true);
    const closePlaylists = () => setShowPlaylists(false);

    const playSong = () => {
        dispatch(loadSongAndSetQueue(song));
    };

    const addSongToPlaylist = (playlistId) => {
        dispatch(addToPlaylist(song, playlistId));
        closePlaylists();
    };

    const likeSong = () => dispatch(createSongLike(song.id));
    const unlikeSong = () => dispatch(deleteSongLike(song.id));

    const openDropdown = () => setShowMenu(true);

    useEffect(() => {
        if (!showMenu) return;

        const closeDropdown = () => setShowMenu(false);

        const scrollContainer = document.querySelector('.library-body-container');

        document.addEventListener('click', closeDropdown);
        scrollContainer.addEventListener('scroll', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
            document.removeEventListener('scroll', closeDropdown);
        };

    }, [showMenu])

    let likeIconClass;
    let toggleLike;

    const likedSongIds = user.liked.song_ids;

    if (likedSongIds.includes(song.id)) {
        likeIconClass = 'fas fa-heart';
        toggleLike = unlikeSong;

    } else {
        likeIconClass = 'far fa-heart';
        toggleLike = likeSong;
    }

    return (
        <div
            className={`list-box ${last >= 2 && bottomOfList ? 'last' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            <div className='song-list library-list' onClick={playSong}>
                <img alt='cover art' className='list-image' src={album ? album.image_url : song.image_url} /> <span className='item'>{song.title}</span>
            </div>
            <div className='artist-list library-list title'>
                <p className='item'>{song.artist.name}</p>
            </div>
            <div className='album-list library-list title album-page'>
                <p className='item'>{album.title}</p>
            </div>
            <i onClick={toggleLike} className={`${likeIconClass} heart ${hovered ? 'active' : ''}`}></i>
            <i className={`fa-solid fa-ellipsis song-options ${hovered ? 'active' : ''}`} onClick={openDropdown}></i>

            {showMenu && (
                <div className='library-list-dropdown simple'>
                    <ul>
                       <li onClick={openPlaylists}>Add to playlist</li>
                    </ul>
                </div>
            )}

            {showPlaylists && (
                <Modal onClose={closePlaylists}>
                    <PlaylistList song={song} addSongToPlaylist={addSongToPlaylist} />
                </Modal>
            )}
        </div>
    )
}
