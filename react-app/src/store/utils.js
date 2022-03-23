import { cleanActive } from "./active";
import { cleanHome } from "./home";
import { cleanLibraryAlbums } from "./library/libraryAlbums";
import { cleanLibrarySongs } from "./library/librarySongs";


export const getImageUrl = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    const res = await fetch('/api/images', {
        method: 'POST',
        body: formData
    });

    if (res.ok) {
        const data = await res.json();
        return data.image_url;
    } else {
        const errors = await res.json();
        return errors.errors;
    }
};

export const normalize = (content) => {
    return content.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {})
};

// export const listSongIds = (songs) => {
//     return songs.map(song => song.id)
// };

export const orderIds = (content) => {
    // const orderedIds = [];
    // for (let i = 0; i < content.length; i ++) {
    //     orderedIds.push(content[i].id)
    // }
    // return orderedIds;
    return content.map(item => item.id)
}

// export const wipeStore = async () =>  async dispatch => {
//     Promise.all([
//         dispatch(cleanLibrarySongs()),
//         dispatch(cleanLibraryAlbums()),
//         dispatch(cleanActive()),
//         dispatch(cleanHome())
//     ]);
// };
