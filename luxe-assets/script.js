// Product Carousel Management
const carouselStates = {
    trending: { currentIndex: 0, itemsPerView: 4 },
    new: { currentIndex: 0, itemsPerView: 4 }
};

// Initialize carousels
function initCarousels() {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
}

// Update items per view based on screen size
function updateItemsPerView() {
    const width = window.innerWidth;
    let itemsPerView;
    
    if (width < 768) {
        itemsPerView = 1;
    } else if (width < 1024) {
        itemsPerView = 2;
    } else if (width < 1280) {
        itemsPerView = 3;
    } else {
        itemsPerView = 4;
    }
    
    carouselStates.trending.itemsPerView = itemsPerView;
    carouselStates.new.itemsPerView = itemsPerView;
    
    updateCarousel('trending');
    updateCarousel('new');
}

// Navigate to previous product
function prevProduct(carouselId) {
    const state = carouselStates[carouselId];
    if (state.currentIndex > 0) {
        state.currentIndex--;
        updateCarousel(carouselId);
    }
}

// Navigate to next product
function nextProduct(carouselId) {
    const carousel = document.getElementById(`${carouselId}-carousel`);
    const track = carousel.querySelector('.product-track');
    const totalProducts = track.children.length;
    const state = carouselStates[carouselId];
    const maxIndex = Math.max(0, totalProducts - state.itemsPerView);
    
    if (state.currentIndex < maxIndex) {
        state.currentIndex++;
        updateCarousel(carouselId);
    }
}

// Update carousel position
function updateCarousel(carouselId) {
    const carousel = document.getElementById(`${carouselId}-carousel`);
    const track = carousel.querySelector('.product-track');
    const state = carouselStates[carouselId];
    
    const translateX = -(state.currentIndex * (100 / state.itemsPerView));
    track.style.transform = `translateX(${translateX}%)`;
}

// Smooth scroll to section
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initCarousels();
    
    // Add animation on scroll for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.features-section, .categories-section, .products-section, .why-us-section, .stores-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    }
});