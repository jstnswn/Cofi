import React, { useRef } from 'react'

export default function Album() {
    const scrollContainer = useRef(null);

    return (
        <>
            <div className='library-song-body-header'>
                <p className='song-title column-title'>Title</p>
                <p className='song-artist column-title'>Artist</p>
                <p className='song-album column-title'>Album</p>
            </div>

            <div ref={scrollContainer} className='library-body-container'>
                <div className='library-songs-body-container'>

                </div>

            </div>
        </>
    )
}
