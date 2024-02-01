const searchButton_el = document.getElementById('searchButton');
const searchInput_el = document.getElementById('searchInput');
const addContentButton_el = document.getElementById('addContentButton');

searchButton_el.addEventListener('click', () => {
    toggleSearch();
});

async function toggleSearch(){
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
        searchInput_el.value = '';
        await getMediaContent();
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

searchInput_el.addEventListener('input', async () => {
    if (searchInput_el.value !== ''){
        const searchText = searchInput_el.value.trim().toLowerCase();
        const filteredMediaEntries = listOfMediaEntries.filter(entry =>
            entry.title.toLowerCase().includes(searchText)
        );
        await populateMedia(filteredMediaEntries);    
    } else {
        await getMediaContent();
    }
});

