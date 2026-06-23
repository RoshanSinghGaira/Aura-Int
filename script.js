/* ============================================
   VELOURA BIKES - Premium E-Commerce
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============================
    // PRELOADER
    // ============================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove preloader from DOM after animation completes
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }, 2000);
    });

    // Fallback: hide preloader after max wait time
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 4000);

    // ============================
    // PREMIUM HEADER SCROLL BEHAVIOR
    // ============================

    const header = document.getElementById("header");

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {

        const currentScrollY = window.scrollY;

        // Glass effect when scrolling
        if (currentScrollY > 80) {
            header.classList.add("header--scrolled");
        } else {
            header.classList.remove("header--scrolled");
        }

        // Hide navbar when scrolling down
        if (
            currentScrollY > lastScrollY &&
            currentScrollY > 150
        ) {
            header.classList.add("header-hidden");
        }

        // Show navbar when scrolling up
        if (
            currentScrollY < lastScrollY
        ) {
            header.classList.remove("header-hidden");
        }

        // Always show at top
        if (currentScrollY <= 50) {
            header.classList.remove("header-hidden");
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener("scroll", () => {

        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }

    });

    // ============================
    // MOBILE NAVIGATION
    // ============================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

    function toggleMobileMenu() {
        const isActive = menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // ============================
    // SMOOTH SCROLL FOR ANCHORS
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================
    // SCROLL REVEAL ANIMATIONS
    // ============================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================
    // BACK TO TOP BUTTON
    // ============================
    const backToTop = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(toggleBackToTop);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================
    // NEWSLETTER FORM
    // ============================
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');
    const newsletterSubmit = document.getElementById('newsletter-submit');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = newsletterEmail.value.trim();
            if (!email) return;

            // Simulate subscription
            const originalText = newsletterSubmit.innerHTML;
            newsletterSubmit.innerHTML = `
                Subscribed
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            `;
            newsletterSubmit.style.backgroundColor = '#4a7c59';
            newsletterSubmit.style.color = '#ffffff';
            newsletterEmail.value = '';
            newsletterSubmit.disabled = true;

            setTimeout(() => {
                newsletterSubmit.innerHTML = originalText;
                newsletterSubmit.style.backgroundColor = '';
                newsletterSubmit.style.color = '';
                newsletterSubmit.disabled = false;
            }, 3000);
        });
    }

    // ============================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => navObserver.observe(section));

    // ============================
    // PARALLAX EFFECT ON HERO
    // ============================
    const heroBg = document.querySelector('.hero__bg img');

    if (heroBg && window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                if (scrolled < window.innerHeight) {
                    heroBg.style.transform = `scale(${1.05 + scrolled * 0.0002}) translateY(${scrolled * 0.15}px)`;
                }
            });
        });
    }

    // ============================
    // COUNTER ANIMATION FOR STATS
    // ============================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        const isDecimal = element.getAttribute('data-decimal') === 'true';

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = start + (target - start) * eased;

            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.round(current).toLocaleString('en-IN');
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ============================
    // IMAGE LAZY LOADING ENHANCEMENT
    // ============================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.6s ease';

                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });

                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================
    // PRODUCT CARD HOVER TILT (subtle)
    // ============================
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(min-width: 768px)').matches) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -2;
                const rotateY = (x - centerX) / centerX * 2;

                card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============================
    // KEYBOARD ACCESSIBILITY
    // ============================
    // Focus visible styles
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.body.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // ============================
    // SHOPPING CART STATE & LOGIC
    // ============================
    let cart = JSON.parse(localStorage.getItem('veloura_cart')) || [];

    const cartBtn = document.getElementById('cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartDrawerCount = document.getElementById('cart-drawer-count');
    const headerCartCount = document.querySelector('.header__cart-count');
    const cartEmptyState = document.getElementById('cart-empty-state');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartDrawerFooter = document.getElementById('cart-drawer-footer');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartShopBtn = document.getElementById('cart-shop-btn');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Checkout Modal elements
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutOverlay = document.getElementById('checkout-overlay');
    const checkoutCloseBtn = document.getElementById('checkout-close-btn');
    const checkoutFormStep = document.getElementById('checkout-form-step');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');
    const checkoutStatusStep = document.getElementById('checkout-status-step');
    const checkoutLoading = document.getElementById('checkout-loading');
    const checkoutSuccess = document.getElementById('checkout-success');
    const checkoutRefNum = document.getElementById('checkout-ref-num');
    const checkoutContinueBtn = document.getElementById('checkout-continue-btn');

    function saveCart() {
        localStorage.setItem('veloura_cart', JSON.stringify(cart));
    }

    function formatCurrency(value) {
        return '₹' + Number(value).toLocaleString('en-IN');
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Update header & drawer count badges
        if (headerCartCount) {
            headerCartCount.textContent = totalItems;

            // Trigger bump animation
            headerCartCount.classList.remove('cart-bump');
            void headerCartCount.offsetWidth; // Trigger reflow
            headerCartCount.classList.add('cart-bump');
        }
        if (cartDrawerCount) {
            cartDrawerCount.textContent = totalItems;
        }

        // Toggle empty vs populated states
        if (cart.length === 0) {
            if (cartEmptyState) cartEmptyState.style.display = 'flex';
            if (cartItemsContainer) cartItemsContainer.style.display = 'none';
            if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
        } else {
            if (cartEmptyState) cartEmptyState.style.display = 'none';
            if (cartItemsContainer) {
                cartItemsContainer.style.display = 'flex';
                cartItemsContainer.innerHTML = cart.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item__image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item__details">
                            <div class="cart-item__meta">
                                <h4 class="cart-item__name">${item.name}</h4>
                                <button class="cart-item__remove" aria-label="Remove item">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                            <div class="cart-item__price">${formatCurrency(item.price)}</div>
                            <div class="cart-item__actions">
                                <div class="cart-item__qty">
                                    <button class="cart-item__qty-btn qty-minus" aria-label="Decrease quantity">&minus;</button>
                                    <span class="cart-item__qty-value">${item.quantity}</span>
                                    <button class="cart-item__qty-btn qty-plus" aria-label="Increase quantity">&plus;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            if (cartDrawerFooter) {
                cartDrawerFooter.style.display = 'block';
            }

            // Calculate subtotal
            const subtotalVal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (cartSubtotal) cartSubtotal.textContent = formatCurrency(subtotalVal);
        }
    }

    function showCartToast(name, price, image) {
        const existingToast = document.querySelector('.cart-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'cart-toast';
        toast.innerHTML = `
            <img class="cart-toast__image" src="${image}" alt="${name}">
            <div class="cart-toast__content">
                <span class="cart-toast__title">Added to Selection</span>
                <span class="cart-toast__desc">${name} &bull; ${formatCurrency(price)}</span>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 50);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3500);
    }

    function addToCart(id, name, price, image) {
        const parsedPrice = parseInt(price);
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price: parsedPrice,
                image,
                quantity: 1
            });
        }

        saveCart();
        updateCartUI();
        showCartToast(name, parsedPrice, image);
    }

    // Toggle Cart Drawer
    function toggleCartDrawer(open) {
        if (!cartDrawer) return;
        if (open) {
            cartDrawer.classList.add('active');
            cartDrawer.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        } else {
            cartDrawer.classList.remove('active');
            cartDrawer.setAttribute('aria-hidden', 'true');
            const isMobileNavActive = mobileNav && mobileNav.classList.contains('active');
            const isCheckoutActive = checkoutModal && checkoutModal.classList.contains('active');
            if (!isMobileNavActive && !isCheckoutActive) {
                document.body.style.overflow = '';
            }
        }
    }

    if (cartBtn) cartBtn.addEventListener('click', () => toggleCartDrawer(true));
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => toggleCartDrawer(false));
    if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCartDrawer(false));

    if (cartShopBtn) {
        cartShopBtn.addEventListener('click', () => {
            toggleCartDrawer(false);
            const featuredSection = document.getElementById('featured');
            if (featuredSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = featuredSection.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Event delegation for cart actions inside drawer
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.cart-item');
            if (!itemElement) return;
            const itemId = itemElement.dataset.id;

            // Remove item
            if (e.target.closest('.cart-item__remove')) {
                cart = cart.filter(item => item.id !== itemId);
                saveCart();
                updateCartUI();
                return;
            }

            // Quantity minus button
            if (e.target.classList.contains('qty-minus')) {
                const item = cart.find(item => item.id === itemId);
                if (item) {
                    item.quantity -= 1;
                    if (item.quantity <= 0) {
                        cart = cart.filter(item => item.id !== itemId);
                    }
                    saveCart();
                    updateCartUI();
                }
                return;
            }

            // Quantity plus button
            if (e.target.classList.contains('qty-plus')) {
                const item = cart.find(item => item.id === itemId);
                if (item) {
                    item.quantity += 1;
                    saveCart();
                    updateCartUI();
                }
                return;
            }
        });
    }

    // Toggle Checkout Modal
    function toggleCheckoutModal(open) {
        if (!checkoutModal) return;
        if (open) {
            const subtotalVal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (checkoutTotalPrice) checkoutTotalPrice.textContent = formatCurrency(subtotalVal);

            if (checkoutFormStep) checkoutFormStep.style.display = 'block';
            if (checkoutStatusStep) checkoutStatusStep.style.display = 'none';
            if (checkoutLoading) checkoutLoading.style.display = 'block';
            if (checkoutSuccess) checkoutSuccess.style.display = 'none';
            if (checkoutForm) checkoutForm.reset();

            checkoutModal.classList.add('active');
            checkoutModal.setAttribute('aria-hidden', 'false');
            toggleCartDrawer(false); // Close cart drawer
            document.body.style.overflow = 'hidden';
        } else {
            checkoutModal.classList.remove('active');
            checkoutModal.setAttribute('aria-hidden', 'true');
            const isMobileNavActive = mobileNav && mobileNav.classList.contains('active');
            if (!isMobileNavActive) {
                document.body.style.overflow = '';
            }
        }
    }

    if (checkoutBtn) checkoutBtn.addEventListener('click', () => toggleCheckoutModal(true));
    if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', () => toggleCheckoutModal(false));
    if (checkoutOverlay) checkoutOverlay.addEventListener('click', () => toggleCheckoutModal(false));
    if (checkoutContinueBtn) checkoutContinueBtn.addEventListener('click', () => toggleCheckoutModal(false));

    // Custom Checkout Form Submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (checkoutFormStep) checkoutFormStep.style.display = 'none';
            if (checkoutStatusStep) checkoutStatusStep.style.display = 'block';

            // Simulate workshop processing slot registration
            setTimeout(() => {
                if (checkoutLoading) checkoutLoading.style.display = 'none';
                if (checkoutSuccess) checkoutSuccess.style.display = 'block';

                // Random allocation reference number
                const randRef = 'VL-' + Math.floor(10000 + Math.random() * 90000) + '-X';
                if (checkoutRefNum) checkoutRefNum.textContent = randRef;

                // Reset cart state
                cart = [];
                saveCart();
                updateCartUI();
            }, 2500);
        });
    }

    // Listen for Add to Cart button clicks on the page
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn--add-to-cart');
        if (btn) {
            e.preventDefault();
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = btn.dataset.price;
            const image = btn.dataset.image;
            addToCart(id, name, price, image);
        }
    });

    // Close drawers and modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (cartDrawer && cartDrawer.classList.contains('active')) {
                toggleCartDrawer(false);
            }
            if (wishlistDrawer && wishlistDrawer.classList.contains('active')) {
                toggleWishlistDrawer(false);
            }
            if (checkoutModal && checkoutModal.classList.contains('active')) {
                toggleCheckoutModal(false);
            }
        }
    });

    // Initial cart render from local storage state
    updateCartUI();

    // ============================
    // HERO STATS ANIMATION TRIGGER
    // ============================
    const statNums = document.querySelectorAll('.hero__stat-num');
    const statsSection = document.querySelector('.hero__stats');
    if (statsSection && statNums.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNums.forEach(el => {
                        const target = parseFloat(el.getAttribute('data-target'));
                        animateCounter(el, target, 2000);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(statsSection);
    }

    // ============================
    // CATEGORY DISCOVERY FILTERING
    // ============================
    const tabs = document.querySelectorAll('.discovery-tab');
    const cards = document.querySelectorAll('.discovery-grid .product-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-tab');

            cards.forEach(card => {
                const categories = card.getAttribute('data-categories') || '';
                const categoryArray = categories.split(' ');

                if (filterValue === 'all' || categoryArray.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ============================
    // PARALLAX EFFECT FOR LIFESTYLE BANNERS
    // ============================
    const lifestyleBanners = document.querySelectorAll('.lifestyle-banner');
    if (lifestyleBanners.length > 0) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                lifestyleBanners.forEach(banner => {
                    const img = banner.querySelector('.lifestyle-banner__bg img');
                    if (img) {
                        const rect = banner.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            const speed = 0.12;
                            const yPos = -(rect.top * speed);
                            img.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.1)`;
                        }
                    }
                });
            });
        });
    }

    // ============================
    // WISHLIST STATE & LOGIC
    // ============================
    let wishlist = JSON.parse(localStorage.getItem('veloura_wishlist')) || [];

    const wishlistBtn = document.getElementById('wishlist-btn');
    const wishlistDrawer = document.getElementById('wishlist-drawer');
    const wishlistOverlay = document.getElementById('wishlist-overlay');
    const wishlistCloseBtn = document.getElementById('wishlist-close-btn');
    const wishlistDrawerCount = document.getElementById('wishlist-drawer-count');
    const headerWishlistCount = document.querySelector('.header__wishlist-count');
    const wishlistEmptyState = document.getElementById('wishlist-empty-state');
    const wishlistItemsContainer = document.getElementById('wishlist-items-container');
    const wishlistShopBtn = document.getElementById('wishlist-shop-btn');

    function saveWishlist() {
        localStorage.setItem('veloura_wishlist', JSON.stringify(wishlist));
    }

    function showWishlistToast(name, isAdded, image) {
        const existingToast = document.querySelector('.cart-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'cart-toast';
        toast.innerHTML = `
            <img class="cart-toast__image" src="${image}" alt="${name}">
            <div class="cart-toast__content">
                <span class="cart-toast__title">${isAdded ? 'Added to Wishlist' : 'Removed from Wishlist'}</span>
                <span class="cart-toast__desc">${name}</span>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 50);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3500);
    }

    function updateWishlistUI() {
        const totalItems = wishlist.length;

        // Update counts
        if (headerWishlistCount) {
            headerWishlistCount.textContent = totalItems;

            // Trigger bump animation
            headerWishlistCount.classList.remove('wishlist-bump');
            void headerWishlistCount.offsetWidth; // Trigger reflow
            headerWishlistCount.classList.add('wishlist-bump');
        }
        if (wishlistDrawerCount) {
            wishlistDrawerCount.textContent = totalItems;
        }

        // Toggle empty vs populated state
        if (totalItems === 0) {
            if (wishlistEmptyState) wishlistEmptyState.style.display = 'flex';
            if (wishlistItemsContainer) wishlistItemsContainer.style.display = 'none';
        } else {
            if (wishlistEmptyState) wishlistEmptyState.style.display = 'none';
            if (wishlistItemsContainer) {
                wishlistItemsContainer.style.display = 'flex';
                wishlistItemsContainer.innerHTML = wishlist.map(item => `
                    <div class="wishlist-item" data-id="${item.id}">
                        <div class="wishlist-item__image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="wishlist-item__details">
                            <div class="wishlist-item__meta">
                                <h4 class="wishlist-item__name">${item.name}</h4>
                                <button class="wishlist-item__remove" aria-label="Remove item">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                            <div class="wishlist-item__price">${formatCurrency(item.price)}</div>
                            <div class="wishlist-item__actions">
                                <button class="wishlist-item__add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">
                                    Add to Cart
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Sync card wishlist button active state
        document.querySelectorAll('.product-card__wishlist-btn').forEach(btn => {
            const id = btn.dataset.id;
            const inWishlist = wishlist.some(item => item.id === id);
            if (inWishlist) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function toggleWishlist(id, name, price, image) {
        const index = wishlist.findIndex(item => item.id === id);
        if (index > -1) {
            wishlist.splice(index, 1);
            saveWishlist();
            updateWishlistUI();
            showWishlistToast(name, false, image);
        } else {
            wishlist.push({ id, name, price: parseInt(price), image });
            saveWishlist();
            updateWishlistUI();
            showWishlistToast(name, true, image);
        }
    }

    function toggleWishlistDrawer(open) {
        if (!wishlistDrawer) return;
        if (open) {
            wishlistDrawer.classList.add('active');
            wishlistDrawer.setAttribute('aria-hidden', 'false');
            toggleCartDrawer(false); // Close cart drawer if open
            document.body.style.overflow = 'hidden';
        } else {
            wishlistDrawer.classList.remove('active');
            wishlistDrawer.setAttribute('aria-hidden', 'true');
            const isMobileNavActive = mobileNav && mobileNav.classList.contains('active');
            const isCartActive = cartDrawer && cartDrawer.classList.contains('active');
            const isCheckoutActive = checkoutModal && checkoutModal.classList.contains('active');
            if (!isMobileNavActive && !isCartActive && !isCheckoutActive) {
                document.body.style.overflow = '';
            }
        }
    }

    // Toggle Wishlist Drawer Event Listeners
    if (wishlistBtn) wishlistBtn.addEventListener('click', () => toggleWishlistDrawer(true));
    if (wishlistCloseBtn) wishlistCloseBtn.addEventListener('click', () => toggleWishlistDrawer(false));
    if (wishlistOverlay) wishlistOverlay.addEventListener('click', () => toggleWishlistDrawer(false));

    if (wishlistShopBtn) {
        wishlistShopBtn.addEventListener('click', () => {
            toggleWishlistDrawer(false);
            const featuredSection = document.getElementById('featured');
            if (featuredSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = featuredSection.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Event delegation inside Wishlist Drawer
    if (wishlistItemsContainer) {
        wishlistItemsContainer.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.wishlist-item');
            if (!itemElement) return;
            const itemId = itemElement.dataset.id;

            // Remove item
            if (e.target.closest('.wishlist-item__remove')) {
                wishlist = wishlist.filter(item => item.id !== itemId);
                saveWishlist();
                updateWishlistUI();
                const name = itemElement.querySelector('.wishlist-item__name').textContent;
                const image = itemElement.querySelector('.wishlist-item__image img').src;
                showWishlistToast(name, false, image);
                return;
            }

            // Add to Cart
            const addToCartBtn = e.target.closest('.wishlist-item__add-to-cart-btn');
            if (addToCartBtn) {
                const id = addToCartBtn.dataset.id;
                const name = addToCartBtn.dataset.name;
                const price = addToCartBtn.dataset.price;
                const image = addToCartBtn.dataset.image;

                addToCart(id, name, price, image);
                toggleWishlistDrawer(false);
                setTimeout(() => {
                    toggleCartDrawer(true);
                }, 300);
            }
        });
    }

    // Listen for Card Wishlist Button clicks on the page
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.product-card__wishlist-btn');
        if (btn) {
            e.preventDefault();
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = btn.dataset.price;
            const image = btn.dataset.image;
            toggleWishlist(id, name, price, image);
        }
    });

    // Initial wishlist render
    updateWishlistUI();

    // ============================
    // PAGE LOAD COMPLETE LOG
    // ============================
    console.log('%cVeloura Bikes', 'font-family: "Playfair Display", serif; font-size: 24px; font-weight: 700; color: #c8a96e;');
    console.log('%cCrafted for the Road Ahead.', 'font-family: Inter, sans-serif; font-size: 12px; color: #6b6b6b; letter-spacing: 2px;');
});
