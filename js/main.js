/* ===================================
   LES SAVONS DE LOLO - JavaScript
   Main Script
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Loader
    // ===================================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Trigger hero animations after loader
            initHeroAnimations();
        }, 1500);
    });

    // ===================================
    // Custom Cursor
    // ===================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth follower animation
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();
        
        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .product-card, input, textarea, select');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.borderColor = 'var(--color-secondary)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.borderColor = 'var(--color-primary)';
            });
        });
    }

    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.getElementById('header');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });

    // ===================================
    // Mobile Navigation
    // ===================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    });

    // ===================================
    // Active Link on Scroll
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);

    // ===================================
    // Hero Animations
    // ===================================
    function initHeroAnimations() {
        const revealTexts = document.querySelectorAll('.reveal-text');
        
        revealTexts.forEach((text, index) => {
            text.style.animationDelay = `${0.3 + (index * 0.2)}s`;
        });
    }

    // ===================================
    // Scroll Reveal Animations
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // If it's a section, add active class to child elements
                if (entry.target.tagName === 'SECTION') {
                    const revealElements = entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
                    revealElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('active');
                        }, index * 100);
                    });
                }
                
                // Animate elements with data-animate attribute
                const animatedElements = entry.target.querySelectorAll('[data-animate]');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animated');
                    }, index * 100);
                });
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // ===================================
    // Stats Counter Animation
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const start = 0;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (easeOutQuart)
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeProgress * (target - start) + start);
                
                stat.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
        
        statsAnimated = true;
    }
    
    // Observe stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // ===================================
    // Products Filter
    // ===================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.9); }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Testimonials Slider
    // ===================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    const prevBtn = document.querySelector('.testimonials-nav .prev');
    const nextBtn = document.querySelector('.testimonials-nav .next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = testimonialCards.length - 1;
            showSlide(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = currentSlide + 1;
            if (newIndex >= testimonialCards.length) newIndex = 0;
            showSlide(newIndex);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide
    setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialCards.length) newIndex = 0;
        showSlide(newIndex);
    }, 5000);

    // ===================================
    // Back to Top Button
    // ===================================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // Cart Functionality
    // ===================================
    const cartCount = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    let cartItems = 0;
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Animation feedback
            btn.style.transform = 'scale(1.2) rotate(90deg)';
            setTimeout(() => {
                btn.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
            
            // Show notification
            showNotification('Produit ajouté au panier ! 🛒');
        });
    });

    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles if not exists
        if (!document.querySelector('#notification-styles')) {
            const notifStyles = document.createElement('style');
            notifStyles.id = 'notification-styles';
            notifStyles.textContent = `
                .notification {
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%) translateY(100px);
                    background: var(--color-primary);
                    color: white;
                    padding: 15px 25px;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    box-shadow: 0 10px 40px rgba(74, 124, 89, 0.3);
                    z-index: 1000;
                    animation: slideUp 0.5s ease forwards;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    opacity: 0.8;
                }
                .notification-close:hover {
                    opacity: 1;
                }
                @keyframes slideUp {
                    to {
                        transform: translateX(-50%) translateY(0);
                    }
                }
            `;
            document.head.appendChild(notifStyles);
        }
        
        document.body.appendChild(notification);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideDown 0.5s ease forwards';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // ===================================
    // Form Handling
    // ===================================
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Simulate form submission
            showNotification('Message envoyé avec succès ! Nous vous répondrons bientôt. ✨');
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            showNotification('Bienvenue dans la famille Lolo ! 🌿 Votre code -10% : BIENVENUE10');
            newsletterForm.reset();
        });
    }

    // ===================================
    // Smooth Scroll
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Quick View Modal
    // ===================================
    const modal = document.getElementById('quickViewModal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const modalClose = document.querySelector('.modal-close');
    
    const productData = {
        'lavender-soap': {
            name: 'Douceur de Lavande',
            price: '8,50 €',
            description: 'Un savon apaisant à la lavande bio de Provence. Parfait pour une routine du soir relaxante.',
            ingredients: 'Huile d\'olive bio, huile de coco, beurre de karité, huile essentielle de lavande vraie bio.',
            weight: '100g',
            benefits: ['Apaisant', 'Relaxant', 'Hydratant']
        },
        'mint-soap': {
            name: 'Fraîcheur Menthe',
            price: '7,90 €',
            description: 'Un savon revigorant à la menthe poivrée. Idéal pour commencer la journée avec énergie.',
            ingredients: 'Huile d\'olive bio, huile de coco, argile verte, huile essentielle de menthe poivrée bio.',
            weight: '100g',
            benefits: ['Énergisant', 'Purifiant', 'Tonifiant']
        }
    };
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Load product data (simplified demo)
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 15px;">Douceur de Lavande</h2>
                    <p style="color: var(--color-primary); font-size: 1.5rem; font-weight: 600; margin-bottom: 15px;">8,50 €</p>
                    <p style="color: var(--color-text-light); margin-bottom: 20px;">Un savon apaisant à la lavande bio de Provence. Parfait pour une routine du soir relaxante.</p>
                    <button class="btn btn-primary" style="width: 100%;">Ajouter au panier</button>
                </div>
            `;
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ===================================
    // Parallax Effect
    // ===================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Hero parallax
        const heroLeaves = document.querySelectorAll('.floating-leaf');
        heroLeaves.forEach(leaf => {
            leaf.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
        
        // Bubbles parallax
        const bubbles = document.querySelectorAll('.floating-bubble');
        bubbles.forEach(bubble => {
            bubble.style.transform = `translateY(${scrolled * 0.2}px)`;
        });
    });

    // ===================================
    // Hover 3D Effect on Product Cards
    // ===================================
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // Ingredient Cards Animation
    // ===================================
    const ingredientCards = document.querySelectorAll('.ingredient-card');
    
    ingredientCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // ===================================
    // Process Steps Animation
    // ===================================
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s ease';
        processObserver.observe(step);
    });

    // ===================================
    // Soap Cards Floating Animation
    // ===================================
    const soapCards = document.querySelectorAll('.hero-soap-card');
    
    soapCards.forEach((card, index) => {
        card.style.setProperty('--rotation', `${(index - 1) * 5}deg`);
    });

    // ===================================
    // Page Load Animation
    // ===================================
    document.body.classList.add('loaded');

    console.log('🧼 Les Savons de Lolo - Site chargé avec succès!');
});

// ===================================
// Utility Functions
// ===================================

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
