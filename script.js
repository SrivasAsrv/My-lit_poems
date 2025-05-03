document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Mobile menu toggle with GSAP
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav');
    const body = document.body;
    let menuTl = gsap.timeline({ paused: true });

    if (menuToggle && navMenu) {
        // Create menu animation timeline with smoother transitions
        menuTl.to(navMenu, {
            right: 0,
            duration: 0.4,
            ease: "power3.out"
        })
        .to('.menu-toggle i', {
            rotate: 180,
            duration: 0.4,
            ease: "power3.out"
        }, 0)
        .to('body.menu-open::after', {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        }, 0);

        // Enhanced click handling with touch support
        menuToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (navMenu.classList.contains('active')) {
                menuTl.reverse();
                body.classList.remove('menu-open');
                body.style.overflow = '';
                menuToggle.setAttribute('aria-expanded', 'false');
            } else {
                menuTl.play();
                body.classList.add('menu-open');
                body.style.overflow = 'hidden';
                menuToggle.setAttribute('aria-expanded', 'true');
            }
            
            navMenu.classList.toggle('active');
        });

        // Improved keyboard navigation
        menuToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                menuToggle.click();
            }
        });

        // Enhanced link interactions
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            // Add hover effect
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            // Improved click handling
            link.addEventListener('click', function(event) {
                if (navMenu.classList.contains('active')) {
                    menuTl.reverse();
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                    body.style.overflow = '';
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Add keyboard navigation
            link.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    link.click();
                }
            });
        });

        // Enhanced outside click detection
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggler = menuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggler && navMenu.classList.contains('active')) {
                menuTl.reverse();
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Improved header scroll effect
    const header = document.querySelector('header');
    if (header) {
        gsap.to(header, {
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "max",
                onUpdate: (self) => {
                    if (self.direction === 1) { // scrolling down
                        gsap.to(header, {
                            y: -10,
                            opacity: 0.8,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    } else { // scrolling up
                        gsap.to(header, {
                            y: 0,
                            opacity: 1,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                }
            }
        });
    }

    // Create and style back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'backToTopBtn';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    // Enhanced back to top button
    if (backToTopButton) {
        // Add hover effect
        backToTopButton.addEventListener('mouseenter', () => {
            gsap.to(backToTopButton, {
                scale: 1.1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        backToTopButton.addEventListener('mouseleave', () => {
            gsap.to(backToTopButton, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        // Show/hide based on scroll position
        gsap.to(backToTopButton, {
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "max",
                onUpdate: (self) => {
                    if (self.progress > 0.2) {
                        gsap.to(backToTopButton, {
                            opacity: 0.8,
                            y: 0,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    } else {
                        gsap.to(backToTopButton, {
                            opacity: 0,
                            y: 10,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                }
            }
        });

        // Smooth scroll to top
        backToTopButton.addEventListener("click", () => {
            gsap.to(window, {
                scrollTo: { y: 0 },
                duration: 1,
                ease: "power3.inOut"
            });
        });

        // Add keyboard support
        backToTopButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                backToTopButton.click();
            }
        });
    }

    // Enhanced scroll down arrow with mobile support
    const scrollDownArrow = document.getElementById('scrollDown');
    if (scrollDownArrow) {
        // Smoother animation
        gsap.to(scrollDownArrow, {
            y: 15,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: "power1.inOut"
        });

        // Add hover effect
        scrollDownArrow.addEventListener('mouseenter', () => {
            gsap.to(scrollDownArrow, {
                scale: 1.1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        scrollDownArrow.addEventListener('mouseleave', () => {
            gsap.to(scrollDownArrow, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        // Enhanced click/touch handling
        const handleScrollDown = () => {
            const mainContent = document.getElementById('mainContent');
            if (mainContent) {
                gsap.to(window, {
                    scrollTo: { y: mainContent.offsetTop },
                    duration: 1.2,
                    ease: "power3.inOut"
                });
            }
        };

        // Add both click and touch events
        scrollDownArrow.addEventListener('click', handleScrollDown);
        scrollDownArrow.addEventListener('touchend', (e) => {
            e.preventDefault(); // Prevent double-tap zoom
            handleScrollDown();
        });

        // Add touch feedback
        scrollDownArrow.addEventListener('touchstart', () => {
            gsap.to(scrollDownArrow, {
                scale: 1.1,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        scrollDownArrow.addEventListener('touchend', () => {
            gsap.to(scrollDownArrow, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    }

    // Enhanced reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // Enhanced article interactions
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        // Add hover effect
        article.addEventListener('mouseenter', () => {
            gsap.to(article, {
                x: 5,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        article.addEventListener('mouseleave', () => {
            gsap.to(article, {
                x: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Add click effect
        article.addEventListener('click', () => {
            gsap.to(article, {
                scale: 0.98,
                duration: 0.1,
                ease: "power2.in",
                yoyo: true,
                repeat: 1
            });
        });
    });
});
