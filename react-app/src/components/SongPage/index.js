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

    // let songs;

    // if (loaded) {
    //     songs = orderContent(albums[albumId].songs);
    // }


    if (!loaded) return null;

    return (
        <div id='library-wrapper'>
            <div className='main-wrapper'>
                <Header album={albums[albumId]} />
                <div id='library-body'>

                    {/* <SongPageBody songs={songs}/> */}

                    {/* <div className='placeholder-message'>
                        <h3>You don't have any songs in your {placeholderWord}.</h3>
                        <h4>{placeholderMessage}</h4>
                    </div> */}
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
