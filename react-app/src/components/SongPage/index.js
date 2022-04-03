import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbum } from '../../store/albums';
import LibrarySidebar from '../Library/LibrarySidebar';
import MainSidebar from '../MainSidebar';
import { orderContent } from '../utils';
import Header from './Header'
import Sidebar from './Sidebar';
import SongPageBody from './SongPageBody';

export default function SongPage() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const { albumId } = useParams();

    useEffect(() => {
        (async () => {
            await dispatch(getAlbum(albumId))
            setLoaded(true);
        })()
    }, [dispatch, albumId])

    const albums = useSelector(({ albums }) => albums);

    let songs;

    console.log('albums: ', albums)
    if (loaded) {
        console.log('ALBUMID: ', albumId)
        songs = orderContent(albums[albumId]);
    }


    if (!loaded) return null;

    return (
        <div id='library-wrapper'>
            <div className='main-wrapper'>
                <Header album={songs[0].album} />
                <div id='library-body'>

                    <SongPageBody songs={songs}/>

                </div>
            </div>

            <div className='sidebar-container'>
                <MainSidebar />
                <Sidebar />
            </div>
        </div>
    )
}
