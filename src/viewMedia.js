const viewMediaOverlay_el = document.getElementById('viewMediaOverlay');
const viewMediaCloseButton_el = document.getElementById('viewMediaCloseButton');
const viewMediaTitleText_el = document.getElementById('viewMediaTitleText');
const editMediaButton_el = document.getElementById('editMediaButton');
const viewMediaPicture_el = document.getElementById('viewMediaPicture');

viewMediaCloseButton_el.addEventListener('click', () => {
    viewMediaOverlay_el.style.display = 'none';
});

function populateViewMedia(item, picturePath){
    viewMediaOverlay_el.style.display = 'flex';
    viewMediaTitleText_el.textContent = item.title;
    viewMediaPicture_el.src = picturePath;
}