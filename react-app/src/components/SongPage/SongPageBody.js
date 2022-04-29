import React, { useRef } from 'react'
import Song from './Song';

export default function SongPageBody({ songs }) {
    const scrollContainer = useRef(null);

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
                    {songs.map((song, idx) => <Song key={idx} idx={idx} song={song} last={last} />)}
                    {songs.length === 0 && (
                        <div className='placeholder-message'>
                            <h3>This album has no songs.</h3>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}
