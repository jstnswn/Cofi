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

    // Temp order:
    const orderedPlaylists = [...playlists].reverse();

    let emptyClassName;

    if ((option === 'album' && !albums.length) ||
        (option === 'playlist' && !playlists.length)) {
        emptyClassName = 'empty';
    }

    return (
        <>
            <div className='library-album-body-header'></div>
            <div className='library-body-container'>

                <div className={`library-albums-body-container ${emptyClassName}`}>

                    {option === 'album'
                        ? (
                            albums.length > 0
                                ? albums.map((album, idx) => (
                                    <AlbumItem user={user} key={idx} album={album} idx={idx} option={option} />))
                                : (
                                    <div className='placeholder-message album'>
                                        <h3>You don't have any albums in your library,</h3>
                                        <h4>Create a new album and fill up your collection!</h4>
                                    </div>
                                )
                        )

                        : (
                            playlists.length > 0
                                ? orderedPlaylists.map((album, idx) => (
                                    <AlbumItem user={user} key={idx} album={album} idx={idx} option={option} />))
                                : (
                                    <div className='placeholder-message album'>
                                        <h3>You don't have any playlists.</h3>
                                        <h4>Create a new playlists, then navigate to songs to fill it up!</h4>
                                    </div>
                                )
                        )
                    }
                </div>
            </div>
        </>
    )
}
