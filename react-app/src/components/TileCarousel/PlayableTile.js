import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadSongAndSetQueue } from '../../store/active';
import { createAlbumLike, createSongLike, deleteAlbumLike, deleteSongLike } from '../../store/session';
import './PlayableTile.css';

export default function PlayableTile({ item, option }) {
    const history = useHistory();
    const dispatch = useDispatch()
    const [hovered, setHovered] = useState();
    const user = useSelector(({ session }) => session.user);
    const likedSongIds = user.liked.song_ids;
    const likedAlbumIds = user.liked.album_ids;

    const likeSong = () => dispatch(createSongLike(item.id));
    const unlikeSong = () => dispatch(deleteSongLike(item.id));
    const likeAlbum = () => dispatch(createAlbumLike(item.id));
    const unlikeAlbum = () => dispatch(deleteAlbumLike(item.id));

    let song;
    let likeIconClass;
    let toggleLike;

    if (option === 'songs') {
        song = item

        if (likedSongIds.includes(item.id)) {
            likeIconClass = 'fas fa-heart';
            toggleLike = unlikeSong;

        } else {
            likeIconClass = 'far fa-heart';
            toggleLike = likeSong;
        }

    } else if (option === 'albums') {
        song = item.songs[0]

        if (likedAlbumIds.includes(item.id)) {
            likeIconClass = 'fas fa-heart';
            toggleLike = unlikeAlbum;
        } else {
            likeIconClass = 'far fa-heart';
            toggleLike = likeAlbum;
        }
    }


    const handleAction = () => {
        if (option === 'albums') history.push(`/album/${item.id}`)
        else dispatch(loadSongAndSetQueue(song));
    }

    return (
        <div
            className='playable-tile'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className='tile-image-container' onClick={handleAction}>

                <img alt='content art' className='tile-art' src={item.image_url} />

            </div>
            <div className='tile-footer'>
                <div className='info-container'>
                    <div className='item-title'>{item.title}</div>
                    <div className='tile-artist'>{item.artist?.name}</div>

                </div>
                <div className='icon-container'>
                    {hovered && <i onClick={toggleLike} className={likeIconClass}></i>}
                </div>
            </div>
        </div>
    )
}
