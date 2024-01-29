const searchButton_el = document.getElementById('searchButton');
const searchInput_el = document.getElementById('searchInput');
const addContentButton_el = document.getElementById('addContentButton');

searchButton_el.addEventListener('click', () => {
    toggleSearch();
});

function toggleSearch(){
    if (searchInput_el.style.display === 'none'){
        searchButton_el.classList.remove('fa-magnifying-glass');
        searchInput_el.style.display = 'grid';
        searchInput_el.offsetHeight;
        searchButton_el.classList.add('fa-x');
        searchInput_el.classList.add('active');
    } else {
        searchInput_el.classList.remove('active');
        searchButton_el.classList.remove('fa-x');
        searchButton_el.classList.add('fa-magnifying-glass');
        const transitionEndHandler = () => {
            searchInput_el.style.display = 'none';
            searchInput_el.removeEventListener('transitionend', transitionEndHandler);
        };
        searchInput_el.addEventListener('transitionend', transitionEndHandler);    
    }
}

addContentButton_el.addEventListener('click', () => {
    mediaTitleInput_el.value = '';
    addMediaOverlay_el.style.display = 'flex';
    mediaTypeHeader_el.textContent = `Add ${selectedMedia}`;
    addMediaOverlay_el.offsetHeight;
    addMediaContent_el.classList.add('active');
});


