import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaylists, getPlaylistsArray } from '../../../../store/playlists'

export default function PlaylistList({ song, addSongToPlaylist }) {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const playlists = useSelector(getPlaylistsArray);

    useEffect(() => {
        (async() => {
            await dispatch(getPlaylists());
            setLoaded(true);
        })()
    }, [dispatch])

    if (!loaded) return null;

    return loaded && (
        <ul className='album-list-modal'>
            <li>Playlists</li>
            {playlists.map((playlist, idx) => (
               !playlist.song_ids.includes(song.id) &&
                <li
                    onClick={(e) => {e.stopPropagation(); addSongToPlaylist(playlist.id, e)}}
                    key={idx}>{playlist.title}</li>
            ))}
            {playlists.length === 0 && <li style={{cursor: 'default'}}>You don't have any playlists.</li>}
        </ul>
    )
}
