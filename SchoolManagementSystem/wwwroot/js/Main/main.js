document.addEventListener('DOMContentLoaded', () => {
    // Helper function for password toggle
    const setupPasswordToggle = (toggleId, inputId) => {
        const toggleBtn = document.getElementById(toggleId);
        const inputField = document.getElementById(inputId);

        if (toggleBtn && inputField) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const type = inputField.type === 'password' ? 'text' : 'password';
                inputField.type = type;
                toggleBtn.classList.toggle('fa-eye-slash');
                toggleBtn.classList.toggle('fa-eye');
            });
        }
    };

    // Setup toggles for Login page
    setupPasswordToggle('togglePassword', 'password');

    // Setup toggles for Reset Password page
    setupPasswordToggle('toggleNewPassword', 'newPassword');
    setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

    // Hide validation errors on page load
    const errorMessages = document.querySelectorAll('.text-danger');
    errorMessages.forEach(msg => {
        msg.style.display = 'none';
    });

    // Show validation errors only after form submission attempt
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('.form-input');
            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                const errorSpan = formGroup?.querySelector('.text-danger');
                
                // Show error if input is invalid
                if (errorSpan && !input.value.trim()) {
                    errorSpan.style.display = 'block';
                    input.classList.add('input-validation-error');
                    formGroup.classList.add('has-error');
                } else if (errorSpan) {
                    errorSpan.style.display = 'none';
                    input.classList.remove('input-validation-error');
                    formGroup.classList.remove('has-error');
                }
            });
        });

        // Clear error when user starts typing
        const inputs = loginForm.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                const errorSpan = formGroup?.querySelector('.text-danger');
                
                if (this.value.trim()) {
                    if (errorSpan) {
                        errorSpan.style.display = 'none';
                    }
                    this.classList.remove('input-validation-error');
                    formGroup.classList.remove('has-error');
                }
            });

            input.addEventListener('change', function() {
                const formGroup = this.closest('.form-group');
                const errorSpan = formGroup?.querySelector('.text-danger');
                
                if (this.value.trim()) {
                    if (errorSpan) {
                        errorSpan.style.display = 'none';
                    }
                    this.classList.remove('input-validation-error');
                    formGroup.classList.remove('has-error');
                }
            });
        });
    }
});