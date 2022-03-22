import React from 'react'
import AlbumItem from './AlbumItem';
import './AlbumBody.css';
import { useSelector } from 'react-redux';
import { orderContent } from '../../../utils';
import { getPlaylistsArray } from '../../../../store/playlists';

export default function AlbumsBody({ user, option }) {
    const library = useSelector(({ library }) => library);
    const playlists = useSelector(getPlaylistsArray);
    const albums = orderContent(library.albums);
    // const albums = Object.values(library.albums.byIds);

    return (
        <>
                <div className='library-album-body-header'></div>
            <div className='library-body-container'>

                <div className='library-albums-body-container'>

                    { option === 'album'
                        ? albums.map((album, idx) => (
                            <AlbumItem user={user} key={idx} album={album} idx={idx} option={option}/>
                        ))
                        : playlists.map((album, idx) => (
                            <AlbumItem user={user} key={idx} album={album} idx={idx} option={option}/>
                        ))
                }
                </div>
            </div>
        </>
    )
}
