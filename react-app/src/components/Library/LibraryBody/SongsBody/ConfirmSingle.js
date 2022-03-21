import React from 'react'

export default function ConfirmSingle({ closeModal, song, update }) {
    return (
        <div className='confirm-delete-container'>

            <i onClick={closeModal} className='fal fa-times close-icon'></i>

            {/* <img alt='song artworko' src={song.image_url} /> */}

            <div className='confirm-message-box'>

                <p>Remove <span className='song-name'>{song.title}</span> from It's album?</p>
                <button onClick={update}>Yes</button>

            </div>
        </div>
    )
}
