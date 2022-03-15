const LOAD_SONGS = 'home/LOAD_SONGS';
const LOAD_SONG = 'home/LOAD_SONG'
const LOAD_ALBUMS = 'home/LOAD_ALBUMS';
const LOAD_ALBUM = 'home/LOAD_ALBUM';

// Action Creators

// Thunks

// Helper Functions

// Reducer

const initialState = {
    newSongs: [],
    featuredAlbum: {},
    newAlbum: {}

};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    };
};
