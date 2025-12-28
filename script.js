
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Theme Toggle - Updated for dark mode default
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    
    // Set initial icon - dark mode is default, so show sun
    themeIcon.className = 'fas fa-sun';
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Update icon based on current mode
        if (document.body.classList.contains('light-mode')) {
            // Now in light mode, show moon
            themeIcon.className = 'fas fa-moon';
        } else {
            // Now in dark mode, show sun
            themeIcon.className = 'fas fa-sun';
        }
        
        // Save preference
        localStorage.setItem('theme', 
            document.body.classList.contains('light-mode') ? 'light' : 'dark'
        );
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.className = 'fas fa-moon';
    }
}

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks && menuToggle && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Scroll Progress
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            // Prevent NaN errors
            if (windowHeight > 0) {
                const scrolled = (window.scrollY / windowHeight) * 100;
                scrollProgress.style.width = scrolled + '%';
            }
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-category, .project-card, .timeline-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Generate random floating elements
    function createFloatingElements() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        // Clear existing floating elements (if any)
        const existingElements = heroSection.querySelectorAll('.floating-element:not([style*="top: 20%"])');
        existingElements.forEach(el => el.remove());
        
        const colors = ['#6366f1', '#f59e0b', '#10b981', '#8b5cf6'];
        
        for (let i = 0; i < 6; i++) { // Reduced from 8 to 6 for better performance
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            const size = Math.random() * 60 + 30; // Reduced max size
            const color = colors[Math.floor(Math.random() * colors.length)];
            const delay = Math.random() * 5;
            const duration = Math.random() * 4 + 6;
            
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.background = `linear-gradient(135deg, ${color}, transparent)`;
            element.style.left = `${Math.random() * 90 + 5}%`; // Keep within bounds
            element.style.top = `${Math.random() * 90 + 5}%`; // Keep within bounds
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
            
            heroSection.appendChild(element);
        }
    }

    createFloatingElements();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Optimize project images
    function optimizeProjectImages() {
        const projectImages = document.querySelectorAll('.project-image img');
        
        projectImages.forEach(img => {
            // Check if image is already loaded
            if (img.complete) {
                handleImageLoad(img);
            } else {
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                // When image loads
                img.addEventListener('load', () => handleImageLoad(img));
                
                // If image fails to load
                img.addEventListener('error', () => handleImageError(img));
            }
        });
    }
    
    function handleImageLoad(img) {
        img.style.opacity = '1';
        
        // Check image dimensions
        if (img.naturalWidth > img.naturalHeight * 1.5) {
            // Wide image
            img.parentElement.classList.add('wide-image');
        } else if (img.naturalHeight > img.naturalWidth * 1.5) {
            // Tall image
            img.parentElement.classList.add('tall-image');
        }
    }
    
    function handleImageError(img) {
        console.warn('Image failed to load:', img.src);
        img.style.display = 'none';
        
        // Create fallback only if it doesn't exist
        if (!img.parentElement.querySelector('.image-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = `
                <i class="fas fa-image"></i>
                <span>Project Preview</span>
            `;
            img.parentElement.appendChild(fallback);
        }
    }
    
    // Initialize image optimization
    optimizeProjectImages();
    
    // Add CSS for image fallback
    const fallbackStyle = document.createElement('style');
    fallbackStyle.textContent = `
        .image-fallback {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            font-size: 1.5rem;
            text-align: center;
            padding: 1rem;
        }
        
        .image-fallback i {
            font-size: 3rem;
            margin-bottom: 1rem;
            opacity: 0.8;
        }
        
        .image-fallback span {
            font-size: 1rem;
            font-weight: 500;
        }
    `;
    document.head.appendChild(fallbackStyle);

    // Add loading animation for page
    function hideLoading() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    }

    // Hide loader when everything is loaded
    window.addEventListener('load', hideLoading);
    
    // Fallback: hide loader after 3 seconds max
    setTimeout(hideLoading, 3000);

    // Optional: Add page loader HTML (if you want)
    // Uncomment if you want a loading screen
    /*
    const loaderHTML = `
        <div class="page-loader">
            <div class="loader-spinner"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    */
});