// --- Dynamic partial loader ---
document.addEventListener('DOMContentLoaded', async () => {
  const containers = document.querySelectorAll('[data-content]');
  for (const el of containers) {
    const url = el.getAttribute('data-content');
    try {
      const resp = await fetch(url);
      el.innerHTML = await resp.text();
    } catch (e) {
      el.innerHTML = '<p>Could not load section.</p>';
    }
  }

  // --- Hamburger menu toggle ---
  const hamburger = document.getElementById('hamburger-menu');
  const navLinksHamburger = document.querySelector('.nav-links');
  if (hamburger && navLinksHamburger) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      navLinksHamburger.classList.toggle('active');
    });
    navLinksHamburger.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinksHamburger.classList.remove('active');
      });
    });
  }

  // --- Animate hero word ---
  const heroWords = [
    "freedom.",
    "control.",
    "security.",
    "compliance.",
    "trust.",
    "power.",
    "independence.",
    "confidence.",
    "resilience.",
    "ownership."
  ];
  const animatedWord = document.getElementById("animated-hero-word");
  let heroWordIdx = 0;
  if (animatedWord) {
    setInterval(() => {
      // Fade out
      animatedWord.style.transition = "opacity 0.4s";
      animatedWord.style.opacity = 0;
      setTimeout(() => {
        heroWordIdx = (heroWordIdx + 1) % heroWords.length;
        animatedWord.textContent = heroWords[heroWordIdx];
        // Fade in
        animatedWord.style.opacity = 1;
      }, 400);
    }, 2200);
  }

  // Smooth scroll for nav links
  const navLinks = document.querySelectorAll('nav a, .hero-ctas a, .cta-section a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash && document.querySelector(this.hash)) {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Contact form Web3Forms feedback
  const contactForm = document.querySelector('.contact-form');
  if (contactForm && contactForm.action.includes('web3forms')) {
    const msgDiv = contactForm.querySelector('.form-message');
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      msgDiv.style.display = 'none';
      msgDiv.textContent = '';
      const formData = new FormData(contactForm);
      try {
        const resp = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
        });
        const result = await resp.json();
        if (result.success) {
          msgDiv.textContent = 'Thank you! We will contact you soon.';
          msgDiv.style.display = 'block';
          msgDiv.style.color = '#43d9ad';
          contactForm.reset();
        } else {
          msgDiv.textContent = 'Sorry, there was a problem. Please try again.';
          msgDiv.style.display = 'block';
          msgDiv.style.color = '#eebbc3';
        }
      } catch (err) {
        msgDiv.textContent = 'Network error. Please try again.';
        msgDiv.style.display = 'block';
        msgDiv.style.color = '#eebbc3';
      }
    });
  }
});

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a, .hero-ctas a, .cta-section a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.hash && document.querySelector(this.hash)) {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form placeholder submit
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! We will contact you soon. (Form is placeholder)');
    contactForm.reset();
  });
}
console.log("Loaded partial:", url);
console.log("Loaded partial:", url);
