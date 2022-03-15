const LOAD_SONGS = 'library/LOAD_SONGS';
const LOAD_SONG = 'library/LOAD_SONG';
const LOAD_ALBUMS = 'librarye/LOAD_ALBUMS';
const LOAD_ALBUM = 'library/LOAD_ALBUM';

// Action Creators

// Thunks

// Helper Functions

// Reducer

const initialState = {
    userSongs: [],
    userAlbums: [],
    userPlaylists: [],
    currentAlbum: {},
    // currentPlaylist: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    };
};
