import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPlaylist } from '../../../store/playlists';

export default function PlaylistUploadForm({ closeModal }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = { title, image }

        dispatch(createPlaylist(payload))
            .then(() => closeModal())
    };

    return (
        <form
            className='form'
            onSubmit={handleSubmit}
        >
            <h2>Create a Playlist</h2>
            <label>Title</label>
            <input
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
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
