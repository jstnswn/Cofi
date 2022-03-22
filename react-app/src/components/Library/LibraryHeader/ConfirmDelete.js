import React from 'react'
import '../LibraryBody/SongsBody/SongConfirmDelete.css'

export default function ConfirmDelete({ album, closeModal, remove }) {

    // console.log('album', album)

    return (
        <div className='confirm-delete-container'>

            <i onClick={closeModal} className='fal fa-times close-icon'></i>

            <img alt='song artworko' src={album?.image_url} />

            <div className='confirm-message-box'>

                <p>Remove <span className='song-name'>{album?.title}</span>?</p>
                <button onClick={remove}>Yes</button>

            </div>
        </div>
    )
}
