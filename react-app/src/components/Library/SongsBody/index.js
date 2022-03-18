import React from 'react'
import ListItem from './SongItem';
import './SongBody.css';

export default function SongsBody({ songs }) {
    // const mainBody = song.albums?.length
    //     ? (song.albums.map((album, idx) => <ListItem key={idx} song={song} album={album} />))
    //     : (<ListItem song={song} />)
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
