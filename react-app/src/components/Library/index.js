import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { loadLibrary } from '../../store/library';
import { getLibraryAlbumsArray } from '../../store/library/libraryAlbums';
import AlbumsBody from './LibraryBody/AlbumsBody';
import './Library.css';
import LibraryHeader from './LibraryHeader';
import LibrarySidebar from './LibrarySidebar';
import SongsBody from './LibraryBody/SongsBody';
// import SongsList from './SongsBody';

export default function Library() {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);
    const libraryItems = useSelector(({ library }) => library);

    const albums = useSelector(getLibraryAlbumsArray);

    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        (async () => {
            await dispatch(loadLibrary())
            setIsLoaded(true);
        })()

    }, [dispatch])



    const routes = (
        <>
        <Switch>

            <Route path={`/library/${user.username}/albums`} exact={true}>
                <AlbumsBody user={user} albums={albums} />
            </Route>
            <Route path={`/library/${user.username}/songs`} exact={true}>
                <SongsBody libraryItems={libraryItems} />
            </Route>
            <Route path={`/library/${user.username}/albums/:albumId`}>
                <SongsBody libraryItems={libraryItems}/>
            </Route>
            <Route>
                <SongsBody libraryItems={libraryItems} />
            </Route>

        </Switch>
        </>
    )

    return isLoaded && (
        <div id='library-wrapper'>
            <div className='main-wrapper'>
                <LibraryHeader libraryItems={libraryItems} />
                <div id='library-body'>

                        {routes}


                </div>
            </div>
            <LibrarySidebar />
        </div>
    )
}
