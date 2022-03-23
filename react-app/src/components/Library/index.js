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
import { getPlaylistsArray } from '../../store/playlists';
// import SongsList from './SongsBody';

export default function Library() {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);
    const libraryItems = useSelector(({ library }) => library);

    const albums = useSelector(getLibraryAlbumsArray);
    const playlists = useSelector(getPlaylistsArray);

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
                    <AlbumsBody user={user} option='album' />
                </Route>
                <Route path={`/library/${user.username}/songs`} exact={true}>
                    <SongsBody option='song' />
                </Route>
                <Route path={`/library/${user.username}/albums/:albumId`} exact={true}>
                    <SongsBody option='album' />
                </Route>
                <Route path={`/library/${user.username}/playlists`} exact={true}>
                    <AlbumsBody user={user} option='playlist' />
                </Route>
                <Route path={`/library/${user.username}/playlists/:playlistId`} exact={true}>
                    <SongsBody option='playlist' />
                </Route >
                {/* <Route >
                    <SongsBody option='song' />
                </Route> */}


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
