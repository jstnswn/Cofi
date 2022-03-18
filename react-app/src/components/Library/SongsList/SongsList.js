import React from 'react'
import ListItem from './ListItem';

export default function SongsList({ song }) {
    return song.albums?.length
            ? (song.albums.map((album, idx) => <ListItem key={idx} song={song} album={album}/>))
            : (<ListItem song={song}/>)
}
