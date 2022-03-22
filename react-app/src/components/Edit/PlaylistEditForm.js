import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { patchPlaylist } from '../../store/playlists';
import './EditForm.css'

export default function PlaylistEditForm({ closeModal, playlist}) {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(playlist.title);
    const [imageUrl, setImageUrl] = useState(playlist.image_url);
    const [showOverlay, setShowOverlay] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (disableSubmit) return;

        const payload = {
            image,
            title,
            playlistId: playlist.id
        };

        await dispatch(patchPlaylist(payload));
        closeModal();
    };

    const imageInputRef = useRef(null);

    const imageInputButton = () => {
        imageInputRef.current.click();
    };

    const handleFileReader = (e, file) => {
        const dataUrl = e.target.result;

        setImageUrl(dataUrl)
        setImage(file);
    }

    const setFile = (file) => {
        console.log('set file, file', file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => handleFileReader(e, file);
    };

    return (
        <form className='update-form album' onSubmit={handleSubmit}>

            <i onClick={closeModal} className='fal fa-times close-icon'></i>

            <img
                alt='song artwork'
                src={imageUrl}
                onMouseEnter={e => setShowOverlay(true)}
                onMouseLeave={e => setShowOverlay(false)}
                onClick={imageInputButton}
            />

            {showOverlay && (
                <div className='image-overlay'>
                    <p>Change Artwork</p>
                    <i className='fal fa-pen' ></i>
                </div>
            )}

            <div className='form-content'>
                <input
                    type='file'
                    onChange={e => setFile(e.target.files[0])}
                    ref={imageInputRef}
                    style={{ display: 'none' }}
                    accept='image/png, image/jpeg, image/png, image/jpeg'
                />
                <label>Title</label>
                <input
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button >Update</button>
            </div>
        </form>
    )
}
