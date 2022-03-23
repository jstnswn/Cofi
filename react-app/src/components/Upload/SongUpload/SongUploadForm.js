import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadHome, loadHomeAlbums, loadNewSong } from '../../../store/home';
import { createAlbumAndSong, uploadSong } from '../../../store/library/librarySongs';

export default function SongUploadForm({ closeModal }) {
    const dispatch = useDispatch();

    const userAlbums = useSelector(({ session }) => session.user.albums);

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [songFile, setSongFile] = useState(null);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [albumInput, setAlbumInput] = useState('')
    const [albumTitle, setAlbumTitle] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);


    useEffect(() => {
        setErrors({});
        setDisableSubmit(false);
        setShowErrors(false);
        const errors = {};


        if (title.length > 50) errors.title = 'long';
        if (title.length === 0) errors.title = 'short';
        if (artist.length > 50) errors.artist = 'long';
        if (artist.length === 0) errors.artist = 'short';
        if (albumTitle.length > 50) errors.albumTitle = 'long';
        if (albumInput === 'create new' && albumTitle.length === 0) errors.albumTitle = 'short';
        if (!songFile) errors.song = 'none';

        setErrors(errors);
        if (Object.keys(errors).length) setDisableSubmit(true);

    }, [title, artist, albumTitle, songFile, albumInput])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowErrors(true)

        if (!songFile) {
            setIsHovered(true);
            return;
        }

        if (disableSubmit) return;
        setDisableSubmit(true);

        setIsLoading(true);



        const payload = {
            title,
            artist,
            song: songFile,
            image,
            private: isPrivate
        }

        if (albumTitle) {
            payload.albumTitle = albumTitle;
            dispatch(createAlbumAndSong(payload))
                .then((songFile) => dispatch(loadNewSong(songFile)))
                .then(() => setDisableSubmit(false))
                .then(() => closeModal(e))
                .catch(errors => setErrors(errors.errors))
                .then(() => dispatch(loadHomeAlbums()))

            return;
        }
        else if (albumInput) payload.albumId = albumInput;

        dispatch(uploadSong(payload))
            .then((songFile) => dispatch(loadNewSong(songFile)))
            .then(() => setDisableSubmit(false))
            .then(() => closeModal(e))
            .catch(errors => setErrors(errors.errors))
            .then(() => dispatch(loadHomeAlbums()))
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


    const fileInputContent = !songFile
        ? (
            <div
                className='file-input-body'
                onClick={() => musicFileRef.current.click()}
            >
                <i className={`fal fa-music-alt music-icon icon ${isHovered ? 'active' : ''}`}></i>
                {isHovered && <p className='file-message'>Choose Audio File</p>}
            </div>
        )
        : (
            <div
                className='file-input-body'
                onClick={() => !imageUrl && imageFileRef.current.click()}
            >
                {!imageUrl
                    ? <i className={`fal fa-image image-icon icon ${isHovered ? 'active' : ''}`}></i>
                    : <img alt='Art preview' src={imageUrl} />
                }
                {isHovered && !imageUrl && <p className='file-message'>Choose Artwork (optional)</p>}
            </div>
        )

    const albumOption = albumInput === 'create new'
        ? (
            <>
                <label>New album name</label>
            <div className='input-container'>
                <input
                    type='text'
                    value={showErrors && !albumTitle ? 'Album must have a title!' : albumTitle}
                    onChange={e => setAlbumTitle(e.target.value)}
                />

                {albumTitle.length > 45 && (
                    <div className={`word-counter ${errors.albumTitle ? 'active' : ''}`}>{albumTitle.length}/50</div>
                )}
            </div>

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
        <form className='songFile-upload-form form' onSubmit={handleSubmit}>
            <i onClick={closeModal} className='fal fa-times close-icon'></i>

            <div
                className='file-input-container'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >

                {fileInputContent}
                <div className='file-input-footer'>
                    <div>
                        <i className='fal fa-file-music sm-icon'></i>
                        <i className={`fal fa-check check sm-icon ${songFile ? 'active' : ''}`}></i>
                    </div>
                    <div>
                        <i className='fal fa-file-image sm-icon'></i>
                        <i className={`fal fa-check check sm-icon ${image ? 'active' : ''}`}></i>
                    </div>
                </div>
            </div>



            <div className='form-content'>
                <label>Title</label>
                <div className='input-container'>

                    <input
                        type='text'
                        value={showErrors && !title ? 'Song must have a title!' : title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {title.length > 45 && (
                        <div className={`word-counter ${errors.title ? 'active' : ''}`}>{title.length}/50</div>
                    )}
                </div>
                <label>Artist</label>
                <div className='input-container'>

                    <input
                        type='text'
                        value={showErrors && !artist ? 'Song must have an artist!' : artist}
                        onChange={e => setArtist(e.target.value)}
                    />
                    {artist.length > 45 && (
                        <div className={`word-counter ${errors.artist ? 'active' : ''}`}>{artist.length}/50</div>
                    )}
                </div>
                {albumOption}
                {/* <div className='upload-form radio-container'>
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
                </div> */}

                <button
                    type='submit'
                    style={{
                        opacity: disableSubmit ? .5 : 1,
                        cursor: disableSubmit ? 'default' : 'pointer'
                    }} >{isLoading ? 'Submitting...' : 'Submit'}
                </button>
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
                    accept='image/png, image/jpeg, image/png, image/jpeg'
                    ref={imageFileRef}
                    style={{ display: 'none' }}
                />
            </div>


        </form>
    )
}
