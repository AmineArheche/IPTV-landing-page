// Modern IPTV Store - Enhanced JavaScript with Premium Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== SMOOTH SCROLL FOR NAVIGATION =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== HERO STATS COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2500;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + '+';
            }
        };
        
        updateCounter();
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));

    // ===== FEATURE CARDS REVEAL ANIMATION =====
    const featureCards = document.querySelectorAll('.feature-card');
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        featureObserver.observe(card);
    });

    // ===== DUPLICATE CAROUSEL CONTENT FOR INFINITE SCROLL =====
    const carouselTracks = document.querySelectorAll('.carousel-track');
    
    carouselTracks.forEach(track => {
        const cards = Array.from(track.children);
        
        // Duplicate cards for seamless infinite scroll
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    });

    // ===== PRICING CARDS STAGGER ANIMATION =====
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = entry.target.classList.contains('featured') 
                        ? 'scale(1.05)' 
                        : 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        pricingObserver.observe(card);
    });

    // ===== PRICING BUTTON CLICK ANIMATION =====
    const planButtons = document.querySelectorAll('.plan-button');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('button-ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Show loading state
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                ripple.remove();
                this.textContent = '✓ Added to Cart';
                this.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            }, 600);
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
                this.style.background = '';
            }, 2000);
        });
    });

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ===== CONTENT CARDS HOVER ENHANCEMENT =====
    const contentCards = document.querySelectorAll('.content-card');
    
    contentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Pause carousel on hover
            const track = this.closest('.carousel-track');
            if (track) {
                track.style.animationPlayState = 'paused';
            }
            
            // Add glow effect
            this.style.filter = 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.6))';
        });
        
        card.addEventListener('mouseleave', function() {
            // Resume carousel
            const track = this.closest('.carousel-track');
            if (track) {
                track.style.animationPlayState = 'running';
            }
            
            // Remove glow
            this.style.filter = '';
        });
        
        // Click to "play" animation
        card.addEventListener('click', function() {
            const playButton = this.querySelector('.card-play');
            if (playButton) {
                playButton.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    playButton.style.transform = 'scale(1.1)';
                }, 100);
                setTimeout(() => {
                    playButton.style.transform = '';
                }, 200);
            }
        });
    });

    // ===== SOCIAL PROOF NOTIFICATIONS =====
    const notifications = [
        { name: "James", location: "New York", action: "subscribed to Yearly Plan" },
        { name: "Sarah", location: "Los Angeles", action: "started streaming in 4K" },
        { name: "Michael", location: "Chicago", action: "purchased Lifetime Plan" },
        { name: "Emma", location: "Houston", action: "just activated their account" },
        { name: "David", location: "Phoenix", action: "upgraded to Premium" },
        { name: "Lisa", location: "Miami", action: "is watching live sports now" },
        { name: "Robert", location: "Seattle", action: "subscribed to Monthly Plan" },
        { name: "Jennifer", location: "Boston", action: "joined 5 minutes ago" }
    ];
    
    function showSocialProof() {
        const notification = notifications[Math.floor(Math.random() * notifications.length)];
        
        const popup = document.createElement('div');
        popup.className = 'social-proof-popup';
        popup.innerHTML = `
            <div class="popup-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="url(#grad1)"/>
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white"/>
                </svg>
            </div>
            <div class="popup-content">
                <div class="popup-text">
                    <strong>${notification.name}</strong> from ${notification.location}
                </div>
                <div class="popup-action">${notification.action}</div>
            </div>
            <div class="popup-close">×</div>
        `;
        
        document.body.appendChild(popup);
        
        // Close button
        popup.querySelector('.popup-close').addEventListener('click', () => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        });
        
        setTimeout(() => popup.classList.add('show'), 100);
        
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        }, 6000);
    }
    
    // Show first notification after 3 seconds, then every 12 seconds
    setTimeout(showSocialProof, 3000);
    setInterval(showSocialProof, 12000);

    // ===== CTA BUTTON PULSE ANIMATION =====
    const ctaButtons = document.querySelectorAll('.btn-primary, .nav-cta');
    
    setInterval(() => {
        ctaButtons.forEach(btn => {
            btn.style.animation = 'none';
            setTimeout(() => {
                btn.style.animation = 'pulse-cta 0.6s ease';
            }, 10);
        });
    }, 4000);

    // ===== PARALLAX EFFECT ON HERO =====
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        if (hero && window.pageYOffset < hero.offsetHeight) {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.8;
            }
        }
    });

    // ===== SECTION REVEAL ON SCROLL =====
    const sections = document.querySelectorAll('.features, .content-showcase, .pricing, .faq');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });

    // ===== LIVE VIEWER COUNT SIMULATION =====
    const createViewerCount = () => {
        const viewerElement = document.createElement('div');
        viewerElement.className = 'live-viewer-count';
        let count = 1247 + Math.floor(Math.random() * 50);
        viewerElement.innerHTML = `
            <span class="viewer-dot"></span>
            <span class="viewer-text">${count.toLocaleString()} people streaming now</span>
        `;
        
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.appendChild(viewerElement);
            
            // Update count periodically
            setInterval(() => {
                count += Math.floor(Math.random() * 10) - 4;
                count = Math.max(1200, Math.min(1350, count));
                viewerElement.querySelector('.viewer-text').textContent = 
                    `${count.toLocaleString()} people streaming now`;
            }, 5000);
        }
    };
    
    createViewerCount();

    // ===== PAGE LOAD ANIMATION =====
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    console.log('🎬 StreamVault Pro - Premium IPTV Service Loaded');
});

// ===== DYNAMIC CSS INJECTION =====
const style = document.createElement('style');
style.textContent = `
    /* Page Load Animation */
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    /* Button Ripple Effect */
    .button-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-expand 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-expand {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* CTA Pulse Animation */
    @keyframes pulse-cta {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); box-shadow: 0 15px 50px rgba(99, 102, 241, 0.6); }
    }

    /* Social Proof Popup */
    .social-proof-popup {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 360px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        transform: translateX(500px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 10000;
    }
    
    .social-proof-popup.show {
        transform: translateX(0);
    }
    
    .popup-avatar {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(99, 102, 241, 0.1);
    }
    
    .popup-content {
        flex: 1;
    }
    
    .popup-text {
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 4px;
    }
    
    .popup-action {
        font-size: 13px;
        color: #94a3b8;
    }
    
    .popup-close {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #64748b;
        font-size: 20px;
        transition: color 0.3s ease;
    }
    
    .popup-close:hover {
        color: #ffffff;
    }

    /* Live Viewer Count */
    .live-viewer-count {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 50px;
        font-size: 14px;
        color: #10b981;
        margin-top: 16px;
        animation: float 3s ease-in-out infinite;
    }
    
    .viewer-dot {
        width: 8px;
        height: 8px;
        background: #10b981;
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
    }

    /* Content Card Transitions */
    .content-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Smooth Scrolling Enhancement */
    html {
        scroll-behavior: smooth;
    }

    /* Responsive Social Proof */
    @media (max-width: 768px) {
        .social-proof-popup {
            bottom: 16px;
            right: 16px;
            left: 16px;
            max-width: calc(100% - 32px);
        }
        
        .live-viewer-count {
            font-size: 12px;
        }
    }
`;
document.head.appendChild(style);
