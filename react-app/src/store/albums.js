import { normalize, orderIds } from "./utils";

const LOAD_ALBUM = 'albums/LOAD_ALBUM';

const loadAlbum = (albumId, songs) => {
    return {
        type: LOAD_ALBUM,
        albumId,
        songs
    }
};

export const getAlbum = (albumId) => async dispatch => {
    const res = await fetch(`/api/songs/album/${albumId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadAlbum(albumId, data.songs));
        return data.songs;
    } else {
        const error = await res.json();
        return error.error;
    }
};

const initialState = null;

export default function reducer(state = initialState, action) {
    let normalizedData;
    let orderedIds;

    switch (action.type) {
        case LOAD_ALBUM:
            orderedIds = orderIds(action.songs);
            normalizedData = normalize(action.songs)
            return {
                ...state,
                [action.albumId]: {
                    byIds: normalizedData,
                    order: orderedIds
                }
            }


        default:
            return state;
    };
};
