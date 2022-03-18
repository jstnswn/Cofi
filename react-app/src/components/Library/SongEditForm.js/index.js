import React, { useState } from 'react';
import './SongEditForm.css';

export default function SongEditForm({ closeModal }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [songfile, setSongFile] = useState(null);
    const [albumId, setAlbumId] = useState(null);
    const [artist, setArtist] = useState(null);
    const [isPrivate, setPrivate] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // const

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
    };

    return (
        <form
            className='song-edit-form form'
        >
            <label>Song Name</label>
            <input
                type='type'
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <label>Artist</label>
            <input
                type='text'
                value={artist}
                onChange={e => setArtist(e.target.value)}
            />
            <label>Album</label>
            <select
                value={albumId}
                onChange={e => setAlbumId(e.target.value)}
            >
                {/* <option>-Select an Album-</option>
                {userAlbums?.map((album, idx) => (
                    <option key={idx} value={album.id}>{album.title}</option>
                ))} */}
                <option value='create new'>--Create a new album--</option>
            </select>
            <div className='upload-form radio-container'>

                <label>Private</label>
                <input
                    type='radio'
                    onChange={e => setPrivate(true)}
                    value={true}
                    checked={isPrivate === true ? true : false}
                />
                <label>Public</label>
                <input
                    type='radio'
                    onChange={e => setPrivate(true)}
                    value={false}
                    checked={isPrivate === false ? true : false}
                />

            </div>

            <label>Song File</label>
            <input
                type='file'
                onChange={e => setSongFile(e.target.files[0])}
                accepted='aduio/mpeg, audio/mp3'
            />
            <label>Song Art (optional)</label>
            <input
                type='file'
                onChange={e => setImage(e.target.files[0])}
                accepted='image/png, image/jpeg, image/jpg'
            />

            <button type='submit'>{isLoading ? 'Submitting...' : 'Submit'}</button>
        </form>
    )
}
