/**
 * Ramadan Daily Landing Page Script
 * Handle animations, scroll effects, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-Triggered Reveal Animations
    const fadeElements = document.querySelectorAll('.fade-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add tiny delay if specified in CSS, otherwise just trigger
                entry.target.classList.add('visible');
                // Once visible, no need to observe anymore
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => revealObserver.observe(el));

    // 2. Parallax Effect for Background Orbs (Desktop Only)
    const orbs = document.querySelectorAll('.glow-orb');

    if (window.innerWidth > 992) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const moveX = (clientX - window.innerWidth / 2) * 0.01;
            const moveY = (clientY - window.innerHeight / 2) * 0.01;

            orbs.forEach((orb, index) => {
                const factor = index === 0 ? 1 : -1;
                orb.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
            });
        });
    }

    // 3. Smooth Header Transition
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.style.padding = '12px 0';
            nav.style.background = 'rgba(4, 26, 18, 0.95)';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            nav.style.padding = '16px 0';
            nav.style.background = 'rgba(4, 26, 18, 0.7)';
            nav.style.boxShadow = 'none';
        }
    });

    // 4. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. Interactive Phone Tilt (Desktop Only)
    const phoneFrame = document.querySelector('.phone-frame');
    if (phoneFrame && window.innerWidth > 992) {
        phoneFrame.addEventListener('mousemove', (e) => {
            const rect = phoneFrame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            phoneFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        phoneFrame.addEventListener('mouseleave', () => {
            phoneFrame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }
});
