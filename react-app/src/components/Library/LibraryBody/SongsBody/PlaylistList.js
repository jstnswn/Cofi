import React from 'react'
import { useSelector } from 'react-redux'
import { getPlaylistsArray } from '../../../../store/playlists'

export default function PlaylistList({ song, addSongToPlaylist }) {
    const playlists = useSelector(getPlaylistsArray);
    // const playlistIds = playlists.map(playlist => playlist.id);

    // console.log('playlistIDS', playlistIds)
    return (
        <ul className='album-list-modal'>
            {playlists.map((playlist, idx) => (
               !playlist.song_ids.includes(song.id) && <li onClick={() => addSongToPlaylist(playlist.id)} key={idx}>{playlist.title}</li>
            ))}
        </ul>
    )
}
