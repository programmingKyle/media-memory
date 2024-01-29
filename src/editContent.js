const editMediaOverlay_el = document.getElementById('editMediaOverlay');
const editMediaContent_el = document.getElementById('editMediaContent');
const editMediaCloseButton_el = document.getElementById('editMediaCloseButton');
const editMediaTitleInput_el = document.getElementById('editMediaTitleInput');
const editDropArea_el = document.getElementById('editDropArea');
const editPictureText_el = document.getElementById('editPictureText');
const updateMediaButton_el = document.getElementById('updateMediaButton');

const editStarRating_el = document.getElementById('editStarRating');
const editStars = editStarRating_el.querySelectorAll('.assignStar');

let editSelectRating = 0;
let editPicturePath = '';

async function populateEditMedia (item, picturePath) {
    editMediaOverlay_el.style.display = 'flex';
    editMediaTitleInput_el.value = item.title;
    clickStar(item.rating);
    hoverStar(item.rating);
    editPictureText_el.textContent = picturePath.split('/').pop();
    viewMediaOverlay_el.offsetHeight;
    editMediaContent_el.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    starMouseListeners();
});
  
function starMouseListeners(){
    editStars.forEach((star, index) => {
        star.addEventListener('mouseover', () => hoverStar(index + 1)); // index + 1 to make it 1-based
        star.addEventListener('click', () => clickStar(index + 1)); // index + 1 to make it 1-based
    });

    editStarRating_el.addEventListener('mouseout', resetStars);
}
  
function hoverStar(hoveredIndex) {
    highlightStars(hoveredIndex);
}

function clickStar(clickedIndex) {
    editSelectRating = clickedIndex;
    document.getElementById('editStarRating').setAttribute('data-rating', editSelectRating);
}

function resetStars() {
    highlightStars(editSelectRating);
}

function highlightStars(index) {
    editStars.forEach((star, i) => {
        if (i < index) {
        star.classList.add('active');
        } else {
        star.classList.remove('active');
        }
    });
}

editMediaCloseButton_el.addEventListener('click', async () => {
    await closeEditOverlay();
});

async function closeEditOverlay(){
    editMediaContent_el.classList.remove('active');
    const transitionEndHandler = () => {
        editMediaOverlay_el.style.display = 'none';
        editMediaContent_el.removeEventListener('transitionend', transitionEndHandler);
    };
    editMediaContent_el.addEventListener('transitionend', transitionEndHandler);
}

editDropArea_el.addEventListener('dragover', preventDefaults, false);
editDropArea_el.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}
  
function handleDrop(e) {
    preventDefaults(e); // Prevent default behavior for the drop event

    const files = e.dataTransfer.files;

    if (files.length > 0) {
        editPicturePath = files[0].path || files[0].name;
        editPictureText_el.textContent = editPicturePath.split('\\').pop();
    }
}
