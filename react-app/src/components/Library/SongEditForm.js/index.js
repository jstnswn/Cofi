import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadHome } from '../../../store/home';
import { patchSong } from '../../../store/library/librarySongs';
import { getLibraryAlbumsArray } from '../../../store/library/libraryAlbums';


export default function SongEditForm({ closeModal, song, album }) {
    const dispatch = useDispatch();
    const libraryAlbums = useSelector(getLibraryAlbumsArray);
    const userAlbums = useSelector(({ session }) => session.user.albums);

    const [title, setTitle] = useState(song.title);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [songFile, setSongFile] = useState(null);
    // const [albumId, setAlbumId] = useState(album ? album.id : -1);
    const [albumTitle, setAlbumTitle] = useState('')
    const [albumInput, setAlbumInput] = useState(album ? album.id : '')
    // const [albumName]
    const [artist, setArtist] = useState(song.artist.name);
    const [isPrivate, setPrivate] = useState(song.private);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [inputToggle, setInputToggle] = useState('image');



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
            fromAlbumId: album?.id,
            // toAlbumId: albumInput
        };

        if (typeof albumInput === 'number') payload.toAlbumId = albumInput;
        else payload.toAlbumId = null;

        dispatch(patchSong(payload))
            .then(() => setDisableSubmit(false))
            .then(() => closeModal(e))
            .catch(errors => setErrors(errors.errors))
            .then(() => dispatch(loadHome()))
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
            <div
                className='file-input-body'
                onClick={() => musicFileRef.current.click()}
            >
                {!songFile
                    ?
                        <i className={`fal fa-music-alt music-icon icon ${isHovered ? 'active' : ''}`}></i>

                        : <i className='fal fa-check check icon lg'></i>
                    }

                    {isHovered && !songFile && <p className='file-message'>Choose Audio File</p>}
            </div>
        )
        : (
            <div
                className='file-input-body'
                onClick={() => imageFileRef.current.click()}
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
                        value={albumTitle}
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
                    // defaultValue={{value: albumId}}
                    value={albumInput}
                    onChange={e => setAlbumInput(e.target.value)}
                >
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
            {/* <h2>Edit Song</h2> */}

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
                        {/* <i className={`fal fa-check check sm-icon ${song ? 'active' : ''}`}></i> */}
                    </div>
                    <div>
                        <i onClick={() => setInputToggle('image')} className={`fal fa-image sm-icon toggle ${inputToggle === 'image' ? 'active' : ''}`}></i>
                        {/* <i className={`fal fa-check check sm-icon ${image ? 'active' : ''}`}></i> */}
                    </div>
                </div>
            </div>

            <div className='form-content'>
                <label>Song Name</label>
                <div className='input-container'>
                    <input
                        type='type'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                </div>

                <label>Artist</label>
                <div className='input-container'>
                    <input
                        type='text'
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                    />

                </div>
                {albumOption}
                {/* <label>Album</label>
                <div className='input-container'>
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

                </div> */}
                {/* <div className='upload-form radio-container'>

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

                </div> */}

                {/* Hidden inputs */}
                <input
                    type='file'
                    onChange={e => setSongFile(e.target.files[0])}
                    accepted='aduio/mpeg, audio/mp3'
                    ref={musicFileRef}
                    style={{ display: 'none' }}
                />
                <input
                    type='file'
                    onChange={e => setImageFile(e.target.files[0])}
                    accepted='image/png, image/jpeg, image/jpg'
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
