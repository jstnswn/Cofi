import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uploadSong } from '../../../store/library';

export default function SongUploadForm({ closeModal }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState(null);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null)
    const [ImageError, setImageError] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title,
            artist,
            song,
            image,
            private: isPrivate
        }

        dispatch(uploadSong(payload))
    };

    const handleImageFileReader = (e, file) => {
        const dataUrl = e.target.result;

        const allowedFileTypes = ['png', 'jpg', 'jpeg'];
        const stopIdx = dataUrl.indexOf(';');
        const fileType = dataUrl.slice(11, stopIdx)

        if (!allowedFileTypes.includes(fileType)) {
            setImage(null)
            setImageUrl(null);
            setImageError('Must upload a PNG, JPG, or JPEG image.')
            return
        }
        setImage(file);
    }

    const setImageFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => handleImageFileReader(e, file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('file: ', file)
        setSong(file);
    };




    return (
        <form className='song-upload-form form' onSubmit={handleSubmit}>
            <label>Title</label>
            <input
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <label>Artist</label>
            <input
                type='text'
                value={artist}
                onChange={e => setArtist(e.target.value)}
            />
            <label>Song File</label>
            <input
                type='file'
                onChange={handleFileChange}
                accepted='aduio/mpeg, audio/mp3'
            />
            <label>Private</label>
            <input
                type='radio'
                onChange={e => setIsPrivate(true)}
                value={true}
                checked={isPrivate === true ? true: false}
            />
            <label>Public</label>
            <input
                type='radio'
                onChange={e => setIsPrivate(true)}
                value={false}
                checked={isPrivate === false ? true: false}
            />

            <button type='submit'>Submit</button>
        </form>
    )
}

// accept = 'image/png, image/jpeg, image/png, image/jpeg'
