import { loadHomeAlbums } from "../home.js";
import { loadUserAlbum, removeUserAlbum } from "../session.js";
import { getImageUrl, normalize, orderIds } from "../utils";
import { getLibrarySongs } from "./librarySongs";


const LOAD_ALBUMS = 'library/LOAD_ALBUMS';
const LOAD_ALBUM = 'library/LOAD_ALBUM';
const REMOVE_ALBUM = 'library/REMOVE_ALBUM';

const REMOVE_ALBUM_SONG = 'library/REMOVE_ALBUM_SONG';
const LOAD_ALBUM_SONG = 'library/LOAD_ALBUM_SONG';


const CLEAN_LIBRARY_ALBUMS = 'library/CLEAN_LIBRARY_ALBUMS';


// Action Creators
const loadAlbum = (album) => {
    return {
        type: LOAD_ALBUM,
        album
    }
}

const loadAlbums = (albums) => {
    return {
        type: LOAD_ALBUMS,
        albums
    };
};

const removeAlbum = (albumId) => {
    return {
        type: REMOVE_ALBUM,
        albumId
    };
};

export const removeAlbumSong = (songId, albumId)  => {
    return {
        type: REMOVE_ALBUM_SONG,
        songId,
        albumId
    };
};

export const loadAlbumSong = (song, albumId) => {
    return {
        type: LOAD_ALBUM_SONG,
        song,
        albumId,
    };
};

export const cleanLibraryAlbums = () => {
    return {
        type: CLEAN_LIBRARY_ALBUMS
    };
};

// Thunks
export const getLibraryAlbums = () => async dispatch => {
    const res = await fetch('/api/albums/current_user');

    if (res.ok) {
        const data = await res.json()
        dispatch(loadAlbums(data.albums));
    } else {
        const error = await res.json();
        return error.error;
    }
};

export const createAlbum = (payload) => async dispatch => {
    payload.imageUrl = await getImageUrl(payload.image);

    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('artist', payload.artist);
    formData.append('private', true);
    formData.append('image_url', payload.imageUrl);


    const res = await fetch('/api/albums', {
        method: 'POST',
        body: formData
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadAlbum(data.album));
        dispatch(loadUserAlbum(data.album))
        return data.album;
    } else {
        const errors = await res.json();
        return errors.errors;
    }
};

export const patchAlbum = (payload) => async dispatch => {
    const { title, image, albumId, artist } = payload;

    const body = {title, artist};
    if (image) {
        const imageUrl = await getImageUrl(image);
        body.image_url = imageUrl
    }

    const res = await fetch(`/api/albums/${albumId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadAlbum(data.album));
        dispatch(loadUserAlbum(data.album));
        dispatch(getLibrarySongs());
        dispatch(loadHomeAlbums());
        // if (payload.fromAlbumId) dispatch(loadAlbumSong(data.song, payload.fromAlbumId))
        //  if (payload.fromAlbumId) dispatch(getLibraryAlbums())
        return data.album;
    } else {
        const errors = await res.json();
        console.log(errors.errors)
        return errors.errors;
    }

};

export const deleteLibraryAlbum = (albumId) => async dispatch => {
    const res = await fetch(`/api/albums/${albumId}`, { method: 'DELETE' });

    if (res.ok) {
        dispatch(removeAlbum(albumId));
        dispatch(removeUserAlbum(albumId));
        dispatch(getLibrarySongs('reload'));
        dispatch(loadHomeAlbums());
    }
};


// Helper Functions
export const getLibraryAlbumsArray = (state) => {
    const orderedIds = state.library.albums.order;
    return orderedIds.map(id => state.library.albums.byIds[id]);
}

// Reducer
const initialState = {
    byIds: {},
    order: []
};

export default function reducer(state = initialState, action) {
    let normalizedData;
    let orderedIds;
    let stateCopy;
    let orderArray;
    let idx;
    let albumSongs;

    switch (action.type) {
        case LOAD_ALBUM:
            stateCopy = {...state};
            stateCopy.byIds[action.album.id] = action.album;

            if (!stateCopy.order.includes(action.album.id)) {
                stateCopy.order.unshift(action.album.id)
            }

            return stateCopy;

        // case LOAD_ALBUM_SONG:
        //     stateCopy = {...state}
        //     albumSongs = stateCopy.byIds[action.albumId].songs;
        //     albumSongs.unshift(action.song);

        //     return stateCopy;


        case LOAD_ALBUMS:
            normalizedData = normalize(action.albums)
            orderedIds = orderIds(action.albums)
            return {
                ...state,
                byIds: normalizedData,
                order: orderedIds
            }

        case REMOVE_ALBUM:
            stateCopy = { ...state };
            orderArray = stateCopy.order;

            idx = orderArray.findIndex(id => id === action.albumId);
            orderArray.splice(idx, 1);

            stateCopy.order = orderArray;
            delete stateCopy.byIds[action.albumId];

            return stateCopy;

        case LOAD_ALBUM_SONG:
            stateCopy = {...state};

            // If album exists, update it
            if (stateCopy.byIds[action.albumId]) {
                albumSongs = stateCopy.byIds[action.albumId].songs;
                idx = albumSongs.findIndex(song => song.id === action.song.id);

                if (idx > -1) albumSongs.splice(idx, 1, action.song);

                albumSongs.push(action.song)
            }


            return stateCopy;

        case REMOVE_ALBUM_SONG:
            stateCopy = { ...state };
            albumSongs = stateCopy.byIds[action.albumId].songs;
            idx = albumSongs.findIndex(song => song.id === action.songId);
            albumSongs.splice(idx, 1);
            return stateCopy;

        case CLEAN_LIBRARY_ALBUMS:
            return initialState;

        default:
            return state;
    };



};
