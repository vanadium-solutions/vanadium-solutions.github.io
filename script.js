// script.js

// Component Inclusion
async function includeComponents() {
  const mainContent = document.querySelector('.main-sections-wrapper');
  if (!mainContent) return;

  try {
    // Include header
    const headerResponse = await fetch('components/header.html');
    const headerText = await headerResponse.text();
    mainContent.insertAdjacentHTML('beforebegin', headerText);

    // Include footer
    const footerResponse = await fetch('components/footer.html');
    const footerText = await footerResponse.text();
    mainContent.insertAdjacentHTML('afterend', footerText);

    // Initialize navigation after components are loaded
    initializeNavigation();
  } catch (error) {
    console.error('Error loading components:', error);
  }
}

// Showcase Carousel Logic
function ensureShowcaseActiveOnSectionLoad() {
  const showcaseSection = document.getElementById('showcase');
  if (!showcaseSection || !showcaseSection.classList.contains('active')) return;

  let activeBtn = showcaseSection.querySelector('.carousel-categories .category-btn.active');
  if (!activeBtn) {
    const firstBtn = showcaseSection.querySelector('.carousel-categories .category-btn');
    if (firstBtn) {
      showcaseSection.querySelectorAll('.carousel-categories .category-btn').forEach(b => b.classList.remove('active'));
      firstBtn.classList.add('active');
      activeBtn = firstBtn;
    }
  }
  
  const categoryToShow = activeBtn ? activeBtn.dataset.category : 'communication';
  showCategory(categoryToShow);
}

function showCategory(category) {
  const showcaseSection = document.getElementById('showcase');
  if (!showcaseSection) return;
  
  // Update cards
  showcaseSection.querySelectorAll('.carousel-card').forEach(card => {
    card.classList.toggle('active', card.dataset.category === category);
  });

  // Update buttons
  showcaseSection.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

// Main Section Navigation with Dynamic Loading
function initializeNavigation() {
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  let currentActiveSection = null;

  // Function to show section
  function showSection(targetSection, href) {
    if (!targetSection && !href) return;

    // Remove active class from all sections and nav links
    document.querySelectorAll('.main-section').forEach(section => {
      section.classList.remove('active');
      section.style.opacity = '0';
      section.style.visibility = 'hidden';
      section.style.position = 'absolute';
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.setAttribute('aria-current', 'false');
    });

    // Add active class to target section and corresponding nav link
    if (targetSection) {
      // Show the target section
      targetSection.classList.add('active');
      targetSection.style.opacity = '1';
      targetSection.style.visibility = 'visible';
      targetSection.style.position = 'relative';

      // Update the active link
      const activeLink = navLinks.find(link => {
        const linkHref = link.getAttribute('href');
        return linkHref === '#' + targetSection.id || linkHref === 'index.html#' + targetSection.id;
      });
      if (activeLink) {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
      }

      currentActiveSection = targetSection;

      // Handle showcase section activation
      if (targetSection.id === 'showcase') {
        ensureShowcaseActiveOnSectionLoad();
      }

      // Update URL hash without scrolling
      window.history.pushState(null, '', '#' + targetSection.id);
    }
  }

  // Handle navigation and CTA button clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    
    // If it's a hash link or index.html#section, handle it
    if (href.includes('#')) {
      const hash = href.split('#')[1];
      const targetSection = document.querySelector('#' + hash);
      
      if (targetSection) {
        e.preventDefault();
        showSection(targetSection, '#' + hash);
        
        // Scroll to contact form if it's the CTA button
        if (hash === 'contact' && link.classList.contains('cta-hero-button')) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (href.startsWith('index.html#')) {
        // If we're on another page and clicking an index.html link, let it navigate
        // Don't prevent default - let browser handle navigation
      }
    }
    // For other page links (like software-suite.html), let browser handle it
  });
  
  // Show initial section
  function showInitialSection() {
    const hash = window.location.hash;
    if (hash) {
      const targetSection = document.querySelector(hash);
      showSection(targetSection, hash);
    } else {
      const firstSection = document.querySelector('.main-section');
      if (firstSection) {
        showSection(firstSection, '#' + firstSection.id);
      }
    }
  }

  // Handle showcase category clicks
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.category-btn');
    if (btn && btn.dataset.category) {
      e.preventDefault();
      showCategory(btn.dataset.category);
    }
  });

  showInitialSection();

  // Update current year in footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// Initialize components when the page loads
document.addEventListener('DOMContentLoaded', includeComponents);

// Basic Form Submission Handler
(function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const buttonText = submitButton.querySelector('.button-text');
      const buttonSpinner = submitButton.querySelector('.button-spinner');
      if (buttonText && buttonSpinner) {
        buttonText.style.display = 'none';
        buttonSpinner.style.display = 'inline';
        submitButton.disabled = true;
      }
      const formStatusEl = document.getElementById('formStatus'); 
      if (formStatusEl) formStatusEl.textContent = ''; 
    });
  }
})();

