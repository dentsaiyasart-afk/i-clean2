/* ========================================
   PERFORMANCE OPTIMIZATIONS
   ======================================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isActive);
        
        // Animate hamburger icon
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}

/* ========================================
   SMOOTH SCROLL WITH OFFSET FOR FIXED NAVBAR
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Track navigation clicks
            trackEvent('Navigation', 'click', href);
        }
    });
});

/* ========================================
   FAQ ACCORDION
   ======================================== */

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        // Click event
        question.addEventListener('click', () => {
            toggleFAQ(item, index);
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(item, index);
            }
        });
    }
});

function toggleFAQ(item, index) {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(faq => {
        faq.classList.remove('active');
        const q = faq.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        item.classList.add('active');
        const question = item.querySelector('.faq-question');
        if (question) {
            question.setAttribute('aria-expanded', 'true');
            
            // Track FAQ interactions
            const questionText = question.querySelector('span').textContent;
            trackEvent('FAQ', 'expand', questionText);
        }
    }
}

/* ========================================
   SCROLL TO TOP BUTTON
   ======================================== */

const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    const handleScroll = throttle(() => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        trackEvent('Navigation', 'click', 'Scroll to Top');
    });
}

/* ========================================
   NAVBAR SHADOW ON SCROLL
   ======================================== */

const navbar = document.querySelector('.navbar');

if (navbar) {
    const handleNavbarScroll = throttle(() => {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
    }, 100);

    window.addEventListener('scroll', handleNavbarScroll);
}

/* ========================================
   WHOLESALE FORM SUBMISSION
   ======================================== */

const wholesaleForm = document.getElementById('wholesaleForm');

if (wholesaleForm) {
    wholesaleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(wholesaleForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = wholesaleForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ กำลังส่งข้อมูล...';
        
        try {
            // Send data to API
            const response = await fetch('https://api-iclean.vercel.app/api/wholesale-inquiry', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                // Success
                showNotification('✅ ส่งข้อมูลสำเร็จ! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง', 'success');
                wholesaleForm.reset();
                
                // Track conversion
                trackEvent('Form', 'submit_success', 'Wholesale Inquiry');
                
                // Facebook Pixel tracking
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead', {
                        content_name: 'Wholesale Inquiry',
                        content_category: 'B2B'
                    });
                }
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง หรือติดต่อทาง Line: @i_clean', 'error');
            trackEvent('Form', 'submit_error', 'Wholesale Inquiry');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

/* ========================================
   FORM VALIDATION
   ======================================== */

function validateForm(data) {
    const errors = [];
    
    // Validate required fields
    if (!data.fullname || data.fullname.trim().length < 2) {
        errors.push('กรุณากรอกชื่อ-นามสกุลให้ถูกต้อง');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('กรุณากรอกอีเมลให้ถูกต้อง');
    }
    
    // Validate phone
    const phoneRegex = /^[0-9]{9,10}$/;
    const cleanPhone = data.phone ? data.phone.replace(/[^0-9]/g, '') : '';
    if (!phoneRegex.test(cleanPhone)) {
        errors.push('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9-10 หลัก)');
    }
    
    // Validate business type
    if (!data.business_type) {
        errors.push('กรุณาเลือกประเภทธุรกิจ');
    }
    
    if (errors.length > 0) {
        showNotification('⚠️ ' + errors.join('\n'), 'warning');
        return false;
    }
    
    return true;
}

/* ========================================
   NEWSLETTER FORM SUBMISSION
   ======================================== */

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('⚠️ กรุณากรอกอีเมลให้ถูกต้อง', 'warning');
            return;
        }
        
        try {
            const response = await fetch('https://api-iclean.vercel.app/api/newsletter-subscribe', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            
            if (response.ok) {
                showNotification('✅ สมัครรับข่าวสารสำเร็จ! เราจะส่งโปรโมชั่นและเคล็ดลับดีๆ ไปให้คุณ', 'success');
                form.reset();
                trackEvent('Newsletter', 'subscribe', email);
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
        }
    });
});

/* ========================================
   NOTIFICATION SYSTEM
   ======================================== */

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifs = document.querySelectorAll('.notification');
    existingNotifs.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#4A7C4E' : type === 'error' ? '#dc3545' : '#f5d048'};
        color: ${type === 'warning' ? '#2C4A2F' : 'white'};
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        max-width: 90%;
        text-align: center;
        animation: slideUp 0.3s ease;
        white-space: pre-line;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/* ========================================
   INTERSECTION OBSERVER - FADE IN ANIMATION
   ======================================== */

/* ========================================
   INTERSECTION OBSERVER - FADE IN ANIMATION
   ======================================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// **แก้ตรงนี้** : เพิ่ม observer เป็นอาร์กิวเมนต์ที่ 2 และแก้ไขโครงสร้าง
const fadeInObserver = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // ใช้ observer.unobserve เพื่อหยุดการติดตามหลังจาก Animation ทำงาน
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions); // <-- ต้องปิดด้วยวงเล็บนี้
/* ========================================
   LAZY LOADING IMAGES
   ======================================== */

