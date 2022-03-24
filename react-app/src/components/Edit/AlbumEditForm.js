import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchAlbum } from '../../store/library/libraryAlbums';
import './EditForm.css'

export default function AlbumEditForm({ closeModal, album }) {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(album.title);
    const [artist, setArtist] = useState(album.artist.name);
    const [imageUrl, setImageUrl] = useState(album.image_url);
    const [showOverlay, setShowOverlay] = useState(false);
    const [error, setErrors] = useState({});
    const [disableSubmit, setDisableSubmit] = useState(false);


    useEffect(() => {
        setErrors({})
        setDisableSubmit(false);
        const errors = {};

        if (title.length > 35) errors.title = true;
        if (artist.length > 35) errors.artist = true;

        setErrors(errors);

        if (Object.keys(errors).length) setDisableSubmit(true);
    }, [title, artist])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (disableSubmit) return;

        const payload = {
            image,
            title,
            artist,
            albumId: album.id
        };

        await dispatch(patchAlbum(payload));
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
                        required
                        onChange={e => setTitle(e.target.value)}
                    />
                    {title.length > 30 && (
                        <div className={`word-counter ${error.title ? 'active' : ''}`}>{title.length}/35</div>
                    )}
                </div>

                <label>Artist</label>
                <div className='input-container'>
                    <input
                        type='text'
                        value={artist}
                        required
                        onChange={e => setArtist(e.target.value)}
                    />
                    {artist.length > 30 && (
                        <div className={`word-counter ${error.artist ? 'active' : ''}`}>{artist.length}/35</div>
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
