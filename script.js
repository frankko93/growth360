// Header scroll handler
const header = document.querySelector('.header');
const handleHeaderScroll = () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll(); // Check initial state

// Wistia Player variable
let player;

// Load Wistia player
function loadWistiaPlayer() {
  // Load Wistia API script first
  const script = document.createElement('script');
  script.src = 'https://fast.wistia.net/assets/external/E-v1.js';
  script.async = true;
  document.head.appendChild(script);
  
  // Initialize Wistia player after script loads
  script.onload = function() {
    initWistiaPlayer();
  };
}

// Initialize Wistia player controls
function initWistiaPlayer() {
  const videoContainer = document.getElementById('hero-video');
  if (videoContainer && window.Wistia) {
    // Create Wistia embed using JavaScript API
    videoContainer.innerHTML = `
      <div class="wistia_embed wistia_async_v0svdbrhtl" 
           style="height:100%;width:100%;" 
           data-wistia-video-id="v0svdbrhtl"
           data-wistia-autoplay="true"
           data-wistia-muted="true"
           data-wistia-controls="true"
           data-wistia-playbar="true"
           data-wistia-volume="true">
      </div>
    `;
    
    // Wait for Wistia to process the embed
    setTimeout(() => {
      player = window.Wistia.api('v0svdbrhtl');
      if (player) {
        // Ensure the video starts playing muted
        player.mute();
        player.play();
      }
    }, 1000);
  } else if (!window.Wistia) {
    // Retry after a short delay if Wistia API isn't ready yet
    setTimeout(initWistiaPlayer, 100);
  }
}

// Hero animations handler
document.addEventListener('DOMContentLoaded', function() {
  // Load Wistia Player
  loadWistiaPlayer();
  
  const hero = document.querySelector('.hero');
  if (hero) {
    // Add animated class after animations complete
    setTimeout(() => {
      hero.classList.add('animated');
    }, 3500); // Tiempo total de las animaciones + un pequeño buffer
  }

  // Video sound toggle functionality
  const soundToggle = document.getElementById('soundToggle');

  if (soundToggle) {
    soundToggle.addEventListener('click', function() {
      // Function to try unmuting
      const tryUnmute = () => {
        // First try to get player if we don't have it yet
        if (!player && window.Wistia) {
          player = window.Wistia.api('v0svdbrhtl');
        }
        
        if (player && typeof player.unmute === 'function') {
          // Unmute the Wistia video
          player.unmute();
          
          // Hide the button with animation
          soundToggle.classList.add('hidden');
          
          // Remove button from DOM after animation completes
          setTimeout(() => {
            soundToggle.style.display = 'none';
          }, 300);
          
          return true;
        }
        return false;
      };
      
      // Try immediately
      if (!tryUnmute()) {
        // If it fails, wait a bit and try again
        setTimeout(() => {
          if (!tryUnmute()) {
            console.log('Could not unmute Wistia player');
          }
        }, 500);
      }
    });
  }


  // Scroll animations handler
  const animateOnScroll = () => {
    const elements = document.querySelectorAll([
      '.proceso__title',
      '.proceso__step',
      '.testimonios-clientes__title',
      '.testimonio-card',
      '.about__img',
      '.about__info',
      '.fade-in-section',
      '.fade-in-left',
      '.fade-in-right',
      '.trusted-partners',
      '.software-partners'
    ].join(','));

    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      // Elemento visible cuando su parte superior está a 20% de la ventana
      if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
        element.classList.add('is-visible');
      }
    });
  };

  // Ejecutar al cargar y en cada scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('resize', animateOnScroll);

  // Hamburger menu functionality
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  navToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    // Change icon based on menu state
    const icon = this.querySelector('i');
    if (nav.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      const icon = navToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking on a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      const icon = navToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });

  // Smooth scroll para todos los enlaces internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;
      // Calcular dinámicamente la altura del header
      const header = document.querySelector('.header');
      const headerOffset = header ? header.offsetHeight : 0;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
  
  // Selecciona todos los botones que contienen el texto 'Agenda Demo'
  const agendaBtns = Array.from(document.querySelectorAll('a, button')).filter(el => {
    return el.textContent.trim().toLowerCase().includes('agenda tu demo');
  });

  agendaBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const calendlySection = document.getElementById('calendly');
      if (calendlySection) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = calendlySection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}); 