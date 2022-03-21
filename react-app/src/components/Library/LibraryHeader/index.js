import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { deleteLibraryAlbum } from '../../../store/library/libraryAlbums';
import AlbumEditForm from '../AlbumEditForm';
import AlbumConfirmDelete from './AlbumConfirmDelete';
// import HeaderDropdown from './HeaderDropdown';
import './LibraryHeader.css';

export default function LibraryHeader({ libraryItems }) {
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const location = useLocation();
    const history = useHistory();
    const user = useSelector(({ session }) => session.user);
    const match = matchPath(location.pathname, {
        path: '/library/:user/albums/:albumId'
    });

    const albumIdParam = match?.params?.albumId;
    const userParam = match?.params?.user;
    let headerUrl;
    let headerTitle
    let editOption;

    if (albumIdParam) {

        headerUrl = libraryItems.albums.byIds[albumIdParam].image_url;
        headerTitle = libraryItems.albums.byIds[albumIdParam].title;
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


    const deleteAlbum = async () => {
        closeConfirmMenu();
        dispatch(deleteLibraryAlbum(Number(albumIdParam)));
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
            </div>
            <div className='header-title-container'>
                <h2 className='library-header-title'>{headerTitle}
                    {albumIdParam && userParam === user.username && (
                        <span><i onClick={openDropdown} className='fas fa-ellipsis-h libary-header-edit'></i></span>)}
                </h2>

                {showDropdown && (
                    <div className='library-list-dropdown album'>
                        <ul>
                            {/* <li onClick={openEditMenu}>Edit Song</li> */}
                            <li onClick={openConfirmMenu}>Remove Album</li>
                            <li onClick={openEditForm}>Edit Details</li>
                        </ul>
                    </div>
                )}

                {showConfirm && (
                    <Modal onClose={closeConfirmMenu}>
                        <AlbumConfirmDelete closeModal={closeConfirmMenu} deleteAlbum={deleteAlbum} album={libraryItems.albums.byIds[albumIdParam]} />
                    </Modal>
                )}

                {showEdit && (
                    <Modal onClose={closeEditForm}>
                        <AlbumEditForm closeModal={closeEditForm} album={libraryItems.albums.byIds[albumIdParam]}/>
                    </Modal>
                )}
            </div>

        </div>
    )
}
