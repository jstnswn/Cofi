import { getPlaylists } from "../playlists";
import { getImageUrl, normalize, orderIds } from "../utils";
import { createAlbum, getLibraryAlbums, loadAlbumSong, removeAlbumSong } from "./libraryAlbums";

// Action Creators
const LOAD_SONGS = 'library/LOAD_SONGS';
const LOAD_SONG = 'library/LOAD_SONG';
const UPDATE_SONG = 'library/UPDATE_SONG';
const REMOVE_SONG = 'library/REMOVE_SONG';

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

const removeSong = (songId, albumId) => {
    return {
        type: REMOVE_SONG,
        songId,
        albumId
    };
};



// Thunks
export const uploadSong = (payload) => async dispatch => {
    payload.image_url = await getImageUrl(payload.image);

    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('artist', payload.artist);
    formData.append('song', payload.song);
    formData.append('private', payload.private);
    formData.append('image_url', payload.image_url);
    formData.append('album_id', payload.albumId);

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

// May not need fromAlbumId
export const patchSong = (payload) => async dispatch => {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('artist', payload.artist);
    formData.append('private', payload.private);
    formData.append('album_id', payload.toAlbumId);
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
        if (payload.fromAlbumId) dispatch(loadAlbumSong(data.song, payload.fromAlbumId));
        dispatch(getPlaylists());
        //  if (payload.fromAlbumId) dispatch(getLibraryAlbums())
        return data.song;
    } else {
        const errors = await res.json();
        return errors.errors;
    }
};


export const patchSongAlbum = (song, toAlbumId) => async dispatch => {
    // console.log('albumID', toAlbumId)
    const res = await fetch(`/api/songs/${song.id}/albums/${toAlbumId ? toAlbumId : 0}`, {
        method: 'PATCH',
        // headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify({albumId})
    })

    if (res.ok) {
        const data = await res.json();

        dispatch(loadSong(data.song));
        if (song.album) dispatch(removeAlbumSong(song.id, song.album.id))
        if (toAlbumId) dispatch(loadAlbumSong(data.song, toAlbumId));
        dispatch(getPlaylists());

    } else {
        const errors = await res.json();
        return errors.errors;
    }
}


export const deleteLibrarySong = (songId, albumId) => async dispatch => {
    const res = await fetch(`/api/songs/${songId}`, { method: 'DELETE' });

    if (res.ok) {
        dispatch(removeSong(songId, albumId));
        if (albumId) dispatch(removeAlbumSong(songId, albumId))
        // if (albumId) dispatch(getLibraryAlbums())
    }
};


// Helper Functions
export const getLibrarySongsArray = (state) => {
    const orderedIds = state.library.songs.order;
    return orderedIds.map(id => state.library.songs.byIds[id]);
}

// Bulk Actions
export const createAlbumAndSong = (payload) => async dispatch => {
    const {title: songTitle, albumTitle, artist, song, image } = payload;
    const albumPayload = {
        title: albumTitle,
        artist,
        image,
        // private
    };
    return dispatch(createAlbum(albumPayload))
        .then((album) =>{
            payload.albumId = album.id
            console.log("promise", payload)
            return dispatch(uploadSong(payload))
        })
};

const initialState = {
    byIds: {},
    order: []
}

export default function reducer(state = initialState, action) {
    let normalizedData;
    let orderedIds;
    let stateCopy;
    let orderArray;
    let idx;
    let albumSongs;

    switch (action.type) {
        case LOAD_SONG:
            stateCopy = { ...state };
            stateCopy.byIds[action.song.id] = action.song;
            orderArray = stateCopy.order;
            idx = orderArray.findIndex(id => id === action.song.id);

            if (idx > -1) {
                orderArray.splice(idx, 1, action.song.id);
            } else {
                orderArray = [action.song.id, ...orderArray];
            }

            stateCopy.order = orderArray;

            // if (action.albumId) {
            //     albumSongs = stateCopy.byIds[action.albumId].songs;
            //     const idx = albumSongs.findIndex(song => song.id === action.song.id);

            //     if (idx > -1) albumSongs.splice(idx, 1, action.song);
            //     else albumSongs = [action.song, ...albumSongs];
            // }

            return stateCopy;

        case LOAD_SONGS:
            normalizedData = normalize(action.songs);
            orderedIds = orderIds(action.songs);
            return {
                ...state,
                byIds: normalizedData,
                order: orderedIds
            }

        case REMOVE_SONG:
            stateCopy = { ...state };
            orderArray = stateCopy.order;

            idx = orderArray.findIndex(id => id === action.songId);
            orderArray.splice(idx, 1);

            delete stateCopy.byIds[action.songId];
            // if (action.albumId) {
            //     albumSongs = stateCopy.albums.byIds[action.albumId].songs;
            //     idx = albumSongs.findIndex(song => song.id === action.songId);
            //     albumSongs.splice(idx, 1);
            // }

            return stateCopy;

        default:
            return state;
    };
};
