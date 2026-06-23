/* ==========================================================================
   AURA INTERIORS - Luxury Interactive System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ----- Preloader & Page Load Sequence -----
  const preloader = document.getElementById('preloader');
  const progressLine = document.querySelector('.preloader__progress-line');

  if (preloader && progressLine) {
    // Start progress line filling
    setTimeout(() => {
      progressLine.style.width = '100%';
    }, 100);

    window.addEventListener('load', () => {
      completePreloader();
    });

    // Fallback if load event takes too long
    setTimeout(completePreloader, 2500);
  } else {
    document.body.classList.add('loaded');
  }

  function completePreloader() {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      document.body.classList.add('loaded');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 800);
    }
  }

  // ----- Custom Luxury Cursor & Spotlight -----
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  const spotlight = document.getElementById('mouse-spotlight');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let spotlightTimeout;

  if (cursorDot && cursorRing) {
    document.body.classList.add('custom-cursor-active');

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Activate cursor elements
      cursorDot.classList.add('active');
      cursorRing.classList.add('active');

      // Dot is instant
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      // Update spotlight
      if (spotlight) {
        document.body.classList.add('mouse-moving');
        document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
      }

      // Reset mouse-moving class after inactivity
      clearTimeout(spotlightTimeout);
      spotlightTimeout = setTimeout(() => {
        document.body.classList.remove('mouse-moving');
      }, 1000);
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('active');
      cursorRing.classList.remove('active');
    });

    // Custom Cursor LERP Animation Loop
    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Dynamic Hover States for Interactive Elements
    const addCursorHover = (elements, text = '', className = 'hover') => {
      elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorRing.classList.add(className);
          if (text) cursorRing.setAttribute('data-cursor-text', text);
        });
        el.addEventListener('mouseleave', () => {
          cursorRing.classList.remove(className);
          cursorRing.removeAttribute('data-cursor-text');
        });
      });
    };

    // Apply interactive cursor behaviors
    const interactiveElements = document.querySelectorAll('a, button, select, .portfolio__filter, .contact__info-card, .service-card, .why-card');
    addCursorHover(interactiveElements, 'VIEW');

    const textureCards = document.querySelectorAll('.material-card');
    addCursorHover(textureCards, 'TOUCH');

    const roomHotspots = document.querySelectorAll('.room-explorer__hotspot');
    addCursorHover(roomHotspots, 'EXPLORE');

    const portfolioMasonryItems = document.querySelectorAll('.portfolio__editorial-item');
    addCursorHover(portfolioMasonryItems, 'STORY');

    const beforeAfterSlider = document.querySelectorAll('.before-after__handle');
    addCursorHover(beforeAfterSlider, 'DRAG', 'drag');
  }

  // ----- Magnetic Buttons Interaction -----
  const magneticButtons = document.querySelectorAll('.btn--accent, .btn--white, .navbar__logo, .navbar__toggle');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Pull element slightly towards cursor
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ----- Navbar Scroll Behavior -----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ----- Mobile Menu Toggle -----
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = navLinks.querySelectorAll('a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Smooth Scroll for Anchor Links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ----- Scroll Reveal Animations -----
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ----- Stagger Animation for Grid Items -----
  const staggerGroups = document.querySelectorAll('[data-stagger]');
  staggerGroups.forEach(group => {
    const children = group.children;
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 80}ms`;
            child.classList.add('visible');
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    staggerObserver.observe(group);
    Array.from(children).forEach(child => {
      child.classList.add('reveal');
    });
  });

  // ----- Floating CTA Visibility -----
  const floatingCta = document.getElementById('floating-cta');
  if (floatingCta) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    }, { passive: true });
  }

  // ----- Material Card 3D Tilt Effect -----
  const cards = document.querySelectorAll('.material-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = (x / rect.width - 0.5) * 15;
      const py = (y / rect.height - 0.5) * -15;

      card.style.transform = `perspective(1000px) rotateX(${py}deg) rotateY(${px}deg) translateY(-4px)`;
      const content = card.querySelector('.material-card__content');
      if (content) {
        content.style.transform = `translateZ(25px) translateY(-2px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'none';
      const content = card.querySelector('.material-card__content');
      if (content) {
        content.style.transform = 'none';
      }
    });
  });

  // ----- Before & After Slider Logic -----
  const slider = document.querySelector('.before-after__slider');
  const sliderHandle = document.querySelector('.before-after__handle');
  const afterImage = document.querySelector('.before-after__image--after');

  if (slider && sliderHandle && afterImage) {
    let isDragging = false;

    const setSliderPos = (xPos) => {
      const rect = slider.getBoundingClientRect();
      let percentage = ((xPos - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));

      sliderHandle.style.left = `${percentage}%`;
      afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
    };

    const onStart = () => { isDragging = true; };
    const onEnd = () => { isDragging = false; };
    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setSliderPos(clientX);
    };

    sliderHandle.addEventListener('mousedown', onStart);
    sliderHandle.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
  }

  // ----- Interactive Room Explorer -----
  const hotspots = document.querySelectorAll('.room-explorer__hotspot');
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();

      // Close other tooltips on click
      hotspots.forEach(h => {
        if (h !== hotspot) h.classList.remove('active');
      });

      hotspot.classList.toggle('active');
    });
  });

  document.addEventListener('click', () => {
    hotspots.forEach(h => h.classList.remove('active'));
  });

  // ----- Horizontal Scroll Showcase -----
  const hsSection = document.querySelector('.horizontal-showcase');
  const hsSticky = document.querySelector('.horizontal-showcase__sticky');
  const hsContainer = document.querySelector('.horizontal-showcase__container');

  if (hsSection && hsSticky && hsContainer) {
    const updateHorizontalScroll = () => {
      const rect = hsSection.getBoundingClientRect();
      const sectionHeight = rect.height;
      const stickyHeight = hsSticky.offsetHeight;
      const containerWidth = hsContainer.scrollWidth;
      const viewportWidth = window.innerWidth;

      const maxScroll = sectionHeight - stickyHeight;
      const currentScroll = -rect.top;

      if (currentScroll >= 0 && currentScroll <= maxScroll) {
        const progress = currentScroll / maxScroll;
        const translateX = progress * (containerWidth - viewportWidth + 80);
        hsContainer.style.transform = `translateX(-${translateX}px)`;
      } else if (currentScroll < 0) {
        hsContainer.style.transform = `translateX(0px)`;
      } else {
        hsContainer.style.transform = `translateX(-${containerWidth - viewportWidth + 80}px)`;
      }
    };

    window.addEventListener('scroll', updateHorizontalScroll, { passive: true });
    window.addEventListener('resize', updateHorizontalScroll);
  }

  // ----- Blueprint to Reality Wipe -----
  const bpSection = document.querySelector('.blueprint-reality');
  const bpPhoto = document.querySelector('.blueprint-reality__image--photo');
  const bpDivider = document.querySelector('.blueprint-reality__divider');

  if (bpSection && bpPhoto && bpDivider) {
    const updateBlueprintWipe = () => {
      const rect = bpSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalScrollRoom = rect.height + viewportHeight;
      const progress = (viewportHeight - rect.top) / totalScrollRoom;

      let percentage = (1 - progress) * 100;
      percentage = Math.max(0, Math.min(100, percentage));

      bpPhoto.style.clipPath = `inset(0 0 0 ${percentage}%)`;
      bpDivider.style.left = `${percentage}%`;
    };

    window.addEventListener('scroll', updateBlueprintWipe, { passive: true });
  }

  // ----- Editorial Portfolio Filter & Modal Storytelling -----
  const filterButtons = document.querySelectorAll('.portfolio__filter');
  const portfolioItems = document.querySelectorAll('.portfolio__editorial-item');
  const modal = document.getElementById('luxury-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');

  // filtering
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 380);
        }
      });
    });
  });

  // Modal Functionality
  const openProjectModal = (item) => {
    if (!modal) return;

    const name = item.getAttribute('data-project-name');
    const category = item.getAttribute('data-category-name') || item.getAttribute('data-category');
    const location = item.getAttribute('data-location');
    const year = item.getAttribute('data-year');
    const challenge = item.getAttribute('data-challenge');
    const solution = item.getAttribute('data-solution');
    const result = item.getAttribute('data-result');
    const imgSrc = item.querySelector('img').getAttribute('src');

    // Populate modal fields
    document.getElementById('modal-img').setAttribute('src', imgSrc);
    document.getElementById('modal-img').setAttribute('alt', name);
    document.getElementById('modal-cat').textContent = category;
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-loc').textContent = location;
    document.getElementById('modal-year').textContent = year;
    document.getElementById('modal-challenge').textContent = challenge;
    document.getElementById('modal-solution').textContent = solution;
    document.getElementById('modal-result').textContent = result;

    // Show modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => openProjectModal(item));
  });

  // Bind horizontal scroll project items to the modal
  const hsProjects = document.querySelectorAll('.horizontal-showcase__project');
  hsProjects.forEach(item => {
    item.addEventListener('click', () => {
      const projectName = item.querySelector('.horizontal-showcase__title').textContent;
      const matchingItem = Array.from(portfolioItems).find(p => p.getAttribute('data-project-name') === projectName);
      if (matchingItem) {
        openProjectModal(matchingItem);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // ----- Animated Stat Counters -----
  const statElements = document.querySelectorAll('.hero__stat-number');
  let statsAnimated = false;

  const animateCounter = (element) => {
    const text = element.textContent.trim();
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[0]);
    const suffix = text.replace(match[0], '').trim();
    const prefix = text.substring(0, text.indexOf(match[0]));
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(target * easedProgress);

      element.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = text;
      }
    };

    requestAnimationFrame(update);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statElements.forEach(stat => animateCounter(stat));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (statElements.length > 0) {
    const statsContainer = statElements[0].closest('.hero__stats');
    if (statsContainer) statsObserver.observe(statsContainer);
  }

  // ----- Contact Form Handling -----
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#c0392b';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!isValid) return;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message Sent';
      submitBtn.style.backgroundColor = '#2d6a4f';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // ----- Active Nav Link Highlighting -----
  const sections = document.querySelectorAll('section[id]');
  const highlightNav = () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

});
