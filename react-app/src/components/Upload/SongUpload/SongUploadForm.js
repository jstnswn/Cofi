import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadHome, loadHomeAlbums, loadNewSong } from '../../../store/home';
import { uploadSong } from '../../../store/library';

export default function SongUploadForm({ closeModal }) {
    const dispatch = useDispatch();

    const userAlbums = useSelector(({ session }) => session.user.albums);

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState(null);
    const [image, setImage] = useState(null);
    const [albumInput, setAlbumInput] = useState('')
    const [albumName, setAlbumName] = useState('');
    // const [imageUrl, setImageUrl] = useState(null)
    // const [ImageError, setImageError] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (disableSubmit) return;
        setDisableSubmit(true);
        setIsLoading(true);

        const payload = {
            title,
            artist,
            song,
            image,
            private: isPrivate
        }

        dispatch(uploadSong(payload))
            .then((song) => dispatch(loadNewSong(song)))
            .then(() => setDisableSubmit(false))
            .then(() => closeModal(e))
            .catch(errors => setErrors(errors.errors))
            .then(() => dispatch(loadHomeAlbums()))
    };

    const handleImageFileReader = (e, file) => {
        // const dataUrl = e.target.result;

        // const allowedFileTypes = ['png', 'jpg', 'jpeg'];
        // const stopIdx = dataUrl.indexOf(';');
        // const fileType = dataUrl.slice(11, stopIdx)

        // if (!allowedFileTypes.includes(fileType)) {
        //     setImage(null)
        //     setImageUrl(null);
        //     setImageError('Must upload a PNG, JPG, or JPEG image.')
        //     return
        // }
        setImage(file);
    }

    // const setImageFile = (file) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = (e) => handleImageFileReader(e, file);
    // };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     setSong(file);
    // };

    const albumOption = albumInput === 'create new'
        ? (
            <>
                <label>New album name</label>
                <input
                    type='text'
                    value={albumName}
                    onChange={e => setAlbumName(e.target.value)}
                />
            </>
        )
        : (
            <>
                <label>Album</label>
                <select
                    value={albumInput}
                    onChange={e => setAlbumInput(e.target.value)}
                >
                    <option>-Select an Album-</option>
                    {userAlbums?.map((album, idx) => (
                        <option key={idx} value={album.id}>{album.title}</option>
                    ))}
                    <option value='create new'>--Create a new album--</option>
                </select>
            </>
        )

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
            {albumOption}
            <div className='upload-form radio-container'>
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
            </div>
            <label>Song File</label>
            <input
                type='file'
                onChange={e => setSong(e.target.files[0])}
                accept='aduio/mpeg, audio/mp3'
            />
            <label>Song Art (optional)</label>
            <input
                type='file'
                onChange={e => setImage(e.target.files[0])}
                accept='image/png, image/jpeg, image/png, image/jpeg'
            />

            <button type='submit'>{isLoading ? 'Submitting...' : 'Submit'}</button>
        </form>
    )
}

// accept = 'image/png, image/jpeg, image/png, image/jpeg'
