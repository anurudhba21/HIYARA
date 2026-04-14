/* HIYARA Interactions */

document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Carousel Logic
    const carouselDots = document.getElementById('carouselDots');

    if (productGrid && prevBtn && nextBtn && carouselDots) {
        const scrollAmount = 340; // Card width + gap
        const products = productGrid.querySelectorAll('.product-card');
        
        // Generate dots
        products.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                productGrid.scrollTo({
                    left: products[i].offsetLeft - productGrid.offsetLeft,
                    behavior: 'smooth'
                });
            });
            carouselDots.appendChild(dot);
        });

        const dots = carouselDots.querySelectorAll('.dot');

        // Update active dot on scroll
        productGrid.addEventListener('scroll', () => {
            const scrollLeft = productGrid.scrollLeft;
            const cardWidth = products[0].offsetWidth;
            const activeIndex = Math.round(scrollLeft / cardWidth);
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeIndex);
            });
        });

        prevBtn.addEventListener('click', () => {
            productGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            productGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scroll for Anchor Links (Backup for older browsers, though CSS handles most)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
