import React from 'react'
import { useSelector } from 'react-redux'
import { getPlaylistsArray } from '../../../../store/playlists'

export default function PlaylistList({ song, addSongToPlaylist }) {
    const playlists = useSelector(getPlaylistsArray);


    return (
        <ul className='album-list-modal'>
            {playlists.map((playlist, idx) => (
               !playlist.song_ids.includes(song.id) &&
                <li
                    onClick={(e) => {e.stopPropagation(); addSongToPlaylist(playlist.id)}}
                    key={idx}>{playlist.title}</li>
            ))}
            {playlists.length === 0 && <li style={{cursor: 'default'}}>You don't have any playlists.</li>}
        </ul>
    )
}
