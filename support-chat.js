// AI Support Chat System - StreamVault Pro
document.addEventListener('DOMContentLoaded', function() {
    
    // DOM Elements
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const chatForm = document.getElementById('chatForm');
    const sendBtn = document.getElementById('sendBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const clearChatBtn = document.getElementById('clearChat');
    const topicButtons = document.querySelectorAll('.topic-btn');
    const suggestionChips = document.querySelectorAll('.chip');

    // AI Knowledge Base - Pre-programmed Responses
    const knowledgeBase = {
        // Activation & Setup
        'activate': {
            keywords: ['activate', 'activation', 'setup', 'start', 'begin', 'getting started', 'new account'],
            response: `To activate your StreamVault Pro subscription:

1. **Check Your Email** - Look for your welcome email with login credentials
2. **Choose Your Device** - Select from Smart TV, FireStick, Phone, etc.
3. **Install the App** - Download our app or configure your M3U URL
4. **Enter Credentials** - Use the username and password from your email
5. **Start Streaming** - You're ready to go!

📧 Didn't receive your email? Check your spam folder or contact support@streamvaultpro.com

Need device-specific setup instructions? Just ask!`
        },

        // Device Compatibility
        'devices': {
            keywords: ['device', 'compatible', 'compatibility', 'tv', 'firestick', 'phone', 'tablet', 'smart tv', 'android', 'ios', 'mag box'],
            response: `StreamVault Pro works on virtually any device! 📱

**Supported Devices:**
• Smart TVs (Samsung, LG, Android TV)
• Amazon FireStick & Fire TV
• Apple TV & iOS devices
• Android phones & tablets
• Windows & Mac computers
• MAG Boxes (250, 254, 322, etc.)
• Formuler Z boxes
• NVIDIA Shield
• Chromecast

**Recommended Apps:**
• IPTV Smarters Pro
• TiviMate
• Perfect Player
• GSE Smart IPTV

Need help setting up a specific device? Let me know which one!`
        },

        // Buffering Issues
        'buffering': {
            keywords: ['buffer', 'buffering', 'freeze', 'freezing', 'lag', 'lagging', 'slow', 'loading', 'stuttering'],
            response: `Let's fix that buffering! Here's what to try: ⚡

**Quick Fixes:**
1. **Check Internet Speed** - Need at least 10 Mbps for HD, 25 Mbps for 4K
2. **Use Ethernet Cable** - WiFi can be unstable; wired is always better
3. **Restart Your Device** - Simple but often effective
4. **Clear App Cache** - Go to app settings and clear cache
5. **Change Server** - Try switching to a different server in settings

**Advanced Solutions:**
• Reduce video quality temporarily
• Close other streaming apps
• Restart your router
• Update your IPTV app
• Use a VPN for better routing

Still having issues? Our anti-freeze technology should prevent most buffering. Contact human support if problems persist.`
        },

        // Billing & Account
        'billing': {
            keywords: ['bill', 'billing', 'payment', 'charge', 'subscription', 'upgrade', 'downgrade', 'cancel', 'refund', 'price', 'cost'],
            response: `Account & Billing Information: 💳

**Current Plans:**
• Monthly - $19.99/month (1 connection)
• Yearly - $119.99/year (2 connections, save 50%)
• Lifetime - $299.99 one-time (3 connections)

**Upgrade Your Plan:**
1. Log into your account
2. Go to "My Subscription"
3. Click "Upgrade Plan"
4. Choose your new plan and confirm

**Refund Policy:**
• 24-hour money-back guarantee
• No refunds on annual/lifetime after 24 hours
• Prorated credits for upgrades

**Payment Methods:**
✓ Credit/Debit Cards
✓ PayPal
✓ Cryptocurrency
✓ Bank Transfer

Need to make changes? I can connect you with billing support!`
        },

        // Channel List
        'channels': {
            keywords: ['channel', 'channels', 'content', 'what do you have', 'list', 'sports', 'movies', 'shows', 'vod'],
            response: `We have an AMAZING content library! 🎬

**Live Channels (20,000+):**
• 🏈 **Sports** - NFL, NBA, NHL, MLB, UFC, EPL, La Liga, Champions League
• 📺 **USA Channels** - ABC, NBC, CBS, FOX, ESPN, CNN, HBO, Showtime
• 🌍 **International** - UK, Canada, Arabic, Spanish, French, Italian
• 🎬 **Movies** - Premium movie channels 24/7
• 👶 **Kids** - Cartoon Network, Nickelodeon, Disney
• 📰 **News** - CNN, Fox News, MSNBC, BBC, Al Jazeera

**VOD Library (100,000+):**
• Latest movies & TV series
• Catch-up TV (7-day replay)
• 4K UHD content
• Premium adult content (separate section)

Want a specific channel? Ask me and I'll check if we have it!`
        },

        // Troubleshooting
        'problem': {
            keywords: ['problem', 'issue', 'not working', 'broken', 'error', 'fix', 'help', 'trouble'],
            response: `I'm here to help! Let's troubleshoot: 🔧

**Common Issues & Solutions:**

**1. Login Issues**
• Double-check username/password
• No spaces before/after credentials
• Check caps lock
• Try "Forgot Password"

**2. No Channels Loading**
• Check internet connection
• Verify subscription is active
• Update playlist/EPG
• Reinstall the app

**3. Black Screen**
• Update app to latest version
• Clear app cache
• Try different player (VLC, MX Player)
• Check device compatibility

**4. EPG Not Showing**
• Refresh EPG in settings
• Make sure auto-update is enabled
• Check time zone settings

Still stuck? Tell me exactly what's happening and I'll provide specific solutions!`
        },

        // VPN Usage
        'vpn': {
            keywords: ['vpn', 'privacy', 'security', 'safe', 'anonymous', 'hide', 'location'],
            response: `VPN Usage with StreamVault Pro: 🔒

**Do You Need a VPN?**
• Recommended but not required
• Adds extra privacy layer
• Can improve routing/speeds
• Bypasses ISP throttling

**Recommended VPNs:**
• ExpressVPN (fastest)
• NordVPN (best value)
• Surfshark (unlimited devices)
• IPVanish (IPTV optimized)

**Setup Tips:**
1. Connect to VPN first
2. Then open IPTV app
3. Choose nearby server for best speed
4. Avoid free VPNs (slow & unreliable)

**Important:** Some ISPs throttle streaming. A VPN can significantly improve your experience!

Need VPN recommendations? I can help you choose!`
        },

        // Multi-Device/Connections
        'connections': {
            keywords: ['multiple', 'devices', 'connection', 'connections', 'simultaneous', 'at once', 'family', 'share'],
            response: `Multi-Device Streaming Info: 📱

**Connections by Plan:**
• **Monthly** - 1 simultaneous connection
• **Yearly** - 2 simultaneous connections
• **Lifetime** - 3 simultaneous connections

**What This Means:**
You can install on unlimited devices, but can only stream on the allowed number at the same time.

**Example:**
With 2 connections, you can:
✓ Watch sports on TV while someone watches a movie on their phone
✗ Can't stream on 3 devices at once

**Need More Connections?**
• Upgrade to a higher tier
• Get additional subscriptions (discounted)
• Use profile switching on same device

Want to upgrade? Let me know!`
        },

        // EPG Guide
        'epg': {
            keywords: ['epg', 'guide', 'tv guide', 'program guide', 'schedule', 'what\'s on'],
            response: `EPG (Electronic Program Guide) Info: 📅

**What is EPG?**
A TV guide showing what's playing now and upcoming programs for the next 7 days.

**Enabling EPG:**
1. Open your IPTV app settings
2. Find "EPG URL" or "XMLTV"
3. Enter the URL from your welcome email
4. Set auto-update to daily
5. Refresh the guide

**EPG Features:**
• 7-day program schedule
• Show descriptions & ratings
• Record/reminder options
• Search by genre/time

**Troubleshooting EPG:**
• Make sure time zone is correct
• Enable auto-update
• Manually refresh if needed
• Check if EPG URL is correct

Need your EPG URL? Check your welcome email or contact support!`
        },

        // Customer Support
        'human': {
            keywords: ['human', 'person', 'agent', 'representative', 'talk to someone', 'real person', 'staff'],
            response: `I'd be happy to connect you with our human support team! 👤

**Contact Options:**

📧 **Email Support**
support@streamvaultpro.com
Response time: 2-4 hours

💬 **Live Chat**
Available 24/7 for urgent issues
Click "Start Live Chat" below

📱 **WhatsApp**
+1 (555) 123-4567
Fastest for quick questions

🎫 **Submit Ticket**
Go to Help Center → New Ticket
Best for technical issues

**Current Wait Times:**
• Email: ~2 hours
• Live Chat: ~5 minutes
• WhatsApp: ~10 minutes

What's the best way to reach you?`
        },

        // Quality & Streaming
        'quality': {
            keywords: ['quality', 'hd', '4k', 'resolution', 'picture', 'video quality', 'stream quality'],
            response: `Video Quality Information: 🎥

**Available Qualities:**
• 📺 SD (Standard Definition) - 480p
• 🎬 HD (High Definition) - 720p/1080p
• ✨ 4K Ultra HD - 2160p (select content)

**Changing Quality:**
Most apps auto-adjust based on your internet speed. To manually change:
1. Open player settings during playback
2. Select quality/resolution
3. Choose preferred quality

**Recommended Internet Speeds:**
• SD: 3-5 Mbps
• HD (720p): 5-10 Mbps
• Full HD (1080p): 10-20 Mbps
• 4K: 25+ Mbps

**Tips for Best Quality:**
✓ Use wired connection
✓ Close other apps
✓ Ensure good internet speed
✓ Update to latest app version

Quality issues? Let me know what you're experiencing!`
        },

        // Recording/Catchup
        'recording': {
            keywords: ['record', 'recording', 'dvr', 'catch up', 'catchup', 'replay', 'rewatch'],
            response: `Recording & Catch-Up Features: ⏺️

**Catch-Up TV:**
• Available on most channels
• 7-day replay window
• Watch any show from the past week
• Perfect if you miss a game or episode!

**How to Use Catch-Up:**
1. Go to EPG/TV Guide
2. Select past program
3. Click "Play" or "Watch"

**Cloud DVR (Select Plans):**
Some premium plans include cloud recording:
• Record live TV
• Store for 30 days
• Access from any device

**Note:** Not all channels support catch-up (licensing restrictions)

**Alternatives:**
• Check our VOD library
• Most shows added within 24 hours
• 100,000+ on-demand titles

Need help finding a specific show? Let me know!`
        }
    };

    // Greeting responses
    const greetings = {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
        responses: [
            "Hello! 👋 How can I help you with StreamVault Pro today?",
            "Hi there! 😊 What can I assist you with?",
            "Hey! Welcome to StreamVault Pro support. What brings you here today?",
            "Greetings! How may I help you today?"
        ]
    };

    // Thank you responses
    const thanks = {
        keywords: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome'],
        responses: [
            "You're very welcome! 😊 Is there anything else I can help you with?",
            "Happy to help! Let me know if you need anything else.",
            "Glad I could assist! Feel free to ask if you have more questions.",
            "My pleasure! I'm here 24/7 if you need more help."
        ]
    };

    // Fallback response
    const fallbackResponses = [
        "I'm not quite sure about that specific question. Could you rephrase it or try one of the suggested topics?",
        "Hmm, I don't have information on that exact query. Would you like to speak with a human agent?",
        "I'm still learning! For this question, I recommend contacting our human support team for the best answer.",
        "That's outside my current knowledge. Let me connect you with our support team who can help better!"
    ];

    // Initialize
    let conversationHistory = [];

    // Find best matching response
    function findBestResponse(userMessage) {
        const messageLower = userMessage.toLowerCase();

        // Check for greetings
        if (greetings.keywords.some(keyword => messageLower.includes(keyword))) {
            return greetings.responses[Math.floor(Math.random() * greetings.responses.length)];
        }

        // Check for thanks
        if (thanks.keywords.some(keyword => messageLower.includes(keyword))) {
            return thanks.responses[Math.floor(Math.random() * thanks.responses.length)];
        }

        // Search knowledge base
        let bestMatch = null;
        let highestScore = 0;

        for (const [key, data] of Object.entries(knowledgeBase)) {
            const score = data.keywords.reduce((acc, keyword) => {
                return acc + (messageLower.includes(keyword) ? 1 : 0);
            }, 0);

            if (score > highestScore) {
                highestScore = score;
                bestMatch = data.response;
            }
        }

        // Return best match or fallback
        return highestScore > 0 
            ? bestMatch 
            : fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }

    // HTML Sanitization to prevent XSS attacks
    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Markdown Parser for structured bot messages
    function formatMarkdown(rawText) {
        if (!rawText) return '';
        const escaped = escapeHTML(rawText);
        // Format bold text **bold**
        let formatted = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        const lines = formatted.split('\n');
        let inList = false;
        const htmlLines = [];

        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
                const itemText = trimmed.replace(/^[•\-\d+\.]\s*/, '');
                if (!inList) {
                    htmlLines.push('<ul class="chat-list">');
                    inList = true;
                }
                htmlLines.push(`<li>${itemText}</li>`);
            } else {
                if (inList) {
                    htmlLines.push('</ul>');
                    inList = false;
                }
                if (trimmed.length > 0) {
                    htmlLines.push(`<p>${line}</p>`);
                }
            }
        }
        if (inList) {
            htmlLines.push('</ul>');
        }
        return htmlLines.join('');
    }

    // Add message to chat safely
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'agent-message'}`;

        const currentTime = new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });

        if (isUser) {
            messageDiv.innerHTML = `
                <div class="message-avatar">U</div>
                <div class="message-content">
                    <div class="message-text">
                        <p>${escapeHTML(text)}</p>
                    </div>
                    <div class="message-time">${currentTime}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <div class="avatar-gradient">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 2.7c1.491 0 2.7 1.209 2.7 2.7s-1.209 2.7-2.7 2.7-2.7-1.209-2.7-2.7 1.209-2.7 2.7-2.7zm0 12.96c-2.25 0-4.23-1.152-5.4-2.898.027-1.791 3.6-2.772 5.4-2.772 1.791 0 5.373.981 5.4 2.772-1.17 1.746-3.15 2.898-5.4 2.898z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <div class="message-content">
                    <div class="message-text">
                        ${formatMarkdown(text)}
                    </div>
                    <div class="message-time">${currentTime}</div>
                </div>
            `;
        }

        // Remove suggestion chips if they exist
        const existingChips = chatMessages.querySelector('.suggested-questions');
        if (existingChips && isUser) {
            existingChips.remove();
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Add to history
        conversationHistory.push({ text, isUser, timestamp: new Date() });
    }

    // Show typing indicator
    function showTyping() {
        typingIndicator.classList.add('active');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Hide typing indicator
    function hideTyping() {
        typingIndicator.classList.remove('active');
    }

    // Handle form submission
    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const userMessage = messageInput.value.trim();
        if (!userMessage) return;

        // Play send chime
        playChime(true);

        // Add user message
        addMessage(userMessage, true);
        messageInput.value = '';

        // Show typing indicator
        showTyping();

        // Simulate AI thinking time
        const thinkingTime = 800 + Math.random() * 1200; // 0.8-2 seconds
        
        setTimeout(() => {
            hideTyping();
            const response = findBestResponse(userMessage);
            addMessage(response, false);
            playChime(false);
        }, thinkingTime);
    });

    // ===== AUDIO CHIME SYNTHESIZER =====
    let soundEnabled = true;
    const toggleSoundBtn = document.getElementById('toggleSound');
    const soundIcon = document.getElementById('soundIcon');

    function playChime(isSend = true) {
        if (!soundEnabled) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            const freq = isSend ? 587.33 : 880;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            osc.start();
            osc.stop(ctx.currentTime + 0.25);
        } catch (e) {}
    }

    if (toggleSoundBtn) {
        toggleSoundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundIcon) soundIcon.textContent = soundEnabled ? '🔔' : '🔕';
            toggleSoundBtn.title = soundEnabled ? 'Audio Chimes Enabled' : 'Audio Chimes Muted';
        });
    }

    // ===== EXPORT CHAT TRANSCRIPT =====
    const exportChatBtn = document.getElementById('exportChat');
    if (exportChatBtn) {
        exportChatBtn.addEventListener('click', () => {
            if (conversationHistory.length === 0) {
                alert('No chat messages to export yet.');
                return;
            }
            let transcriptText = `StreamVault Pro Support Chat Transcript\n`;
            transcriptText += `Exported: ${new Date().toLocaleString()}\n`;
            transcriptText += `=========================================\n\n`;

            conversationHistory.forEach(msg => {
                const speaker = msg.isUser ? 'USER' : 'STREAMVAULT AI AGENT';
                const time = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : '';
                transcriptText += `[${time}] ${speaker}:\n${msg.text}\n\n`;
            });

            const blob = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `streamvault-support-${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Handle topic buttons
    topicButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            messageInput.value = question;
            chatForm.dispatchEvent(new Event('submit'));
        });
    });

    // Handle suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            messageInput.value = question;
            chatForm.dispatchEvent(new Event('submit'));
        });
    });

    // Clear chat
    clearChatBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear this conversation?')) {
            // Keep only welcome message
            const welcomeMsg = chatMessages.querySelector('.agent-message');
            chatMessages.innerHTML = '';
            chatMessages.appendChild(welcomeMsg);
            
            // Re-add suggestion chips
            const suggestedDiv = document.createElement('div');
            suggestedDiv.className = 'suggested-questions';
            suggestedDiv.innerHTML = `
                <div class="suggestions-label">Popular questions:</div>
                <div class="suggestion-chips">
                    <button class="chip" data-question="How do I activate my account?">How do I activate my account?</button>
                    <button class="chip" data-question="What's your refund policy?">What's your refund policy?</button>
                    <button class="chip" data-question="Can I watch on multiple devices?">Can I watch on multiple devices?</button>
                </div>
            `;
            chatMessages.appendChild(suggestedDiv);
            
            // Re-attach event listeners
            suggestedDiv.querySelectorAll('.chip').forEach(chip => {
                chip.addEventListener('click', function() {
                    const question = this.getAttribute('data-question');
                    messageInput.value = question;
                    chatForm.dispatchEvent(new Event('submit'));
                });
            });
            
            conversationHistory = [];
        }
    });

    // Enable send button only when input has text
    messageInput.addEventListener('input', function() {
        sendBtn.disabled = !this.value.trim();
    });

    // Auto-focus input
    messageInput.focus();

    // Enter to send, Shift+Enter for new line
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    // ===== SUPPORT TICKET STATUS TRACKER =====
    const ticketLookupInput = document.getElementById('ticketLookupInput');
    const lookupTicketBtn = document.getElementById('lookupTicketBtn');
    const ticketResultCard = document.getElementById('ticketResultCard');

    if (lookupTicketBtn && ticketLookupInput && ticketResultCard) {
        lookupTicketBtn.addEventListener('click', () => {
            const rawId = ticketLookupInput.value.trim().toUpperCase() || 'TK-8820';
            ticketResultCard.style.display = 'block';
            ticketResultCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <strong style="color: white;">Ticket #${escapeHTML(rawId)}</strong>
                    <span style="color: #10b981; font-weight: 700;">IN PROGRESS</span>
                </div>
                <div style="margin-bottom: 8px;">Category: 4K Stream Diagnostics & M3U Routing</div>
                <div class="ticket-timeline">
                    <div class="timeline-step done">
                        <span>✔</span>
                        <span>Ticket Received & Verified</span>
                    </div>
                    <div class="timeline-step done">
                        <span>✔</span>
                        <span>Automated Network Diagnostic Pass</span>
                    </div>
                    <div class="timeline-step current">
                        <span>●</span>
                        <span>Assigned to Tier-2 IPTV Support Engineer</span>
                    </div>
                    <div class="timeline-step">
                        <span style="color: #64748b;">○</span>
                        <span style="color: #64748b;">Final Quality Sign-off & Resolution</span>
                    </div>
                </div>
            `;
        });
    }

    // ===== GDPR COOKIE CONSENT CONTROLLER =====
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
    const cookieEssentialBtn = document.getElementById('cookieEssentialBtn');

    if (cookieBanner) {
        let consent = null;
        try {
            consent = localStorage.getItem('streamvault_cookie_consent');
        } catch (e) {}

        if (!consent) {
            setTimeout(() => {
                cookieBanner.style.display = 'flex';
            }, 1200);
        }

        const dismissCookie = (pref) => {
            try {
                localStorage.setItem('streamvault_cookie_consent', pref);
            } catch (e) {}
            cookieBanner.style.animation = 'cookie-slide-up 0.3s reverse';
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        };

        if (cookieAcceptBtn) {
            cookieAcceptBtn.addEventListener('click', () => dismissCookie('all'));
        }
        if (cookieEssentialBtn) {
            cookieEssentialBtn.addEventListener('click', () => dismissCookie('essential'));
        }
    }

    console.log('💬 AI Support Chat Initialized - StreamVault Pro');
});


// Automated Quick Reply Suggestions
window.StreamVaultQuickReplies = [
    "How to setup on Smart TV?",
    "Do you offer a free 24h trial?",
    "Supported payment methods",
    "How fast should my internet be?"
];
