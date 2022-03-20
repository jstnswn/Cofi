import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './AlbumEditForm.css'

export default function AlbumEditForm({closeModal, album}) {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(album.image_url);

    // const album = useSelector(({ library }) => library.albums.byIds[albumId])
    const imageInputRef = useRef(null);

    const imageInputButton = () => {
        imageInputRef.current.click();
    }

    const handleFileReader = (e, file) => {
        const dataUrl = e.target.result;
        console.log('handlefilereader: dataUrl', dataUrl)

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
        <form className='update-form album'>

            <i onClick={closeModal} className='fal fa-times close-icon'></i>

            <img alt='song artwork' src={imageUrl} onClick={imageInputButton}/>

            <input
                type='file'
                // value={image}
                onChange={e => setFile(e.target.files[0])}
                ref={imageInputRef}
                style={{display: 'none'}}
            />

            <div className='confirm-message-box'>

                {/* <p>Remove <span className='song-name'>{}</span> and all of it's songs?</p> */}
                <button >Yes</button>

            </div>
        </form>
    )
}
