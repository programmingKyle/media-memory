const searchButton_el = document.getElementById('searchButton');
const searchInput_el = document.getElementById('searchInput');

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
