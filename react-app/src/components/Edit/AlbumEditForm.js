import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchAlbum } from '../../store/library/libraryAlbums';
import './EditForm.css'

export default function AlbumEditForm({ closeModal, album }) {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(album.title);
    const [imageUrl, setImageUrl] = useState(album.image_url);
    const [showOverlay, setShowOverlay] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        setError(false)

        if (title.length >= 50) setError(true);

    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (error) return;

        const payload = {
            image,
            title,
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
                    style={{display: 'none'}}
                    accept='image/png, image/jpeg, image/png, image/jpeg'
                />
                <label>Title</label>
                {/* <div className='input-container'> */}
                    <input
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        // style={{color: title.length >= 50 ? 'red' : 'white'}}
                    />
                    <div className='word-counter-container'>
                        {title.length > 45 && (
                            <div className={`word-counter ${error ? 'active' : ''}`}>{title.length}/50</div>
                            )}

                    </div>
                {/* </div> */}

                {/* <div className='confirm-message-box'> */}

                    {/* <p>Remove <span className='song-name'>{}</span> and all of it's songs?</p> */}
                    <button
                        style={{ opacity: error ? .5 : 1 }}
                        // disable={true}
                    >Update</button>

                {/* </div> */}

            </div>
        </form>
    )
}
