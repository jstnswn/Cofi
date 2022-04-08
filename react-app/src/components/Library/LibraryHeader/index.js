import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { deleteLibraryAlbum } from '../../../store/library/libraryAlbums';
import { deletePlaylist } from '../../../store/playlists';
import AlbumEditForm from '../../Edit/AlbumEditForm';
import PlaylistEditForm from '../../Edit/PlaylistEditForm';
import ConfirmDelete from './ConfirmDelete';
import './LibraryHeader.css';

export default function LibraryHeader({ libraryItems }) {
    const dispatch = useDispatch();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const user = useSelector(({ session }) => session.user);
    const playlists = useSelector(({ playlists }) => playlists);

    const location = useLocation();
    const history = useHistory();
    const match = matchPath(location.pathname, {
        path: '/library/:user/:section/:id/'
    });

    useEffect(() => {
        if (!showDropdown) return;

        const closeDropdown = () => setShowDropdown(false)
        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener('click', closeDropdown);
    }, [showDropdown])

    const idParam = match?.params?.id;
    const userParam = match?.params?.user;
    const sectionParam = match?.params?.section;
    const likedParam = location.pathname.split('/')[4] === 'liked';
    const inPlaylist = sectionParam === 'playlists';

    let headerUrl;
    let headerTitle
    if (idParam && !isNaN(Number(idParam))) {
        if (inPlaylist) {
            if (!playlists[idParam]) return <Redirect to='/library' />
            headerUrl = playlists[idParam].image_url;
            headerTitle = playlists[idParam].title;
        } else {

            if (!libraryItems.albums.byIds[idParam]) return <Redirect to='/library' />
            headerUrl = libraryItems.albums.byIds[idParam]?.image_url;
            headerTitle = libraryItems.albums.byIds[idParam]?.title;
        }

    } else {
        if (likedParam) {
            if (sectionParam === 'albums') headerTitle = 'Liked Albums';
            else if (sectionParam === 'songs') headerTitle = 'Liked Songs';
        }
        else headerTitle = 'Your Collection'
        headerUrl = 'https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png';
    }

    const openDropdown = () => setShowDropdown(true);

    const openConfirmMenu = () => setShowConfirm(true);
    const closeConfirmMenu = () => setShowConfirm(false);

    const openEditForm = () => setShowEdit(true);
    const closeEditForm = () => setShowEdit(false);


    const removeAlbum = async () => {
        closeConfirmMenu();
        dispatch(deleteLibraryAlbum(Number(idParam)));
        history.goBack();
    };

    const removePlaylist = async () => {
        closeConfirmMenu();
        dispatch(deletePlaylist(idParam));
        history.goBack();
    };

    return (
        <div id='library-header'>

                <div className='header-image-container'>
                    <img
                        alt='library cover'
                        className='library-header-image'
                        src={headerUrl}
                    />
                    <div className='header-title-container'>

                        <h2 className='library-header-title'>{headerTitle}
                            {!likedParam && idParam && userParam === user.username && (
                                <span><i onClick={openDropdown} className='fas fa-ellipsis-h libary-header-edit'></i></span>)}
                        </h2>

                        {showDropdown && (
                            <div className='library-list-dropdown album'>
                                <ul>
                                    <li onClick={openConfirmMenu}>{inPlaylist ? 'Remove Playlist' : 'Remove Album'}</li>
                                    <li onClick={openEditForm}>Edit Details</li>
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
                    {showConfirm && (
                        <Modal onClose={closeConfirmMenu}>
                            <ConfirmDelete
                                closeModal={closeConfirmMenu}
                                remove={inPlaylist ? removePlaylist : removeAlbum}
                                inPlaylist={inPlaylist}
                                album={inPlaylist ? playlists[idParam] : libraryItems.albums.byIds[idParam]} />
                        </Modal>
                    )}

                    {showEdit && (
                        <Modal onClose={closeEditForm}>
                            {inPlaylist
                                ? <PlaylistEditForm closeModal={closeEditForm} playlist={playlists[idParam]} />
                                : <AlbumEditForm closeModal={closeEditForm} album={libraryItems.albums.byIds[idParam]} />
                            }
                        </Modal>
                    )}

        </div>
    )
}
