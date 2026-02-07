const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.getElementById('dots');
const counter = document.getElementById('slideCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function createDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dotsContainer.appendChild(dot);
  });
}

function updateUI() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentIndex);
  });

  const dots = Array.from(document.querySelectorAll('.dot'));
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });

  counter.textContent = `${currentIndex + 1} / ${slides.length}`;
}

function goTo(index) {
  currentIndex = (index + slides.length) % slides.length;
  updateUI();
}

function next() {
  goTo(currentIndex + 1);
}

function prev() {
  goTo(currentIndex - 1);
}

nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault();
    next();
  }

  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    prev();
  }
});

let touchStartX = 0;
let touchEndX = 0;

window.addEventListener('touchstart', event => {
  touchStartX = event.changedTouches[0].screenX;
});

window.addEventListener('touchend', event => {
  touchEndX = event.changedTouches[0].screenX;
  const delta = touchEndX - touchStartX;

  if (Math.abs(delta) < 40) {
    return;
  }

  if (delta < 0) {
    next();
  } else {
    prev();
  }
});

createDots();
updateUI();
