'use strict';

/* - I have collection of goat photos
   - user is presented the photos in 3s (3 photos at a time) — should be 3 different photos
   - user votes on their favorite by clicking on the photo
   - 15 match ups per round of voting (so 15 total votes)
   - at end of round display the results
   - in results I want to see
   - how many votes each goat got
   - how many times each goat photo was render


   PLAN

   Constructor —
     - name
     - image source
     - votes
     - views
   Global variables
     - all photo array
    - counter for the votes (number of matchups)
   method function
     render the goat image in the dom
       - can't have 3 of the same photo
     random number to use to get a photo
    display the results
   event lister
    goat clicks
       increment the vote
     triger a new set of photos*/

/* Global Variable*/
let myPhotoContainer = document.querySelector('section');
let myButton = document.querySelector('section + div');
let ul = document.querySelector('ul');

let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:nth-child(3)');

let allPhoto = [];
let click = 0;

let clickedAllowed = 25;


/* CONSTRUCTOR*/
function Photo(name, fileExtension ='.jpg') {
  this.name = name;
  this.src = `img/${this.name}${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
}

/*FUNCTIONS*/

function randomPhoto(){
  return Math.floor(Math.random() * allPhoto.length);
}

function renderPhoto() {

  let image1 = randomPhoto();
  let image2 = randomPhoto();
  let image3 = randomPhoto();

  while ((image1 === image2 || image2 === image3)) {
    image2 = randomPhoto();
    while ((image3 === image1 || image2 === image2)) {
      image3 = randomPhoto();
    }
  }
  // first one is dom element
  img1.src = allPhoto[image1].src;
  img1.alt = allPhoto[image1].name;
  allPhoto[image1].views++;
  img2.src = allPhoto[image2].src;
  img2.alt = allPhoto[image2].name;
  allPhoto[image2].views++;
  img3.src = allPhoto[image3].src;
  img3.alt = allPhoto[image3].name;
  allPhoto[image3].views++;
  console.log(allPhoto);

}


function handlePhotoClick(event) {
  if (event.target === myPhotoContainer) {
    alert('Please click on an image');
  }
  click++;
  let clickedPhoto = event.target.alt;
  console.log(clickedPhoto);

  for (let i = 0; i< allPhoto.length; i++) {
    if (clickedAllowed === allPhoto[i].name) {
      allPhoto[i].click++;
      break;
    }
  }
  renderPhoto();
  if (click === clickedAllowed) {
    myButton.className = 'clicks-allowed';
    myPhotoContainer.removeEventListener('click', handlePhotoClick);
    myButton.addEventListener('click', handleButtonClick);
  }
}
function handleButtonClick() {
  // if (clicks === clickAllowed) {
  renderResults();
  // }
}
function renderResults() {

  for (let i = 0; i < allPhoto.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allPhoto[i].name} had ${allPhoto[i].views} views and was clicked on ${allPhoto[i].click} times`;
    ul.appendChild(li);
  }
}



// EXCUTABLE CODE
let bag = new Photo('bag');
let banana = new Photo('banana');
let bathroom = new Photo('bathroom');
let boots = new Photo('boots');
let breakfast = new Photo('breakfast');
let bubblegum = new Photo('bubblegum');
let chair = new Photo('chair');
let dogDuck = new Photo('dog-duck');
let dragon = new Photo('dragon');
let pen = new Photo('pen');
let petSweep = new Photo('pet-sweep');
let scissors = new Photo('scissors');
let shark = new Photo('shark');
let sweep = new Photo('sweep', '.png');
let tauntaun = new Photo('tauntaun');
let unicorn = new Photo('unicorn');
let waterCan = new Photo('water-can');
let wineGlass = new Photo('wine-glass');

allPhoto.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, dogDuck,dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderPhoto();
myPhotoContainer.addEventListener('click', handlePhotoClick);
