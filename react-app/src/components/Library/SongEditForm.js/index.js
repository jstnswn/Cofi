import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadHome } from '../../../store/home';
import { patchSong } from '../../../store/library/librarySongs';
import { createAlbum, getLibraryAlbumsArray } from '../../../store/library/libraryAlbums';


export default function SongEditForm({ closeModal, song, album }) {
    const dispatch = useDispatch();
    const userAlbums = useSelector(({ session }) => session.user.albums);

    const [title, setTitle] = useState(song.title);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [songFile, setSongFile] = useState(null);
    const [albumTitle, setAlbumTitle] = useState('')
    const [albumInput, setAlbumInput] = useState(album ? album.id : '')
    const [artist, setArtist] = useState(song.artist.name);
    const [isPrivate, setPrivate] = useState(song.private);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [inputToggle, setInputToggle] = useState('image');

    useEffect(() => {
        setErrors({});
        setDisableSubmit(false);
        const errors = {};

        if (title.length > 35) errors.title = true;
        if (artist.length > 35) errors.artist = true;
        if (albumTitle.length > 35) errors.albumTitle = true;



        setErrors(errors);
        if (Object.keys(errors).length) setDisableSubmit(true);

    }, [title, artist, albumTitle])


    const handleSubmit = async (e) => {
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
            fromAlbumId: album?.id,
            // toAlbumId: albumInput
        };



        if (albumTitle) {
            const albumPayload = {
                title: albumTitle,
                artist,
                image
            }

            dispatch(createAlbum(albumPayload))
                .then((album) => {
                    payload.toAlbumId = album.id
                    dispatch(patchSong(payload))
                })
                .then(() => setDisableSubmit(false))
                .then(() => closeModal(e))
                .then(() => dispatch(loadHome()))
                .catch(errors => setErrors(errors.errors))

            return
        }

        if (isNaN(albumInput)) payload.toAlbumId = null;
        else payload.toAlbumId = payload.toAlbumId = albumInput;

        dispatch(patchSong(payload))
            .then(() => setDisableSubmit(false))
            .then(() => closeModal(e))
            .then(() => dispatch(loadHome()))
            .catch(errors => setErrors(errors.errors))
    };

    const handleImageFileReader = (e, file) => {
        const dataUrl = e.target.result;

        setImageUrl(dataUrl)
        setImage(file);
    }

    const setImageFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => handleImageFileReader(e, file);
    };

    const musicFileRef = useRef(null);
    const imageFileRef = useRef(null);

    const fileInputContent = inputToggle !== 'image'
        ? (
            <div className='file-input-body' onClick={() => musicFileRef.current.click()}>
                {!songFile
                    ? <i className={`fal fa-music-alt music-icon icon ${isHovered ? 'active' : ''}`}></i>
                    : <i className='fal fa-check check icon lg'></i>
                }
                    {isHovered && !songFile && <p className='file-message'>Choose Audio File</p>}
            </div>
        )
        : (
            <div className='file-input-body' onClick={() => imageFileRef.current.click()}>


                    <img alt='Art preview' src={!imageUrl ? song.image_url : imageUrl} />

                {isHovered && !imageUrl &&  (
                    <div className='file-message art-edit'>
                        <p>Choose Artwork</p>
                        <p>Displayed if track is a single</p>
                    </div>

                )}
            </div>
        )


    const albumOption = albumInput === 'create new'
        ? (
            <>
                <label>New album name</label>
                <div className='input-container'>
                    <input
                        type='text'
                        value={albumTitle}
                        onChange={e => setAlbumTitle(e.target.value)}
                    />

                    {albumTitle.length > 30 && (
                        <div className={`word-counter ${errors.albumTitle ? 'active' : ''}`}>{albumTitle.length}/35</div>
                    )}
                </div>
            </>
        )
        : (
            <>
                <label>Album</label>
                <select value={albumInput} onChange={e => setAlbumInput(e.target.value)}>
                    {!album && <option></option>}
                    {userAlbums?.map((album, idx) => (
                        <option key={idx} value={album.id}>{album.title}</option>
                    ))}
                    <option value='create new'>--Create a new album--</option>
                </select>
            </>
        )

    return (
        <form
            className='song-edit-form form'
            onSubmit={handleSubmit}
        >
            {isLoading && songFile && <p className='wait-message loading song'>Loading... Please don't close the menu</p>}
            <i onClick={closeModal} className='fal fa-times close-icon'></i>

            <div
                className='file-input-container'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >

                {fileInputContent}
                <div className='file-input-footer edit'>
                    <div>
                        <i onClick={() => setInputToggle('song')} className={`fal fa-music-alt sm-icon toggle ${inputToggle === 'song' ? 'active' : ''}`}></i>
                    </div>
                    <div>
                        <i onClick={() => setInputToggle('image')} className={`fal fa-image sm-icon toggle ${inputToggle === 'image' ? 'active' : ''}`}></i>
                    </div>
                </div>
            </div>

            <div className='form-content'>
                <label>Song Name</label>
                <div className='input-container'>
                    <input
                        required
                        type='type'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {title.length > 30 && (
                        <div className={`word-counter ${errors.title ? 'active' : ''}`}>{title.length}/35</div>
                    )}
                </div>

                <label>Artist</label>
                <div className='input-container'>
                    <input
                        required
                        type='text'
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                    />
                    {artist.length > 30 && (
                        <div className={`word-counter ${errors.artist ? 'active' : ''}`}>{artist.length}/35</div>
                    )}
                </div>
                {albumOption}

                {/* Hidden inputs */}
                <input
                    type='file'
                    onChange={e => setSongFile(e.target.files[0])}
                    accept='aduio/mpeg, audio/mp3'
                    ref={musicFileRef}
                    style={{ display: 'none' }}
                />
                <input
                    type='file'
                    onChange={e => setImageFile(e.target.files[0])}
                    accept='image/png, image/jpeg, image/jpg'
                    ref={imageFileRef}
                    style={{ display: 'none' }}
                />

                <button
                    type='submit'
                    style={{
                        opacity: disableSubmit ? .5 : 1,
                        cursor: disableSubmit ? 'default' : 'pointer'
                    }} >{isLoading ? 'Submitting...' : 'Submit'}
                </button>

            </div>
        </form>
    )
}
