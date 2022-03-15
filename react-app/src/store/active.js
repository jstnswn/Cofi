const SET_CURRENT_SONG = 'active/SET_CURRENT_SONG';
const REMOVE_CURRENT_SONG = 'active/REMOVE_CURRENT_SONG';
const TOGGLE_PLAY = 'active/TOGGLE_PLAY';

export const setSong = (song) => {
    return {
        type: SET_CURRENT_SONG,
        song
    };
};

export const togglePlay = () => {
    return {
        type: TOGGLE_PLAY
    };
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

        case TOGGLE_PLAY:
            return {
                ...state,
                isPlaying: !state.isPlaying
            }
        default:
            return state
    }
};

export default activeMusicReducer;
