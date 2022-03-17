import { normalize, orderIds } from "./utils";

const LOAD_NEW_SONG = 'home/LOAD_SONG';
const LOAD_NEW_SONGS = 'home/LOAD_SONGS';
const LOAD_FEATURED_SONGS = 'home/LOAD_FEATURED_SONGS';
const LOAD_FEATURED_ALBUM = 'home/LOAD_FEATURED_ALBUM';
const LOAD_NEW_ALBUMS = 'home/LOAD_NEW_ALBUMS';

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
    console.log('state: ', state)
    const orderedIds = state.home.newSongs.order;
    console.log('orderIDs ', orderedIds)
    return orderedIds.map(id => state.home.newSongs.songs[id]);
};

export const getNewAlbumsArray = (state) => {
    const orderedIds = state.home.newAlbums.order;
    return orderedIds.map(id => state.home.newAlbums.albums[id]);
};

// Promises
export const loadHome = () => async dispatch => {
    await Promise.all([
        dispatch(getFeaturedSongs()),
        dispatch(getNewSongs()),
        dispatch(getFeaturedAlbum()),
        dispatch(getNewAlbums()),
    ]);
}

// Reducer
const initialState = {
    featuredAlbum: {},
    newAlbums: {
        albums: {},
        order: []
    },
    featuredSongs: {},
    newSongs: {
        songs: {},
        order: []
    },

};

export default function reducer(state = initialState, action) {
    let normalizedData;
    let orderedIds;

    switch (action.type) {
        case LOAD_NEW_SONG:
            console.log("state.newSongs.order", state.newSongs.order)
            return {
                ...state,
                newSongs: {
                    songs: {
                        ...state.newSongs.songs,
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
                    songs: normalizedData,
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
                    albums: normalizedData,
                    order: orderedIds
                }
            }

        default:
            return state;
    };
};
