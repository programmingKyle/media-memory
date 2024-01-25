const addMediaOverlay_el = document.getElementById('addMediaOverlay');
const addMediaCloseButton_el = document.getElementById('addMediaCloseButton');
const mediaTitleInput_el = document.getElementById('mediaTitleInput');
const addMediaButton_el = document.getElementById('addMediaButton');
const mediaTypeHeader_el = document.getElementById('mediaTypeHeader');
const dropArea_el = document.getElementById('dropArea');
const pictureFileName_el = document.getElementById('pictureFileName');

let pictureFilePath;
let selectedRating = 0;

addMediaCloseButton_el.addEventListener('click', () => {
    addMediaOverlay_el.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    const starRating = document.getElementById('starRating');
    const stars = starRating.querySelectorAll('.fa-star');
  
    stars.forEach((star, index) => {
      star.addEventListener('mouseover', () => hoverStar(index + 1)); // index + 1 to make it 1-based
      star.addEventListener('click', () => clickStar(index + 1)); // index + 1 to make it 1-based
    });
  
    starRating.addEventListener('mouseout', resetStars);
  
    function hoverStar(hoveredIndex) {
      highlightStars(hoveredIndex);
    }
  
    function clickStar(clickedIndex) {
      selectedRating = clickedIndex;
      document.getElementById('starRating').setAttribute('data-rating', selectedRating);
    }
  
    function resetStars() {
      highlightStars(selectedRating);
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

dropArea_el.addEventListener('dragover', preventDefaults, false);
dropArea_el.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDrop(e) {
  preventDefaults(e); // Prevent default behavior for the drop event

  const files = e.dataTransfer.files;

  if (files.length > 0) {
    pictureFilePath = files[0].path || files[0].name;
    pictureFileName_el.textContent = pictureFilePath.split('\\').pop();
  }
}

addMediaButton_el.addEventListener('click', async () => {
  if (mediaTitleInput_el.value === ''){
    mediaTitleInput_el.classList.add('error');
    setTimeout(() => {
      mediaTitleInput_el.classList.remove('error');
    }, 2000);
  } else if (pictureFilePath === undefined) {
    dropArea_el.classList.add('error');
    setTimeout(() => {
      dropArea_el.classList.remove('error');
    }, 2000);
  } else {
    await api.addMedia({media: selectedMedia, title: mediaTitleInput_el.value, rating: selectedRating, filePath: pictureFilePath })
    addMediaOverlay_el.style.display = 'none';
    pictureFileName_el.textContent = 'Drop Picture Here';
    pictureFilePath = '';
    await getMediaContent();  
  }
});
