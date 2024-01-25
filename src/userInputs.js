const searchButton_el = document.getElementById('searchButton');
const searchInput_el = document.getElementById('searchInput');
const addContentButton_el = document.getElementById('addContentButton');

searchButton_el.addEventListener('click', () => {
    toggleSearch();
});

function toggleSearch(){
    if (searchInput_el.style.display === 'none'){
        searchInput_el.style.display = 'grid';
    } else {
        searchInput_el.style.display = 'none';
    }
}

addContentButton_el.addEventListener('click', () => {
    addMediaOverlay_el.style.display = 'flex';
    mediaTypeHeader_el.textContent = `Add ${selectedMedia}`;
});


