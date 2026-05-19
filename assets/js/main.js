/**
 * EVA Pack - Main JavaScript
 * Professional B2B Foreign Trade Website
 */

document.addEventListener('DOMContentLoaded', function() {
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initRevealAnimations();
  initContactForm();
  initBackToTop();
  initLazyImages();
});

/* --- Header Scroll Effect --- */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  // Skip if header already has scrolled class (inner pages)
  const isInnerPage = header.classList.contains('scrolled');

  window.addEventListener('scroll', function() {
    if (isInnerPage) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');
  if (!toggle || !nav) return;

  function openMenu() {
    toggle.classList.add('active');
    nav.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('active');
    nav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function() {
    if (nav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close mobile menu when clicking a link
  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = document.getElementById('header')?.offsetHeight || 72;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
}

/* --- Scroll Reveal Animations --- */
function initRevealAnimations() {
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .stagger').forEach(function(el) {
    observer.observe(el);
  });
}

/* --- Contact Form --- */
function initContactForm() {
  var form = document.getElementById('contactForm');
  var msgEl = document.getElementById('formMessage');
  if (!form || !msgEl) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    var submitBtn = form.querySelector('button[type="submit"]');
    var originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    await new Promise(function(resolve) { setTimeout(resolve, 1500); });

    // Show success message
    msgEl.className = 'form-message success';
    msgEl.textContent = 'Thank you for your inquiry! We will get back to you within 24 hours.';
    msgEl.style.display = 'block';

    // Reset form
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Hide message after 5 seconds
    setTimeout(function() {
      msgEl.style.display = 'none';
    }, 5000);
  });
}

/* --- Back to Top Button --- */
function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Lazy Image Loading Fallback --- */
function initLazyImages() {
  if ('loading' in HTMLImageElement.prototype) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
    observer.observe(img);
  });
}
