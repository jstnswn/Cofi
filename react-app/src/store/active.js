import { getAlbum } from "./albums";

const SET_CURRENT_SONG = 'active/SET_CURRENT_SONG';
// const REMOVE_CURRENT_SONG = 'active/REMOVE_CURRENT_SONG';
const SET_QUEUE = 'active/SET_QUEUE';
const CLEAR_QUEUE = 'active/CLEAR_QUEUE';
const TOGGLE_PLAY = 'active/TOGGLE_PLAY';
const CLEAN_ACTIVE = 'active/CLEAN_ACTIVE';

export const setSong = (song) => {
    return {
        type: SET_CURRENT_SONG,
        song
    };
};

export const setQueue = (songs) => {
    return {
        type: SET_QUEUE,
        songs
    };
};

const clearQueue = () => {
    return {
        type: CLEAR_QUEUE,
    }
};

export const togglePlay = () => {
    return {
        type: TOGGLE_PLAY
    };
};

export const cleanActive = () => {
    return {
        type: CLEAN_ACTIVE
    };
};

export const loadSongAndSetQueue = (song) => async dispatch => {
    if (song.album) {
        const album = await dispatch(getAlbum(song.album.id));
        const uniqueSongs = album.songs.filter(currSong => currSong.id !== song.id);
        await dispatch(setQueue(uniqueSongs));
    } else dispatch(clearQueue()) // Currently clears queue if song is single.
    dispatch(setSong(song));
};

const initialState = {
    isPlaying: null,
    currentSong: null,
    next: null,
    queue: []
};

const activeMusicReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_SONG:
            return {
                ...state,
                currentSong: action.song
            }

        case SET_QUEUE:
            return {
                ...state,
                queue: action.songs
            }

        case CLEAR_QUEUE:
            return {
                ...state,
                queue: []
            }

        case TOGGLE_PLAY:
            return {
                ...state,
                isPlaying: !state.isPlaying
            }
        case CLEAN_ACTIVE:
            return initialState;

        default:
            return state
    }

};

export default activeMusicReducer;
