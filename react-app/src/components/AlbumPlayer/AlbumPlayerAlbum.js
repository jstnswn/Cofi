import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createAlbumLike, deleteAlbumLike } from '../../store/session';
import placeHolderImage from '../../assets/black-square.png'

export default function AlbumPlayerAlbum({ album }) {
    const history = useHistory();
    const dispatch = useDispatch()
    const [hovered, setHovered] = useState(false);

    const [loaded, setLoaded] = useState(false);

    const user = useSelector(({ session }) => session.user);

    const likedAlbumIds = user.liked.album_ids;

    const likeAlbum = () => dispatch(createAlbumLike(album.id));
    const unlikeAlbum = () => dispatch(deleteAlbumLike(album.id));

    let likeIconClass;
    let toggleLike;

    if (likedAlbumIds.includes(album?.id)) {
        likeIconClass = 'fas fa-heart';
        toggleLike = unlikeAlbum;
    } else {
        likeIconClass = 'far fa-heart';
        toggleLike = likeAlbum;
    }

    return (
        <div
            className='album-player-album'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className='album-player-image-container'>
                <img
                    className='album-player-image'
                    src={placeHolderImage}
                    alt='placeholder'
                    style={loaded ? {display: 'none'} : {}}
                />
                <img
                    className='album-player-image'
                    alt='album cover'
                    src={album?.image_url}
                    onClick={() => history.push(`/album/${album.id}`)}
                    onLoad={() => setLoaded(true)}
                    style={loaded ? {} : {display: 'none'}}
                />
                <div className='icon-container'>
                    {hovered && <i onClick={toggleLike} className={likeIconClass}></i>}

                </div>
            </div>
        </div>
    )
}
