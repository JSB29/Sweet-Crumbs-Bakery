// Form Validation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize form validation for all forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        if (form.id !== 'newsletter-form') { // Newsletter form has its own handling in main.js
            form.addEventListener('submit', validateForm);
        }
    });
    
    // Generic form validation function
    function validateForm(e) {
        const form = e.target;
        let isValid = true;
        
        // Find all required inputs
        const requiredInputs = form.querySelectorAll('[required]');
        
        // Reset previous error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        // Validate each required input
        requiredInputs.forEach(input => {
            input.classList.remove('error');
            
            // Check if empty
            if (!input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
                return;
            }
            
            // Validate by input type
            switch (input.type) {
                case 'email':
                    if (!isValidEmail(input.value)) {
                        showError(input, 'Please enter a valid email address');
                        isValid = false;
                    }
                    break;
                    
                case 'tel':
                    if (!isValidPhone(input.value)) {
                        showError(input, 'Please enter a valid phone number');
                        isValid = false;
                    }
                    break;
                    
                case 'textarea':
                    if (input.value.trim().length < 10) {
                        showError(input, 'Please enter at least 10 characters');
                        isValid = false;
                    }
                    break;
            }
        });
        
        // Validate custom order form if present
        if (form.id === 'custom-order-form') {
            const dateInput = form.querySelector('#delivery-date');
            
            if (dateInput && dateInput.value) {
                const selectedDate = new Date(dateInput.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                // Ensure date is at least 2 days in the future
                const minDate = new Date(today);
                minDate.setDate(today.getDate() + 2);
                
                if (selectedDate < minDate) {
                    showError(dateInput, 'Please select a date at least 2 days from today');
                    isValid = false;
                }
            }
        }
        
        // If form is not valid, prevent submission
        if (!isValid) {
            e.preventDefault();
            
            // Scroll to the first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        } else {
            // For demo purposes, prevent actual form submission and show success message
            if (!form.getAttribute('data-no-prevent')) {
                e.preventDefault();
                
                // Show success message
                const formContainer = form.closest('.form-container') || form.parentNode;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your form has been submitted successfully! We will contact you soon.';
                
                // Clear form
                form.reset();
                
                // Add success message
                formContainer.appendChild(successMessage);
                
                // Remove success message after some time
                setTimeout(() => {
                    successMessage.classList.add('fade-out');
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 5000);
            }
        }
    }
    
    // Helper function to show error messages
    function showError(input, message) {
        // Add error class to input
        input.classList.add('error');
        
        // Create error message element
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        
        // Insert error message after input
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
    
    // Email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Phone validation (simple check for numeric characters)
    function isValidPhone(phone) {
        // Allow for various phone formats
        return /^[\d\s\-\(\)\+\.]{10,15}$/.test(phone.trim());
    }
    
    // Input event listeners for real-time validation
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateOnBlur(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error when user starts typing
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMessage = this.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
            }
        });
    });
    
    // Validate single input on blur
    function validateOnBlur(input) {
        // Skip if not required
        if (!input.hasAttribute('required')) {
            return;
        }
        
        // Remove any existing error message
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }
        input.classList.remove('error');
        
        // Check if empty
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            return;
        }
        
        // Validate by input type
        switch (input.type) {
            case 'email':
                if (!isValidEmail(input.value)) {
                    showError(input, 'Please enter a valid email address');
                }
                break;
                
            case 'tel':
                if (!isValidPhone(input.value)) {
                    showError(input, 'Please enter a valid phone number');
                }
                break;
                
            case 'textarea':
                if (input.value.trim().length < 10) {
                    showError(input, 'Please enter at least 10 characters');
                }
                break;
        }
    }
});
