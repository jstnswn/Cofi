import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadNewAlbum as loadHomeAlbum } from '../../../store/home';
import { createAlbum } from '../../../store/library/libraryAlbums';

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


    useEffect(() => {
        setErrors({});
        setDisableSubmit(false);
        const errors = {};

        if (title.length > 50) errors.title = true;
        if (artist.length > 50) errors.artist = true;

        setErrors(errors);
        if (Object.keys(errors).length) setDisableSubmit(true);

    }, [title, artist])

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                >
                    {!imageUrl
                        ? <i className={`fal fa-image image-icon icon ${isHovered ? 'active' : ''}`}></i>
                        : <img alt='Art preview' src={imageUrl} />
                    }
                    {isHovered && !imageUrl && <p className='file-message'>Choose Artwork (optional)</p>}
                </div>

                <div className='file-input-footer'>
                    {/* <div>
                        <i className='fal fa-file-music sm-icon'></i>
                        <i className={`fal fa-check check sm-icon ${song ? 'active' : ''}`}></i>
                    </div> */}
                    {/* <div>
                        <i className='fal fa-file-image sm-icon'></i>
                        <i className={`fal fa-check check sm-icon ${image ? 'active' : ''}`}></i>
                    </div> */}
                </div>
            </div>

            <div className='form-content'>
                {/* <h2>Create New Album</h2> */}
                <label>Title</label>
                <div className='input-container'>
                    <input
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {title.length > 45 && (
                        <div className={`word-counter ${errors.title ? 'active' : ''}`}>{title.length}/50</div>
                    )}
                </div>

                <label>Artist</label>
                <div className='input-container'>
                    <input
                        type='text'
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                    />
                    {artist.length > 45 && (
                        <div className={`word-counter ${errors.artist ? 'active' : ''}`}>{artist.length}/50</div>
                    )}
                </div>

                <input
                    type='file'
                    onChange={e => setImageFile(e.target.files[0])}
                    accept='image/png, image/jpeg, image/png, image/jpeg'
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
            {/* <div className='upload-form radio-container'>
                <label>Private</label>
                <input
                    type='radio'
                    onChange={e => setIsPrivate(true)}
                    value={true}
                    checked={isPrivate === true ? true : false}
                />
                <label>Public</label>
                <input
                    type='radio'
                    onChange={e => setIsPrivate(false)}
                    value={false}
                    checked={isPrivate === false ? true : false}
                />
            </div> */}
            {/* <label>Artwork (optional)</label> */}


        </form>
    )
}
