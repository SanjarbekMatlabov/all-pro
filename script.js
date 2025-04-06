// Fade-in animation for hero section on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('visible');
    }

    // Initialize particle background for Why Choose Us
    const particlesCanvas = document.getElementById('particles');
    if (particlesCanvas) {
        initParticles('particles');
    }

    // Initialize particle background for Contact page
    const contactParticlesCanvas = document.getElementById('contact-particles');
    if (contactParticlesCanvas) {
        initParticles('contact-particles');
    }
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Close the menu on mobile after clicking a link
            const navLinksContainer = document.querySelector('.nav-links');
            if (navLinksContainer) {
                navLinksContainer.classList.remove('active');
            }
        }
    });
});

// Toggle hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });
}

// CTA Button Click Effect
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.classList.contains('apply-now')) {
            // contact.html sahifasiga yo'naltirish
            window.location.href = 'contact.html';
        } else {
            // contact.html sahifasiga yo'naltirish
            window.location.href = 'contact.html';
        }
    });
});




// Scroll-triggered animation for Why Choose Us items
const whyChooseItems = document.querySelectorAll('.why-choose-item');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 300);
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
whyChooseItems.forEach(item => observer.observe(item));

// Particle Background Effect
function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(167, 139, 250, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}