// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize all components
    initNavigation();
    initScrollAnimation();
    initNewsletterForm();
    
    // Add class to header on scroll
    function initNavigation() {
        const header = document.querySelector('.header');
        const menuToggle = document.querySelector('.menu-toggle');
        const navList = document.querySelector('.nav-list');
        
        // Toggle mobile menu
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navList.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });
        }
        
        // Close menu when clicking menu items on mobile
        const navItems = document.querySelectorAll('.nav-list a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    navList.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
        
        // Add box shadow to header on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Animate elements on scroll
    function initScrollAnimation() {
        const animatedElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            if (element) {
                observer.observe(element);
            }
        });
    }
    
    // Handle newsletter form submission
    function initNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        const message = document.getElementById('newsletter-message');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                
                // Simple validation
                if (!isValidEmail(email)) {
                    showMessage('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Simulate form submission (would be replaced with actual API call)
                simulateFormSubmission(email);
            });
        }
        
        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
        
        function showMessage(text, type = 'success') {
            if (message) {
                message.textContent = text;
                message.className = 'form-message ' + type;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    message.textContent = '';
                    message.className = 'form-message';
                }, 5000);
            }
        }
        
        function simulateFormSubmission(email) {
            // Show loading state
            const button = form.querySelector('button');
            const originalText = button.textContent;
            button.disabled = true;
            button.textContent = 'Subscribing...';
            
            // Simulate API call delay
            setTimeout(() => {
                showMessage('Thank you for subscribing! You\'ll receive our updates soon.');
                form.reset();
                
                // Reset button
                button.disabled = false;
                button.textContent = originalText;
            }, 1500);
        }
    }
    
    // Add any additional script initializations here
});