// Native lazy loading is already handled by loading="lazy" attribute
// But add intersection observer for older browsers
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

/* ========================================
   PRODUCT IMAGE LIGHTBOX
   ======================================== */

const productImages = document.querySelectorAll('.product-img, .product-detail-img');

productImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', 'คลิกเพื่อดูรูปขนาดใหญ่');
    
    const openLightbox = () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.setAttribute('aria-label', 'ปิด');
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            z-index: 10001;
        `;
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        const closeLightbox = () => {
            document.body.style.overflow = '';
            lightbox.style.opacity = '0';
            setTimeout(() => {
                if (lightbox.parentNode) {
                    lightbox.parentNode.removeChild(lightbox);
                }
            }, 300);
        };
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === closeBtn) {
                closeLightbox();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        });
        
        trackEvent('Product', 'view_image', img.alt);
    };
    
    img.addEventListener('click', openLightbox);
    img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox();
        }
    });
});

/* ========================================
   TRACK BUTTON CLICKS (FOR ANALYTICS)
   ======================================== */

function trackEvent(category, action, label) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', action, {
            category: category,
            label: label
        });
    }
    
    // Console log for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('📊 Event Tracked:', { category, action, label });
    }
}

// Track CTA button clicks
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
ctaButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const buttonText = btn.textContent.trim();
        trackEvent('CTA', 'click', buttonText);
    });
});

// Track social media clicks
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.textContent.trim();
        trackEvent('Social', 'click', platform);
    });
});

/* ========================================
   DYNAMIC YEAR IN FOOTER
   ======================================== */

const yearElements = document.querySelectorAll('.current-year');
const currentYear = new Date().getFullYear();
yearElements.forEach(el => {
    el.textContent = currentYear;
});

/* ========================================
   FORM INPUT ENHANCEMENTS
   ======================================== */

const formInputs = document.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    // Real-time validation feedback
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#dc3545';
            input.setAttribute('aria-invalid', 'true');
        } else if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = '#dc3545';
                input.setAttribute('aria-invalid', 'true');
            }
        } else {
            input.style.borderColor = '';
            input.setAttribute('aria-invalid', 'false');
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(220, 53, 69)') {
            input.style.borderColor = '';
            input.setAttribute('aria-invalid', 'false');
        }
    });
    
    // Auto-format phone number
    if (input.type === 'tel') {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) value = value.slice(0, 10);
            
            if (value.length > 6) {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
            } else if (value.length > 3) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            }
            
            e.target.value = value;
        });
    }
});

/* ========================================
   PERFORMANCE MONITORING
   ======================================== */

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;
            
            // Track page load performance
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    'name': 'load',
                    'value': pageLoadTime,
                    'event_category': 'Performance'
                });
            }
            
            // Log performance metrics
            console.log('⚡ Performance Metrics:');
            console.log(`   Page Load Time: ${pageLoadTime}ms`);
            console.log(`   Connect Time: ${connectTime}ms`);
            console.log(`   Render Time: ${renderTime}ms`);
            
            // Send to analytics if page is slow
            if (pageLoadTime > 3000) {
                trackEvent('Performance', 'slow_page_load', pageLoadTime + 'ms');
            }
        }, 0);
    });
}

/* ========================================
   KEYBOARD ACCESSIBILITY IMPROVEMENTS
   ======================================== */

// Make all interactive elements keyboard accessible
document.querySelectorAll('.value-card, .benefit-card, .testimonial-card').forEach(card => {
    card.setAttribute('tabindex', '0');
});

/* ========================================
   CONSOLE BRANDING
   ======================================== */

console.log(
    '%c🌿 i-Clean - Organic Nature 100%',
    'color: #4A7C4E; font-size: 20px; font-weight: bold; padding: 10px;'
);
console.log(
    '%cผลิตภัณฑ์ Organic 100% ปลอดภัย ไม่กัดมือ รักษ์โลก',
    'color: #F9DB6D; font-size: 14px; padding: 5px;'
);
console.log(
    '%cสนใจร่วมเป็นตัวแทนจำหน่าย ติดต่อ Line: @i_clean หรือ โทร 064-283-3336',
    'color: #5B9BD5; font-size: 12px; padding: 5px;'
);
console.log(
    '%c💻 Website: https://i-clean.vercel.app',
    'color: #8B7355; font-size: 12px; padding: 5px;'
);

/* ========================================
   ERROR HANDLING
   ======================================== */

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
    trackEvent('Error', 'javascript_error', e.message);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    trackEvent('Error', 'promise_rejection', e.reason.toString());
});

/* ========================================
   ONLINE/OFFLINE DETECTION
   ======================================== */

window.addEventListener('online', () => {
    showNotification('✅ เชื่อมต่ออินเทอร์เน็ตแล้ว', 'success');
});

window.addEventListener('offline', () => {
    showNotification('⚠️ ไม่มีการเชื่อมต่ออินเทอร์เน็ต', 'warning');
});

/* ========================================
   PAGE VISIBILITY API - TRACK ENGAGEMENT
   ======================================== */

let startTime = Date.now();
let totalTimeOnPage = 0;

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        totalTimeOnPage += Date.now() - startTime;
        trackEvent('Engagement', 'page_hide', Math.round(totalTimeOnPage / 1000) + 's');
    } else {
        startTime = Date.now();
    }
});

// Track time on page before leaving
window.addEventListener('beforeunload', () => {
    totalTimeOnPage += Date.now() - startTime;
    const timeInSeconds = Math.round(totalTimeOnPage / 1000);
    
    if (timeInSeconds > 10) { // Only track if user spent more than 10 seconds
        trackEvent('Engagement', 'time_on_page', timeInSeconds + 's');
    }
});

/* ========================================
   COPY TO CLIPBOARD FUNCTION
   ======================================== */

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('✓ คัดลอกแล้ว!', 'success');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('✓ คัดลอกแล้ว!', 'success');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        textArea.remove();
    }
}

// Add click-to-copy for contact info
document.querySelectorAll('.footer-col a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const phoneNumber = link.textContent;
            copyToClipboard(phoneNumber);
        }
    });
});

/* ========================================
   LOADING STATE COMPLETE
   ======================================== */

window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Track page view
    trackEvent('Page', 'view', window.location.pathname);
    
    // Log to console
    console.log('✅ Page fully loaded and ready!');
});

/* ========================================
   SERVICE WORKER REGISTRATION (PWA)
   ======================================== */

// Uncomment to enable PWA functionality
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered:', registration);
                trackEvent('PWA', 'service_worker_registered', 'success');
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
                trackEvent('PWA', 'service_worker_failed', error.toString());
            });
    });
}
*/

/* ========================================
   ADD TO HOME SCREEN PROMPT (PWA)
   ======================================== */

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button or banner
    console.log('💡 App can be installed');
    trackEvent('PWA', 'install_prompt_shown', '');
});

window.addEventListener('appinstalled', () => {
    console.log('✅ App installed successfully');
    trackEvent('PWA', 'app_installed', 'success');
    deferredPrompt = null;
});

/* ========================================
   ANIMATION CSS INJECTION
   ======================================== */

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px) translateX(-50%);
        }
        to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
        }
    }
    
    .notification {
        animation: slideUp 0.3s ease;
    }
`;
document.head.appendChild(style);

