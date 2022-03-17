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
}
