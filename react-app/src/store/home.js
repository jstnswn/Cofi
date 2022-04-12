import { normalize, orderIds } from "./utils";

const SET_LOADED = 'home/SET_LOADED';

const LOAD_NEW_SONG = 'home/NEW_LOAD_SONG';
const LOAD_NEW_SONGS = 'home/LOAD_NEW_SONGS';
const LOAD_FEATURED_SONGS = 'home/LOAD_FEATURED_SONGS';
const LOAD_FEATURED_ALBUM = 'home/LOAD_FEATURED_ALBUM';
const LOAD_TOP_ALBUMS = 'home/LOAD_TOP_ALBUMS';
const LOAD_NEW_ALBUMS = 'home/LOAD_NEW_ALBUMS';
const LOAD_NEW_ALBUM = 'home/LOAD_NEW_ALBUM';

const CLEAN_HOME = 'home/CLEAN_HOME';
const CLEAN_ALBUMS = 'home/CLEAN_ALBUMS';

// Action Creators
export const setLoaded = () => {
    return {
        type: SET_LOADED
    }
}

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

const loadTopAlbums = (albums) => {
    return {
        type: LOAD_TOP_ALBUMS,
        albums
    }
};

export const loadNewAlbum = (album) => {
    return {
        type: LOAD_NEW_ALBUM,
        album
    };
};

const loadFeaturedSongs = (songs) => {
    return {
        type: LOAD_FEATURED_SONGS,
        songs
    }
};

export const cleanHome = () => {
    return {
        type: CLEAN_HOME
    };
};

const cleanHomeAlbums = () => {
    return {
        type: CLEAN_ALBUMS
    }
};


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

export const getTopAlbums = (amount) => async dispatch => {
    if (!amount) amount = 15;
    const res = await fetch(`/api/albums/top/${amount}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadTopAlbums(data.albums));
    } else {
        const error = await res.json();
        return error.error;
    }
};

// Helper Functions
export const getTopAlbumsArray = state => {
    const orderedIds = state.home.topAlbums.order;
    return orderedIds.map(id => state.home.topAlbums.byIds[id]);
}

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
        dispatch(getTopAlbums())
    ]);
};

export const loadHomeAlbums = () => async dispatch => {
    await Promise.all([
        dispatch(cleanHomeAlbums()),
        dispatch(getFeaturedAlbum()),
        dispatch(getNewAlbums()),
        dispatch(getTopAlbums())
    ])
};

// Reducer
const initialState = {
    isLoaded: false,
    featuredAlbum: {},
    newAlbums: {
        byIds: {},
        order: []
    },
    topAlbums: {
        byIds: {},
        order: []
    },
    featuredSongs: {},
    newSongs: {
        byIds: {},
        order: []
    },
};

export default function reducer(state = initialState, action) {
    let normalizedData;
    let orderedIds;

    switch (action.type) {
        case SET_LOADED:
            return {
                ...state,
                isLoaded: true
            }
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

        case LOAD_NEW_ALBUM:
            return {
                ...state,
                newAlbums: {
                    byIds: {
                        ...state.newAlbums.byIds,
                        [action.album.id]: action.album
                    },
                    order: [action.album.id, ...state.newAlbums.order]
                }
            }

        case LOAD_TOP_ALBUMS:
            normalizedData = normalize(action.albums);
            orderedIds = orderIds(action.albums);
            return {
                ...state,
                topAlbums: {
                    byIds: normalizedData,
                    order: orderedIds
                }
            }

        case CLEAN_HOME:
            return initialState;

        case CLEAN_ALBUMS:
            return {
                ...state,
                featuredAlbum: {},
                newAlbums: {
                    byIds: {},
                    order: []
                },
            }

        default:
            return state;
    };
};
