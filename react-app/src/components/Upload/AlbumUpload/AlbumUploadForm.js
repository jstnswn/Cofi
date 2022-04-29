import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { loadNewAlbum as loadHomeAlbum } from '../../../store/home';
import { createAlbum } from '../../../store/library/libraryAlbums';
import { popupMessage } from '../../utils';



export default function AlbumUploadForm({ closeModal }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);


    useEffect(() => {
        setErrors({});
        setDisableSubmit(false);
        setShowErrors(false);
        const errors = {};

        if (title.length > 35) errors.title = 'long';
        if (title.length === 0) errors.title = 'short';
        if (artist.length > 35) errors.artist = 'long';
        if (artist.length === 0) errors.artist = 'short';

        setErrors(errors);
        if (Object.keys(errors).length) setDisableSubmit(true);

    }, [title, artist])

    const handleSubmit = async (e) => {
        e.preventDefault();


        setShowErrors(true);
        if (disableSubmit) return;
        setDisableSubmit(true);
        setIsLoading(true);

        const payload = {
            title,
            artist,
            image,
            private: isPrivate,
        }

        await dispatch(createAlbum(payload))
            .then((album) => dispatch(loadHomeAlbum(album)))
            .then(() => closeModal())
            .then(() => popupMessage('Album Created in Library'))
    };

    const handleImageFileReader = (e, file) => {
        const dataUrl = e.target.result;

        setImageUrl(dataUrl)
        setImage(file);
    }

    const setImageFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => handleImageFileReader(e, file);
    };

    const imageFileRef = useRef(null);

    return (
        <form
            className='album-upload form'
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
                    style={{cursor: !imageUrl ? 'pointer' : 'default'}}
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
                        value={showErrors && !title ? 'Album must have a title!' : title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {title.length > 30 && (
                        <div className={`word-counter ${errors.title ? 'active' : ''}`}>{title.length}/35</div>
                    )}
                </div>

                <label>Artist</label>
                <div className='input-container'>
                    <input
                        type='text'
                        value={showErrors && !artist ? 'Album must have an artist!' : artist}
                        onChange={e => setArtist(e.target.value)}
                    />
                    {artist.length > 30 && (
                        <div className={`word-counter ${errors.artist ? 'active' : ''}`}>{artist.length}/35</div>
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
