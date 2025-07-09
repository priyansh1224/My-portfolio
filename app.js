document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links li');
  const body = document.body;

  hamburger.addEventListener('click', () => {
    // Toggle mobile menu
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    body.classList.toggle('no-scroll');
  });

  // Close mobile menu when clicking on a link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('no-scroll');
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active navigation link on scroll
  const sections = document.querySelectorAll('section');
  const navLinksList = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinksList.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Run once on load

  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initialize AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  // Project card hover effect
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth > 768) { // Only on desktop
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      card.style.transition = 'all 0.5s ease';
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    });
    
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        card.style.transition = 'none';
      }
    });
  });

  // Typewriter effect for hero text
  const heroTitle = document.querySelector('.hero-text h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid var(--primary-color)';

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          heroTitle.style.borderRight = 'none';
        }, 1000);
      }
    }

    // Start typewriter effect after 1 second
    setTimeout(() => {
      typeWriter();
    }, 1000);
  }

  // Skill tags animation
  const skillTags = document.querySelectorAll('.skill-tag');

  skillTags.forEach(tag => {
    tag.addEventListener('mouseover', () => {
      tag.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    tag.addEventListener('mouseout', () => {
      tag.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      
      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }

  // Lottie animation interaction
  const heroAnimation = document.querySelector('.hero-animation lottie-player');

  if (heroAnimation) {
    heroAnimation.addEventListener('mouseover', () => {
      heroAnimation.setSpeed(1.5);
    });
    
    heroAnimation.addEventListener('mouseout', () => {
      heroAnimation.setSpeed(1);
    });
  }

  // Current year for copyright
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Preloader (optional)
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });

  // Add no-scroll class to body when menu is open
  function checkScroll() {
    if (navLinks.classList.contains('active')) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }

  // Handle window resize
  function handleResize() {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      body.classList.remove('no-scroll');
    }
  }

  window.addEventListener('resize', handleResize);
});