import { cleanActive } from "./active";
import { cleanHome } from "./home";
import { cleanLibraryAlbums } from "./library/libraryAlbums";
import { cleanLibrarySongs } from "./library/librarySongs";
import { cleanPlaylists } from "./playlists";

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const ADD_SONG_LIKE = 'session/ADD_SONG_LIKE';
const REMOVE_SONG_LIKE = 'session/REMOVE_SONG_LIKE';
const ADD_ALBUM_LIKE = 'session/ADD_ALBUM_LIKE';
const REMOVE_ALBUM_LIKE = 'session/REMOVE_ALBUM_LIKE';

const ADD_USER_ALBUM = 'session/ADD_USER_ALBUM';
const REMOVE_USER_ALBUM = 'session/REMOVE_USER_ALBUM';


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const addSongLike = (songId) => {
  return {
    type: ADD_SONG_LIKE,
    songId,
  };
};

const removeSongLike = (songId) => {
  return {
    type: REMOVE_SONG_LIKE,
    songId
  };
};

const addAlbumLike = (albumId) => {
  return {
    type: ADD_ALBUM_LIKE,
    albumId
  };
};

const removeAlbumLike = (albumId) => {
  return {
    type: REMOVE_ALBUM_LIKE,
    albumId
  }
};

export const loadUserAlbum = (album) => {
  return {
    type: ADD_USER_ALBUM,
    album
  }
};

export const removeUserAlbum = (albumId) => {
  return {
    type: REMOVE_USER_ALBUM,
    albumId
  }
}

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setUser(data))
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    await Promise.all([
      dispatch(cleanLibrarySongs()),
      dispatch(cleanLibraryAlbums()),
      dispatch(cleanActive()),
      dispatch(cleanHome()),
      dispatch(cleanPlaylists()),
      dispatch(removeUser()),
    ])
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const createSongLike = (songId) => async dispatch => {
  const res = await fetch(`/api/song_likes/songs/${songId}`, { method: 'POST' });

  if (res.ok) {
    dispatch(addSongLike(songId))
  }
};

export const deleteSongLike = (songId) => async dispatch => {
  const res = await fetch(`/api/song_likes/songs/${songId}`, { method: 'DELETE' });

  if (res.ok) {
    dispatch(removeSongLike(songId))
  }
};

export const createAlbumLike = (albumId) => async dispatch => {
  const res = await fetch(`/api/album_likes/albums/${albumId}`, { method: 'POST' });

  if (res.ok) {
    dispatch(addAlbumLike(albumId))
  }
};

export const deleteAlbumLike = (albumId) => async dispatch => {
  const res = await fetch(`/api/album_likes/albums/${albumId}`, { method: 'DELETE' });

  if (res.ok) {
    dispatch(removeAlbumLike(albumId))
  }
};


const initialState = { user: null };

export default function reducer(state = initialState, action) {
  let stateCopy;
  let songLikes;
  let albumLikes;
  let idx;

  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;

    case ADD_SONG_LIKE:
      stateCopy = {...state};
      songLikes = state.user.liked.song_ids;
      songLikes.push(action.songId);
      return stateCopy;

    case REMOVE_SONG_LIKE:
      stateCopy = {...state};
      songLikes = state.user.liked.song_ids;
      idx = songLikes.findIndex(id => id === action.songId);
      songLikes.splice(idx, 1);

      return stateCopy;

    case ADD_ALBUM_LIKE:
      stateCopy = { ...state };
      albumLikes = state.user.liked.album_ids;
      albumLikes.push(action.albumId);
      return stateCopy;

    case REMOVE_ALBUM_LIKE:
      stateCopy = { ...state };
      albumLikes = state.user.liked.album_ids;
      idx = albumLikes.findIndex(id => id === action.albumId);
      albumLikes.splice(idx, 1);
      return stateCopy;

    case ADD_USER_ALBUM:
      return {
        ...state,
        user: {
          ...state.user,
          albums: [...state.user.albums, action.album]
        }
      };

    case REMOVE_USER_ALBUM:
      stateCopy = {...state};
      const albums = stateCopy.user.albums;
      idx = albums.findIndex(album => album.id === action.albumId);
      albums.splice(idx, 1);

      return stateCopy;
  }
}
