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
  cta: document.querySelector('.circ-btn'),
  slides: document.querySelectorAll('.slide')
}

DOM.cta.addEventListener('click', showStory, false);

function showStory() {
  DOM.body.classList.add('show-story');
}





let activeSlideCount = 0;

// Detect scroll direction
function detectMouseWheelDirection(e) {
  var delta = null,
    direction = false;
  if (!e) {
    // if the event is not provided, we get it from the window object
    e = window.event;
  }
  if (e.wheelDelta) {
    // will work in most cases
    delta = e.wheelDelta / 60;
  } else if (e.detail) {
    // fallback for Firefox
    delta = -e.detail / 2;
  }
  if (delta !== null) {
    direction = delta > 0 ? 'up' : 'down';
  }

  return direction;
}

var scrollCounter = 0;

function handleMouseWheelDirection(direction) {
  if (scrollCounter % 50 == 0) {
    if (direction == 'down') {
      // showSlider();
      // showNextSlide();
      showNextSlide();

    } else if (direction == 'up') {
      // showPrevSlide();
      console.log('b');
    } else {
      // this means the direction of the mouse wheel could not be determined
    }
  }

  scrollCounter++;
}

document.onmousewheel = function (e) {
  handleMouseWheelDirection(detectMouseWheelDirection(e));
};
if (window.addEventListener) {
  document.addEventListener('DOMMouseScroll', function (e) {
    handleMouseWheelDirection(detectMouseWheelDirection(e));
  });
}



function showNextSlide() {
  activeSlideCount++;
  if (DOM.slides.length == activeSlideCount) activeSlideCount = 0;
  DOM.slides.forEach(i => i.classList.remove('slide-visible'))
  DOM.slides[activeSlideCount].classList.add('slide-visible')
}


window.addEventListener('keydown', checkKey, false);

function checkKey(e) {
  // if (e.keyCode === 38) showPrevSlide();
  if (e.keyCode === 40) showNextSlide();
}