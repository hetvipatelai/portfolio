// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active nav link styling on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.style.color = '';
        link.style.borderBottomColor = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Create floating stars in hero section
function createStars() {
    const heroSection = document.querySelector('.hero');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('stars');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 20 + 's';
        star.style.animationDuration = (15 + Math.random() * 10) + 's';
        heroSection.appendChild(star);
    }
}

createStars();

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.style.animation;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .stat, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Simple validation
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--accent-color)';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Show success message
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #00d4ff, #0066ff)';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// Smooth parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
    });
});

// Scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
scrollBtn.style.cssText = `
    position: fixed;
    right: 30px;
    bottom: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border: none;
    border-radius: 50%;
    color: var(--dark-bg);
    font-size: 1.2rem;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s;
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
`;

document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollBtn.style.display = 'flex';
        scrollBtn.style.alignItems = 'center';
        scrollBtn.style.justifyContent = 'center';
    } else {
        scrollBtn.style.display = 'none';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1) translateY(0)';
});

// Typing animation for hero title
const words = document.querySelectorAll('.hero-title .word');
words.forEach((word, index) => {
    const letters = word.textContent.split('');
    word.textContent = '';
    
    letters.forEach((letter, letterIndex) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.animation = `fadeIn 0.5s ease-out ${index * 0.2 + letterIndex * 0.05}s both`;
        word.appendChild(span);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const animate = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(animate);
        } else {
            element.textContent = target;
        }
    };
    
    animate();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            // Skip animation for CGPA and other decimal values
            if (h3 && !h3.classList.contains('cgpa-display')) {
                const text = h3.textContent.replace(/[^0-9]/g, '');
                if (text) {
                    animateCounter(h3, parseInt(text));
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add glow effect to skills on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px var(--primary-color)';
        this.style.boxShadow = '0 0 20px var(--primary-color)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.textShadow = '';
        this.style.boxShadow = '';
    });
});

// Lazy load animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeIn 0.8s ease-out';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    sectionObserver.observe(section);
});

// Prevent scroll on mobile hamburger menu open
function toggleMobileMenu() {
    document.body.style.overflow = navMenu.style.display === 'flex' ? 'hidden' : 'auto';
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.style.display === 'flex' && window.innerWidth <= 768) {
            navMenu.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Add ripple CSS animation
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on load
window.addEventListener('load', () => {
    // Trigger animations for visible elements
    document.querySelectorAll('[class*="fade"], [class*="slide"], [class*="zoom"], [class*="scale"]').forEach(el => {
        el.style.opacity = '1';
    });
});