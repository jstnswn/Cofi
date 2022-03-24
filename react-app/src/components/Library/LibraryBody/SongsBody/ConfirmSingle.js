import React from 'react'

export default function ConfirmSingle({ closeModal, song, update }) {
    return (
        <div className='confirm-delete-container'>

            <i onClick={closeModal} className='fal fa-times close-icon'></i>

            <div className='confirm-message-box'>

                <p>Remove <span className='song-name'>{song.title}</span> from It's album?</p>
                <button onClick={() => update(song)}>Yes</button>

            </div>
        </div>
    )
}
