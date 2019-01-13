const hero = document.querySelector('.page-story__header');
const text = hero.querySelector('h1');
const walk = 60; // 100px

function shadow(e) {
  const width = hero.offsetWidth;
  const height = hero.offsetHeight;
  let {
    offsetX: x,
    offsetY: y
  } = e;

  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  text.style.textShadow = `
    ${yWalk}px ${yWalk}px 12px rgba(255,255,255,0.3), 
    ${xWalk * -1}px ${xWalk}px 3px rgba(255,255,255,0.2)
`;
}

hero.addEventListener('mousemove', shadow);


const DOM = {
  body: document.querySelector('body'),
  cta: document.querySelector('.circ-btn')
}

DOM.cta.addEventListener('click', showStory, false);

function showStory() {
  DOM.body.classList.add('show-story');

  console.log('a')
}