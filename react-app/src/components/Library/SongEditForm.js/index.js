import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadHome } from '../../../store/home';
import { patchSong } from '../../../store/library/librarySongs';
import { getLibraryAlbumsArray } from '../../../store/library/libraryAlbums';
import './SongEditForm.css';

export default function SongEditForm({ closeModal, song, album }) {
    const dispatch = useDispatch();
    const libraryAlbums = useSelector(getLibraryAlbumsArray);

    const [title, setTitle] = useState(song.title);
    const [image, setImage] = useState(null);
    const [songFile, setSongFile] = useState(null);
    const [albumId, setAlbumId] = useState(album ? album.id : -1);
    // const [albumName]
    const [artist, setArtist] = useState(song.artist.name);
    const [isPrivate, setPrivate] = useState(song.private);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (disableSubmit) return;
        setDisableSubmit(true);
        setIsLoading(true);

        const payload = {
            title,
            artist,
            songId: song.id,
            song: songFile,
            image,
            private: isPrivate,
            fromAlbumId: album?.id
        };

        dispatch(patchSong(payload))
            .then(() => setDisableSubmit(false))
            .then(() => closeModal(e))
            .catch(errors => setErrors(errors.errors))
            .then(() => dispatch(loadHome()))
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
    };

    return (
        <form
            className='song-edit-form form'
            onSubmit={handleSubmit}
        >
            <h2>Edit Song</h2>
            <label>Song Name</label>
            <input
                type='type'
                value={title}
                onChange={e => setTitle(e.target.value)}
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
                <option>{album ? album.title : '-Select an Album-'}</option>
                {libraryAlbums?.map((album, idx) => (
                    <option key={idx} value={album.id}>{album.title}</option>
                ))}
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
                    onChange={e => setPrivate(false)}
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
