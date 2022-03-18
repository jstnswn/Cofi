import { normalize, orderIds } from "./utils";

const LOAD_NEW_SONG = 'home/NEW_LOAD_SONG';
const LOAD_NEW_SONGS = 'home/LOAD_NEW_SONGS';
const LOAD_FEATURED_SONGS = 'home/LOAD_FEATURED_SONGS';
const LOAD_FEATURED_ALBUM = 'home/LOAD_FEATURED_ALBUM';
const LOAD_NEW_ALBUMS = 'home/LOAD_NEW_ALBUMS';

const CLEAN_STORE = 'home/CLEAN_STORE';

// Action Creators
export const loadNewSong = (song) => {
    return {
        type: LOAD_NEW_SONG,
        song
    }
};

const loadNewSongs = (songs) => {
    return {
        type: LOAD_NEW_SONGS,
        songs
    }
};

const loadFeaturedAlbum = (album) => {
    return {
        type: LOAD_FEATURED_ALBUM,
        album
    }
};

const loadNewAlbums = (albums) => {
    return {
        type: LOAD_NEW_ALBUMS,
        albums
    };
};


const loadFeaturedSongs = (songs) => {
    return {
        type: LOAD_FEATURED_SONGS,
        songs
    }
};

const cleanHome = () => {
    return {
        type: CLEAN_STORE
    };
};

// Thunks

export const getFeaturedSongs = () => async dispatch => {
    // Featured album currently returns a random album from 10 most recent
    const res = await fetch('/api/songs/featured');

    if (res.ok) {
        const data = await res.json();
        console.log('featured songs thunk: ', data.songs)
        dispatch(loadFeaturedSongs(data.songs));
    } else {
        const error = await res.json();
        console.log("errors: ', ", error)
        return error.error;
    }
}

export const getNewSongs = (amount) => async dispatch => {
    if (!amount) amount = 15;

    const res = await fetch(`/api/songs/new/${amount}`);

    if (res.ok) {
        const data = await res.json()
        dispatch(loadNewSongs(data.songs))
    } else {
        const error = await res.json();
        return error.error;
    }
};

export const getNewAlbums = (amount) => async dispatch => {
    if (!amount) amount = 15;

    const res = await fetch(`/api/albums/new/${amount}`);

    if(res.ok) {
        const data = await res.json()
        dispatch(loadNewAlbums(data.albums))
    } else {
        const error = await res.json();
        return error.error;
    }
};

export const getFeaturedAlbum = () => async dispatch => {
    // Featured album currently returns a random album from 10 most recent
    const res = await fetch('/api/albums/featured');

    if (res.ok) {
        const data = await res.json();
        dispatch(loadFeaturedAlbum(data.album));
    } else {
        const error = await res.json();
        return error.error;
    }
}

// Helper Functions
// export const getNewSongsArray = state => Object.values(state.home.newSongs);
// export const getFeaturedAlbumArray = state => Object.values(state.home.featuredAlbum);

export const getNewSongsArray = (state) => {
    const orderedIds = state.home.newSongs.order;
    return orderedIds.map(id => state.home.newSongs.byIds[id]);
};

export const getNewAlbumsArray = (state) => {
    const orderedIds = state.home.newAlbums.order;
    return orderedIds.map(id => state.home.newAlbums.byIds[id]);
};

// Bulk Loaders
export const loadHome = () => async dispatch => {
    await Promise.all([
        dispatch(cleanHome()),
        dispatch(getFeaturedSongs()),
        dispatch(getNewSongs()),
        dispatch(getFeaturedAlbum()),
        dispatch(getNewAlbums()),
    ]);
};

// Reducer
const initialState = {
    featuredAlbum: {},
    newAlbums: {
        byIds: {},
        order: []
    },
    featuredSongs: {},
    newSongs: {
        byIds: {},
        order: []
    },
    // update: false

};

export default function reducer(state = initialState, action) {
    let normalizedData;
    let orderedIds;

    switch (action.type) {
        case LOAD_NEW_SONG:
            return {
                ...state,
                newSongs: {
                    byIds: {
                        ...state.newSongs.byIds,
                        [action.song.id]: action.song
                    },
                    order: [action.song.id, ...state.newSongs.order]
                }
            }

        case LOAD_NEW_SONGS:
            normalizedData = normalize(action.songs)
            orderedIds = orderIds(action.songs)
            return {
                ...state,
                newSongs: {
                    byIds: normalizedData,
                    order: orderedIds
                }
            }

        case LOAD_FEATURED_SONGS:
            normalizedData = normalize(action.songs)
            return {
                ...state,
                featuredSongs: normalizedData
            }

        case LOAD_FEATURED_ALBUM:
            return {
                ...state,
                featuredAlbum: action.album
            }

        case LOAD_NEW_ALBUMS:
            normalizedData = normalize(action.albums)
            orderedIds = orderIds(action.albums);
            return {
                ...state,
                newAlbums: {
                    byIds: normalizedData,
                    order: orderedIds
                }
            }

        case CLEAN_STORE:
            return initialState;

        default:
            return state;
    };
};
