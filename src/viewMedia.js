const viewMediaOverlay_el = document.getElementById('viewMediaOverlay');
const viewMediaCloseButton_el = document.getElementById('viewMediaCloseButton');
const viewMediaTitleText_el = document.getElementById('viewMediaTitleText');
const editMediaButton_el = document.getElementById('editMediaButton');
const viewMediaPicture_el = document.getElementById('viewMediaPicture');
const viewMediaRatingDiv_el = document.getElementById('viewMediaRatingDiv');
const viewMediaContent_el = document.getElementById('viewMediaContent');

viewMediaCloseButton_el.addEventListener('click', () => {
    viewMediaContent_el.classList.remove('active');
    const transitionEndHandler = () => {
        viewMediaOverlay_el.style.display = 'none';
        viewMediaContent_el.removeEventListener('transitionend', transitionEndHandler);
    };
    viewMediaContent_el.addEventListener('transitionend', transitionEndHandler);
});


function populateViewMedia(item, picturePath){
    viewMediaRatingDiv_el.innerHTML = '';
    viewMediaOverlay_el.style.display = 'flex';
    viewMediaTitleText_el.textContent = item.title;
    viewMediaPicture_el.src = picturePath !== '' ? picturePath: 'imageunavailable.png';
    viewMediaOverlay_el.offsetHeight;
    viewMediaContent_el.classList.add('active');

    if (item.rating === 0){
        const invisibleRating = document.createElement('i');
        invisibleRating.classList.add('fas', 'fa-star');
        invisibleRating.style.visibility = 'hidden';
        viewMediaRatingDiv_el.appendChild(invisibleRating);
    } else {
        for (let i = 0; i < item.rating; i++){
            const starIcon = document.createElement('i');
            starIcon.classList.add('fas', 'fa-star');
            viewMediaRatingDiv_el.appendChild(starIcon);
        }    
    }
}