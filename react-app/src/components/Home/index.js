import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import AlbumPlayer from '../AlbumPlayer';
import SongPlayer from '../SongPlayer';
import './Home.css';
import HomeSidebar from './HomeSidebar';
import TileCarousel from './TileCarousel';

export default function Home() {
    const [homeDisplay, setHomeDisplay] = useState('albums');
    const homeItems = useSelector(({ home }) => home);
    const featuredAlbum = homeItems.featuredAlbum;

    // console.log()
    let homeContent;
    if (homeDisplay === 'albums') {
        homeContent = (
            <>
                <h2>Featured Albums</h2>
                <AlbumPlayer album={featuredAlbum} />
                <h2>New Albums</h2>
                <TileCarousel content={homeItems.newAlbums} optin='albums'/>
            </>
        )
    } else if (homeDisplay === 'songs') {
        homeContent = (
            <>
                <h2>Featured Songs</h2>
                <div className='featured-songs-container'>
                    {homeItems.featuredSongs.map((song, idx) => (
                        <SongPlayer key={idx} song={song}/>

                    ))}
                </div>
                <h2>New Songs</h2>
                <TileCarousel content={homeItems.newSongs} option='songs'/>
            </>
        )
    }

    return (
        <div id='home-wrapper'>
            <div className='main-wrapper'>
                {homeContent}
            </div>

            <HomeSidebar setHomeDisplay={setHomeDisplay}/>
        </div>
    )
};
