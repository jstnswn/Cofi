import React from 'react'
import SongItem from './SongItem';
import './SongBody.css';
import { useParams } from 'react-router-dom';
import { orderContent, sortSongsArray } from '../../../utils';
import { useSelector } from 'react-redux';
import { getPlaylistsArray } from '../../../../store/playlists';

export default function SongsBody({ option }) {
    const { albumId, playlistId } = useParams();
    const libraryItems = useSelector(({ library }) => library);
    const playlists = useSelector(({ playlists }) => playlists);
    let songs;

    if (albumId) {
        songs = sortSongsArray(libraryItems.albums.byIds[albumId].songs)
    } else if (playlistId) {
        songs = playlists[playlistId].songs
        console.log('songs: ', songs)
    } else {
        songs = orderContent(libraryItems.songs);
    }

    return (
        <>
            <div className='library-song-body-header'>
                <p className='song-title column-title'>Title</p>
                <p className='song-artist column-title'>Artist</p>
                <p className='song-album column-title'>Album</p>
            </div>

            <div className='library-body-container'>
                <div className='library-songs-body-container'>
                    {songs.map((song, idx) => <SongItem key={idx} playlistId={playlistId} song={song} option={option}/>)}
                </div>

            </div>
        </>
    )
}
