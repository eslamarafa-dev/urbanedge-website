/**
         * URBANEDGE - Main JavaScript
         * Clean, Modern & Performance-Optimized
         */

        const App = {
            // State
            state: {
                isLoaded: false,
                currentTestimonial: 0,
                testimonialsCount: 3
            },

            // Initialize
            init() {
                this.preloader();
                this.header();
                this.navigation();
                this.particles();
                this.scrollAnimations();
                this.testimonials();
                this.forms();
                this.scrollTop();
                this.readingProgress();
                console.log('✅ URBANEDGE initialized successfully');
            },

            // Reading Progress Bar
            readingProgress() {
                const bar = document.getElementById('progressBar');
                window.addEventListener('scroll', () => {
                    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (winScroll / height) * 100;
                    bar.style.width = scrolled + "%";
                });
            },

            // Preloader
            preloader() {
                const preloader = document.getElementById('preloader');
                
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        preloader.classList.add('hidden');
                        this.state.isLoaded = true;
                    }, 800);
                });
            },

            // Header scroll effect
            header() {
                const header = document.getElementById('header');
                
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            },

            // Mobile navigation
            navigation() {
                const menuToggle = document.getElementById('menuToggle');
                const navList = document.getElementById('navList');
                const navOverlay = document.getElementById('navOverlay');
                const navLinks = document.querySelectorAll('.nav-link');

                // Toggle menu
                const toggleMenu = () => {
                    menuToggle.classList.toggle('active');
                    navList.classList.toggle('active');
                    navOverlay.classList.toggle('active');
                    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
                };

                menuToggle.addEventListener('click', toggleMenu);
                navOverlay.addEventListener('click', toggleMenu);

                // Close menu on link click
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        menuToggle.classList.remove('active');
                        navList.classList.remove('active');
                        navOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });

                // Active link on scroll
                const sections = document.querySelectorAll('section[id]');
                
                window.addEventListener('scroll', () => {
                    let current = '';
                    
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop - 100;
                        const sectionHeight = section.offsetHeight;
                        
                        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                            current = section.getAttribute('id');
                        }
                    });

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${current}`) {
                            link.classList.add('active');
                        }
                    });
                });
            },

            // Hero particles
            particles() {
                const container = document.getElementById('heroParticles');
                const particleCount = 30;

                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.animationDelay = `${Math.random() * 15}s`;
                    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
                    container.appendChild(particle);
                }
            },

            // Scroll animations
            scrollAnimations() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                            observer.unobserve(entry.target);
                        }
                    });
                }, observerOptions);

                document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
                    observer.observe(el);
                });
            },

            // Testimonials slider
            testimonials() {
                const track = document.getElementById('testimonialTrack');
                const dots = document.querySelectorAll('.testimonial-dot');
                const prevBtn = document.getElementById('prevTestimonial');
                const nextBtn = document.getElementById('nextTestimonial');
                let autoPlayInterval;

                const goToSlide = (index) => {
                    this.state.currentTestimonial = index;
                    track.style.transform = `translateX(-${index * 100}%)`;
                    
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === index);
                    });
                };

                const nextSlide = () => {
                    const next = (this.state.currentTestimonial + 1) % this.state.testimonialsCount;
                    goToSlide(next);
                };

                const prevSlide = () => {
                    const prev = (this.state.currentTestimonial - 1 + this.state.testimonialsCount) % this.state.testimonialsCount;
                    goToSlide(prev);
                };

                // Click events
                prevBtn.addEventListener('click', () => {
                    prevSlide();
                    this.resetAutoPlay();
                });

                nextBtn.addEventListener('click', () => {
                    nextSlide();
                    this.resetAutoPlay();
                });

                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        goToSlide(index);
                        this.resetAutoPlay();
                    });
                });

                // Auto play
                const startAutoPlay = () => {
                    autoPlayInterval = setInterval(nextSlide, 5000);
                };

                this.resetAutoPlay = () => {
                    clearInterval(autoPlayInterval);
                    startAutoPlay();
                };

                startAutoPlay();
            },

            // Forms
            forms() {
                // Contact form
                const contactForm = document.getElementById('contactForm');
                
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    let isValid = true;
                    const fields = ['name', 'email', 'subject', 'message'];
                    
                    fields.forEach(fieldId => {
                        const field = document.getElementById(fieldId);
                        const error = document.getElementById(`${fieldId}Error`);
                        const value = field.value.trim();
                        
                        if (!value) {
                            field.classList.add('error');
                            error.classList.add('show');
                            isValid = false;
                        } else {
                            field.classList.remove('error');
                            error.classList.remove('show');
                        }
                        
                        // Email validation
                        if (fieldId === 'email' && value) {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(value)) {
                                field.classList.add('error');
                                error.textContent = 'Please enter a valid email address';
                                error.classList.add('show');
                                isValid = false;
                            }
                        }
                    });

                    if (isValid) {
                        const btn = contactForm.querySelector('.form-submit');
                        const originalContent = btn.innerHTML;
                        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                        btn.disabled = true;

                        setTimeout(() => {
                            alert('Thank you for your message! We\'ll get back to you within 24 hours.');
                            contactForm.reset();
                            btn.innerHTML = originalContent;
                            btn.disabled = false;
                        }, 1500);
                    }
                });

                // Newsletter form
                const newsletterForm = document.getElementById('newsletterForm');
                
                newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Thank you for subscribing to our newsletter!');
                    newsletterForm.reset();
                });

                // Real-time validation
                document.querySelectorAll('.form-input').forEach(input => {
                    input.addEventListener('blur', () => {
                        input.classList.remove('error');
                        const error = document.getElementById(`${input.id}Error`);
                        if (error) error.classList.remove('show');
                    });
                });
            },

            // Scroll to top button
            scrollTop() {
                const btn = document.getElementById('scrollTop');
                
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 500) {
                        btn.classList.add('visible');
                    } else {
                        btn.classList.remove('visible');
                    }
                });

                btn.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        };

        // Initialize on DOM ready
        document.addEventListener('DOMContentLoaded', () => {
            App.init();
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
