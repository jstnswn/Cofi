import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbum } from '../../store/albums';
import MainSidebar from '../MainSidebar';
import Header from './Header'
import Sidebar from './Sidebar';
import SongPageBody from './SongPageBody';

export default function SongPage() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const { albumId } = useParams();
    const albums = useSelector(({ albums }) => albums);

    useEffect(() => {
        if (albums && albums[albumId]) {
            setLoaded(true);
            return
        }
        (async () => {
            await dispatch(getAlbum(albumId))
            setLoaded(true);
        })()
    }, [dispatch, albums, albumId])

    if (!loaded) return null;

    return (
        <div id='library-wrapper'>
            <div className='main-wrapper'>
                <Header album={albums[albumId]} />
                <div id='library-body'>
                    {albums[albumId].songs.length > 0
                        ? <SongPageBody songs={albums[albumId].songs} />
                        : <div className='placeholder-message'>
                            <h3>This album has no songs</h3>
                        </div>
                    }
                </div>
            </div>
            <div className='sidebar-container'>
                <MainSidebar />
                <Sidebar />
            </div>
        </div>
    )
}
