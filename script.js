// Smooth scroll effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    body.classList.add('dark-mode');
    updateDarkModeIcon();
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    updateDarkModeIcon();
});

function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Counter animation for stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = Date.now();

    element.textContent = '0';

    function update() {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        element.textContent = Math.floor(target * progress);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    update();
}

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateCounter(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(el => {
    counterObserver.observe(el);
});

// Mobile menu toggle
const navUl = document.querySelector('nav ul');
const navToggle = document.createElement('button');
navToggle.innerHTML = '<i class="fas fa-bars"></i>';
navToggle.classList.add('nav-toggle');
navToggle.style.display = 'none';
navToggle.style.background = 'none';
navToggle.style.border = 'none';
navToggle.style.color = 'white';
navToggle.style.fontSize = '1.2em';
navToggle.style.cursor = 'pointer';

document.querySelector('nav').appendChild(navToggle);

navToggle.addEventListener('click', () => {
    navUl.classList.toggle('show');
});

function checkScreenSize() {
    if (window.innerWidth <= 768) {
        navToggle.style.display = 'block';
        navUl.classList.remove('show');
    } else {
        navToggle.style.display = 'none';
        navUl.classList.remove('show');
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

// Scroll animations with Intersection Observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .project-card, .skill').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    animationObserver.observe(el);
});

// Enhanced contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff6b6b';
                input.style.boxShadow = '0 0 5px rgba(255, 107, 107, 0.3)';
            } else {
                input.style.borderColor = '#ddd';
                input.style.boxShadow = 'none';
            }
        });

        if (isValid) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;

                inputs.forEach(input => {
                    input.style.borderColor = '#ddd';
                    input.style.boxShadow = 'none';
                });
            }, 1500);
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Typing effect for hero section
const typingText = document.querySelector('#home p');
if (typingText) {
    const originalText = typingText.textContent;
    typingText.textContent = '';

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(typeWriter, 500);
}

// Add smooth scroll reveal effect for all sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            section.style.opacity = '1';
        }
    });
});

// Enhance progress bars with animation
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.5 });

    skillObserver.observe(skillsSection);
}