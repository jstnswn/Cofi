import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        autoClose: 2000,
        style: { backgroundColor: '#202626', color: '#c5ccd3' },
        progressClassName: 'toastify-progress',
        progressStyle: { backgroundColor: 'rgb(160, 31, 9)' }
    });


};
