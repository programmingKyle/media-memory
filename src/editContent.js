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

let currentEditEntry;

async function populateEditMedia (item, picturePath) {
    currentEditEntry = item;
    editPicturePath = picturePath;
    editMediaOverlay_el.style.display = 'flex';
    editMediaTitleInput_el.value = item.title;
    editClickStar(item.rating);
    editHoverStar(item.rating);
    editPictureText_el.textContent = picturePath.split('/').pop();
    editMediaOverlay_el.offsetHeight;
    editMediaContent_el.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    editStarMouseListeners();
});
  
function editStarMouseListeners(){
    editStars.forEach((star, index) => {
        star.addEventListener('mouseover', () => editHoverStar(index + 1)); // index + 1 to make it 1-based
        star.addEventListener('click', () => editClickStar(index + 1)); // index + 1 to make it 1-based
    });

    editStarRating_el.addEventListener('mouseout', editResetStars);
}
  
function editHoverStar(hoveredIndex) {
    editHighlightStars(hoveredIndex);
}

function editClickStar(clickedIndex) {
    editSelectRating = clickedIndex;
    document.getElementById('editStarRating').setAttribute('data-rating', editSelectRating);
}

function editResetStars() {
    editHighlightStars(editSelectRating);
}

function editHighlightStars(index) {
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

editDropArea_el.addEventListener('dragover', editPreventDefaults, false);
editDropArea_el.addEventListener('drop', editHandleDrop, false);

function editPreventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}
  
function editHandleDrop(e) {
    preventDefaults(e); // Prevent default behavior for the drop event

    const files = e.dataTransfer.files;

    if (files.length > 0) {
        editPicturePath = files[0].path || files[0].name;
        editPictureText_el.textContent = editPicturePath.split('\\').pop();
    }
}

updateMediaButton_el.addEventListener('click', async () => {
    await api.editMedia({currentEditEntry, title: editMediaTitleInput_el.value, rating: editSelectRating, image: editPicturePath, media: currentEditEntry.media})
});