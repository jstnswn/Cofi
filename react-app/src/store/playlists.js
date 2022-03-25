import { getImageUrl, normalize } from "./utils";

const LOAD_PLAYLISTS = 'playlists/LOAD_PLAYLISTS';
const LOAD_PLAYLIST = 'playlists/LOAD_PLAYLIST';
const REMOVE_PLAYLIST = 'playlists/REMOVE_PLAYLIST';

const ADD_SONG_TO_PLAYLIST = 'playlists/ADD_SONG_TO_PLAYLIST';
const REMOVE_SONG_FROM_PLAYLIST = 'playlists/REMOVE_SONG_FROM_PLAYLIST';

const CLEAN_PLAYLISTS = 'playlists/CLEAN_PLAYLISTS';

// Action Creators
const loadPlaylists = (playlists) => {
    return {
        type: LOAD_PLAYLISTS,
        playlists
    };
};

const loadPlaylist = (playlist) => {
    return {
        type: LOAD_PLAYLIST,
        playlist
    };
};

const removePlaylist = (playlistId) => {
    return {
        type: REMOVE_PLAYLIST,
        playlistId
    }
}

const addSongToPlaylist = (song, playlistId) => {
    return {
        type: ADD_SONG_TO_PLAYLIST,
        song,
        playlistId
    };
};

const removeSongFromPlaylist = (songId, playlistId) => {
    return {
        type: REMOVE_SONG_FROM_PLAYLIST,
        songId,
        playlistId
    };
};

export const cleanPlaylists = () => {
    return {
        type: CLEAN_PLAYLISTS
    };
};

// Thunks
export const getPlaylists = () => async dispatch => {
    const res = await fetch('/api/playlists');

    if (res.ok) {
        const data = await res.json()
        dispatch(loadPlaylists(data.playlists))
    } else {
        const error = await res.json();
        return error.error;
    }
};

export const createPlaylist = (payload) => async dispatch => {
    const { title, image, song  } = payload;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('private', false);

    const imageUrl = await getImageUrl(image);
    formData.append('image_url', imageUrl);

    const res = await fetch('/api/playlists', {
        method: 'POST',
        body: formData
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(loadPlaylist(data.playlist))
    } else {
        const error = await res.json();
        return error.error;
    }
};

export const addToPlaylist = (song, playlistId) => async dispatch => {
    const res = await fetch(`/api/playlists/${playlistId}/songs/${song.id}`, {
        method: 'POST'
    });

    if (res.ok) {
        dispatch(addSongToPlaylist(song, playlistId))
    } else {
        const error = await res.json();
        return error.error;
    }
};

export const removeFromPlaylist = (songId, playlistId) => async dispatch => {
    const res = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeSongFromPlaylist(songId, playlistId))
    } else {
        const error = await res.json();
        return error.error;
    }
};

export const patchPlaylist = (payload) => async dispatch => {
    const { title, image, song, playlistId } = payload;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('private', false);

    if (image) {
        const imageUrl = await getImageUrl(image);
        formData.append('image_url', imageUrl);
    }

    const res = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PATCH',
        body: formData
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(loadPlaylist(data.playlist))
    } else {
        const errors = await res.json();
        console.log(errors.erros);
        return errors.errors;
    }
};

export const deletePlaylist = (playlistId) => async dispatch => {
    const res = await fetch(`/api/playlists/${playlistId}`, { method: 'DELETE' });

    if (res.ok) {
        dispatch(removePlaylist(playlistId));
    } else {
        const error = await res.json();
        return error.error;
    }
};

// Helper Functions
export const getPlaylistsArray = (state) => Object.values(state.playlists);

const initialState = {};

export default function reducer(state = initialState, action) {
    let stateCopy;
    let normalizedData;
    let playlistSongs;
    let idx;
    let songIds;

    switch (action.type) {
        case LOAD_PLAYLISTS:
            normalizedData = normalize(action.playlists)
            return {
                ...state,
                ...normalizedData
            };

        case LOAD_PLAYLIST:
            return {
                ...state,
                [action.playlist.id]: action.playlist
            };

        case REMOVE_PLAYLIST:
            stateCopy = {...state}

            delete stateCopy[action.playlistId];
            return stateCopy;

        case ADD_SONG_TO_PLAYLIST:
            stateCopy = {...state}
            playlistSongs = stateCopy[action.playlistId].songs;
            playlistSongs.push(action.song);
            songIds = stateCopy[action.playlistId].song_ids;
            songIds.push(action.song.id);

            return stateCopy;

        case REMOVE_SONG_FROM_PLAYLIST:
            stateCopy = { ...state }
            playlistSongs = stateCopy[action.playlistId].songs;
            songIds = stateCopy[action.playlistId].song_ids;
            idx = playlistSongs.findIndex(song => song.id === action.songId);
            playlistSongs.splice(idx, 1);
            songIds.splice(idx, 1);

            return stateCopy;

        case CLEAN_PLAYLISTS:
            return initialState;

        default:
            return state
    }
};
