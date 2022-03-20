import React from 'react'
import './SongConfirmDelete.css';

export default function AlbumConfirmDelete({ album, closeModal, deleteAlbum }) {

    return (
        <div className='confirm-delete-container'>

            <i onClick={closeModal} className='fal fa-times close-icon'></i>

            <img alt='song artworko' src={album?.image_url} />

            <div className='confirm-message-box'>

                <p>Remove <span className='song-name'>{album?.title}</span> and all of it's songs?</p>
                <button onClick={deleteAlbum}>Yes</button>

            </div>
        </div>
    )
}
