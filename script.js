// Global variables
let currentTestimonial = 0;
let testimonialInterval;
let studentsCount = 0;
let programType = 0;
let mentorshipPercentage = 0;
let isStatsAnimated = false;

// Testimonials data
const testimonials = [
    {
        quote: "The mentors actually care and guide you in a way that makes a difference. Now that they're launching B-Hub, I'm honestly excited. Knowing the team behind B-Hub, I know they'll deliver. It's definitely something I'd recommend to anyone serious about management.",
        author: "Ankur Tadipatri",
        role: "IIM Bodh Gaya, Batch 2027",
        rating: 5,
        image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
        quote: "As a student, I learned immensely—not just academically, but also in terms of personal growth. What made the experience stand out was the direct mentorship from IIM graduates. If the same team is now launching B-HUB, I can confidently say it's going to be a top-notch initiative. From my experience at Think Plus, I believe B-HUB will offer a comprehensive program where CAT preparation, profile building, and personal mentoring begin from day one.",
        author: "Nithin Kusumanchi",
        role: "NALSAR, 2nd Year",
        rating: 5,
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
        quote: "From preparing for IPMAT myself to now mentoring students at ThinkPlus, one thing I can say is that B-Hub is one of the most thoughtful and game-changing programs I've seen for students who want to pursue management in future. It's built by IIM graduates so the credibility bar cannot go higher I believe.",
        author: "Nihira Prakash",
        role: "PGP Year 1, IIM Rohtak",
        rating: 5,
        image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    setupEventListeners();
    initializeTestimonials();
    setupIntersectionObserver();
    setupSmoothScrolling();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);

    // Modal form submission
    const modalForm = document.getElementById('modalForm');
    if (modalForm) {
        modalForm.addEventListener('submit', handleFormSubmission);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Handle header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = 70;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize testimonials
function initializeTestimonials() {
    updateTestimonial();
    createTestimonialDots();
    startTestimonialAutoplay();
}

// Update testimonial display
function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    
    // Update stars
    const starsContainer = document.getElementById('testimonialStars');
    if (starsContainer) {
        starsContainer.innerHTML = '';
        for (let i = 0; i < testimonial.rating; i++) {
            const star = document.createElement('i');
            star.className = 'fas fa-star';
            starsContainer.appendChild(star);
        }
    }
    
    // Update content
    const quote = document.getElementById('testimonialQuote');
    const author = document.getElementById('testimonialAuthor');
    const role = document.getElementById('testimonialRole');
    const image = document.getElementById('testimonialImage');
    
    if (quote) quote.textContent = `"${testimonial.quote}"`;
    if (author) author.textContent = testimonial.author;
    if (role) role.textContent = testimonial.role;
    if (image) {
        image.src = testimonial.image;
        image.alt = testimonial.author;
    }
    
    // Update dots
    updateTestimonialDots();
}

// Create testimonial dots
function createTestimonialDots() {
    const dotsContainer = document.getElementById('testimonialDots');
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                updateTestimonial();
                restartTestimonialAutoplay();
            });
            dotsContainer.appendChild(dot);
        });
    }
}

// Update testimonial dots
function updateTestimonialDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentTestimonial) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Start testimonial autoplay
function startTestimonialAutoplay() {
    testimonialInterval = setInterval(() => {
        nextTestimonial();
    }, 5000);
}

// Restart testimonial autoplay
function restartTestimonialAutoplay() {
    clearInterval(testimonialInterval);
    startTestimonialAutoplay();
}

// Next testimonial
function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
}

// Previous testimonial
function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
    restartTestimonialAutoplay();
}

// Setup intersection observer for animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'heroStats' && !isStatsAnimated) {
                animateStats();
                isStatsAnimated = true;
            }
        });
    }, { threshold: 0.3 });
    
    const heroStats = document.getElementById('heroStats');
    if (heroStats) {
        observer.observe(heroStats);
    }
}

// Animate hero stats
function animateStats() {
    // Animate students count to 40
    let count = 0;
    const studentsInterval = setInterval(() => {
        count += 2;
        const studentsElement = document.getElementById('studentsCount');
        if (studentsElement) studentsElement.textContent = count;
        if (count >= 40) {
            if (studentsElement) studentsElement.textContent = '40';
            clearInterval(studentsInterval);
        }
    }, 50);

    // Animate program type to 3
    let program = 0;
    const programInterval = setInterval(() => {
        program += 1;
        const programElement = document.getElementById('programType');
        if (programElement) programElement.textContent = program;
        if (program >= 3) {
            if (programElement) programElement.textContent = '3';
            clearInterval(programInterval);
        }
    }, 200);

    // Animate mentorship to 100
    let mentorship = 0;
    const mentorshipInterval = setInterval(() => {
        mentorship += 5;
        const mentorshipElement = document.getElementById('mentorshipPercentage');
        if (mentorshipElement) mentorshipElement.textContent = mentorship;
        if (mentorship >= 100) {
            if (mentorshipElement) mentorshipElement.textContent = '100%';
            clearInterval(mentorshipInterval);
        }
    }, 30);
}

