const contentDiv_el = document.getElementById('contentDiv');

document.addEventListener('DOMContentLoaded', async () => {
    await getMediaContent();
});

async function getMediaContent() {
    try {
        const results = await api.getMedia({ mediaType: selectedMedia });
        await populateMedia(results);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
}

async function populateMedia(media){
    contentDiv_el.innerHTML = '';
    for (const element of media){
        const contentItemDiv_el = document.createElement('div');
        contentItemDiv_el.classList.add('content-item');

        const contentImage_el = document.createElement('img');
        const picturePath = fileLocation(element.media, element.picturePath);
        contentImage_el.src = picturePath;

        const contentHeader_el = document.createElement('h3');
        contentHeader_el.textContent = element.title;

        const contentRatingDiv_el = document.createElement('div');
        contentRatingDiv_el.classList.add('content-rating');

        for (let i = 0; i < element.rating; i++){
            const starIcon = document.createElement('i');
            starIcon.classList.add('fas', 'fa-star');
            contentRatingDiv_el.appendChild(starIcon);
        }

        contentItemDiv_el.appendChild(contentImage_el);
        contentItemDiv_el.appendChild(contentHeader_el);
        contentItemDiv_el.appendChild(contentRatingDiv_el);
        contentDiv_el.appendChild(contentItemDiv_el);
    }
}

function fileLocation(mediaType, fileName){
    let fileLocation;
    switch(mediaType){
        case 'Movie':
            fileLocation = `images/movie_images/${fileName}`;
            break;
        case 'TV':
            fileLocation = `images/tv_images/${fileName}`;
            break;
        case 'Book':
            fileLocation = `images/book_images/${fileName}`;
            break;
    }


    return fileLocation;
}