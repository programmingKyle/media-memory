const contentDiv_el = document.getElementById('contentDiv');

const listOfMediaEntries = [];

const ascendDateAdded_el = document.getElementById('ascendDateAdded').addEventListener('click', () => selectSorting('ascendDate'));
const descendDateAdded_el = document.getElementById('descendDateAdded').addEventListener('click', () => selectSorting('descendDate'));
const ascendRating_el = document.getElementById('ascendRating').addEventListener('click', () => selectSorting('ascendRating'));
const descendRating_el = document.getElementById('descendRating').addEventListener('click', () => selectSorting('descendRating'));
const ascendAlpha_el = document.getElementById('ascendAlpha').addEventListener('click', () => selectSorting('ascendAlpha'));
const descendAlpha_el = document.getElementById('descendAlpha').addEventListener('click', () => selectSorting('descendAlpha'));

let sortingMethod = 'ascendAlpha'; // 'default', 'ascendAlpha', 'descendAlpha',
// 'ascendDateAdded', 'descendDateAdded', 'ascendRating', descendRating'

const selectSorting = (sorting) => {
    sortingMethod = sorting;
}

document.addEventListener('DOMContentLoaded', async () => {
    await getMediaContent();
});

const sortingMethods = {
    "ascendAlpha": (a, b) => a.title.localeCompare(b.title),
    "descendAlpha": (a, b) => b.title.localeCompare(a.title)
}

async function getMediaContent() {
    try {
        const results = await api.getMedia({ mediaType: selectedMedia });
        results.sort(sortingMethods[sortingMethod]);
        console.log(results);
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