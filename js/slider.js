// Testimonial Slider Javascript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    initTestimonialSlider();
    
    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial-item');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (!testimonials.length || !dots.length) return;
        
        let currentIndex = 0;
        let interval;
        
        // Initialize slider
        showTestimonial(currentIndex);
        startAutoSlide();
        
        // Set up event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', showPreviousTestimonial);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', showNextTestimonial);
        }
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
                resetAutoSlide();
            });
        });
        
        // Stop auto-sliding when user interacts with testimonials
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', stopAutoSlide);
            testimonialSlider.addEventListener('mouseleave', startAutoSlide);
        }
        
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the selected testimonial
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Update current index
            currentIndex = index;
        }
        
        function showNextTestimonial() {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= testimonials.length) {
                nextIndex = 0;
            }
            showTestimonial(nextIndex);
            resetAutoSlide();
        }
        
        function showPreviousTestimonial() {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = testimonials.length - 1;
            }
            showTestimonial(prevIndex);
            resetAutoSlide();
        }
        
        function startAutoSlide() {
            stopAutoSlide(); // Clear any existing interval
            interval = setInterval(showNextTestimonial, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(interval);
        }
        
        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }
    }
});
