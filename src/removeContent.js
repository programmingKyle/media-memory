const deleteOverlay_el = document.getElementById('deleteOverlay');
const deleteMediaButton_el = document.getElementById('deleteMediaButton');
const deleteOverlayContent_el = document.getElementById('deleteOverlayContent');
const confirmDeleteButton_el = document.getElementById('confirmDeleteButton');
const cancelDeleteButton_el = document.getElementById('cancelDeleteButton');

deleteMediaButton_el.addEventListener('click', () => {
    deleteOverlay_el.style.display = 'flex';
    deleteOverlay_el.offsetHeight;
    deleteOverlayContent_el.classList.add('active');
});

function closeDeleteOverlay(){
    deleteOverlayContent_el.classList.remove('active');
    const transitionEndHandler = () => {
        deleteOverlay_el.style.display = 'none';
        deleteOverlayContent_el.removeEventListener('transitionend', transitionEndHandler);
    }
    deleteOverlayContent_el.addEventListener('transitionend', transitionEndHandler);
}

function confirmDeleteCloseOverlay(){
    deleteOverlayContent_el.classList.remove('active');
    const transitionEndHandler = () => {
        deleteOverlay_el.style.display = 'none';
        editMediaOverlay_el.style.display = 'none';
        deleteOverlayContent_el.removeEventListener('transitionend', transitionEndHandler);
    }
    deleteOverlayContent_el.addEventListener('transitionend', transitionEndHandler);
}

confirmDeleteButton_el.addEventListener('click', async () => {
    const confirmDelete = await api.deleteMedia({id: currentItem.id, picture: currentPicture})
    if (confirmDelete){
        await getMediaContent();
        confirmDeleteCloseOverlay()
    }
});

cancelDeleteButton_el.addEventListener('click', () => {
    closeDeleteOverlay();
});