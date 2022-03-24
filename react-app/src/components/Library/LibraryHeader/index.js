import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { deleteLibraryAlbum } from '../../../store/library/libraryAlbums';
import { deletePlaylist } from '../../../store/playlists';
import AlbumEditForm from '../../Edit/AlbumEditForm';
import PlaylistEditForm from '../../Edit/PlaylistEditForm';
import ConfirmDelete from './ConfirmDelete';
// import HeaderDropdown from './HeaderDropdown';
import './LibraryHeader.css';

export default function LibraryHeader({ libraryItems }) {
    // Refactor to a avoid prop drilling libraryItems

    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const user = useSelector(({ session }) => session.user);
    const playlists = useSelector(({ playlists }) => playlists);

    const location = useLocation();
    const history = useHistory();
    const match = matchPath(location.pathname, {
        path: '/library/:user/:section/:id'
    });

    const idParam = match?.params?.id;
    const userParam = match?.params?.user;
    const sectionParam = match?.params?.section;
    const inPlaylist = sectionParam === 'playlists';
    let headerUrl;
    let headerTitle
    let editOption;

    if (idParam) {
        if (inPlaylist) {
            headerUrl = playlists[idParam].image_url;
            headerTitle = playlists[idParam].title;
        } else {
            headerUrl = libraryItems.albums.byIds[idParam]?.image_url;
            headerTitle = libraryItems.albums.byIds[idParam]?.title;
        }

    } else {
        headerUrl = 'https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png';
        headerTitle = 'Your Collection'
    }

    useEffect(() => {
        if (!showDropdown) return;

        const closeDropdown = () => setShowDropdown(false)
        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener('click', closeDropdown);
    }, [showDropdown])



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
            {/* <div className='library-header-container'> */}

                <div className='header-image-container'>
                    <img
                        alt='library cover'
                        className='library-header-image'
                        src={headerUrl}
                    />
                    <div className='header-title-container'>

                        <h2 className='library-header-title'>{headerTitle}
                            {idParam && userParam === user.username && (
                                <span><i onClick={openDropdown} className='fas fa-ellipsis-h libary-header-edit'></i></span>)}
                        </h2>

                        {showDropdown && (
                            <div className='library-list-dropdown album'>
                                <ul>
                                    {/* <li onClick={openEditMenu}>Edit Song</li> */}
                                    <li onClick={openConfirmMenu}>{inPlaylist ? 'Remove Playlist' : 'Remove Album'}</li>
                                    <li onClick={openEditForm}>Edit Details</li>
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
            {/* </div> */}
                    {showConfirm && (
                        <Modal onClose={closeConfirmMenu}>
                            <ConfirmDelete
                                closeModal={closeConfirmMenu}
                                remove={inPlaylist ? removePlaylist : removeAlbum}
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
