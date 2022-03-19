import { getImageUrl, normalize, orderIds } from "./utils";

const LOAD_SONGS = 'library/LOAD_SONGS';
const LOAD_SONG = 'library/LOAD_SONG';
const UPDATE_SONG = 'library/UPDATE_SONG';
const REMOVE_SONG = 'library/REMOVE_SONG';
const LOAD_ALBUMS = 'librarye/LOAD_ALBUMS';
const LOAD_ALBUM = 'library/LOAD_ALBUM';

// Action Creators
const loadSong = (song, albumId) => {
    return {
        type: LOAD_SONG,
        song,
        albumId
    };
};

const loadSongs = (songs) => {
    return {
        type: LOAD_SONGS,
        songs
    };
};

const updateSong = (song) => {
    return {
        type: UPDATE_SONG,
        song
    };
};

const removeSong = (songId, albumId) => {
    return {
        type: REMOVE_SONG,
        songId,
        albumId
    };
};

const loadAlbums = (albums) => {
    return {
        type: LOAD_ALBUMS,
        albums
    };
};

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

export const patchSong = (payload) => async dispatch => {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('artist', payload.artist);
    formData.append('private', payload.private);
    if (payload.song) formData.append('song', payload.song);

    let imageUrl;
    if (payload.image) {
        imageUrl = await getImageUrl(payload.image);
        formData.append('image_url', imageUrl);
    }

    const res = await fetch(`/api/songs/${payload.songId}`, {
        method: 'PATCH',
        // headers: {'Content-Type': 'application/json'},
        body: formData
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadSong(data.song, payload.fromAlbumId));
        return data.song;
    } else {
        const errors = await res.json();
        return errors.errors;
    }
};

export const deleteLibrarySong = (songId, albumId) => async dispatch => {
    const res = await fetch(`/api/songs/${songId}`, { method: 'DELETE' });

    if (res.ok) dispatch(removeSong(songId, albumId));
};

export const getLibraryAlbums = () => async dispatch => {
    const res = await fetch('/api/albums/current_user');

    if (res.ok) {
        const data = await res.json()
        dispatch(loadAlbums(data.albums))
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

export const getLibraryAlbumsArray = (state) => {
    const orderedIds = state.library.albums.order;
    return orderedIds.map(id => state.library.albums.byIds[id]);
}

// Bulk Loaders
export const loadLibrary = () => async dispatch => {
    await Promise.all([
        dispatch(getLibrarySongs()),
        dispatch(getLibraryAlbums())
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
    let stateCopy;
    let orderArray;
    let idx;
    let albumSongs;

    switch (action.type) {
        case LOAD_SONG:
            stateCopy = {...state};
            stateCopy.songs.byIds[action.song.id] = action.song;
            orderArray = stateCopy.songs.order;
            idx = orderArray.findIndex(id => id === action.song.id);
            // replace song in ordered arrray if exists
            if (idx > -1) {
                orderArray.splice(idx, 1, action.song.id);
            } else {
                orderArray = [action.song.id, ...orderArray];
            }

            stateCopy.songs.order = orderArray;

            if (action.albumId) {
                albumSongs = stateCopy.albums.byIds[action.albumId].songs;
                const idx = albumSongs.findIndex(song => song.id === action.song.id);

                if (idx > -1) albumSongs.splice(idx, 1, action.song);
                else albumSongs = [action.song, ...albumSongs];
            }

            console.log('statecopy', stateCopy.songs)

            return stateCopy;

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

        // case UPDATE_SONG:


        case REMOVE_SONG:
            stateCopy = { ...state };
            orderArray = stateCopy.songs.order;

            idx = orderArray.findIndex(id => id === action.songId);
            orderArray.splice(idx, 1);

            delete stateCopy.songs.byIds[action.songId];
            if (action.albumId) {
                albumSongs = stateCopy.albums.byIds[action.albumId].songs;
                idx = albumSongs.findIndex(song => song.id === action.songId);
                albumSongs.splice(idx, 1);
            }

            return stateCopy;

        case LOAD_ALBUMS:
            normalizedData = normalize(action.albums)
            orderedIds = orderIds(action.albums)
            return {
                ...state,
                albums: {
                    byIds: normalizedData,
                    order: orderedIds
                }
            }



        default:
            return state;
    };
};
