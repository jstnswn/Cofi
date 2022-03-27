import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createAlbumLike, deleteAlbumLike } from '../../../../store/session';

export default function AlbumItem({ album, idx, user, option }) {
    const dispatch = useDispatch()
    const history = useHistory();
    const [hovered, setHovered] = useState(false);

    const likeAlbum = (e) => {
        e.stopPropagation();
        dispatch(createAlbumLike(album.id));
    }
    const unlikeAlbum = (e) => {
        e.stopPropagation();
        dispatch(deleteAlbumLike(album.id));
    }

    const likedAlbumIds = user.liked.album_ids;

    let likeIconClass;
    let toggleLike;


    if (likedAlbumIds?.includes(album.id)) {
        likeIconClass = 'fas fa-heart';
        toggleLike = unlikeAlbum;
    } else {
        likeIconClass = 'far fa-heart';
        toggleLike = likeAlbum;
    }

    const handleClick = () => {
        if (option === 'album') history.push(`/library/${user.username}/albums/${album.id}`);
        if (option === 'playlist') history.push(`/library/${user.username}/playlists/${album.id}`);
        if (option === 'liked') history.push(`/album/${album.id}`);
    }


    return (
        <div
            className='album-item-container'
            style={{
                gridColumnStart: idx % 4 + 1
            }}
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            <div className='tile-image-container'>
                <img alt='album-tile' className='tile-art' src={album?.image_url}/>
            </div>

            <div className='tile-footer'>
                <div className='info-container'>
                    <div className='song-title'>{album?.title}</div>
                    <div className='tile-artist'>{album?.artist?.name}</div>
                </div>
                <div className='icon-container'>
                    {hovered && option !== 'playlist' && <i onClick={toggleLike} className={likeIconClass}></i>}
                </div>
            </div>

        </div>
    )
}
