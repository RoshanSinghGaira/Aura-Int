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

  // Custom luxury cursor, spotlight, and magnetic button effects were removed to restore the default system mouse cursor and improve performance.

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

  // ----- Scroll Progress Indicator -----
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      scrollProgress.style.width = `${scrolled}%`;
    }, { passive: true });
  }

  // ----- Signature Designs Slider -----
  const sigPrev = document.querySelector('.signature-slider__btn--prev');
  const sigNext = document.querySelector('.signature-slider__btn--next');
  const sigContainer = document.querySelector('.signature-slider__container');
  if (sigPrev && sigNext && sigContainer) {
    const getScrollAmt = () => {
      const cards = sigContainer.querySelectorAll('.signature-slider__project');
      if (cards.length > 0) {
        return cards[0].offsetWidth + 32; // card width + gap
      }
      return 300;
    };
    sigPrev.addEventListener('click', () => {
      sigContainer.scrollBy({ left: -getScrollAmt(), behavior: 'smooth' });
    });
    sigNext.addEventListener('click', () => {
      sigContainer.scrollBy({ left: getScrollAmt(), behavior: 'smooth' });
    });
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

  // ----- Combined Portfolio Search & Category Filtering -----
  const searchInput = document.getElementById('portfolio-search');
  const filterButtons = document.querySelectorAll('.portfolio__filter');
  const portfolioItems = document.querySelectorAll('.portfolio__editorial-item');
  const modal = document.getElementById('luxury-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');

  let activeCategory = 'all';
  let searchQuery = '';

  const filterProjects = () => {
    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const name = (item.getAttribute('data-project-name') || '').toLowerCase();
      const location = (item.getAttribute('data-location') || '').toLowerCase();
      const categoryName = (item.getAttribute('data-category-name') || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = !searchQuery ||
        name.includes(searchQuery) ||
        location.includes(searchQuery) ||
        categoryName.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        item.style.display = '';
        requestAnimationFrame(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        });
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (item.style.opacity === '0') {
            item.style.display = 'none';
          }
        }, 300);
      }
    });
  };

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeCategory = button.getAttribute('data-filter') || 'all';
      filterProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterProjects();
    });
  }

  // ----- Modal Storytelling & Details -----
  const openProjectModal = (item) => {
    if (!modal) return;

    const name = item.getAttribute('data-project-name');
    const category = item.getAttribute('data-category-name') || item.getAttribute('data-category');
    const location = item.getAttribute('data-location');
    const year = item.getAttribute('data-year');
    const size = item.getAttribute('data-size') || '-';
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
    document.getElementById('modal-size').textContent = size;
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

  // Bind signature slider project items to the modal
  const sigProjects = document.querySelectorAll('.signature-slider__project');
  sigProjects.forEach(item => {
    item.addEventListener('click', () => {
      const projectName = item.querySelector('.signature-slider__title').textContent;
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

  // ----- Testimonials Auto Slider -----
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonials__dot');
  const testimonialPrev = document.querySelector('.testimonials__btn--prev');
  const testimonialNext = document.querySelector('.testimonials__btn--next');
  const testimonialsWrapper = document.querySelector('.testimonials__slider-wrapper');

  if (testimonialSlides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
      testimonialSlides.forEach(slide => slide.classList.remove('active'));
      testimonialDots.forEach(dot => dot.classList.remove('active'));

      currentSlide = (index + testimonialSlides.length) % testimonialSlides.length;
      testimonialSlides[currentSlide].classList.add('active');
      if (testimonialDots[currentSlide]) {
        testimonialDots[currentSlide].classList.add('active');
      }
    };

    const nextSlide = () => {
      showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      showSlide(currentSlide - 1);
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      slideInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoSlide = () => {
      if (slideInterval) clearInterval(slideInterval);
    };

    if (testimonialPrev) testimonialPrev.addEventListener('click', prevSlide);
    if (testimonialNext) testimonialNext.addEventListener('click', nextSlide);

    testimonialDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        showSlide(idx);
      });
    });

    if (testimonialsWrapper) {
      testimonialsWrapper.addEventListener('mouseenter', stopAutoSlide);
      testimonialsWrapper.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();
  }

  // ----- FAQ Accordion -----
  const faqQuestions = document.querySelectorAll('.faq__question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentNode;
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      // Close all other FAQ items for a clean accordion effect
      document.querySelectorAll('.faq__item').forEach(i => {
        if (i !== item) {
          i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
          const ans = i.querySelector('.faq__answer');
          ans.style.maxHeight = null;
        }
      });

      // Toggle current item
      question.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
      const answer = item.querySelector('.faq__answer');
      if (!isExpanded) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
      }
    });
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