// Carousel JS with Full Debug
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Carousel Debug Started ===');  // Debug: ดูใน Console
    
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const container = document.querySelector('.carousel-slides');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    console.log(`Found: ${totalSlides} slides, ${indicators.length} indicators`);  // ควร = 6
    
    if (!container) {
        console.error('Error: .carousel-slides not found!');
        return;
    }
    
    function showSlide(index) {
        if (index >= totalSlides) currentSlide = 0;
        if (index < 0) currentSlide = totalSlides - 1;
        
        container.style.transform = `translateX(${-currentSlide * 100}%)`;
        
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        console.log(`Slide changed to ${currentSlide}`);  // Debug
    }
    
    // Arrows
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide++;
            showSlide(currentSlide);
            console.log('Next clicked');
        });
        console.log('Next button ready');
    } else {
        console.error('Error: .carousel-next not found!');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide--;
            showSlide(currentSlide);
            console.log('Prev clicked');
        });
        console.log('Prev button ready');
    } else {
        console.error('Error: .carousel-prev not found!');
    }
    
    // Indicators - THIS IS THE KEY FIX
    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
                console.log(`Indicator ${index} clicked!`);  // Debug: ดูตรงนี้!
            });
        });
        console.log('All indicators ready');
    } else {
        console.error('Error: No .indicator found!');
    }
    
    // Lightbox (click รูปขยาย)
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img) {
            img.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox active';
                lightbox.innerHTML = `
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                `;
                document.body.appendChild(lightbox);
                lightbox.querySelector('.lightbox-close').addEventListener('click', function() { lightbox.remove(); });
                lightbox.addEventListener('click', function(e) { if (e.target === lightbox) lightbox.remove(); });
                console.log('Lightbox opened');
            });
        }
    });
    
    // Init
    showSlide(0);
    setInterval(() => { currentSlide++; showSlide(currentSlide); }, 3000);
    console.log('=== Carousel Debug Ended ===');
});

/* ========================================
   SCROLL PROGRESS INDICATOR (OPTIONAL)
   ======================================== */

// Uncomment to enable scroll progress bar
/*
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #4A7C4E, #F9DB6D);
    z-index: 10001;
    transition: width 0.2s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', throttle(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = progress + '%';
}, 50));
*/

/* ========================================
   INITIALIZATION COMPLETE
   ======================================== */

console.log('🚀 All scripts loaded and initialized successfully!');
console.log('📱 Website is fully responsive and optimized');
console.log('♿ Accessibility features enabled');
console.log('📊 Analytics tracking active');
console.log('⚡ Performance monitoring active'); // <--- โค้ดที่ผิดพลาดเริ่มต้นที่นี่

// Add fade-in animation to elements
const animateElements = document.querySelectorAll('.value-card, .benefit-card, .testimonial-card, .step-card, .trust-box, .cert-badge');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el); // <-- ต้องเป็นแบบนี้
}); // <-- ปิด forEach อย่างถูกต้อง