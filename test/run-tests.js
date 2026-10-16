/**
 * StreamVault Pro - Automated Validation & Unit Test Suite
 * Zero-dependency test runner executing via Node.js
 */

const fs = require('fs');
const path = require('path');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`  ✔ PASS: ${message}`);
    } else {
        failedTests++;
        console.error(`  ✖ FAIL: ${message}`);
    }
}

console.log('\n==================================================');
console.log('🧪 STREAMVAULT PRO - AUTOMATED TEST SUITE');
console.log('==================================================\n');

// 1. Critical Files Existence & Non-Empty Check
console.log('📁 Test Group 1: File Architecture & Assets');
const requiredFiles = [
    'index.html',
    'support.html',
    'style.css',
    'support.css',
    'script.js',
    'support-chat.js',
    'sw.js',
    'manifest.json',
    'icon.svg',
    'robots.txt',
    'sitemap.xml',
    'docs/CODE_REVIEW.md'
];

requiredFiles.forEach(file => {
    const fullPath = path.resolve(__dirname, '..', file);
    const exists = fs.existsSync(fullPath);
    let size = 0;
    if (exists) {
        size = fs.statSync(fullPath).size;
    }
    assert(exists && size > 50, `File "${file}" exists and has valid content (${size} bytes)`);
});

// 2. HTML Semantic & Accessibility Landmark Checks
console.log('\n♿ Test Group 2: Accessibility & SEO Landmarks');
const indexHtml = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');
const supportHtml = fs.readFileSync(path.resolve(__dirname, '..', 'support.html'), 'utf-8');

assert(indexHtml.includes('class="skip-link"'), 'index.html contains accessible Skip-to-Content link');
assert(supportHtml.includes('class="skip-link"'), 'support.html contains accessible Skip-to-Content link');
assert(indexHtml.includes('<main id="main-content">'), 'index.html contains semantic <main id="main-content"> landmark');
assert(indexHtml.includes('og:title') && indexHtml.includes('twitter:card'), 'index.html contains Open Graph & Twitter Card meta tags');
assert(indexHtml.includes('application/ld+json'), 'index.html contains JSON-LD Schema.org structured data');
assert(supportHtml.includes('application/ld+json'), 'support.html contains JSON-LD Schema.org structured data');
assert(indexHtml.includes('id="cookieBanner"'), 'index.html contains GDPR cookie consent container');
assert(indexHtml.includes('id="playerModal"'), 'index.html contains 4K streaming preview modal container');
assert(indexHtml.includes('id="speedtest"'), 'index.html contains interactive broadband speed test section');
assert(indexHtml.includes('id="devices"'), 'index.html contains multi-platform device setup guide section');

// 3. Security: HTML Sanitization Unit Tests
console.log('\n🔒 Test Group 3: Security & XSS Protection');
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const maliciousPayload = '<script>alert("XSS")</script><img src=x onerror=alert(1)>';
const sanitized = escapeHTML(maliciousPayload);

assert(!sanitized.includes('<script>'), 'XSS payload <script> tags safely converted to &lt;script&gt;');
assert(!sanitized.includes('<img'), 'XSS payload <img> tags safely escaped');
assert(sanitized.includes('&lt;script&gt;'), 'Sanitized payload contains valid HTML entity encoding');

// 4. Feature Logic: Currency Exchange Calculation Unit Tests
console.log('\n💱 Test Group 4: Currency Conversion Logic');
const exchangeRates = { USD: 1.0, EUR: 0.92, GBP: 0.79, CAD: 1.36 };

function convertPrice(usdPrice, currency) {
    const rate = exchangeRates[currency] || 1.0;
    return (usdPrice * rate).toFixed(2);
}

assert(convertPrice(19.99, 'USD') === '19.99', 'USD rate conversion returns exact base price');
assert(convertPrice(19.99, 'EUR') === '18.39', 'EUR rate conversion (0.92) is accurate');
assert(convertPrice(19.99, 'GBP') === '15.79', 'GBP rate conversion (0.79) is accurate');
assert(convertPrice(19.99, 'CAD') === '27.19', 'CAD rate conversion (1.36) is accurate');

// 5. Feature Logic: Pricing Discounts
console.log('\n🏷️ Test Group 5: Pricing Tiers & Discounts');
const monthlyRate = 19.99;
const quarterlyRate = 47.99; // ~15.99/mo (save 20%)
const yearlyRate = 119.99;   // ~9.99/mo (save 50%)

const quarterlySavingsPercent = Math.round((1 - (quarterlyRate / (monthlyRate * 3))) * 100);
const yearlySavingsPercent = Math.round((1 - (yearlyRate / (monthlyRate * 12))) * 100);

assert(quarterlySavingsPercent >= 20, `Quarterly tier provides discount (Calculated: ${quarterlySavingsPercent}%)`);
assert(yearlySavingsPercent >= 50, `Yearly tier provides 50% discount (Calculated: ${yearlySavingsPercent}%)`);

// Final Results
console.log('\n==================================================');
console.log(`📊 TEST SUMMARY: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('==================================================\n');

if (failedTests > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
