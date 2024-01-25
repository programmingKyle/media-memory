const contentDiv_el = document.getElementById('contentDiv');

document.addEventListener('DOMContentLoaded', async () => {
    const media = await getMediaContent();
    await populateMedia(media);
});

async function getMediaContent() {
    try {
        const results = await api.getMedia({ mediaType: selectedMedia });
      } catch (error) {
        console.error('Error fetching media:', error);
      }
}

async function populateMedia(media){
    console.log(media);
}
