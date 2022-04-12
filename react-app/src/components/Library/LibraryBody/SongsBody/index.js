import React, { useRef } from 'react'
import SongItem from './SongItem';
import './SongBody.css';
import { Redirect, useParams } from 'react-router-dom';
import { getOrderedLiked, orderContent, sortSongsArray } from '../../../utils';
import { useSelector } from 'react-redux';

export default function SongsBody({ option }) {
    const { albumId, playlistId } = useParams();
    const libraryItems = useSelector(({ library }) => library);
    const playlists = useSelector(({ playlists }) => playlists);
    const user = useSelector(({ session }) => session.user);
    const likedIds = user.liked.song_ids;
    let songs;

    const scrollContainer = useRef(null);

    const albumIds = libraryItems.albums.order;

    if (albumId && !albumIds.includes(Number(albumId))) {
        return <Redirect to={`/library/${user.username}/songs`} />
    }



    if (playlistId && !playlists[Number(playlistId)]) {
        return <Redirect to={`/library/${user.username}/songs`} />
    }

    let placeholderWord;
    let placeholderMessage;
    if (option === 'liked') {
        placeholderWord = 'liked collection';
        placeholderMessage = 'Liked songs will be displayed here.'

        if (libraryItems.songs.order.length) {
            songs = getOrderedLiked(likedIds, libraryItems.songs.byIds)
        }
    }

    else if (albumId) {
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

    const last = songs?.length - 1;

    return (
        <>
            <div className='library-song-body-header'>
                <p className='song-title column-title'>Title</p>
                <p className='song-artist column-title'>Artist</p>
                <p className='song-album column-title'>Album</p>
            </div>

            <div ref={scrollContainer} className='library-body-container'>
                <div className='library-songs-body-container'>
                    {songs?.map((song, idx) => <SongItem key={idx} idx={idx} playlistId={playlistId} song={song} option={option} last={last}/>)}
                    {songs?.length === 0 && (
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
