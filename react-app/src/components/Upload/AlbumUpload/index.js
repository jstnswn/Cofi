import React, { useState } from 'react'
import { Modal } from '../../../context/Modal';
import AlbumUploadForm from './AlbumUploadForm';

export default function AlbumUploadModal() {
    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => setShowModal(true);

    const closeModal = (e) => {
        if (e) e.stopPropagation()
        setShowModal(false);
    }

    return (
        <div
            className='album-upload-button-container'
            onClick={openModal}
        >
            <p>Create Album</p>
            {showModal && (
                <Modal onClose={closeModal}>
                    <AlbumUploadForm closeModal={closeModal} />
                </Modal>
            )}
        </div>
    )
}
