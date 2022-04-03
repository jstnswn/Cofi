import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { setSong } from '../../store/active';
import { addToPlaylist, removeFromPlaylist } from '../../store/playlists';
import { createSongLike, deleteSongLike } from '../../store/session';
import PlaylistList from '../Library/LibraryBody/SongsBody/PlaylistList';

export default function Song({ song, last, idx }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [hovered, setHovered] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showPlaylists, setShowPlaylists] = useState(false);

    const user = useSelector(({ session }) => session.user);
    const album = song.album;

    const bottomOfList = idx >= last - 1;

    const openPlaylists = () => setShowPlaylists(true);
    const closePlaylists = () => setShowPlaylists(false);


    const playSong = () => {
        dispatch(setSong(song));
    };

    const addSongToPlaylist = (playlistId) => {
        dispatch(addToPlaylist(song, playlistId));
        closePlaylists();
    };
    // const removeSongFromPlaylist = () => dispatch(removeFromPlaylist(song.id, playlistId))

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
            <div className='album-list library-list title'>
                {album ? <p className='item' onClick={() => history.push(`/library/${user.username}/albums/${album.id}`)}>{album.title}</p> : <p className='item'>--</p>}

            </div>
            <i onClick={toggleLike} className={`${likeIconClass} heart ${hovered ? 'active' : ''}`}></i>
            <i className={`fa-solid fa-ellipsis song-options ${hovered ? 'active' : ''}`} onClick={openDropdown}></i>

            {showMenu && (
                <div className='library-list-dropdown'>
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
