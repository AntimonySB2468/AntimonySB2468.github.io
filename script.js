// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else {
  body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  updateThemeIcon(prefersDark ? 'dark' : 'light');
}

// Toggle theme on button click
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

// Color Wheel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const colorWheel = document.getElementById('colorWheel');
  const selector = document.getElementById('selector');
  const menuToggle = document.getElementById('menuToggle');
  const colorMenu = document.getElementById('colorMenu');
  const closeMenu = document.getElementById('closeMenu');
  
  // Menu toggle functionality
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    colorMenu.classList.toggle('active');
  });
  
  closeMenu.addEventListener('click', function() {
    colorMenu.classList.remove('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!colorMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      colorMenu.classList.remove('active');
    }
  });
  
  // Load saved hue preference or default to purple (300)
  let currentHue = localStorage.getItem('hue') ? parseInt(localStorage.getItem('hue')) : 300;
  document.documentElement.style.setProperty('--hue', currentHue);
  
  // Save hue preference
  function saveHue(hue) {
    localStorage.setItem('hue', hue);
  }
  
  // Position selector on color wheel based on angle only
  function positionSelector(x, y) {
    const rect = colorWheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
    const normalizedAngle = (angle + 90 + 360) % 360;
    
    // Position selector
    const selectorX = Math.cos(angle * Math.PI / 180) * (rect.width / 2 * 0.85);
    const selectorY = Math.sin(angle * Math.PI / 180) * (rect.height / 2 * 0.85);
    
    selector.style.left = `calc(50% + ${selectorX}px)`;
    selector.style.top = `calc(50% + ${selectorY}px)`;
    
    // Update color based on hue only
    currentHue = Math.round(normalizedAngle);
    
    // Update CSS variable for the website theme
    document.documentElement.style.setProperty('--hue', currentHue);
    
    // Save hue preference
    saveHue(currentHue);
  }
  
  // Initialize the color wheel with the saved hue
  function initColorWheel() {
    const rect = colorWheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = Math.min(rect.width, rect.height) / 2 * 0.85;
    
    // Convert hue to radians for positioning
    const hueRadians = (currentHue - 90) * (Math.PI / 180);
    
    // Calculate position for the saved hue
    const x = centerX + radius * Math.cos(hueRadians);
    const y = centerY + radius * Math.sin(hueRadians);
    
    positionSelector(x, y);
  }
  
  // Handle color wheel clicks
  colorWheel.addEventListener('click', function(e) {
    positionSelector(e.clientX, e.clientY);
  });
  
  // Initialize the color wheel
  // Use requestAnimationFrame to ensure elements are rendered
  requestAnimationFrame(() => {
    // Try to initialize, if elements aren't ready, try again
    if (colorWheel.offsetWidth === 0 || colorWheel.offsetHeight === 0) {
      setTimeout(initColorWheel, 100);
    } else {
      initColorWheel();
    }
  });
});

// Typewriter effect
document.querySelectorAll('.typewriter').forEach(el => {
  el.addEventListener('animationend', () => {
    el.classList.add('animated');
  });
});