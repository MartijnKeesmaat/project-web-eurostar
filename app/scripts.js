// Filter drawer
const DOM = {
  filterButton: document.querySelector('.filter-button'),
  body: document.querySelector('body'),
  close: document.querySelector('#filter-button--close'),
  storyContainer: document.querySelector('.stories'),
  stories: document.querySelectorAll('.story-list-item'),
  statusLabel: document.querySelectorAll('.status-select label'),
  genreLabel: document.querySelectorAll('.tag-select__tags label'),
  genreLabelDesc: document.querySelectorAll('.filter-bar__sort__item label'),
  sortDesc: document.querySelectorAll('.sort-desktop__item'),
};




// Show menu
DOM.filterButton.addEventListener('click', toggleFilterMenu, false);

let menuVisible = false;

function toggleFilterMenu() {
  if (!menuVisible) DOM.body.classList.add('filters--is-active');
  else DOM.body.classList.remove('filters--is-active');
  menuVisible = !menuVisible;
}




// Listen to form events
DOM.statusLabel.forEach(i => i.addEventListener('click', setStatus, false))
DOM.genreLabel.forEach(i => i.addEventListener('click', setGenre, false))
DOM.close.addEventListener('click', apllyFilters, false);
DOM.sortDesc.forEach(i => i.addEventListener('click', sortDesc, false));


// Sort
let sortType = 'populair'

function setStatus(e) {
  sortType = e.target.innerHTML.toLowerCase();
}

// Sort alphabet
function sortAZ(arr) {
  return arr.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0
  });
}

// Sort on number
function sortNumber(arr) {
  return arr.sort((a, b) => a.number - b.number);
}

// Sort on views
function sortPopulair(arr) {
  return arr.sort((a, b) => Number(b.views) - Number(a.views));
}

// Get choosen genres
let chosenGenres = []

function setGenre(e) {
  const picked = e.target.innerHTML.toLowerCase()
  if (chosenGenres.includes(picked)) {
    for (var i = chosenGenres.length - 1; i >= 0; i--) {
      if (chosenGenres[i] === picked) {
        chosenGenres.splice(i, 1);
      }
    }
  } else {
    chosenGenres.push(picked);
  }
}

// Filter on choosen genres
function filterGenres() {
  if (chosenGenres.length === 0) chosenGenres = ['drama', 'mysterieus', 'vrolijk', 'gepassioneerd', 'grappig', 'beknopt', 'poëtisch']

  let genreFilterd = [];
  for (let i = 0; i < chosenGenres.length; i++) {
    let a = allStories.filter(story => story.genre.includes(chosenGenres[i]))
    genreFilterd.push(...a);
  }

  return genreFilterd
}





// Get story props
let allStories = [];

function getAllStories() {
  for (let i = 0; i < DOM.stories.length; i++) {

    const story = {
      title: DOM.stories[i].querySelector('h3').innerHTML.split(' - ')[1],
      number: DOM.stories[i].querySelector('h3').innerHTML.split(' - ')[0],
      img: DOM.stories[i].querySelector('.story-list-item__thumbnail img').src,
      genre: DOM.stories[i].querySelector('.labels p').innerHTML.toLowerCase(),
      likes: DOM.stories[i].querySelector('.story-list-item__actions__like span').innerHTML,
      comments: DOM.stories[i].querySelector('.story-list-item__actions__comments span').innerHTML,
      views: DOM.stories[i].querySelector('.story-list-item__actions__views button').innerHTML.split(' ')[0]
    }

    allStories.push(story)
  }
}

getAllStories();

sortPopulair(allStories);

// Set story props
function renderResults(renderItems) {

  let renderStories = ``

  renderItems.forEach(render => {
    renderStories += `
    <article class="story-list-item">
      <a href="story.html">
        <figure class="story-list-item__thumbnail">
          <img src="${render.img}" alt="poster" />
        </figure>

        <section class="story-list-item__meta-data">
          <h3>${render.number} - ${render.title}</h3>

          <div class="labels">
            <p>${render.genre}</p>
          </div>

          <div class="story-list-item__actions">
            <div class="story-list-item__actions__like">
              <button>
                <img src="img/icons/heart.svg" alt="heart icon" />
                <span>${render.likes}</span>
              </button>
            </div>

            <div class="story-list-item__actions__comments">
              <button>
                <img src="img/icons/comments.svg" alt="comment icon" />
                <span>${render.comments}</span>
              </button>
            </div>

            <div class="story-list-item__actions__downloads">
              <button>
                <img src="img/icons/download.svg" alt="download icon" />
              </button>
            </div>

            <div class="story-list-item__actions__views">
              <button>${render.views} views</button>
            </div>
            
          </div>
        </section>
      </a>
    </article>
  `
  });

  DOM.storyContainer.innerHTML = renderStories

}

sortPopulair(allStories);

// Execute on file submit
function apllyFilters(e) {
  e.preventDefault();
  let currentStories = filterGenres()

  toggleFilterMenu();
  if (sortType === 'a-z') renderResults(sortAZ(currentStories));
  else if (sortType === 'nummer') renderResults(sortNumber(currentStories));
  else if (sortType === 'populair') renderResults(sortPopulair(currentStories));
}

DOM.genreLabelDesc.forEach(i => i.addEventListener('click', filterDesc));


function setGenreDesc(e) {
  const picked = e.target.innerHTML.toLowerCase();
  if (chosenGenres.includes(picked)) {
    for (var i = chosenGenres.length - 1; i >= 0; i--) {
      if (chosenGenres[i] === picked) {
        chosenGenres.splice(i, 1);
      }
    }
  } else {
    chosenGenres.push(picked);
  }
}

function filterDesc(e) {
  setGenreDesc(e);
  let currentStories = filterGenres();
  if (sortType === 'a-z') renderResults(sortAZ(currentStories));
  else if (sortType === 'nummer') renderResults(sortNumber(currentStories));
  else if (sortType === 'populair') renderResults(sortPopulair(currentStories));
}

function sortDesc(e) {
  let s = e.target.innerHTML.toLowerCase();
  DOM.sortDesc.forEach(i => i.classList.remove('sort-desktop__item--active'));
  e.target.classList.add('sort-desktop__item--active');
  let currentStories = filterGenres();
  if (s === 'a-z') renderResults(sortAZ(currentStories));
  else if (s === 'nummer') renderResults(sortNumber(currentStories));
  else if (s === 'populair') renderResults(sortPopulair(currentStories));
}