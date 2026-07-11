"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       AOS INIT
    ========================== */
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    /* =========================
       GSAP HELPERS
    ========================== */
    const hasGSAP = typeof gsap !== "undefined";
    const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

    if (hasGSAP && hasScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    /* =========================
       HEADER SCROLL STATE
    ========================== */
    const header = document.querySelector(".header");

    const toggleHeader = () => {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 60);
    };

    toggleHeader();
    window.addEventListener("scroll", toggleHeader);

    /* =========================
       SCROLL PROGRESS BAR
    ========================== */
    const progressBar = document.querySelector(".scroll-progress");

    const updateProgressBar = () => {
        if (!progressBar) return;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        progressBar.style.width = `${progress}%`;
    };

    updateProgressBar();
    window.addEventListener("scroll", updateProgressBar);

    /* =========================
       PAGE LOADER
    ========================== */
    const pageLoader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {
        if (pageLoader) {
            pageLoader.classList.add("hide");
            setTimeout(() => {
                pageLoader.style.display = "none";
            }, 450);
        }
    });

    /* =========================
       GSAP HERO ANIMATIONS
    ========================== */
    if (hasGSAP) {
        gsap.from(".hero-badge", {
            opacity: 0,
            y: 25,
            duration: 0.8,
            delay: 0.1
        });

        gsap.from(".hero-small", {
            opacity: 0,
            y: 40,
            duration: 1,
            delay: 0.15
        });

        gsap.from(".hero-title", {
            opacity: 0,
            y: 60,
            delay: 0.35,
            duration: 1
        });

        gsap.from(".hero-text", {
            opacity: 0,
            y: 60,
            delay: 0.6,
            duration: 1
        });

        gsap.from(".hero-buttons", {
            opacity: 0,
            y: 60,
            delay: 0.85,
            duration: 1
        });

        gsap.from(".hero-trust .trust-pill", {
            opacity: 0,
            y: 50,
            stagger: 0.12,
            delay: 1.05,
            duration: 0.8
        });

        gsap.from(".info-card", {
            opacity: 0,
            y: 80,
            stagger: 0.2,
            delay: 1.1,
            duration: 1
        });
    }

    /* =========================
       SCROLL REVEAL ANIMATIONS
       Works with ScrollTrigger if loaded,
       otherwise falls back to simple AOS / no-error behavior.
    ========================== */
    const animateSectionCards = (selector, vars, trigger) => {

    if (!hasGSAP) return;

    gsap.fromTo(
        selector,
        {
            opacity: 0,
            y: vars.y || 60
        },
        {
            opacity: 1,
            y: 0,
            duration: vars.duration || 1,
            stagger: vars.stagger || 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: trigger,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
                 invalidateOnRefresh: true
            }
        }
    );

};

    animateSectionCards(".service-card", {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.12
    }, ".services-section");

    animateSectionCards(".why-card", {
        opacity: 0,
        y: 70,
        duration: 1,
        stagger: 0.12
    }, ".why-us-section");

    animateSectionCards(".industry-card", {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.12
    }, ".industries-section");

    animateSectionCards(".process-card", {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.12
    }, ".process-section");

    animateSectionCards(".cta-box", {
        opacity: 0,
        scale: 0.95,
        duration: 1
    }, ".cta-section");

    animateSectionCards(".mission-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.12
    }, ".mission-section");

    animateSectionCards(".timeline-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.12
    }, ".timeline-section");

    animateSectionCards(".blog-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.12
    }, ".blog-section");

    /* =========================
       COUNTERS
    ========================== */
    const counters = document.querySelectorAll(".counter");
    let countersStarted = false;

    const runCounters = () => {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute("data-target") || "0", 10);
            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 120));

            const update = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    counter.innerText = current;
                    setTimeout(update, 20);
                } else {
                    counter.innerText = `${target}+`;
                }
            };

            update();
        });
    };

    const counterSection = document.querySelector(".counter-section");

    if (counterSection && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    runCounters();
                    obs.disconnect();
                }
            });
        }, { threshold: 0.35 });

        observer.observe(counterSection);
    } else if (counters.length) {
        runCounters();
    }

    /* =========================
       TESTIMONIAL SWIPER
    ========================== */
    if (typeof Swiper !== "undefined" && document.querySelector(".testimonialSwiper")) {
        new Swiper(".testimonialSwiper", {
            loop: true,
            spaceBetween: 24,
            grabCursor: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 3
                }
            }
        });
    }

    /* =========================
       SMOOTH NAV CLOSE ON CLICK
    ========================== */
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link, .dropdown-item");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    /* =========================
       ACTIVE NAV LINK
    ========================== */
    const setActiveNav = () => {
        const currentPath = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
            const href = link.getAttribute("href");
            if (!href) return;
            if (href === currentPath) {
                link.classList.add("active");
            } else if (currentPath === "" && href === "index.html") {
                link.classList.add("active");
            }
        });
    };

    setActiveNav();

    /* =========================
       SCROLL TOP BUTTON
    ========================== */
    const scrollBtn = document.querySelector(".scroll-top");

    const toggleScrollButton = () => {
        if (!scrollBtn) return;
        scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    };

    toggleScrollButton();
    window.addEventListener("scroll", toggleScrollButton);

    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =========================
       SMOOTH INTERNAL ANCHORS
    ========================== */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            e.preventDefault();
            targetEl.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
});
