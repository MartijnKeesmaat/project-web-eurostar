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
  slides: document.querySelectorAll('.slide'),
  tooltip: document.querySelector('.tooltip')
}

DOM.cta.addEventListener('click', showStory, false);

function showStory() {
  DOM.body.classList.add('show-story');

  setTimeout(function () {
    document.querySelector('.sakura-vid').style.display = 'block';
    DOM.body.classList.add('glitch')
    document.querySelector('.backdrop__text').innerHTML = '家に帰るだけで混乱します';
  }, 5000);

  setTimeout(function () {
    document.querySelector('.sakura-vid').style.display = 'none';
    DOM.body.classList.remove('glitch')
    document.querySelector('.backdrop__text').innerHTML = 'Ga naar huis, je bent in de war';
  }, 7000);

  setTimeout(function () {
    document.querySelector('.sakura-vid').style.display = 'block';
    DOM.body.classList.add('glitch')
    document.querySelector('.backdrop__text').innerHTML = '家に帰るだけで混乱します';
  }, 11000);

  setTimeout(function () {
    document.querySelector('.sakura-vid').style.display = 'none';
    DOM.body.classList.remove('glitch')
    document.querySelector('.backdrop__text').innerHTML = 'Ga naar huis, je bent in de war';
  }, 13000);

  setTimeout(function () {
    document.querySelector('.soil-vid').style.display = 'block';
    DOM.body.classList.add('glitch')
    document.querySelector('.backdrop__text').innerHTML = 'נאָר גיין היים איר זענט צעמישט';
  }, 17000);

  setTimeout(function () {
    document.querySelector('.soil-vid').style.display = 'none';
    DOM.body.classList.remove('glitch');
    document.querySelector('.backdrop__text').innerHTML = 'Ga naar huis, je bent in de war';
  }, 20000);

  setTimeout(function () {
    document.querySelector('.soil-vid').style.display = 'block';
    DOM.body.classList.add('glitch')
    document.querySelector('.backdrop__text').innerHTML = 'נאָר גיין היים איר זענט צעמישט';
  }, 20500);

  setTimeout(function () {
    document.querySelector('.soil-vid').style.display = 'none';
    DOM.body.classList.remove('glitch')
    document.querySelector('.backdrop__text').innerHTML = 'Ga naar huis, je bent in de war';
  }, 21000);
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


window.addEventListener('mouseup', foo, false);

function foo() {
  var selObj = window.getSelection();
  var selRange = selObj.getRangeAt(0);

  console.log(selObj);
  console.log(selRange);

  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }

  if (selObj.type == 'Range') {
    DOM.tooltip.style.transform = `translate(${getSelectionCoords().x}px, ${getSelectionCoords().y}px)`
    DOM.tooltip.style.display = 'flex'
  } else {
    DOM.tooltip.style.display = 'none'
  }

}


function getSelectionCoords(win) {
  win = win || window;
  var doc = win.document;
  var sel = doc.selection,
    range, rects, rect;
  var x = 0,
    y = 0;
  if (sel) {
    if (sel.type != "Control") {
      range = sel.createRange();
      range.collapse(true);
      x = range.boundingLeft;
      y = range.boundingTop;
    }
  } else if (win.getSelection) {
    sel = win.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
        range.collapse(true);
        rects = range.getClientRects();
        if (rects.length > 0) {
          rect = rects[0];
        }
        x = rect.left;
        y = rect.top;
      }
      // Fall back to inserting a temporary element
      if (x == 0 && y == 0) {
        var span = doc.createElement("span");
        if (span.getClientRects) {
          // Ensure span has dimensions and position by
          // adding a zero-width space character
          span.appendChild(doc.createTextNode("\u200b"));
          range.insertNode(span);
          rect = span.getClientRects()[0];
          x = rect.left;
          y = rect.top;
          var spanParent = span.parentNode;
          spanParent.removeChild(span);

          // Glue any broken text nodes back together
          spanParent.normalize();
        }
      }
    }
  }
  return {
    x: x,
    y: y
  };
}