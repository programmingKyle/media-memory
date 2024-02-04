const contentDiv_el = document.getElementById('contentDiv');

const listOfMediaEntries = [];

const ascendDateAdded_el = document.getElementById('ascendDateAdded').addEventListener('click', () => selectSorting('Date Added Ascending'));
const descendDateAdded_el = document.getElementById('descendDateAdded').addEventListener('click', () => selectSorting('Date Added Descending'));
const ascendRating_el = document.getElementById('ascendRating').addEventListener('click', () => selectSorting('Rating Ascending'));
const descendRating_el = document.getElementById('descendRating').addEventListener('click', () => selectSorting('Rating Descending'));
const ascendAlpha_el = document.getElementById('ascendAlpha').addEventListener('click', () => selectSorting('Alphabetical Ascending'));
const descendAlpha_el = document.getElementById('descendAlpha').addEventListener('click', () => selectSorting('Alphabetical Descending'));
const sortValueText_el = document.getElementById('sortValueText');

let sortingMethod = 'Alphabetical Ascending';

function selectSorting(sorting){
    sortingMethod = sorting;
    sortValueText_el.textContent = `Sort: ${sortingMethod}`;
    getMediaContent();
}

document.addEventListener('DOMContentLoaded', async () => {
    await getMediaContent();
});

const sortingMethods = {
    "Date Added Ascending": (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded),
    "Date Added Descending": (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded),
    "Rating Ascending": (a, b) => a.rating - b.rating,
    "Rating Descending": (a, b) => b.rating - a.rating,
    "Alphabetical Ascending": (a, b) => a.title.localeCompare(b.title),
    "Alphabetical Descending": (a, b) => b.title.localeCompare(a.title)
}

async function getMediaContent() {
    try {
        const results = await api.getMedia({ mediaType: selectedMedia });
        results.sort(sortingMethods[sortingMethod]);
        await populateMedia(results);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
}

async function populateMedia(media){
    listOfMediaEntries.length = 0;
    contentDiv_el.innerHTML = '';

    for (const element of media){
        const contentItemDiv_el = document.createElement('div');
        contentItemDiv_el.classList.add('content-item');

        const contentImage_el = document.createElement('img');
        const picturePath = fileLocation(element.media, element.picturePath);
        const picture = element.picturePath !== '' ? picturePath : 'imageunavailable.png';
        contentImage_el.src = picture;

        const contentHeader_el = document.createElement('h3');
        contentHeader_el.textContent = element.title;

        const contentRatingDiv_el = document.createElement('div');
        contentRatingDiv_el.classList.add('content-rating');

        if (element.rating === 0){
            const invisibleRating = document.createElement('i');
            invisibleRating.classList.add('fas', 'fa-star');
            invisibleRating.style.visibility = 'hidden';
            contentRatingDiv_el.appendChild(invisibleRating);
        } else {
            for (let i = 0; i < element.rating; i++){
                const starIcon = document.createElement('i');
                starIcon.classList.add('fas', 'fa-star');
                contentRatingDiv_el.appendChild(starIcon);
            }    
        }

        contentItemDiv_el.appendChild(contentImage_el);
        contentItemDiv_el.appendChild(contentHeader_el);
        contentItemDiv_el.appendChild(contentRatingDiv_el);
        contentDiv_el.appendChild(contentItemDiv_el);

        listOfMediaEntries.push(element);

        contentItemListener(contentItemDiv_el, element, picture);
    }
}

function contentItemListener(listen, item, picturePath){
    listen.addEventListener('click', () => {
        populateViewMedia(item, picturePath);
    });

    listen.addEventListener('mouseenter', () => {
        listen.classList.add('hover');
    })

    listen.addEventListener('mouseleave', () => {
        listen.classList.remove('hover');
    });
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