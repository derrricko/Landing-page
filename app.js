const revealEls = document.querySelectorAll('.reveal-on-scroll');

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  },
  {threshold: 0.2}
);

revealEls.forEach(el => io.observe(el));
