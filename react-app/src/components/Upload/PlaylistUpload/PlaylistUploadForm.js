import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPlaylist } from '../../../store/playlists';
import { popupMessage } from '../../utils';

export default function PlaylistUploadForm({ closeModal }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [error, setError] = useState({});
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setError({});
        setDisableSubmit(false);
        setShowError(false);
        const errors = {};

        if (title.length > 35) errors.title = 'long';
        if (title.length === 0) errors.title = 'short';

        setError(errors);
        if (Object.keys(errors).length) setDisableSubmit(true);

    }, [title])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowError(true);
        if (disableSubmit) return;
        setIsLoading(true);

        const payload = { title, image }

        dispatch(createPlaylist(payload))
            .then(() => closeModal())
            .then(() => popupMessage('Playlist created in Library'))
    };

    const handleImageFileReader = (e, file) => {
        const dataUrl = e.target.result;

        setImageUrl(dataUrl)
        setImage(file);
    }

    const setImageFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => handleImageFileReader(e, file);
    };

    const imageFileRef = useRef(null);

    return (
        <form
            className='form'
            onSubmit={handleSubmit}
        >
            <i onClick={closeModal} className='fal fa-times close-icon'></i>

            <div
                className='file-input-container'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className='file-input-body'
                    onClick={() => !imageUrl && imageFileRef.current.click()}
                    style={{ cursor: !imageUrl ? 'pointer' : 'default' }}
                >
                    {!imageUrl
                        ? <i className={`fal fa-image image-icon icon ${isHovered ? 'active' : ''}`}></i>
                        : <img alt='Art preview' src={imageUrl} />
                    }
                    {isHovered && !imageUrl && <p className='file-message'>Choose Artwork (optional)</p>}
                </div>

                <div className='file-input-footer'>
                </div>
            </div>

            <div className='form-content'>
                <label>Title</label>
                <div className='input-container'>
                    <input
                        type='text'
                        value={showError && !title ? 'Playlist must have a title!' : title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {title.length > 30 && (
                        <div className={`word-counter ${error.title ? 'active' : ''}`}>{title.length}/35</div>
                    )}
                </div>
                <input
                    type='file'
                    onChange={e => setImageFile(e.target.files[0])}
                    accept='image/png, image/jpeg, image/jpg'
                    ref={imageFileRef}
                    style={{ display: 'none' }}
                />
                <button
                    type='submit'
                    style={{
                        opacity: disableSubmit ? .5 : 1,
                        cursor: disableSubmit ? 'default' : 'pointer'
                    }}
                >{isLoading ? 'Submitting...' : 'Submit'}</button>
            </div>

        </form>
    )
}
