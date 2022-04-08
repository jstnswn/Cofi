import React from 'react'
import '../LibraryBody/SongsBody/SongConfirmDelete.css'

export default function ConfirmDelete({ album, closeModal, remove, inPlaylist }) {
    const hasSongs = album?.songs?.length > 0;

    return (
        <div className='confirm-delete-container'>

            <i onClick={closeModal} className='fal fa-times close-icon'></i>

            <img alt='song artworko' src={album?.image_url} />

            <div className='confirm-message-box'>

                <p>Remove {inPlaylist && 'playlist'} <span className='song-name'>{album?.title}</span>{hasSongs && !inPlaylist && ' and all of it\'s songs'}?</p>
                <button onClick={remove}>Yes</button>

            </div>
        </div>
    )
}
