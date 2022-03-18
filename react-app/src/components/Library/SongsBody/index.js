import React from 'react'
import ListItem from './SongItem';
import './SongBody.css';
import { useParams } from 'react-router-dom';

export default function SongsBody({ libraryItems }) {
    // const mainBody = song.albums?.length
    //     ? (song.albums.map((album, idx) => <ListItem key={idx} song={song} album={album} />))
    //     : (<ListItem song={song} />)
// // }

    // const songs = useSelector(getLibrarySongsArray);
    const params = useParams();
    let songs;

    console.log("params: '", params)
    console.log("library items: ', ", libraryItems)

    if (params.albumId) {
        songs = libraryItems.albums.byIds[params.albumId].songs
    } else {
        songs = Object.values(libraryItems.songs.byIds);
    }

    // const params = useParams()
    // console.log(params)
    // if (!songs) {
    //     console.log(libraryItems.albums[Number(params.albumId)])
    //     songs = libraryItems.albums[Number(params.albumId)]
    // }

    return (
        <>
            <div className='library-song-body-header'>
                <p className='song-title column-title'>Title</p>
                <p className='song-artist column-title'>Artist</p>
                <p className='song-album column-title'>Album</p>
            </div>
            <div className='library-songs-body-container'>
                {songs.map((song, idx) => (song.albums?.length
                    ? (song.albums.map((album, idx) => <ListItem key={idx} song={song} album={album} />))
                    : (<ListItem key={idx} song={song} />)))}
            </div>
        </>
    )


    // return song.albums?.length
    //         ? (song.albums.map((album, idx) => <ListItem key={idx} song={song} album={album}/>))
    //         : (<ListItem song={song}/>)
}
