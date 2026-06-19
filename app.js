document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            // Toggle hamburger icon between menu and close
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (isMenuOpen) {
                    icon.setAttribute('data-lucide', 'x');
                    gsap.to(mobileMenu, {
                        opacity: 1,
                        y: 0,
                        pointerEvents: 'auto',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                    gsap.to(mobileMenu, {
                        opacity: 0,
                        y: -20,
                        pointerEvents: 'none',
                        duration: 0.3,
                        ease: 'power2.in'
                    });
                }
                lucide.createIcons(); // refresh icons
            }
        });

        // Close mobile menu on clicking any navigation link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
                gsap.to(mobileMenu, {
                    opacity: 0,
                    y: -20,
                    pointerEvents: 'none',
                    duration: 0.2
                });
            });
        });
    }

    // Header scroll background effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Animate items matching filter
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        display: 'block',
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(item, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3,
                        display: 'none',
                        ease: 'power2.in'
                    });
                }
            });
        });
    });

    // Contact Form Submission (Mock)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            // Simulating loading state
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent Successfully!';
                submitBtn.classList.remove('bg-gradient-to-r', 'from-brand-accent', 'to-brand-violet');
                submitBtn.classList.add('bg-emerald-500');
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.classList.add('bg-gradient-to-r', 'from-brand-accent', 'to-brand-violet');
                    submitBtn.classList.remove('bg-emerald-500');
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // GSAP ScrollTrigger Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const heroTimeline = gsap.timeline();
    heroTimeline.from('#hero h1', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power4.out'
    }).from('#hero p', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6').from('#hero .flex-col, #hero .grid', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.6').from('#hero img, #hero .absolute', {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out'
    }, '-=1.2');

    // Reveal animations for general sections
    const sections = ['#about', '#gallery', '#services', '#pricing', '#contact'];
    
    sections.forEach(secId => {
        const element = document.querySelector(secId);
        if (element) {
            gsap.from(element.querySelectorAll('h2, p.text-slate-400, span.text-brand-accent'), {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });

            // Specific grid/card reveals inside sections
            const cards = element.querySelectorAll('.service-card, .portfolio-item, .price-card');
            if (cards.length > 0) {
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: cards[0],
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            }
        }
    });
});
