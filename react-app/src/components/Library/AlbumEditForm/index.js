import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchAlbum } from '../../../store/library/libraryAlbums';
import './AlbumEditForm.css'

export default function AlbumEditForm({closeModal, album}) {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(album.title);
    const [imageUrl, setImageUrl] = useState(album.image_url);
    const [showOverlay, setShowOverlay] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [error, setError] = useState('');

    // const album = useSelector(({ library }) => library.albums.byIds[albumId])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (disableSubmit) return;

        const payload = {
            image,
            title,
            albumId: album.id
        };

        dispatch(patchAlbum(payload));
    };

    const imageInputRef = useRef(null);

    const imageInputButton = () => {
        imageInputRef.current.click();
    };

    const handleFileReader = (e, file) => {
        const dataUrl = e.target.result;

        // const allowedFileTypes = ['png', 'jpg', 'jpeg'];
        // const stopIdx = dataUrl.indexOf(';');
        // const fileType = dataUrl.slice(11, stopIdx)

        // if (!allowedFileTypes.includes(fileType)) {
        //     setImage(null)
        //     setImageUrl(null);
        //     setFileError('Must upload a PNG, JPG, or JPEG image.')
        //     return
        // }
        setImageUrl(dataUrl)
        console.log(1)
        setImage(file);
        console.log(2)
        // setFileError(null);
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
                    // value={image}
                    onChange={e => setFile(e.target.files[0])}
                    ref={imageInputRef}
                    style={{display: 'none'}}
                />
                <label>Title</label>
                <input
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                {/* <div className='confirm-message-box'> */}

                    {/* <p>Remove <span className='song-name'>{}</span> and all of it's songs?</p> */}
                    <button >Update</button>

                {/* </div> */}

            </div>
        </form>
    )
}
