import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

export const orderContent = (content) => {
    const { order, byIds } = content;

    return order.map(id => byIds[id])
}

export const sortSongsArray = (items) => {
    const sorted = items.sort((a, b) => b.track_number - a.track_number);
    return sorted;
};

toast.configure();
export const popupMessage = (message) => {

   return toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1700,
        style: { backgroundColor: '#202626', color: '#c5ccd3' },
        hideProgressBar: true,
        transition: Slide,

    //    progressStyle: { backgroundColor: 'rgb(160, 31, 9'}
    });


};
