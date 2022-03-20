import React, { useState } from 'react'
import { Modal } from '../../../context/Modal';
import SongUploadForm from './SongUploadForm';

export default function SongUploadModal() {
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
            <p>Upload Song</p>
            {showModal && (
                <Modal onClose={closeModal}>
                    <SongUploadForm closeModal={closeModal}/>
                </Modal>
            )}
        </div>


    )
}
