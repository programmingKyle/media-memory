const searchButton_el = document.getElementById('searchButton');
const searchInput_el = document.getElementById('searchInput');
const addContentButton_el = document.getElementById('addContentButton');

const addMediaOverlay_el = document.getElementById('addMediaOverlay');
const addMediaCloseButton_el = document.getElementById('addMediaCloseButton');
const mediaTitleInput_el = document.getElementById('mediaTitleInput');
const addMediaButton_el = document.getElementById('addMediaButton');

const navMovies_el = document.getElementById('navMovies');
const navTV_el = document.getElementById('navTV');
const navBooks_el = document.getElementById('navBooks');

let selectedMedia = 'Movie'; //defaults to Movie
const mediaTypeHeader_el = document.getElementById('mediaTypeHeader');

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

addMediaCloseButton_el.addEventListener('click', () => {
    addMediaOverlay_el.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    const starRating = document.getElementById('starRating');
    const stars = starRating.querySelectorAll('.fa-star');
  
    stars.forEach(star => {
      star.addEventListener('mouseover', hoverStar);
      star.addEventListener('click', clickStar);
    });
  
    starRating.addEventListener('mouseout', resetStars);
  
    function hoverStar(event) {
      const hoveredIndex = parseInt(event.target.getAttribute('data-index'));
      highlightStars(hoveredIndex);
    }
  
    function clickStar(event) {
      const clickedIndex = parseInt(event.target.getAttribute('data-index'));
      document.getElementById('starRating').setAttribute('data-rating', clickedIndex);
    }
  
    function resetStars() {
      const rating = parseInt(starRating.getAttribute('data-rating'));
      highlightStars(rating);
    }
  
    function highlightStars(index) {
      stars.forEach((star, i) => {
        if (i < index) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });
    }
});

const navElements = [navMovies_el, navTV_el, navBooks_el];

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