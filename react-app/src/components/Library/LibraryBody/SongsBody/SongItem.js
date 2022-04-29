import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../../../context/Modal';
import { loadSongAndSetQueue, setSong } from '../../../../store/active';
import { loadHome } from '../../../../store/home';
import { deleteLibrarySong, patchSongAlbum } from '../../../../store/library/librarySongs';
import { addToPlaylist, removeFromPlaylist } from '../../../../store/playlists';
import { createSongLike, deleteSongLike } from '../../../../store/session';
import SongEditForm from '../../SongEditForm.js/index.js';
import AlbumList from './AlbumList';
import ConfirmSingle from './ConfirmSingle';
import PlaylistList from './PlaylistList';
import SongConfirmDelete from './SongConfirmDelete';

export default function SongItem({ song, option, playlistId, idx, last }) {
    const session = useSelector(({ session }) => session);
    const user = session.user;

    const album = song.album;

    const dispatch = useDispatch();
    const history = useHistory();

    const [hovered, setHovered] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showConfirmDel, setShowConfirmDel] = useState(false);
    const [showEditMenu, setShowEditMenu] = useState(false);
    const [showSingleConfirm, setShowSingleConfirm] = useState(false)
    const [showChangeAlbum, setShowChangeAlbum] = useState(false);
    const [showPlaylists, setShowPlaylists] = useState(false);

    const openEditMenu = () => {
        setShowEditMenu(true);
        setHovered(false);
    }
    const closeEditMenu = () => setShowEditMenu(false);
    const openConfirmDel = () => {
        setShowConfirmDel(true);
        setHovered(false);
    }
    const closeConfirmDel = () => setShowConfirmDel(false);
    const openConfirmSingle = () => {
        setShowSingleConfirm(true);
        setHovered(false)
    }
    const closeConfirmSingle = () => setShowSingleConfirm(false);
    const openChangeAlbum = () => {
        setShowChangeAlbum(true);
        setHovered(false);
    }
    const closeChangeAlbum = () => setShowChangeAlbum(false);
    const openPlaylists = () => {
        setShowPlaylists(true);
        setHovered(false);
    }
    const closePlaylists = () => setShowPlaylists(false);

    const likeSong = () => dispatch(createSongLike(song.id));
    const unlikeSong = () => dispatch(deleteSongLike(song.id));

    const albumNavigation = () => playlistId
        ? history.push(`/album/${album.id}`)
        : history.push(`/library/${user.username}/albums/${album.id}` );

    useEffect(() => {
        if (hovered) return;

        const unHover = setHovered(false);
        document.addEventListener('mousedown', unHover);

        return () => document.removeEventListener('click', unHover);
    }, [hovered])

    const likedSongIds = user.liked.song_ids;


    let likeIconClass;
    let toggleLike;

    if (likedSongIds.includes(song.id)) {
        likeIconClass = 'fas fa-heart';
        toggleLike = unlikeSong;

    } else {
        likeIconClass = 'far fa-heart';
        toggleLike = likeSong;
    }

    const playSong = () => {
        dispatch(loadSongAndSetQueue(song));
    };

    const deleteSong = async () => {
        closeConfirmDel();

        dispatch(deleteLibrarySong(song.id, album?.id))
            .then(() => dispatch(loadHome()))

    };

    const addSongToPlaylist = (playlistId, e) => {
        dispatch(addToPlaylist(song, playlistId));
        closePlaylists();
    };

    const removeSongFromPlaylist = () => dispatch(removeFromPlaylist(song.id, playlistId))

    const updateSongAlbum = async (song, toAlbumId) => {
        closeConfirmSingle();
        closeChangeAlbum();

        dispatch(patchSongAlbum(song, toAlbumId))
    };

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

    const bottomOfList = last > 4
        ? idx >= last - 2
        : idx === last;


    return (
        <div
            className={`list-box ${last >= 4 && bottomOfList ? 'last' : ''}`}
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
                {album ? <p className='item' onClick={albumNavigation}>{album.title}</p> : <p className='item'>--</p>}

            </div>
            <i onClick={toggleLike} className={`${likeIconClass} heart ${hovered ? 'active' : ''}`}></i>
            <i className={`fa-solid fa-ellipsis song-options ${hovered ? 'active' : ''}`} onClick={openDropdown}></i>

            {showMenu && (
                option === 'liked'
                    ? (
                        <div className='library-list-dropdown simple'>
                            <ul>
                                <li onClick={openPlaylists}>Add to playlist</li>
                            </ul>
                        </div>
                    )
                    : (
                        <div className={`library-list-dropdown ${option}`}>
                            <ul>
                                <li onClick={openPlaylists}>Add to Playlist</li>
                                {option === 'playlist' && <li onClick={removeSongFromPlaylist}>Remove from Playlist</li>}
                                {option !== 'playlist' && (
                                    <>
                                        <li onClick={openEditMenu}>Edit Song</li>
                                        <li onClick={openConfirmDel}>Delete Song</li>
                                        {album && <li onClick={openConfirmSingle}>Make Single</li>}
                                        <li onClick={openChangeAlbum}>Move to Album</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    )
            )}

            {showEditMenu && (
                <Modal onClose={closeEditMenu}>
                    <SongEditForm closeModal={closeEditMenu} song={song} album={album} />
                </Modal>
            )}

            {showConfirmDel && (
                <Modal onClose={closeConfirmDel}>
                    <SongConfirmDelete closeModal={closeConfirmDel} deleteSong={deleteSong} song={song} />
                </Modal>
            )}

            {showSingleConfirm && (
                <Modal onClose={closeConfirmSingle}>
                    <ConfirmSingle closeModal={closeConfirmSingle} song={song} update={updateSongAlbum} />
                </Modal>
            )}

            {showChangeAlbum && (
                <Modal onClose={closeChangeAlbum}>
                    <AlbumList song={song} closeModal={closeChangeAlbum} update={updateSongAlbum} />
                </Modal>
            )}

            {showPlaylists && (
                <Modal onClose={closePlaylists}>
                    <PlaylistList song={song} addSongToPlaylist={addSongToPlaylist} />
                </Modal>
            )}
        </div>
    )
}
