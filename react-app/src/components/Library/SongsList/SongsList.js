import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSong } from '../../../store/active';
import ListItem from './ListItem';

export default function SongsList({ song }) {
    return song.albums?.length
            ? (song.albums.map((album, idx) => <ListItem key={idx} song={song} album={album} idx={idx} />))
            : (<ListItem song={song}/>)
}
