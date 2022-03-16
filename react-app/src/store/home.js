const LOAD_NEW_SONGS = 'home/LOAD_SONGS';
const LOAD_FEATURED_SONGS = 'home/LOAD_FEATURED_SONGS';
const LOAD_SONG = 'home/LOAD_SONG'
const LOAD_ALBUMS = 'home/LOAD_ALBUMS';
const LOAD_FEATURED_ALBUM = 'home/LOAD_FEATURED_ALBUM';
const LOAD_NEW_ALBUMS = 'home/LOAD_NEW_ALBUMS';

// Action Creators
const loadSongs = (songs) => {
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
}
// Thunks

export const getFeaturedSongs = () => async dispatch => {
    // Featured album currently returns a random album from 10 most recent
    const res = await fetch('/api/songs/featured');

    if (res.ok) {
        const data = await res.json();
        dispatch(loadFeaturedSongs(data.songs));
    } else {
        const error = await res.json();
        return error.error;
    }
}

export const getNewSongs = (amount) => async dispatch => {
    if (!amount) amount = 15;

    const res = await fetch(`/api/songs/new/${amount}`);

    if (res.ok) {
        const data = await res.json()
        dispatch(loadSongs(data.songs))
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
export const getNewSongsArray = state => Object.values(state.home.newSongs);
export const getFeaturedAlbumArray = state => Object.values(state.home.featuredAlbum);

// Promises
export const loadHome = () => async dispatch => {
    await Promise.all([
        dispatch(getFeaturedSongs()),
        // dispatch(getNewSongs()),
        dispatch(getFeaturedAlbum()),
        // dispatch(getNewAlbums()),
    ]);
}

// Reducer
const initialState = {
    featuredAlbum: {},
    newAlbums: [],
    featuredSongs: [],
    newSongs: [],

};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_NEW_SONGS:
            return {
                ...state,
                newSongs: action.songs
            }

        case LOAD_FEATURED_SONGS:
            return {
                ...state,
                featuredSongs: action.songs
            }

        case LOAD_FEATURED_ALBUM:
            return {
                ...state,
                featuredAlbum: action.album
            }

        case LOAD_NEW_ALBUMS:
            return {
                ...state,
                newAlbums: action.albums
            }

        default:
            return state;
    };
};
