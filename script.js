document.addEventListener("DOMContentLoaded", function () {

  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let range = end - start;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      let progress = timestamp - startTime;
      let value = Math.min(start + Math.floor((progress / duration) * range), end);
      obj.innerText = value;
      if (value < end) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  animateValue("direct-counter", 0, 150, 1000);
  animateValue("indirect-counter", 0, 7600, 2000);

  //  lazy load for sections
  const sections = document.querySelectorAll('.lazy-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const src = section.getAttribute('data-src');

        if (!section.classList.contains('loaded')) {
          fetch(src)
            .then(res => res.text())
            .then(html => {
              section.innerHTML = html;
              section.classList.add('loaded');
              console.log(`✅ Loaded: ${src}`);
            })
            .catch(err => console.error(`❌ Error loading ${src}`, err));
        }
      }
    });
  });

  sections.forEach(section => {
    observer.observe(section);
  });

});
