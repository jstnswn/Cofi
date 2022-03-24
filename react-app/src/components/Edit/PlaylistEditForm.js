import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { patchPlaylist } from '../../store/playlists';
import './EditForm.css'

export default function PlaylistEditForm({ closeModal, playlist}) {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(playlist.title);
    const [imageUrl, setImageUrl] = useState(playlist.image_url);
    const [showOverlay, setShowOverlay] = useState(false);
    const [error, setErrors] = useState({});
    const [disableSubmit, setDisableSubmit] = useState(false);

    useEffect(() => {
        setErrors({})
        setDisableSubmit(false);
        const errors = {};

        if (title.length >= 50) errors.title = true;

        setErrors(errors);

        if (errors.title) setDisableSubmit(true);
    }, [title])

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
                    accept='image/png, image/jpeg, image/jpg'
                />
                <label>Title</label>
                <div className='input-container'>
                    <input
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    {title.length > 45 && (
                        <div className={`word-counter ${error.title ? 'active' : ''}`}>{title.length}/50</div>
                    )}
                </div>

                <button
                    style={{
                        opacity: disableSubmit ? .5 : 1,
                        cursor: disableSubmit ? 'default' : 'pointer'
                    }}
                >Update</button>
            </div>
        </form>
    )
}
