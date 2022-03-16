import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getFeaturedAlbumArray, loadHome } from '../../store/home';
import AlbumPlayer from '../AlbumPlayer';
import './Home.css';
import TileCarousel from './TileCarousel';

export default function Home() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    const homeItems = useSelector(({ home }) => home);
    const featuredAlbum = homeItems.featuredAlbum;


    useEffect(() => {
        (async () => {
            await dispatch(loadHome())
            setLoaded(true)
        })()
    }, [dispatch]);

    return loaded && (
        <div id='home-wrapper'>
            <div className='main-wrapper'>
                <h2>Featured</h2>
                <AlbumPlayer album={featuredAlbum}/>
                <h2>New Albums</h2>
                <TileCarousel content={homeItems.newAlbums}/>
            </div>
            <div className='sidebar'>
                <div className='logo-container'>
                    <h1 className='title'>co-fi</h1>
                </div>
            </div>
        </div>
    )
};
