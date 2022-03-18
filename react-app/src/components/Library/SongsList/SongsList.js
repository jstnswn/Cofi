import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSong } from '../../../store/active';

export default function SongsList({ song }) {
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const playSong = () => {
        dispatch(setSong(song));
    };

    const openDropdown = () => setShowMenu(true);

    useEffect(() => {
        if (!showMenu) return;

        const closeDropdown = () => setShowMenu(false);

        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener('click', closeDropdown);

    }, [showMenu])


    const songList = song.albums?.length
        ? (
            song.albums.map((album, idx) => (
                <div
                    key={idx} className='list-box'
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >

                    <div className='song-list library-list'>
                        <img alt='cover art' className='list-image' src={song.image_url} /> <span onClick={playSong} className='item'>{song.title}</span>
                    </div>
                    <div className='artist-list library-list'>
                        <p className='item'>{song.artist.name}</p>
                    </div>
                    <div className='album-list library-list'>
                        <p className='item'>{album.title}</p>
                    </div>

                    <i className={`fa-solid fa-ellipsis song-options ${hovered ? 'active' : ''}`} onClick={openDropdown}></i>
                </div>
            )))
        : (

            <div
                className='list-box'
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >

                <div key={song.id} className='song-list library-list'>
                    <img alt='cover art' className='list-image' src={song.image_url} /> <span onClick={playSong} className='item'>{song.title}</span>
                </div>
                <div className='artist-list library-list'>
                    <p className='item'>{song.artist.name}</p>
                </div>
                <div className='album-list library-list'>
                    --
                </div>

                <i className={`fa-solid fa-ellipsis song-options ${hovered ? 'active' : ''}`} onClick={openDropdown}></i>
            </div>
        )

    return (
        <>
            {songList}
            {showMenu && (
                <div className='library-list-dropdown'>
                    <ul>
                        <li>Edit Song</li>
                        <li>Delete Song</li>
                    </ul>
                </div>
            )}
        </>
    )
}
