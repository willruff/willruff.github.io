// Modern Portfolio Website JavaScript

// Mobile Navigation
const initMobileNav = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    console.log('Mobile nav elements:', { navToggle, navMenu, navLinks: navLinks.length }); // Debug log

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            console.log('Toggle clicked'); // Debug log
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.log('Mobile nav elements not found'); // Debug log
    }
};

// Smooth scrolling for navigation links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Navbar scroll effects
const initNavbarEffects = () => {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    const updateNavbar = () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });
};

// Scroll progress indicator
const initScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #6366f1, #f59e0b);
        z-index: 9999;
        transition: width 0.1s ease-out;
        border-radius: 0 2px 2px 0;
    `;
    document.body.appendChild(progressBar);
    
    const updateProgress = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
};

// Scroll animations
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.section-header, .about-text, .about-stats, .skill-item, .project-card, .contact-item, .social-link, .experience-item'
    );
    
    animateElements.forEach(el => observer.observe(el));
};

// Button ripple effects
const initButtonEffects = () => {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
};

// Scroll indicator click handler
const initScrollIndicator = () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('.about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
};

// Loading animation
const initLoadingAnimation = () => {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease-out;
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    loadingOverlay.appendChild(loader);
    document.body.appendChild(loadingOverlay);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove loading overlay when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
                document.body.classList.add('loaded');
            }, 500);
        }, 1000);
    });
};

// Keyboard navigation support
const initKeyboardNavigation = () => {
    document.addEventListener('keydown', (e) => {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (e.key === 'Escape' && navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
};

// Accessibility focus management
const initAccessibility = () => {
    document.querySelectorAll('.nav-link, .btn, .social-link, .project-link').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #6366f1';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #6366f1;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
};

// Initialize all features
// Experience toggle functionality for mobile
function toggleExperience(button) {
    console.log('Toggle function called'); // Debug log
    
    const experienceItem = button.closest('.experience-item');
    const toggleText = button.querySelector('.toggle-text');
    const toggleIcon = button.querySelector('.toggle-icon');
    
    console.log('Experience item:', experienceItem); // Debug log
    console.log('Current classes:', experienceItem.classList); // Debug log
    
    if (experienceItem.classList.contains('expanded')) {
        // Collapse
        experienceItem.classList.remove('expanded');
        button.classList.remove('expanded');
        toggleText.textContent = 'View Details';
        toggleIcon.textContent = '▼';
        console.log('Collapsed'); // Debug log
    } else {
        // Expand
        experienceItem.classList.add('expanded');
        button.classList.add('expanded');
        toggleText.textContent = 'Hide Details';
        toggleIcon.textContent = '▲';
        console.log('Expanded'); // Debug log
    }
}

// Make function globally accessible
window.toggleExperience = toggleExperience;

document.addEventListener('DOMContentLoaded', () => {
    initLoadingAnimation();
    initMobileNav();
    initSmoothScroll();
    initNavbarEffects();
    initScrollProgress();
    initButtonEffects();
    initScrollIndicator();
    initKeyboardNavigation();
    initAccessibility();
    
    // Initialize experience toggle buttons
    initExperienceToggles();
    
    // Initialize scroll animations after a short delay
    setTimeout(initScrollAnimations, 500);
    
});

// Initialize experience toggle functionality
function initExperienceToggles() {
    const toggleButtons = document.querySelectorAll('.experience-toggle');
    console.log('Found toggle buttons:', toggleButtons.length); // Debug log
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked'); // Debug log
            toggleExperience(this);
        });
    });
}



// Handle resize events
window.addEventListener('resize', () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.transform = '';
    });
});