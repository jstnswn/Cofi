import React from 'react'
import { matchPath, useHistory } from 'react-router-dom';

export default function LibraryHeader({ libraryItems }) {
    const history = useHistory();
    const match = matchPath(history.location.pathname, {
        path: '/library/:user/albums/:albumId'
    });

    const albumId = match?.params?.albumId;
    let headerUrl;
    let headerTitle

    if (albumId) {

        headerUrl = libraryItems.albums.byIds[albumId].image_url;
        headerTitle = libraryItems.albums.byIds[albumId].title;
    } else {
        headerUrl = 'https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png';
        headerTitle = 'Your Collection'
    }

    return (
        <div id='library-header'>
            <div className='header-image-container'>
                <img
                    alt='library cover'
                    className='library-header-image'
                    src={headerUrl}
                />
            </div>
            <h2 className='library-header-title'>{headerTitle}</h2>
        </div>
    )
}
