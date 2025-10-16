/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
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
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

/* ========================================
   SMOOTH SCROLL WITH OFFSET FOR FIXED NAVBAR
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   FAQ ACCORDION
   ======================================== */

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

/* ========================================
   SCROLL TO TOP BUTTON
   ======================================== */

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ========================================
   NAVBAR SHADOW ON SCROLL
   ======================================== */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

/* ========================================
   WHOLESALE FORM SUBMISSION
   ======================================== */

const wholesaleForm = document.getElementById('wholesaleForm');

wholesaleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(wholesaleForm);
    const data = Object.fromEntries(formData.entries());
    
    // Show success message
    alert('🎉 ขอบคุณที่สนใจ!\n\nเราได้รับข้อมูลของคุณเรียบร้อยแล้ว\nทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง\n\nข้อมูลที่ได้รับ:\nชื่อ: ' + data.fullname + '\nอีเมล: ' + data.email + '\nโทรศัพท์: ' + data.phone + '\nประเภทธุรกิจ: ' + data.business_type);
    
    // Reset form
    wholesaleForm.reset();
    
    // In production, you would send this data to your server
    // Example:
     fetch('https://api-iclean.vercel.app/api/wholesale-inquiry', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
     })
     .then(response => response.json())
     .then(result => {
         console.log('Success:', result);
     })
     .catch(error => {
         console.error('Error:', error);
     });
});

/* ========================================
   NEWSLETTER FORM SUBMISSION
   ======================================== */

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        alert('✅ สมัครรับข่าวสารสำเร็จ!\n\nเราจะส่งโปรโมชั่นและเคล็ดลับดีๆ ไปยัง\n' + email + '\n\nขอบคุณที่ไว้วางใจ i-Clean! 🌿');
        
        form.reset();
        
        // In production, send to server
         fetch('https://api-iclean.vercel.app/api/newsletter-subscribe', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email: email })
         });
    });
});

/* ========================================
   INTERSECTION OBSERVER - FADE IN ANIMATION
   ======================================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to elements
const animateElements = document.querySelectorAll('.value-card, .benefit-card, .testimonial-card, .step-card, .trust-box');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

/* ========================================
   COUNTER ANIMATION (FOR STATS - IF NEEDED)
   ======================================== */

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Usage example (can be activated if you add stat counters):
// const statCounters = document.querySelectorAll('.stat-counter');
// const statsObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const target = parseInt(entry.target.getAttribute('data-target'));
//             animateCounter(entry.target, target);
//             statsObserver.unobserve(entry.target);
//         }
//     });
// });
// statCounters.forEach(counter => statsObserver.observe(counter));

/* ========================================
   PRODUCT IMAGE LIGHTBOX (OPTIONAL)
   ======================================== */

const productImages = document.querySelectorAll('.product-img, .product-detail-img');

productImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        // Create lightbox
        const lightbox = document.createElement('div');
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
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 12px;
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    });
});

/* ========================================
   COPY TO CLIPBOARD (FOR CONTACT INFO)
   ======================================== */

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary notification
        const notification = document.createElement('div');
        notification.textContent = '✓ คัดลอกแล้ว!';
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #4A7C4E;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
    });
}

/* ========================================
   DYNAMIC YEAR IN FOOTER
   ======================================== */

const yearElements = document.querySelectorAll('.current-year');
const currentYear = new Date().getFullYear();
yearElements.forEach(el => {
    el.textContent = currentYear;
});

// Update copyright year if present
const copyrightText = document.querySelector('.footer-bottom p');
if (copyrightText) {
    copyrightText.innerHTML = copyrightText.innerHTML.replace('2024', currentYear);
}

/* ========================================
   LOADING ANIMATION (OPTIONAL)
   ======================================== */

window.addEventListener('load', () => {
    // Hide loading screen if exists
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 300);
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

/* ========================================
   KEYBOARD ACCESSIBILITY IMPROVEMENTS
   ======================================== */

// Make FAQ keyboard accessible
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    
    question.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
            const isActive = item.classList.contains('active');
            question.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        }
    });
});

/* ========================================
   LAZY LOADING IMAGES (PERFORMANCE)
   ======================================== */

const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

/* ========================================
   FORM VALIDATION ENHANCEMENT
   ======================================== */

const formInputs = document.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    // Real-time validation feedback
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(220, 53, 69)') {
            input.style.borderColor = '';
        }
    });
});

/* ========================================
   TRACK BUTTON CLICKS (FOR ANALYTICS)
   ======================================== */

function trackEvent(category, action, label) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', action, {
            category: category,
            label: label
        });
    }
    
    // Console log for development
    console.log('Event Tracked:', { category, action, label });
}

// Track CTA button clicks
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
ctaButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const buttonText = btn.textContent.trim();
        trackEvent('CTA', 'click', buttonText);
    });
});

// Track wholesale form submission
wholesaleForm.addEventListener('submit', () => {
    trackEvent('Form', 'submit', 'Wholesale Inquiry');
});

/* ========================================
   CONSOLE BRANDING (FUN EASTER EGG)
   ======================================== */

console.log(
    '%c🌿 i-Clean - Organic Dish Washing Liquid',
    'color: #4A7C4E; font-size: 20px; font-weight: bold; padding: 10px;'
);
console.log(
    '%cผลิตภัณฑ์น้ำยาล้างจาน Organic 100% ปลอดภัย ไม่กัดมือ รักษ์โลก',
    'color: #F9DB6D; font-size: 14px; padding: 5px;'
);
console.log(
    '%cสนใจร่วมเป็นตัวแทนจำหน่าย ติดต่อ: info@i-clean.co.th',
    'color: #5B9BD5; font-size: 12px; padding: 5px;'
);

/* ========================================
   PERFORMANCE MONITORING
   ======================================== */

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
        }, 0);
    });
}

/* ========================================
   SERVICE WORKER REGISTRATION (PWA - OPTIONAL)
   ======================================== */

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => console.log('SW registered:', registration))
//             .catch(error => console.log('SW registration failed:', error));
//     });
// }
