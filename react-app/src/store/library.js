import { getImageUrl, normalize, orderIds } from "./utils";

const LOAD_SONGS = 'library/LOAD_SONGS';
const LOAD_SONG = 'library/LOAD_SONG';
const LOAD_ALBUMS = 'librarye/LOAD_ALBUMS';
const LOAD_ALBUM = 'library/LOAD_ALBUM';

// Action Creators
const loadSong = (song) => {
    return {
        type: LOAD_SONG,
        song
    }
}

const loadSongs = (songs) => {
    return {
        type: LOAD_SONGS,
        songs
    }
}

// Thunks
export const uploadSong = (payload) => async dispatch => {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('artist', payload.artist);
    formData.append('song', payload.song);
    // formData.append('image', payload.image);
    formData.append('private', payload.private);

    let imageUrl;
    if (payload.image) {
        imageUrl = await getImageUrl(payload.image);
        formData.append('image_url', imageUrl);
    }

    const res = await fetch('/api/songs', {
        method: 'POST',
        body: formData
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadSong(data.song));
        return data.song;
    } else {
        const errors = await res.json();
        return errors.errors;
    }
};

export const getLibrarySongs = () => async dispatch => {
    const res = await fetch('/api/songs/current_user');

    if (res.ok) {
        const data = await res.json()
        dispatch(loadSongs(data.songs))
    } else {
        const error = await res.json();
        return error.error;
    }
};

// Helper Functions
export const getLibrarySongsArray = (state) => {
    const orderedIds = state.library.songs.order;
    return orderedIds.map(id => state.library.songs.byIds[id]);
}

// Bulk Loaders
export const loadLibrary = () => async dispatch => {
    await Promise.all([
        dispatch(getLibrarySongs())
    ]);
};

// Reducer

const initialState = {
    songs: {
        byIds: {},
        order: []
    },
    albums: {
        byIds: {},
        order: []
    },
    playlists: {},
    currentAlbum: {},
    // currentPlaylist: null,
};

export default function reducer(state = initialState, action) {
    let normalizedData;
    let orderedIds;
    switch (action.type) {
        case LOAD_SONGS:
            normalizedData = normalize(action.songs);
            orderedIds = orderIds(action.songs);
            return {
                ...state,
                songs: {
                    byIds: normalizedData,
                    order: orderedIds
                }
            }
        default:
            return state;
    };
};
