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

    let placeholderWord;
    let placeholderMessage;

    if (albumId) {
        songs = sortSongsArray(libraryItems.albums.byIds[albumId].songs);
        placeholderWord = 'album';
        placeholderMessage = 'Pick songs to move to album, or upload new music.'

    } else if (playlistId) {
        songs = playlists[playlistId].songs
        placeholderWord = 'playlist';
        placeholderMessage = 'Navigate to your songs to add music.'
    } else {
        songs = orderContent(libraryItems.songs);
        placeholderWord = 'collection';
        placeholderMessage = 'Upload some music and fill up your library!'
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
                    {songs.length === 0 && (
                        <div className='placeholder-message'>
                            <h3>You don't have any songs in your {placeholderWord}.</h3>
                            <h4>{placeholderMessage}</h4>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}
