const navMovies_el = document.getElementById('navMovies');
const navTV_el = document.getElementById('navTV');
const navBooks_el = document.getElementById('navBooks');

const navElements = [navMovies_el, navTV_el, navBooks_el];

let selectedMedia = 'Movie'; //defaults to Movie

document.addEventListener('DOMContentLoaded', () => {
    navHoverListeners();
});

function handleNavClick(navElement){
    navElements.forEach(element => {
        element.classList.remove('active');
    });
    navElement.classList.add('active');
    navElement.classList.remove('hover');
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

async function navHoverListeners(){
    navElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!element.classList.contains('active')){
                element.classList.add('hover');
            }
        })
        element.addEventListener('mouseleave', () => {
            element.classList.remove('hover');
        });
    });
}
