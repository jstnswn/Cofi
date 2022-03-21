import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSong } from '../../store/active';
import './PlayableTile.css';

export default function PlayableTile({ item, option }) {
    const dispatch = useDispatch()
    const [hovered, setHovered] = useState();
    const user = useSelector(({ session }) => session.user);
    const likedSongIds = user.liked.song_ids;
    const likedAlbumIds = user.liked.album_ids;

    let song;
    let likeIconClass;

    if (option === 'songs') {
        song = item
        likeIconClass = likedSongIds.includes(item.id)
            ? 'fas fa-heart'
            : 'far fa-heart'

    } else if (option === 'albums') {
        song = item.songs[0]
        likeIconClass = likedAlbumIds.includes(item.id)
            ? 'fas fa-heart'
            : 'far fa-heart'
    }



    const playSong = () => {
        if (song) dispatch(setSong(song));
    }

    return (
        <div
            className='playable-tile'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className='tile-image-container' onClick={playSong}>

                <img alt='content art' className='tile-art' src={item.image_url} />

            </div>
            <div className='tile-footer'>
                <div className='info-container'>
                    <div className='item-title'>{item.title}</div>
                    <div className='tile-artist'>{item.artist?.name}</div>

                </div>
                <div className='icon-container'>
                    {hovered && <i className={likeIconClass}></i>}
                </div>
            </div>
        </div>
    )
}
