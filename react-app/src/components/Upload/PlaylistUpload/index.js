import React, { useState } from 'react'
import { Modal } from '../../../context/Modal';
import PlaylistUploadForm from './PlaylistUploadForm';

export default function PlaylistUploadModal() {
    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => setShowModal(true);

    const closeModal = (e) => {
        if (e) e.stopPropagation()
        setShowModal(false);
    }

    return (
        <div
            className='song-upload-button-container'
            onClick={openModal}
        >
            <p>Create Playlist</p>
            {showModal && (
                <Modal onClose={closeModal}>
                    <PlaylistUploadForm closeModal={closeModal} />
                </Modal>
            )}
        </div>
    )
}
