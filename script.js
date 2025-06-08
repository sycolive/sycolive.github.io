document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Custom Mouse Trail Effect (Blue Circles)
    const mouseTrailContainer = document.getElementById('mouse-trail-container');

    document.addEventListener('mousemove', (e) => {
        const circle = document.createElement('div');
        circle.classList.add('mouse-trail-circle');
        circle.style.left = `${e.clientX}px`;
        circle.style.top = `${e.clientY}px`;
        mouseTrailContainer.appendChild(circle);

        // Remove the circle after its animation finishes
        circle.addEventListener('animationend', () => {
            circle.remove();
        });
    });

    // Animate sections on scroll (Intersection Observer)
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null, // viewport as the root
        rootMargin: '0px',
        threshold: 0.2 // 20% of the section must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated if you only want it to animate once
                // observer.unobserve(entry.target);
            } else {
                 // Optional: Remove 'visible' class if element scrolls out of view
                 // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Service Item Details Toggle on Click (Accordion) ---
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        const serviceHeader = item.querySelector('.service-header');
        serviceHeader.addEventListener('click', () => {
            // Close all other open service items
            serviceItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle the clicked service item
            item.classList.toggle('active');
        });
    });

    // Contact Form Submission (Simple console log, for real use, integrate backend)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert;
            console.log('Form submitted!');
            this.reset();
        });
    }

    // Load TikTok embeds dynamically if needed (TikTok's own script usually handles this)
    const tiktokEmbedScript = document.createElement('script');
    tiktokEmbedScript.src = 'https://www.tiktok.com/embed.js';
    tiktokEmbedScript.async = true;
    document.body.appendChild(tiktokEmbedScript);


    // Heading Parallax Effect
    const animatedHeadings = document.querySelectorAll('.animated-heading');

    window.addEventListener('scroll', () => {
        animatedHeadings.forEach(heading => {
            const scrollY = window.scrollY;
            const sectionTop = heading.closest('.section').offsetTop;
            const scrollFactor = 0.1; // Adjust for stronger/weaker effect (reduced for smoother effect)

            // Only apply parallax if heading is within viewport or near
            // Added some buffer for entry/exit
            if (scrollY + window.innerHeight * 0.8 > sectionTop && scrollY < sectionTop + heading.offsetHeight + window.innerHeight * 0.2) {
                const offset = (scrollY - sectionTop) * scrollFactor;
                heading.style.setProperty('--scroll-y', `${offset}px`);
            } else {
                heading.style.setProperty('--scroll-y', `0px`); // Reset when out of view
            }
        });
    });

    // Lightbox Functionality for Gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = item.dataset.src; // Use data-src for full image
            lightboxCaption.innerHTML = item.dataset.caption; // Use data-caption for caption
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxImg || e.target === lightboxCaption) { // Close if clicked outside the image or on image/caption
            lightbox.style.display = 'none';
        }
    });

    // Particles.js configuration (Increased particles and brighter colors)
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 120, 
                "density": {
                    "enable": true,
                    "value_area": 900 
                }
            },
            "color": {
                "value": ["#00eaff", "#0072ff", "#ff00e0", "#ffea00"] 
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.6,
                "random": true, 
                "anim": {
                    "enable": true, 
                    "speed": 1,
                    "opacity_min": 0.2,
                    "sync": false
                }
            },
            "size": {
                "value": 4, 
                "random": true,
                "anim": {
                    "enable": true, 
                    "speed": 10,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00aaff", 
                "opacity": 0.5,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 4, 
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 200,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
});