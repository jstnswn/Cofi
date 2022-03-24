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

export const orderIds = (content) => {
    return content.map(item => item.id)
}
