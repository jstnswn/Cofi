import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../../../context/Modal';
import { setSong } from '../../../../store/active';
import { loadHome } from '../../../../store/home';
import { deleteLibrarySong } from '../../../../store/library/librarySongs';
import SongEditForm from '../../SongEditForm.js/index.js';
import SongConfirmDelete from './SongConfirmDelete';

export default function SongItem({ song }) {
    // console.log('song', song)
    const user = useSelector(({ session }) => session.user);

    const album = song.album;
    console.log('albuM: ', album)

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const [hovered, setHovered] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showConfirmDel, setShowConfirmDel] = useState(false);
    const [showEditMenu, setShowEditMenu] = useState(false);

    const openEditMenu = () => setShowEditMenu(true);
    const closeEditMenu = () => setShowEditMenu(false);
    const openConfirmModal = () => setShowConfirmDel(true);
    const closeConfirmModal = () => setShowConfirmDel(false);

    const playSong = () => {
        dispatch(setSong(song));
    };

    const deleteSong = async () => {
        closeConfirmModal();

      dispatch(deleteLibrarySong(song.id, album?.id))
        .then(() => dispatch(loadHome()))

    };

    const openDropdown = () => setShowMenu(true);

    useEffect(() => {
        if (!showMenu) return;

        const closeDropdown = () => setShowMenu(false);

        const scrollContainer = document.querySelector('.library-songs-body-container');

        document.addEventListener('click', closeDropdown);
        scrollContainer.addEventListener('scroll', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
            document.removeEventListener('scroll', closeDropdown);
        };

    }, [showMenu])

    return (
        <div
            className='list-box'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            <div className='song-list library-list'>
                <img alt='cover art' className='list-image' src={album ? album.image_url : song.image_url} /> <span onClick={playSong} className='item'>{song.title}</span>
            </div>
            <div className='artist-list library-list'>
                <p className='item'>{song.artist.name}</p>
            </div>
            <div className='album-list library-list'>
                {album ? <p className='item' onClick={() => history.push(`/library/${user.username}/albums/${album.id}`)}>{album.title}</p> : <p className='item'>--</p>}

            </div>
            <i className={`fa-solid fa-ellipsis song-options ${hovered ? 'active' : ''}`} onClick={openDropdown}></i>

            {showMenu && (
                <div className='library-list-dropdown'>
                    <ul>
                        <li onClick={openEditMenu}>Edit Song</li>
                        <li onClick={openConfirmModal}>Delete Song</li>
                    </ul>
                </div>
            )}

            {showEditMenu && (
                <Modal onClose={closeEditMenu}>
                    <SongEditForm closeModal={closeEditMenu} song={song} album={album}/>
                </Modal>
            )}

            {showConfirmDel && (
                <Modal onClose={closeConfirmModal}>
                    <SongConfirmDelete closeModal={closeConfirmModal} deleteSong={deleteSong} song={song}/>
                </Modal>
            )}
        </div>
    )
}
