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
            alert('Your message has been sent (Demo Mode).');
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
            const section = heading.closest('.section');
            if (!section) return; // Skip if no section parent

            const scrollY = window.scrollY;
            const sectionTop = section.offsetTop;
            const scrollFactor = 0.1; 

            // Only apply parallax if heading is within viewport or near
            if (scrollY + window.innerHeight * 0.8 > sectionTop && scrollY < sectionTop + section.offsetHeight + window.innerHeight * 0.2) {
                const offset = (scrollY - sectionTop) * scrollFactor;
                heading.style.setProperty('--scroll-y', `${offset}px`);
            } else {
                heading.style.setProperty('--scroll-y', `0px`); // Reset when out of view
            }
        });
    });

    // --- VPN Modal Functionality (VLESS Tabs and Copy) ---
    const vpnModal = document.getElementById('vpn-modal');
    const openVpnModalBtn = document.querySelector('.open-vpn-modal');
    const vpnCloseBtn = document.querySelector('.vpn-close-btn');
    const tabButtons = document.querySelectorAll('#vpn-modal .tab-button');
    const tabContents = document.querySelectorAll('#vpn-modal .tab-content');


    // Open VPN Modal
    if (openVpnModalBtn) {
        openVpnModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            vpnModal.style.display = 'block';
        });
    }

    // Close VPN Modal Button
    if (vpnCloseBtn) {
        vpnCloseBtn.addEventListener('click', () => {
            vpnModal.style.display = 'none';
        });
    }

    // Close VPN Modal on Outside Click
    if (vpnModal) {
        window.addEventListener('click', (event) => {
            if (event.target == vpnModal) {
                vpnModal.style.display = 'none';
            }
        });
    }

    // VPN Modal Tab Switching Logic
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Deactivate all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // --- VLESS File Copy Logic for VPN Modal ---
    const vlessContainer = document.querySelector('#vpn-modal');
    if (vlessContainer) {
        vlessContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                const configInput = e.target.closest('.vless-file-item').querySelector('.vless-config');
                
                // Select the text field
                configInput.select();
                configInput.setSelectionRange(0, 99999); // For mobile devices

                // Copy the text inside the text field
                navigator.clipboard.writeText(configInput.value).then(() => {
                    // Change button text temporarily
                    const originalText = e.target.textContent;
                    e.target.textContent = 'Copied!';
                    e.target.style.backgroundColor = '#4CAF50';
                    setTimeout(() => {
                        e.target.textContent = originalText;
                        e.target.style.backgroundColor = ''; // Revert to original CSS
                    }, 1500);
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                    alert('Copy failed! Please manually copy the VLESS configuration.');
                });
            }
        });
    }
    // --- End VPN Modal Functionality ---


    // --- Facebook Security Guide Modal Functionality (REPLACED Quiz Logic) ---
    const fbGuideModal = document.getElementById('fb-guide-modal');
    const openFbGuideModalBtn = document.querySelector('.open-fb-guide-modal');
    const fbGuideCloseBtn = document.querySelector('.fb-guide-close-btn');

    // Open FB Guide Modal
    if (openFbGuideModalBtn) {
        openFbGuideModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fbGuideModal.style.display = 'block';
        });
    }

    // Close FB Guide Modal Button
    if (fbGuideCloseBtn) {
        fbGuideCloseBtn.addEventListener('click', () => {
            fbGuideModal.style.display = 'none';
        });
    }

    // Close FB Guide Modal on Outside Click
    if (fbGuideModal) {
        window.addEventListener('click', (event) => {
            if (event.target == fbGuideModal) {
                fbGuideModal.style.display = 'none';
            }
        });
    }
    // --- End Facebook Security Guide Modal Functionality ---


    // --- Facebook Monetization Video Modal Functionality (Updated for Google Drive Embed) ---
    const monetizationVideoModal = document.getElementById('monetization-video-modal');
    const openMonetizationVideoModalBtn = document.querySelector('.open-monetization-video-modal');
    const monetizationVideoCloseBtn = document.querySelector('.monetization-video-close-btn');
    const videoIframe = monetizationVideoModal.querySelector('iframe'); 

    // Open Monetization Video Modal
    if (openMonetizationVideoModalBtn) {
        openMonetizationVideoModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            monetizationVideoModal.style.display = 'block';
        });
    }

    // Close Monetization Video Modal Button
    if (monetizationVideoCloseBtn) {
        monetizationVideoCloseBtn.addEventListener('click', () => {
            monetizationVideoModal.style.display = 'none';
            // Stop/Pause video manually by reloading the iframe (Drive video does not have reliable pause API)
            if (videoIframe) {
                const currentSrc = videoIframe.src;
                videoIframe.src = currentSrc; // Reloading the source stops playback
            }
        });
    }

    // Close Monetization Video Modal on Outside Click
    if (monetizationVideoModal) {
        window.addEventListener('click', (event) => {
            if (event.target == monetizationVideoModal) {
                monetizationVideoModal.style.display = 'none';
                // Stop/Pause video manually by reloading the iframe
                if (videoIframe) {
                    const currentSrc = videoIframe.src;
                    videoIframe.src = currentSrc; // Reloading the source stops playback
                }
            }
        });
    }
    // --- End Facebook Monetization Video Modal Functionality ---


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
        // Only close if clicked on the overlay itself or the elements it contains (safeguard)
        if (e.target.id === 'lightbox' || e.target === lightboxImg || e.target === lightboxCaption) { 
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
