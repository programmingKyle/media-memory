const editMediaOverlay_el = document.getElementById('editMediaOverlay');
const editMediaContent_el = document.getElementById('editMediaContent');
const editMediaCloseButton_el = document.getElementById('editMediaCloseButton');
const editMediaTitleInput_el = document.getElementById('editMediaTitleInput');
const editDropArea_el = document.getElementById('editDropArea');
const editPictureText_el = document.getElementById('editPictureText');
const updateMediaButton_el = document.getElementById('updateMediaButton');
const editPreviewImage_el = document.getElementById('editPreviewImage');

const editEntryExistsOverlay_el = document.getElementById('editEntryExistsOverlay');
const editEntryExistsContent_el = document.getElementById('editEntryExistsContent');
const editEntryExistsOKButton_el = document.getElementById('editEntryExistsOKButton');

const editStarRating_el = document.getElementById('editStarRating');
const editStars = editStarRating_el.querySelectorAll('.assignStar');

let editSelectRating = 0;
let editPicturePath = '';

let currentEditEntry;

async function populateEditMedia (item, picturePath) {
    currentEditEntry = item;
    editPicturePath = picturePath;
    editPreviewImage_el.src = editPicturePath;
    editMediaOverlay_el.style.display = 'flex';
    editMediaTitleInput_el.value = item.title.split('-')[0];
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

        editPreviewImage_el.src = editPicturePath;
    }
}

updateMediaButton_el.addEventListener('click', async () => {
    if (editMediaTitleInput_el.value === ''){
        editMediaTitleInput_el.classList.add('error');
        setTimeout(() => {
            editMediaTitleInput_el.classList.remove('error');
        }, 2000);
    } else {
        const checkExists = await api.checkEditTitle({id: currentEditEntry.id, title: editMediaTitleInput_el.value, media: selectedMedia});
        if (!checkExists){
            await api.editMedia({currentEditEntry, title: editMediaTitleInput_el.value, rating: editSelectRating, image: editPicturePath, media: currentEditEntry.media});
            await closeEditOverlay();
            await getMediaContent();
        } else {
            editMediaOverlay_el.style.display = 'none';
            editEntryExistsOverlay_el.style.display = 'flex';
            editEntryExistsOverlay_el.offsetHeight;
            editEntryExistsContent_el.classList.add('active');
        }    
    }
});


editEntryExistsOKButton_el.addEventListener('click', () => {
    editEntryExistsContent_el.classList.remove('active');
    const transitionEndHandler = () => {
        editMediaOverlay_el.style.display = 'flex';
        editEntryExistsOverlay_el.style.display = 'none';
        editEntryExistsContent_el.removeEventListener('transitionend', transitionEndHandler);
    };
    editEntryExistsContent_el.addEventListener('transitionend', transitionEndHandler);
});
