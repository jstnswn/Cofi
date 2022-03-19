export const orderContent = (content) => {
    const { order, byIds } =  content;

    return order.map(id => byIds[id])
}

export const sortSongsArray = (items) => {
    const sorted = items.sort((a, b) => b.track_number - a.track_number);
    return sorted;
};
