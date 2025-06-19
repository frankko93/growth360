// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
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
      
      const headerOffset = 80;
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