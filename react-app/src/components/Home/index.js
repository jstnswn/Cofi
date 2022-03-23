import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import AlbumPlayer from '../AlbumPlayer';
import SongPlayer from '../SongPlayer';
import './Home.css';
import HomeSidebar from './HomeSidebar';
import TileCarousel from '../TileCarousel';
import { getNewAlbumsArray, getNewSongsArray, getTopAlbumsArray } from '../../store/home';

export default function Home() {
    const [homeDisplay, setHomeDisplay] = useState('albums');
    const homeItems = useSelector(({ home }) => home);
    const newSongs = useSelector(getNewSongsArray);
    const newAlbums = useSelector(getNewAlbumsArray);
    const featuredAlbum = homeItems.featuredAlbum;
    const featuredSongs = Object.values(homeItems.featuredSongs)
    const topAlbums = useSelector(getTopAlbumsArray);

    // useEffect(() => {

    // }, [])

    // console.log()
    let homeContent;
    if (homeDisplay === 'albums') {
        homeContent = (
            <>
                <h2>Featured Album</h2>
                <AlbumPlayer album={featuredAlbum} />
                <h2>New Albums</h2>
                <TileCarousel content={newAlbums} option='albums' identifier='newAlbums'/>
                <h2>Top Albums</h2>
                <TileCarousel content={topAlbums} option='albums'identifier='topAlbums'/>
            </>
        )
    } else if (homeDisplay === 'songs') {
        homeContent = (
            <>
                <h2>Featured Songs</h2>
                <div className='featured-songs-container'>
                    {featuredSongs.map((song, idx) => (
                        <SongPlayer key={idx} song={song}/>

                    ))}
                </div>
                <h2>New Songs</h2>
                <TileCarousel content={newSongs} option='songs'/>
            </>
        )
    }

    return (
        <div id='home-wrapper'>
            <div className='main-wrapper'>
                {homeContent}
            </div>

            <HomeSidebar setHomeDisplay={setHomeDisplay} homeDisplay={homeDisplay}/>
        </div>
    )
};
