import { getImageUrl } from "./utils";

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

const loadSongs = (data) => {
    return {
        type: LOAD_SONGS,
        data
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
        console.log('errors', errors)
        return errors.errors;
    }
};

// Helper Functions

// Reducer

const initialState = {
    songs: [],
    albums: [],
    playlists: [],
    currentAlbum: {},
    // currentPlaylist: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SONGS:
            return {
                ...state,
                songs: {
                    ...state.songs,
                    [action.song.id]: action.song
                }
            }
        default:
            return state;
    };
};
