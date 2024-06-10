export async function submitVideo(video) {
    console.log("MIME type:", video.type);
    const formData = new FormData();
    formData.append('file', video);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
            method: 'POST',
            body: formData
        });

        if (res.status === 200) {
            const data = await res.json();
            console.log(data)
            return data;
        } 
        else {
            return [];
        }
    } 
    catch (error) {
        return [];
    }
}
