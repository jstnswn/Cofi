import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

export default function AlbumItem({ album, idx, user }) {
    const history = useHistory();
    const [hovered, setHovered] = useState(false);

    const likedAlbumIds = user.liked.album_ids;

    const likeIconClass = likedAlbumIds.includes(album.id)
        ? 'fas fa-heart'
        : 'far fa-heart'


    return (
        <div
            className='album-item-container'
            style={{
                gridColumnStart: idx % 4 + 1
            }}
            onClick={() => history.push(`/library/${user.username}/albums/${album.id}`)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            <div className='tile-image-container'>
                <img alt='album-tile' className='tile-art' src={album?.image_url}/>
            </div>

            <div className='tile-footer'>
                <div className='info-container'>
                    <div className='song-title'>{album?.title}</div>
                    <div className='tile-artist'>{album?.artist.name}</div>
                </div>
                <div className='icon-container'>
                    {hovered && <i className={likeIconClass}></i>}
                </div>
            </div>

        </div>
    )
}
