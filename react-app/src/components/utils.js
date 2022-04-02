import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';

export const orderContent = (content) => {
    const { order, byIds } = content;

    return order.map(id => byIds[id])
};

export const sortSongsArray = (items) => {
    const sorted = items.sort((a, b) => b.track_number - a.track_number);
    return sorted;
};

export const getOrderedLiked = (likedIdsArr, contentIdsObj) => {
    const result = new Array(likedIdsArr.length);


    for (let i = likedIdsArr.length - 1; i > -1; i--) {
        const resultIdx = likedIdsArr.length - (i + 1);
        result[resultIdx] = contentIdsObj[likedIdsArr[i]];
    }
    return result;
};

toast.configure();
export const popupMessage = (message) => {

   return toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1700,
        style: { backgroundColor: '#202626', color: '#c5ccd3' },
        hideProgressBar: true,
        transition: Slide,
    });
};
