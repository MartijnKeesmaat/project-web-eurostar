const DOM = {
  filterButton: document.querySelector('.filter-button'),
  body: document.querySelector('body')
};

DOM.filterButton.addEventListener('click', showFilters, false);

let menuVisible = false;

function showFilters() {
  if (!menuVisible) DOM.body.classList.add('filters--is-active');
  else DOM.body.classList.remove('filters--is-active');
  menuVisible = !menuVisible;
}
