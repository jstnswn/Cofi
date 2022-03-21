import { combineReducers } from "redux";
import songs from './librarySongs';
import albums from './libraryAlbums'
import { getLibraryAlbums } from "./libraryAlbums";
import { getLibrarySongs } from "./librarySongs";



// Bulk Loaders
export const loadLibrary = () => async dispatch => {
    await Promise.all([
        dispatch(getLibrarySongs()),
        dispatch(getLibraryAlbums())
    ]);
};

const libraryReducer = combineReducers({
    songs,
    albums
});


export default libraryReducer;
