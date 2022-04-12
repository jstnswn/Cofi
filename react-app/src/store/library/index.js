import { combineReducers } from "redux";
import songs from './librarySongs';
import albums from './libraryAlbums'
import { getLibraryAlbums } from "./libraryAlbums";
import { getLibrarySongs } from "./librarySongs";

const SET_LOADED = 'library/SET_LOADED';

export const setLoaded = () => {
    return {
        type: SET_LOADED
    }
}

// Bulk Loaders
export const loadLibrary = () => async dispatch => {
    await Promise.all([
        dispatch(getLibrarySongs()),
        dispatch(getLibraryAlbums())
    ]);
};

function isLoaded(state=false, action) {
    switch (action.type) {
        case SET_LOADED:
            return true;
        default: return state;
    }
}

const libraryReducer = combineReducers({
    songs,
    albums,
    isLoaded
});


export default libraryReducer;
