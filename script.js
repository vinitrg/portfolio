// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 24, 16, 0.98)';
    } else {
        navbar.style.background = 'rgba(62, 39, 35, 0.95)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(category);
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title .name');
    const heroSubtitle = document.querySelector('.hero-title .title');
    
    if (heroTitle && heroSubtitle) {
        // Reset text content
        const nameText = heroTitle.textContent;
        const titleText = heroSubtitle.textContent;
        
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        
        // Type name
        let nameIndex = 0;
        const typeNameInterval = setInterval(() => {
            heroTitle.textContent += nameText[nameIndex];
            nameIndex++;
            if (nameIndex >= nameText.length) {
                clearInterval(typeNameInterval);
                
                // Type subtitle after a short delay
                setTimeout(() => {
                    let titleIndex = 0;
                    const typeTitleInterval = setInterval(() => {
                        heroSubtitle.textContent += titleText[titleIndex];
                        titleIndex++;
                        if (titleIndex >= titleText.length) {
                            clearInterval(typeTitleInterval);
                        }
                    }, 50);
                }, 500);
            }
        }, 100);
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Email validation and copy functionality
document.querySelector('a[href^="mailto:"]')?.addEventListener('click', function(e) {
    const email = this.textContent;
    
    // Copy email to clipboard
    navigator.clipboard.writeText(email).then(() => {
        // Show temporary feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="contact-icon">✓</span>Email copied!';
        this.style.color = '#00d4ff';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.color = '';
        }, 2000);
    });
});

// Animate counter for tech elements
document.addEventListener('DOMContentLoaded', () => {
    const techElements = document.querySelectorAll('.element');
    
    techElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
});

// Add smooth reveal for contact section
const contactSection = document.querySelector('.contact');
if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const links = entry.target.querySelectorAll('.contact-link');
                links.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const contactLinks = contactSection.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-30px)';
        link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    contactObserver.observe(contactSection);
}