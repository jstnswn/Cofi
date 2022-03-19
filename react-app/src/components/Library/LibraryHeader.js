import React from 'react'
import { useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';

export default function LibraryHeader({ libraryItems }) {
    const location = useLocation();
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

    // if (albumIdParam && userParam === user.username) {

    // }

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
                    <span><i className='fas fa-ellipsis-h libary-header-edit'></i></span>)}
            </h2>

            </div>
        </div>
    )
}
