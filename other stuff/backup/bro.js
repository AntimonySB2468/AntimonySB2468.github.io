// Here is the js if i need to update something:
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else {
  body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  updateThemeIcon(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const colorWheel = document.getElementById('colorWheel');
  const selector = document.getElementById('selector');
  const menuToggle = document.getElementById('menuToggle');
  const colorMenu = document.getElementById('colorMenu');
  const closeMenu = document.getElementById('closeMenu');

  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    colorMenu.classList.toggle('active');
  });
  
  closeMenu.addEventListener('click', function() {
    colorMenu.classList.remove('active');
  });
  
  document.addEventListener('click', function(e) {
    if (!colorMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      colorMenu.classList.remove('active');
    }
  });
  
  let currentHue = localStorage.getItem('hue') ? parseInt(localStorage.getItem('hue')) : 300;
  document.documentElement.style.setProperty('--hue', currentHue);

  function saveHue(hue) {
    localStorage.setItem('hue', hue);
  }
  
  function positionSelector(x, y) {
    const rect = colorWheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
    const normalizedAngle = (angle + 90 + 360) % 360;

    const selectorX = Math.cos(angle * Math.PI / 180) * (rect.width / 2 * 0.85);
    const selectorY = Math.sin(angle * Math.PI / 180) * (rect.height / 2 * 0.85);
    
    selector.style.left = `calc(50% + ${selectorX}px)`;
    selector.style.top = `calc(50% + ${selectorY}px)`;
    
    currentHue = Math.round(normalizedAngle);
    
    document.documentElement.style.setProperty('--hue', currentHue);
    
    saveHue(currentHue);
  }
  
  function initColorWheel() {
    const rect = colorWheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = Math.min(rect.width, rect.height) / 2 * 0.85;
    
    const hueRadians = (currentHue - 90) * (Math.PI / 180);
    
    const x = centerX + radius * Math.cos(hueRadians);
    const y = centerY + radius * Math.sin(hueRadians);
    
    positionSelector(x, y);
  }
  
  colorWheel.addEventListener('click', function(e) {
    positionSelector(e.clientX, e.clientY);
  });
  
  requestAnimationFrame(() => {
    if (colorWheel.offsetWidth === 0 || colorWheel.offsetHeight === 0) {
      setTimeout(initColorWheel, 100);
    } else {
      initColorWheel();
    }
  });
});

document.querySelectorAll('.typewriter').forEach(el => {
  el.addEventListener('animationend', () => {
    el.classList.add('animated');
  });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const smallScreenNav = document.getElementById('smallScreenNav');
  const body = document.body;
  
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);
  
  // Toggle menu with animation
  function toggleMenu() {
    const isOpening = !smallScreenNav.classList.contains('active');
    
    if (isOpening) {
      // Prepare to open
      smallScreenNav.style.display = 'block';
      overlay.style.display = 'block';
      body.classList.add('menu-open');
      
      // Force reflow to enable transition
      void smallScreenNav.offsetWidth;
      
      // Start animations
      smallScreenNav.classList.add('active');
      overlay.classList.add('active');
    } else {
      // Start closing animations
      smallScreenNav.classList.remove('active');
      overlay.classList.remove('active');
      
      // Wait for transition to complete before hiding
      setTimeout(() => {
        if (!smallScreenNav.classList.contains('active')) {
          smallScreenNav.style.display = 'none';
          overlay.style.display = 'none';
          body.classList.remove('menu-open');
        }
      }, 300);
    }
  }
  
  // Hamburger click handler
  hamburgerMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });
  
  // Overlay click handler
  overlay.addEventListener('click', toggleMenu);
  
  // Close menu when clicking links
  document.querySelectorAll('.small-screen-nav .nav-links a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
  
  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (!smallScreenNav.contains(e.target) && 
        !hamburgerMenu.contains(e.target) && 
        smallScreenNav.classList.contains('active')) {
      toggleMenu();
    }
  });
  
  // Initialize menu as hidden
  smallScreenNav.style.display = 'none';
  overlay.style.display = 'none';
});