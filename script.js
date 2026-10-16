// Modern IPTV Store - Enhanced JavaScript with Premium Animations
// Service Worker Registration for Offline Support
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => {
            console.debug('ServiceWorker registration optional notice:', err);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== OPTIMIZED SCROLL HANDLER WITH R-A-F =====
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    let isTicking = false;
    
    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Smooth Parallax on Hero Content
                if (hero && heroContent && currentScroll < hero.offsetHeight) {
                    const parallaxSpeed = 0.35;
                    heroContent.style.transform = `translate3d(0, ${currentScroll * parallaxSpeed}px, 0)`;
                    heroContent.style.opacity = Math.max(0, 1 - (currentScroll / hero.offsetHeight) * 0.85);
                }

                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

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

    // ===== BILLING FREQUENCY SWITCHER =====
    const billingTabs = document.querySelectorAll('.billing-tab');
    const starterAmount = document.getElementById('starterAmount');
    const starterPeriod = document.getElementById('starterPeriod');
    const proAmount = document.getElementById('proAmount');
    const proPeriod = document.getElementById('proPeriod');
    const proSubtitle = document.getElementById('proSubtitle');

    const pricingData = {
        monthly: {
            starter: { amount: '19.99', period: '/month' },
            pro: { amount: '29.99', period: '/month', sub: 'Billed monthly • Cancel anytime' }
        },
        quarterly: {
            starter: { amount: '47.99', period: '/3 months' },
            pro: { amount: '69.99', period: '/3 months', sub: 'Save 20% compared to monthly' }
        },
        yearly: {
            starter: { amount: '119.99', period: '/year' },
            pro: { amount: '149.99', period: '/year', sub: 'Best Value! Save 50% with annual billing' }
        }
    };

    billingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            billingTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const period = tab.getAttribute('data-billing');
            if (pricingData[period]) {
                if (starterPeriod) starterPeriod.textContent = pricingData[period].starter.period;
                if (proPeriod) proPeriod.textContent = pricingData[period].pro.period;
                if (proSubtitle) proSubtitle.textContent = pricingData[period].pro.sub;
                updateCurrencyDisplay();
            }
        });
    });

    // ===== MULTI-CURRENCY CONVERTER SYSTEM =====
    const currencySelect = document.getElementById('currencySelect');
    const currencySymbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        CAD: 'CA$'
    };
    const exchangeRates = {
        USD: 1.0,
        EUR: 0.92,
        GBP: 0.79,
        CAD: 1.36
    };

    let currentCurrency = 'USD';
    try {
        currentCurrency = localStorage.getItem('streamvault_currency') || 'USD';
    } catch (e) {
        currentCurrency = 'USD';
    }

    if (currencySelect) {
        currencySelect.value = currentCurrency;
    }

    function updateCurrencyDisplay() {
        const rate = exchangeRates[currentCurrency] || 1.0;
        const symbol = currencySymbols[currentCurrency] || '$';

        document.querySelectorAll('.currency').forEach(el => {
            el.textContent = symbol;
        });

        const activeTab = document.querySelector('.billing-tab.active');
        const period = activeTab ? activeTab.getAttribute('data-billing') : 'monthly';
        
        if (pricingData[period]) {
            const rawStarter = parseFloat(pricingData[period].starter.amount);
            const rawPro = parseFloat(pricingData[period].pro.amount);
            
            if (starterAmount) {
                starterAmount.textContent = (rawStarter * rate).toFixed(2);
            }
            if (proAmount) {
                proAmount.textContent = (rawPro * rate).toFixed(2);
            }
        }

        const lifetimeEl = document.querySelector('.pricing-card:last-child .amount');
        if (lifetimeEl) {
            lifetimeEl.textContent = (299.99 * rate).toFixed(2);
        }
    }

    if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
            currentCurrency = e.target.value;
            try {
                localStorage.setItem('streamvault_currency', currentCurrency);
            } catch (err) {}
            updateCurrencyDisplay();
        });
        updateCurrencyDisplay();
    }

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

    // ===== LIVE CHANNEL FINDER & SEARCH FILTER =====
    const channelSearchInput = document.getElementById('channelSearchInput');
    const clearChannelSearch = document.getElementById('clearChannelSearch');
    const channelChips = document.querySelectorAll('.channel-chip');
    const channelResultsGrid = document.getElementById('channelResultsGrid');
    const channelEmptyMsg = document.getElementById('channelEmptyMsg');

    const sampleChannels = [
        { name: 'Sky Sports Main Event', category: 'sports', icon: '⚽', quality: '4K 60FPS', country: 'UK' },
        { name: 'ESPN & ESPN 2 HD', category: 'sports', icon: '🏀', quality: '4K UHD', country: 'US' },
        { name: 'beIN Sports 1 Premium', category: 'sports', icon: '🏆', quality: '4K 60FPS', country: 'FR/AR' },
        { name: 'TNT Sports 1 & 2', category: 'sports', icon: '🥊', quality: '4K UHD', country: 'UK' },
        { name: 'Formula 1 TV Pro Live', category: 'sports', icon: '🏎️', quality: '4K 60FPS', country: 'GLOBAL' },
        { name: 'UFC Fight Pass Live', category: 'sports', icon: '🥋', quality: '4K UHD', country: 'US' },
        { name: 'HBO HD East & West', category: 'movies', icon: '🎬', quality: '4K HDR', country: 'US' },
        { name: 'Canal+ Cinéma 4K', category: 'movies', icon: '🍿', quality: '4K UHD', country: 'FR' },
        { name: 'Sky Cinema Premiere', category: 'movies', icon: '🎥', quality: '4K HDR', country: 'UK' },
        { name: 'BBC News HD', category: 'news', icon: '📰', quality: '1080P', country: 'UK' },
        { name: 'CNN International', category: 'news', icon: '🌐', quality: '1080P', country: 'US' },
        { name: 'Sky News HD', category: 'news', icon: '📡', quality: '1080P', country: 'UK' },
        { name: 'Disney Channel HD', category: 'kids', icon: '🧸', quality: '1080P', country: 'US' },
        { name: 'Cartoon Network Live', category: 'kids', icon: '🎨', quality: '1080P', country: 'US' },
        { name: 'Discovery Channel 4K', category: 'documentary', icon: '🌍', quality: '4K UHD', country: 'US' },
        { name: 'National Geographic HD', category: 'documentary', icon: '🦁', quality: '4K HDR', country: 'US' }
    ];

    let activeCategory = 'all';
    let searchQuery = '';
    let debounceTimer = null;

    function renderChannels() {
        if (!channelResultsGrid) return;
        const filtered = sampleChannels.filter(channel => {
            const matchesCat = activeCategory === 'all' || channel.category === activeCategory;
            const matchesSearch = !searchQuery || 
                channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                channel.country.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });

        channelResultsGrid.innerHTML = '';
        if (filtered.length === 0) {
            if (channelEmptyMsg) channelEmptyMsg.style.display = 'block';
        } else {
            if (channelEmptyMsg) channelEmptyMsg.style.display = 'none';
            filtered.forEach(ch => {
                const card = document.createElement('div');
                card.className = 'channel-card-item';
                card.setAttribute('data-channel', ch.name);
                card.setAttribute('data-quality', ch.quality);
                card.innerHTML = `
                    <div class="channel-card-top">
                        <div class="channel-logo-badge">${ch.icon}</div>
                        <span class="channel-quality-badge">${ch.quality}</span>
                    </div>
                    <div>
                        <div class="channel-name">${ch.name}</div>
                        <div class="channel-cat-label">${ch.country} • ${ch.category.toUpperCase()}</div>
                    </div>
                    <div class="channel-preview-btn">
                        <span>▶ Preview Stream</span>
                    </div>
                `;
                channelResultsGrid.appendChild(card);
            });
        }
    }

    if (channelSearchInput) {
        channelSearchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                searchQuery = e.target.value.trim();
                if (clearChannelSearch) {
                    clearChannelSearch.style.display = searchQuery ? 'block' : 'none';
                }
                renderChannels();
            }, 180);
        });
    }

    if (clearChannelSearch) {
        clearChannelSearch.addEventListener('click', () => {
            channelSearchInput.value = '';
            searchQuery = '';
            clearChannelSearch.style.display = 'none';
            channelSearchInput.focus();
            renderChannels();
        });
    }

    channelChips.forEach(chip => {
        chip.addEventListener('click', () => {
            channelChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = chip.getAttribute('data-cat') || 'all';
            renderChannels();
        });
    });

    renderChannels();

    // ===== STREAMING PLAYER PREVIEW MODAL =====
    const playerModal = document.getElementById('playerModal');
    const playerBackdrop = document.getElementById('playerBackdrop');
    const playerCloseBtn = document.getElementById('playerCloseBtn');
    const playerTitle = document.getElementById('playerTitle');
    const playerQualityBadge = document.getElementById('playerQualityBadge');
    const pPlayToggle = document.getElementById('pPlayToggle');
    const pMuteToggle = document.getElementById('pMuteToggle');
    const pQualitySelect = document.getElementById('pQualitySelect');
    const playerCtaBtn = document.getElementById('playerCtaBtn');

    let isPlaying = true;
    let isMuted = false;

    function openPlayerModal(channelName, quality) {
        if (!playerModal) return;
        if (playerTitle) playerTitle.textContent = channelName || 'Live Channel Stream';
        if (playerQualityBadge) playerQualityBadge.textContent = quality || '4K 60FPS';
        playerModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closePlayerModal() {
        if (!playerModal) return;
        playerModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (channelResultsGrid) {
        channelResultsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.channel-card-item');
            if (card) {
                const name = card.getAttribute('data-channel');
                const quality = card.getAttribute('data-quality');
                openPlayerModal(name, quality);
            }
        });
    }

    document.querySelectorAll('.content-card').forEach(card => {
        card.addEventListener('click', () => {
            const titleEl = card.querySelector('.card-title');
            const title = titleEl ? titleEl.textContent : 'VOD Stream Sample';
            openPlayerModal(title, '4K UHD HDR');
        });
    });

    if (playerCloseBtn) playerCloseBtn.addEventListener('click', closePlayerModal);
    if (playerBackdrop) playerBackdrop.addEventListener('click', closePlayerModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && playerModal && playerModal.style.display === 'flex') {
            closePlayerModal();
        }
    });

    if (pPlayToggle) {
        pPlayToggle.addEventListener('click', () => {
            isPlaying = !isPlaying;
            pPlayToggle.textContent = isPlaying ? '⏸ Pause' : '▶ Play';
            const pulse = document.querySelector('.stream-center-pulse');
            if (pulse) pulse.style.opacity = isPlaying ? '1' : '0.4';
        });
    }

    if (pMuteToggle) {
        pMuteToggle.addEventListener('click', () => {
            isMuted = !isMuted;
            pMuteToggle.textContent = isMuted ? '🔇 Sound OFF' : '🔊 Sound ON';
        });
    }

    if (pQualitySelect) {
        pQualitySelect.addEventListener('change', (e) => {
            if (playerQualityBadge) {
                playerQualityBadge.textContent = e.target.value + ' LIVE';
            }
        });
    }

    if (playerCtaBtn) {
        playerCtaBtn.addEventListener('click', () => {
            closePlayerModal();
        });
    }
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

    // ===== BROADBAND SPEED TEST CONTROLLER =====
    const startSpeedTestBtn = document.getElementById('startSpeedTestBtn');
    const speedGaugeCircle = document.getElementById('speedGaugeCircle');
    const speedNumber = document.getElementById('speedNumber');
    const pingStat = document.getElementById('pingStat');
    const jitterStat = document.getElementById('jitterStat');
    const speedResultBadge = document.getElementById('speedResultBadge');

    if (startSpeedTestBtn && speedNumber) {
        startSpeedTestBtn.addEventListener('click', () => {
            startSpeedTestBtn.disabled = true;
            startSpeedTestBtn.querySelector('span').textContent = '🔄 Testing latency & ping...';
            speedGaugeCircle.classList.add('testing');
            if (speedResultBadge) speedResultBadge.style.display = 'none';

            let ping = 14;
            let jitter = 2;
            let currentMbps = 0;
            const targetMbps = 72 + Math.floor(Math.random() * 25);

            setTimeout(() => {
                if (pingStat) pingStat.textContent = `Ping: ${ping + Math.floor(Math.random() * 6)} ms`;
                if (jitterStat) jitterStat.textContent = `Jitter: ${jitter + Math.floor(Math.random() * 3)} ms`;
                startSpeedTestBtn.querySelector('span').textContent = '📡 Measuring download throughput...';

                const interval = setInterval(() => {
                    currentMbps += Math.random() * 12 + 3;
                    if (currentMbps >= targetMbps) {
                        currentMbps = targetMbps;
                        clearInterval(interval);
                        speedNumber.textContent = currentMbps.toFixed(1);
                        speedGaugeCircle.classList.remove('testing');
                        startSpeedTestBtn.disabled = false;
                        startSpeedTestBtn.querySelector('span').textContent = '⚡ Test Again';
                        if (speedResultBadge) {
                            speedResultBadge.style.display = 'block';
                            speedResultBadge.innerHTML = `<span>🎉 ${currentMbps.toFixed(1)} Mbps Detected • Ultra HD 4K & Anti-Freeze Ready!</span>`;
                        }
                    } else {
                        speedNumber.textContent = currentMbps.toFixed(1);
                    }
                }, 80);
            }, 800);
        });
    }

    // ===== DEVICE SETUP GUIDE WIZARD =====
    const deviceTabBtns = document.querySelectorAll('.device-tab-btn');
    const deviceGuideContent = document.getElementById('deviceGuideContent');

    const deviceGuides = {
        firestick: {
            app: 'IPTV Smarters Pro & TiviMate',
            badge: 'Recommended App',
            m3u: 'http://sv-pro.stream:8080/get.php?username=YOUR_USER&password=YOUR_PASS&type=m3u_plus',
            steps: [
                { title: 'Install "Downloader" on FireStick', desc: 'Open Amazon Appstore on your FireStick, search for "Downloader" and install it.' },
                { title: 'Download IPTV Smarters App', desc: 'Open Downloader, enter quick code 78522 to download and install IPTV Smarters Pro.' },
                { title: 'Login with Xtream Codes API', desc: 'Select "Login with Xtream Codes API", enter your server URL, username & password sent to your email.' }
            ]
        },
        smarttv: {
            app: 'IBO Player / Smart IPTV',
            badge: 'Tizen & webOS',
            m3u: 'Upload M3U list to iboplayer.com using your TV Device ID & Key',
            steps: [
                { title: 'Install IBO Player from App Store', desc: 'Search for "IBO Player" or "Smart IPTV" in your Samsung Tizen or LG webOS Content Store.' },
                { title: 'Note your MAC / Device ID', desc: 'Launch the app to reveal your unique Device ID and Device Key shown on the TV screen.' },
                { title: 'Connect Your StreamVault Subscription', desc: 'Visit the activation portal on your phone or PC, enter your Device ID, paste your M3U URL, and click Save.' }
            ]
        },
        android: {
            app: 'TiviMate IPTV Player',
            badge: 'Top Rated UI',
            m3u: 'Xtream Codes: http://sv-pro.stream:8080 | User/Pass in your email',
            steps: [
                { title: 'Download TiviMate or Smarters', desc: 'Install "TiviMate" directly from the Google Play Store on your Android TV box, phone, or tablet.' },
                { title: 'Add New Playlist', desc: 'Select "Add Playlist" > "Xtream Codes" in settings.' },
                { title: 'Sync Channels & EPG Guide', desc: 'Enter your credentials to download all 20,000+ live channels with full TV program guide.' }
            ]
        },
        apple: {
            app: 'GSE Smart IPTV / IPTVX',
            badge: 'iOS & tvOS',
            m3u: 'M3U Playlist with EPG auto-sync enabled',
            steps: [
                { title: 'Install GSE Smart IPTV from App Store', desc: 'Search for "GSE Smart IPTV" or "IPTVX" on your Apple TV, iPhone, or iPad.' },
                { title: 'Add Remote Playlist', desc: 'Tap the "+" icon and choose "Add M3U URL".' },
                { title: 'Paste Subscription Link & Enjoy', desc: 'Paste the M3U link from your welcome email and start watching immediately in 4K.' }
            ]
        },
        windows: {
            app: 'VLC Player / IPTV Smarters Windows',
            badge: 'PC & Mac Desktop',
            m3u: 'VLC: Media > Open Network Stream > Paste M3U link',
            steps: [
                { title: 'Download VLC or Windows App', desc: 'Install VLC Media Player or the dedicated StreamVault Windows / macOS client.' },
                { title: 'Open Network Stream', desc: 'In VLC, press Ctrl+N (or Cmd+N on Mac) and paste your playlist URL.' },
                { title: 'Instant Desktop Streaming', desc: 'Click Play to browse thousands of channels with keyboard shortcuts and multi-screen support.' }
            ]
        }
    };

    function renderDeviceGuide(deviceId) {
        if (!deviceGuideContent) return;
        const guide = deviceGuides[deviceId] || deviceGuides.firestick;
        deviceGuideContent.innerHTML = `
            <div class="device-guide-card">
                <div class="guide-steps-list">
                    ${guide.steps.map((st, idx) => `
                        <div class="guide-step-item">
                            <div class="step-num">${idx + 1}</div>
                            <div class="step-content">
                                <h4>${st.title}</h4>
                                <p>${st.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="guide-app-recommendation">
                    <div>
                        <div class="guide-app-header">
                            <span class="guide-app-badge">${guide.badge}</span>
                            <h4 style="color: white; font-weight: 700;">${guide.app}</h4>
                        </div>
                        <p style="color: #94a3b8; font-size: 13px;">Format delivered immediately with your subscription:</p>
                        <div class="m3u-sample-box">${guide.m3u}</div>
                    </div>
                    <div style="display: flex; gap: 12px; align-items: center; margin-top: 16px;">
                        <a href="support.html" class="p-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                            <span>💬 Need Assistance? Talk to AI Support</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    deviceTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            deviceTabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const dev = btn.getAttribute('data-device');
            renderDeviceGuide(dev);
        });
    });

    renderDeviceGuide('firestick');

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
