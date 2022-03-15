import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { loadHome } from '../../store/home';

export default function Home() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(loadHome())
            setLoaded(true)
        })()
    }, [dispatch]);

    return loaded && (
        <>
            <div className='logo-container'>
                <h1 className='title'>co-fi</h1>
            </div>
            <div className='main-wrapper'>
                <h2>Featured</h2>
                {/* <AlbumPlayer /> */}
                <h2>New Albums</h2>
                {/* <NewAlbums /> */}
            </div>
            <div className='sidebar'></div>
        </>
    )
}
