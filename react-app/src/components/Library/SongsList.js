import React from 'react'

export default function SongsList({ song }) {
    // console.log('song: ', song)

    const songList = song.albums?.length
        ? (
            song.albums.map((album, idx) => (
                <React.Fragment key={idx}>

                    <div  className='song-list library-list'>
                        <img alt='cover art' className='list-image' src={song.image_url} /> <span>{song.title}</span>
                    </div>
                    <div className='artist-list library-list'>
                        {song.artist.name}
                    </div>
                    <div className='album-list library-list'>
                        {album.title}
                    </div>
                </React.Fragment>
            )))
        : (
            <>
                <div key={song.id} className='song-list library-list'>
                   <img alt='cover art' className='list-image' src={song.image_url} /> <span>{song.title}</span>
                </div>
                <div className='artist-list library-list'>
                    {song.artist.name}
                </div>
                <div className='album-list library-list'>
                    --
                </div>
            </>
        )

    return songList;
}
