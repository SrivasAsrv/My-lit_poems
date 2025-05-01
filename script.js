document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggler = menuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggler && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Debounce utility function ---
    function debounce(func, wait = 16) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // --- Header scroll effect & Back to Top Button ---
    const header = document.querySelector('header');
    const backToTopButton = document.getElementById("backToTopBtn");
    let lastScrollTop = 0;
    const scrollThreshold = 300; // Pixels to scroll before showing the button

    const handleScroll = () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Header effect
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-10px)';
                header.style.opacity = '0.8';
            } else {
                header.style.transform = 'translateY(0)';
                header.style.opacity = '1';
            }
        }

        // Back to Top button visibility
        if (backToTopButton) {
            if (scrollTop > scrollThreshold) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    // Debounced scroll handlers
    const debouncedHandleScroll = debounce(handleScroll, 30);

    // Back to Top button click event
    if (backToTopButton) {
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Fixed scroll down arrow functionality
    const scrollDownArrow = document.getElementById('scrollDown');
    
    if (scrollDownArrow) {
        scrollDownArrow.addEventListener('click', function() {
            const mainContent = document.getElementById('mainContent');
            if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback if main content element doesn't exist
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add animation to articles on scroll
    const animateOnScroll = function() {
        const articles = document.querySelectorAll('article');
        articles.forEach((article, index) => {
            const articlePosition = article.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (articlePosition < screenPosition) {
                setTimeout(() => {
                    article.style.opacity = 1;
                    article.style.transform = 'translateX(0)';
                }, index * 200); // Staggered animation
            }
        });
    };
    const debouncedAnimateOnScroll = debounce(animateOnScroll, 30);

    // Initialize articles for animation
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.style.opacity = 0;
        article.style.transform = 'translateX(20px)';
        article.style.transition = 'all 0.5s ease-out';
    });
    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    window.addEventListener('scroll', debouncedAnimateOnScroll, { passive: true });

    // Scroll reveal functionality
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    }

    // Initial check
    checkReveal();

    // Check on scroll
    window.addEventListener('scroll', checkReveal);
});
