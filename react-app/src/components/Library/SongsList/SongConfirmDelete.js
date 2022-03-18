import React from 'react'
import './SongConfirmDelete.css';

export default function SongConfirmDelete({ song, closeModal, deleteSong }) {

    return (
        <div className='confirm-delete-container'>

            <i onClick={closeModal} className='fal fa-times close-icon'></i>

                <img alt='song artworko' src={song.image_url}/>

            <div className='confirm-message-box'>

                <p>Remove <span className='song-name'>{song.title}</span>?</p>
                <button onClick={deleteSong}>Yes</button>

            </div>
        </div>
    )
}
