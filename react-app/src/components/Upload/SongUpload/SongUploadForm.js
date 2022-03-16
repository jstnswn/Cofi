import React, { useState } from 'react'

export default function SongUploadForm({ closeModal }) {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState(null);


    return (
        <form className='song-upload-form form'>
            <label>Title</label>
            <input
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <label>Artist</label>
            <input
                type='text'
                value={artist}
                onChange={e => setArtist(e.target.value)}
            />
            
        </form>
    )
}
