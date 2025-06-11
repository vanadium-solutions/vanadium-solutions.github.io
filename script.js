// script.js

<<<<<<< HEAD
// Component Inclusion
document.addEventListener('DOMContentLoaded', async function() {
  const mainContent = document.querySelector('.main-sections-wrapper');
  if (!mainContent) return;

  // Include header
  const headerResponse = await fetch('/components/header.html');
  const headerText = await headerResponse.text();
  mainContent.insertAdjacentHTML('beforebegin', headerText);

  // Include footer
  const footerResponse = await fetch('/components/footer.html');
  const footerText = await footerResponse.text();
  mainContent.insertAdjacentHTML('afterend', footerText);

  // Mark current page as active in navigation
  const currentPath = window.location.pathname || '/index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});

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

  // Hide all cards first
  showcaseSection.querySelectorAll('.carousel-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Show the selected category's card
  const targetCard = showcaseSection.querySelector(`.carousel-card[data-category="${category}"]`);
  if (targetCard) {
    targetCard.classList.add('active');
  }

  // Update button active states
  showcaseSection.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

// Main Section Navigation with Dynamic Loading
(function () {
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  let currentActiveSection = null;
  
  // Function to load external page content
  async function loadExternalContent(href) {
    try {
      const response = await fetch(href);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      return doc.querySelector('.main-section');
    } catch (error) {
      console.error('Error loading content:', error);
      return null;
    }
  }
  
  // Function to show section
  async function showSection(targetSection, href) {
    if (!targetSection && !href) return;
    
    // If we need to load external content
    if (href && !href.startsWith('#')) {
      const loadedSection = await loadExternalContent(href);
      if (loadedSection) {
        // Replace existing section or add new one
        const mainSections = document.querySelector('.main-sections');
        const existingSection = document.getElementById(loadedSection.id);
        if (existingSection) {
          mainSections.replaceChild(loadedSection, existingSection);
        } else {
          mainSections.appendChild(loadedSection);
        }
        targetSection = loadedSection;
      }
    }
    
    if (!targetSection) return;
    
    // Hide current active section if it exists
    if (currentActiveSection && currentActiveSection !== targetSection) {
      currentActiveSection.classList.remove('active');
    }
    
    // Show new section
    targetSection.classList.add('active');
    currentActiveSection = targetSection;
    
    // Update active state in navigation
    navLinks.forEach(link => {
      const isActive = (link.getAttribute('href') === href) || 
                      (link.getAttribute('href') === '#' + targetSection.id);
      link.classList.toggle('active', isActive);
    });
    
    // If this is the showcase section, ensure carousel is initialized
    if (targetSection.id === 'showcase') {
      ensureShowcaseActiveOnSectionLoad();
    }
  }

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      
      // If it's a hash link, find the section in current page
      if (href.startsWith('#')) {
        const targetSection = document.querySelector(href);
        await showSection(targetSection, href);
      } else {
        // Load external content
        await showSection(null, href);
      }
    });
  });
  
  // Show initial section
  document.addEventListener('DOMContentLoaded', () => {
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
  });

  // Handle showcase category clicks
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.category-btn');
    if (btn && btn.dataset.category) {
      showCategory(btn.dataset.category);
    }
  });
})();
=======
// Showcase Carousel Logic (Category Filter)
(function() {
    function showCategory(category) {
      const showcaseSection = document.getElementById('showcase');
      if (!showcaseSection) return;
  
      showcaseSection.querySelectorAll('.carousel-card').forEach(function(card) {
        card.classList.toggle('active', card.dataset.category === category);
      });
      showcaseSection.querySelectorAll('.category-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.category === category);
      });
    }
  
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.category-btn');
      if (btn && btn.dataset.category) {
        showCategory(btn.dataset.category);
      }
    });
  
    function ensureShowcaseActiveOnSectionLoad() {
      const showcaseSection = document.getElementById('showcase');
      // Ensure this runs only if the showcase section itself is active (visible)
      if (showcaseSection && showcaseSection.classList.contains('main-section') && showcaseSection.classList.contains('active')) {
        let activeBtn = showcaseSection.querySelector('.carousel-categories .category-btn.active');
        if (!activeBtn) { 
          const firstBtn = showcaseSection.querySelector('.carousel-categories .category-btn');
          if (firstBtn) {
            // Clear active class from all category buttons first
            showcaseSection.querySelectorAll('.carousel-categories .category-btn').forEach(b => b.classList.remove('active'));
            firstBtn.classList.add('active');
            activeBtn = firstBtn;
          }
        }
        const categoryToShow = activeBtn ? activeBtn.dataset.category : 'communication'; 
        showCategory(categoryToShow);
      }
    }
    
    // Observer for when the #showcase main-section becomes active
    const mainSectionsObserver = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const targetElement = mutation.target;
          if (targetElement.id === 'showcase' && targetElement.classList.contains('active')) {
            ensureShowcaseActiveOnSectionLoad();
          }
        }
      }
    });
    
    const showcaseMainSectionElement = document.getElementById('showcase');
    if (showcaseMainSectionElement) {
        mainSectionsObserver.observe(showcaseMainSectionElement, { attributes: true });
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      // Initial check in case showcase is the default active section on page load
      setTimeout(ensureShowcaseActiveOnSectionLoad, 100); // Increased delay slightly
    });
  })();
  
  // Main Section "Carousel" Navigation (display: none/block)
  (function () {
    const navLinksNodeList = document.querySelectorAll('.main-nav a[href^="#"]');
    const navLinks = Array.from(navLinksNodeList);
    const sectionIdsFromNav = navLinks.map(link => link.getAttribute('href').substring(1));
    const sections = sectionIdsFromNav.map(id => document.getElementById(id)).filter(Boolean); 
    
    let currentActiveSection = null; 
  
    if (sections.length === 0) {
      // console.warn("Main sections for navigation not found.");
      return;
    }
  
    function showSection(targetSection) {
      if (!targetSection) {
          // console.warn("showSection: targetSection is null or undefined.");
          return;
      }
  
      if (currentActiveSection && currentActiveSection !== targetSection) {
        currentActiveSection.classList.remove('active');
        // currentActiveSection.style.display = 'none'; // CSS handles this
      }
  
      targetSection.classList.add('active');
      // targetSection.style.display = 'block'; // CSS handles this
      currentActiveSection = targetSection;
  
      navLinks.forEach((link) => {
          const linkTargetId = link.getAttribute('href').substring(1);
          link.classList.toggle('active', linkTargetId === targetSection.id);
      });
    }
  
    function handleNavClick(e, linkElement) {
      const targetId = linkElement.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (!targetSection || !sections.includes(targetSection)) {
        return; 
      }
  
      e.preventDefault(); 
      
      if (targetSection === currentActiveSection) return; 
  
      showSection(targetSection);
      
      if (history.pushState) {
        history.pushState(null, null, '#' + targetId);
      } else {
        location.hash = '#' + targetId;
      }
    }
  
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => handleNavClick(e, link));
    });
  
    const heroCTAButton = document.querySelector('.cta-hero-button');
    if (heroCTAButton) {
      heroCTAButton.addEventListener('click', (e) => handleNavClick(e, heroCTAButton));
    }
  
    function showInitialSection() {
      let sectionToShow = null; 
  
      if (location.hash) {
        const hash = location.hash.replace('#', '');
        const hashedSection = document.getElementById(hash);
        if (hashedSection && sections.includes(hashedSection)) {
          sectionToShow = hashedSection;
        }
      }
      
      // If no valid hash, or hash points to a non-managed section, default to the first section in our array
      if (!sectionToShow && sections.length > 0) {
          sectionToShow = sections[0];
      }
      
      if (sectionToShow) {
          showSection(sectionToShow);
      } else {
          // console.error("No sections available to display initially.");
      }
    }
    
    document.addEventListener('DOMContentLoaded', showInitialSection);
  })();
  
  // Footer Current Year
  (function() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }
  })();
  
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
>>>>>>> 5a103012af94e0e84f47d097a0c8f3532eb352ae
