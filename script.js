// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Add smooth hover effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to tagline (optional)
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add click effect to CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
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
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .cta-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
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
    
    // Add smooth reveal animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.brand-section, .products-section, .benefits-section, .features-section, .cta-section, .contact-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Add staggered animation for product cards
    const productCardsObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        productCardsObserver.observe(card);
    });
    
    // Add staggered animation for benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 1000 + (index * 150));
    });
    
    // Add staggered animation for feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 1500 + (index * 100));
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus styles for accessibility
    const focusableElements = document.querySelectorAll('a, button:not(.tab-btn), input, textarea, select');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid #ff6b6b';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add smooth scrolling for anchor links
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
    
    // Hide custom loader on page load, but keep it for at least 2 seconds
    const loader = document.getElementById('custom-loader');
    const loaderStart = Date.now();
    window.addEventListener('load', function() {
        const elapsed = Date.now() - loaderStart;
        const minDuration = 2000;
        const hideLoader = () => { if (loader) loader.classList.add('hide'); };
        if (elapsed < minDuration) {
            setTimeout(hideLoader, minDuration - elapsed);
        } else {
            hideLoader();
        }
        document.body.classList.add('loaded');
    });
    
    // Add CSS for loading state
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyle);
    
    // Add particle effect for gaming theme
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        .particle {
            position: fixed;
            width: 2px;
            height: 2px;
            background: #ff6b6b;
            border-radius: 50%;
            pointer-events: none;
            animation: float 3s infinite linear;
        }
        
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-10vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Create floating particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Tab switching logic for three tabs
    const overviewTabBtn = document.getElementById('overviewTabBtn');
    const featuresTabBtn = document.getElementById('featuresTabBtn');
    const pricingTabBtn = document.getElementById('pricingTabBtn');
    const reviewsTabBtn = document.getElementById('reviewsTabBtn');
    const overviewTab = document.getElementById('overviewTab');
    const featuresTab = document.getElementById('featuresTab');
    const pricingTab = document.getElementById('pricingTab');
    const reviewsTab = document.getElementById('reviewsTab');

    function showTab(tab) {
        overviewTab.style.display = 'none';
        featuresTab.style.display = 'none';
        pricingTab.style.display = 'none';
        reviewsTab.style.display = 'none';
        overviewTab.classList.remove('active');
        featuresTab.classList.remove('active');
        pricingTab.classList.remove('active');
        reviewsTab.classList.remove('active');
        overviewTabBtn.classList.remove('active');
        featuresTabBtn.classList.remove('active');
        pricingTabBtn.classList.remove('active');
        reviewsTabBtn.classList.remove('active');
        if (tab === 'overview') {
            overviewTab.style.display = '';
            overviewTab.classList.add('active');
            overviewTabBtn.classList.add('active');
        } else if (tab === 'features') {
            featuresTab.style.display = '';
            featuresTab.classList.add('active');
            featuresTabBtn.classList.add('active');
        } else if (tab === 'pricing') {
            pricingTab.style.display = '';
            pricingTab.classList.add('active');
            pricingTabBtn.classList.add('active');
        } else if (tab === 'reviews') {
            reviewsTab.style.display = '';
            reviewsTab.classList.add('active');
            reviewsTabBtn.classList.add('active');
        }
    }
    overviewTabBtn.addEventListener('click', function() { showTab('overview'); });
    featuresTabBtn.addEventListener('click', function() { showTab('features'); });
    pricingTabBtn.addEventListener('click', function() { showTab('pricing'); });
    reviewsTabBtn.addEventListener('click', function() { showTab('reviews'); });
    
    // Show the overview tab by default
    showTab('overview');
    
    // Shooting Star Animation
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        const size = Math.random() * 2 + 2;
        const startX = Math.random() * window.innerWidth * 0.8;
        const startY = Math.random() * window.innerHeight * 0.5;
        star.style.position = 'absolute';
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size * 0.7}px`;
        star.style.background = 'linear-gradient(90deg, #fff 0%, #a259ff 100%)';
        star.style.borderRadius = '50%';
        star.style.opacity = '0.85';
        star.style.boxShadow = '0 0 16px 4px #a259ff88';
        star.style.transform = 'rotate(-25deg)';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '1';
        star.style.transition = 'opacity 0.5s';
        document.getElementById('shooting-stars-bg').appendChild(star);
        // Animate
        setTimeout(() => {
            star.style.transition = 'all 1.2s linear, opacity 0.5s';
            star.style.left = `${startX + 300 + Math.random() * 200}px`;
            star.style.top = `${startY + 120 + Math.random() * 80}px`;
            star.style.opacity = '0';
        }, 10);
        setTimeout(() => {
            star.remove();
        }, 1400);
    }
    setInterval(createShootingStar, 1200);
});

// Add console message for developers
console.log('🚀 Roblox Tools Website loaded successfully!');
console.log('💡 Customize this site by editing the HTML, CSS, and JavaScript files.');