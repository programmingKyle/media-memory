const navMovies_el = document.getElementById('navMovies');
const navTV_el = document.getElementById('navTV');
const navBooks_el = document.getElementById('navBooks');

const navElements = [navMovies_el, navTV_el, navBooks_el];

let selectedMedia = 'Movie'; //defaults to Movie

function handleNavClick(navElement){
    navElements.forEach(element => {
        element.classList.remove('active');
    });
    navElement.classList.add('active');
}

navMovies_el.addEventListener('click', async () => {
    selectedMedia = 'Movie';
    handleNavClick(navMovies_el);
    await getMediaContent();
});

navTV_el.addEventListener('click', async () => {
    selectedMedia = 'TV';
    handleNavClick(navTV_el);
    await getMediaContent();
});

navBooks_el.addEventListener('click', async () => {
    selectedMedia = 'Book';
    handleNavClick(navBooks_el);
    await getMediaContent();
});
