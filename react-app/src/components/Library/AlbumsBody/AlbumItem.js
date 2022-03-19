import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

export default function AlbumItem({ album, idx, user }) {
    // console.log("album", album)
    const history = useHistory();

    return (
        <div
            className='album-item-container'
            style={{
                gridColumnStart: idx % 4 + 1
            }}
            onClick={() => history.push(`/library/${user.username}/albums/${album.id}`)}
        >

            <div className='tile-image-container'>
                <img alt='album-tile' className='tile-art' src={album.image_url}/>
            </div>

            <div>
                <div className='song-title'>{album.title}</div>
                <div className='tile-artist'>{album.artist.name}</div>

            </div>

        </div>
    )
}
