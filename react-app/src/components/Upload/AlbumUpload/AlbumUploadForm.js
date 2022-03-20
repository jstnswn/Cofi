import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadNewAlbum as loadHomeAlbum } from '../../../store/home';
import { createAlbum } from '../../../store/library/libraryAlbums';

export default function AlbumUploadForm({ closeModal }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [image, setImage] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    };

    return (
        <form
            className='album-upload form'
            onSubmit={handleSubmit}
        >
            <h2>Create New Album</h2>
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
            <label>Artwork (optional)</label>
            <input
                type='file'
                onChange={e => setImage(e.target.files[0])}
                accept='image/png, image/jpeg, image/png, image/jpeg'
            />

            <button type='submit'>{isLoading ? 'Submitting...' : 'Submit'}</button>

        </form>
    )
}
