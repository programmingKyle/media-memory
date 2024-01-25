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

navMovies_el.addEventListener('click', () => {
    selectedMedia = 'Movie';
    handleNavClick(navMovies_el);
});

navTV_el.addEventListener('click', () => {
    selectedMedia = 'TV Show';
    handleNavClick(navTV_el);
});

navBooks_el.addEventListener('click', () => {
    selectedMedia = 'Book';
    handleNavClick(navBooks_el);
});
