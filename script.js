document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
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
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past 100px - slightly hide header
            header.style.transform = 'translateY(-10px)';
            header.style.opacity = '0.8';
        } else {
            // Scrolling up or near top - show header
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
        
        lastScrollTop = scrollTop;
    });
    
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

    // Initialize articles for animation
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.style.opacity = 0;
        article.style.transform = 'translateX(20px)';
        article.style.transition = 'all 0.5s ease-out';
    });
    
    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
