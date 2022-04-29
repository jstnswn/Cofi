import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { loadLibrary, setLoaded } from '../../store/library';
import AlbumsBody from './LibraryBody/AlbumsBody';
import './Library.css';
import LibraryHeader from './LibraryHeader';
import LibrarySidebar from './LibrarySidebar';
import SongsBody from './LibraryBody/SongsBody';
import { getPlaylists } from '../../store/playlists';
import MainSidebar from '../MainSidebar';

export default function Library() {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);
    const libraryItems = useSelector(({ library }) => library);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (libraryItems.isLoaded) {
            setIsLoaded(true);
            return;
        }
        (async () => {
            await dispatch(setLoaded());
            await dispatch(loadLibrary())
            await dispatch(getPlaylists());
            setIsLoaded(true);
        })()

    }, [dispatch, libraryItems])

    const routes = (
        <>
            <Switch>

                <Route path={`/library/${user.username}/albums`} exact={true}>
                    <AlbumsBody user={user} option='album' />
                </Route>
                <Route path={`/library/${user.username}/songs`} exact={true}>
                    <SongsBody option='song' />
                </Route>
                <Route path={`/library/${user.username}/albums/liked`} exact={true}>
                    <AlbumsBody option='liked' />
                </Route>
                <Route path={`/library/${user.username}/albums/:albumId`} exact={true}>
                    <SongsBody option='album' />
                </Route>
                <Route path={`/library/${user.username}/playlists`} exact={true}>
                    <AlbumsBody user={user} option='playlist' />
                </Route>
                <Route path={`/library/${user.username}/playlists/:playlistId`}>
                    <SongsBody option='playlist' />
                </Route>
                <Route path={[`/library/${user.username}`, '/library']} exact={true}>
                    <Redirect to={`/library/${user.username}/songs`}/>
                </Route>

                <Route path={`/library/${user.username}/songs/liked`} exact={true}>
                    <SongsBody option='liked'/>
                </Route>
                <Route path={`/library/${user.username}/albums/liked`} exact={true}>
                    <AlbumsBody option='liked'/>
                </Route>

                <Route path='/library'>
                    <Redirect to={`/library/${user.username}/songs`} />
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

            <div className='sidebar-container'>
                <MainSidebar />
                <LibrarySidebar />
            </div>
        </div>
    )
}