// FAQ functionality
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqItem = faqItems[index];
    
    if (faqItem) {
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }
}

// Modal functionality
function openModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const submitText = document.getElementById('submitText');
    const messageLabel = document.getElementById('messageLabel');
    const messageField = document.getElementById('message');
    const dateGroup = document.getElementById('dateGroup');
    const timeGroup = document.getElementById('timeGroup');
    
    if (!modal) return;
    
    // Reset form
    const form = document.getElementById('modalForm');
    if (form) form.reset();
    
    // Hide success message
    const successDiv = document.getElementById('modalSuccess');
    if (successDiv) successDiv.style.display = 'none';
    
    // Show form
    if (form) form.style.display = 'flex';
    
    // Configure modal based on type
    switch (type) {
        case 'bat':
            if (modalTitle) modalTitle.textContent = 'Register for BAT';
            if (modalSubtitle) modalSubtitle.textContent = 'B-Hub Admission Test Registration';
            if (submitText) submitText.textContent = 'Register Now';
            if (messageLabel) messageLabel.innerHTML = '<i class="fas fa-comment"></i> Additional Information';
            if (messageField) {
                messageField.placeholder = 'Any specific questions about the test?';
                messageField.required = false;
            }
            if (dateGroup) dateGroup.style.display = 'none';
            if (timeGroup) timeGroup.style.display = 'none';
            break;
            
        case 'counselling':
            if (modalTitle) modalTitle.textContent = 'Free Counselling Session';
            if (modalSubtitle) modalSubtitle.textContent = 'Book your consultation with our IIM mentors';
            if (submitText) submitText.textContent = 'Book Session';
            if (messageLabel) messageLabel.innerHTML = '<i class="fas fa-comment"></i> Message *';
            if (messageField) {
                messageField.placeholder = 'What would you like to discuss?';
                messageField.required = true;
            }
            if (dateGroup) dateGroup.style.display = 'flex';
            if (timeGroup) timeGroup.style.display = 'flex';
            break;
            
        case 'contact':
            if (modalTitle) modalTitle.textContent = 'Contact Us';
            if (modalSubtitle) modalSubtitle.textContent = 'Get in touch with our team';
            if (submitText) submitText.textContent = 'Send Message';
            if (messageLabel) messageLabel.innerHTML = '<i class="fas fa-comment"></i> Message *';
            if (messageField) {
                messageField.placeholder = 'How can we help you?';
                messageField.required = true;
            }
            if (dateGroup) dateGroup.style.display = 'none';
            if (timeGroup) timeGroup.style.display = 'none';
            break;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle form submission
async function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    const form = document.getElementById('modalForm');
    const successDiv = document.getElementById('modalSuccess');
    const successMessage = document.getElementById('successMessage');
    
    // Show loading state
    if (submitText) submitText.style.display = 'none';
    if (loadingSpinner) loadingSpinner.style.display = 'block';
    if (submitBtn) submitBtn.disabled = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Hide loading state
    if (submitText) submitText.style.display = 'block';
    if (loadingSpinner) loadingSpinner.style.display = 'none';
    if (submitBtn) submitBtn.disabled = false;
    
    // Show success message
    if (form) form.style.display = 'none';
    if (successDiv) successDiv.style.display = 'block';
    
    // Set success message based on form type
    const modalTitle = document.getElementById('modalTitle').textContent;
    let message = 'Form submitted successfully!';
    
    if (modalTitle.includes('BAT')) {
        message = 'Registration successful! We\'ll contact you with test details.';
    } else if (modalTitle.includes('Counselling')) {
        message = 'Session booked! Our team will contact you shortly.';
    } else if (modalTitle.includes('Contact')) {
        message = 'Message sent! We\'ll get back to you soon.';
    }
    
    if (successMessage) successMessage.textContent = message;
    
    // Auto close modal after 3 seconds
    setTimeout(() => {
        closeModal();
        // Reset form for next use
        if (form) {
            form.reset();
            form.style.display = 'flex';
        }
        if (successDiv) successDiv.style.display = 'none';
    }, 3000);
}

// Utility functions
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

// Add smooth scroll behavior for better UX
window.addEventListener('scroll', debounce(() => {
    // Add any scroll-based animations here
}, 100));

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (window.innerWidth > 768) {
        if (mobileNav) mobileNav.classList.remove('active');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    }
}, 250));

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal');
        if (modal && modal.classList.contains('active')) {
            closeModal();
        }
    }
    
    // Navigate testimonials with arrow keys
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        ...testimonials.map(t => t.image),
        'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop',
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop',
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize image preloading
setTimeout(preloadImages, 1000);

// Add loading animation for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Failed to load image:', e.target.src);
    }
}, true);

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}