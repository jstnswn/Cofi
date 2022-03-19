import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { getLibraryAlbumsArray, getLibrarySongsArray, loadLibrary } from '../../store/library';
import AlbumsBody from './AlbumsBody';
import './Library.css';
import LibraryHeader from './LibraryHeader';
import LibrarySidebar from './LibrarySidebar';
import SongsBody from './SongsBody';
// import SongsList from './SongsBody';

export default function Library() {
    const dispatch = useDispatch();
    const user = useSelector(({ session }) => session.user);
    const libraryItems = useSelector(({ library }) => library);
    // const songs = useSelector(getLibrarySongsArray);
    const albums = useSelector(getLibraryAlbumsArray);
    // const history = useHistory();
    // const location = useLocation();

    const [isLoaded, setIsLoaded] = useState(false);

    // const match = matchPath(history.location.pathname, {
    //     path: '/library/:user/albums/:albumId'
    // });

    // const albumId = match?.params?.albumId;
    // let headerUrl;
    // let headerTitle

    // if (isLoaded && albumId) {

    //     headerUrl = libraryItems.albums.byIds[albumId].image_url;
    //     headerTitle = libraryItems.albums.byIds[albumId].title;
    // } else {
    //     headerUrl = 'https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png';
    //     headerTitle = 'Your Collection'
    // }

    // const headerUrl = isLoaded && match?.params.albumId
    //     ? libraryItems.albums.byIds[match.params.albumId].image_url
    //     : 'https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png';

    // const headerTitle =




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
                    {/* <div className='library-body-header'>
                        <p className='song-title column-title'>Title</p>
                        <p className='song-artist column-title'>Artist</p>
                        <p className='song-album column-title'>Album</p>
                    </div>
                    <div className='library-body-container'>
                        {songs.map((song, idx) => (

                            <SongsList key={idx} song={song}/>
                        ))}
                    </div> */}
                    {/* {libraryBody} */}
                    {routes}

                </div>
            </div>
            <LibrarySidebar />
        </div>
    )
}
