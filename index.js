
        document.addEventListener('DOMContentLoaded', function() {
            const consentCheckbox = document.getElementById('consentCheckbox');
            const agreeBtn = document.getElementById('agreeBtn');
            const disagreeBtn = document.getElementById('disagreeBtn');
            const formLink = document.getElementById('formLink');
            const confirmationModal = document.getElementById('confirmationModal');
            const confirmRedirect = document.getElementById('confirmRedirect');
            const cancelRedirect = document.getElementById('cancelRedirect');
            
            // Enable/disable agree button based on checkbox
            consentCheckbox.addEventListener('change', function() {
                agreeBtn.disabled = !this.checked;
                
                // Visual effect for the consent section
                const consentSection = document.querySelector('.consent-section');
                if (this.checked) {
                    consentSection.style.backgroundColor = '#e8f4fc';
                    consentSection.style.borderColor = '#3498db';
                    consentSection.style.boxShadow = '0 0 0 2px rgba(52, 152, 219, 0.2)';
                } else {
                    consentSection.style.backgroundColor = '#f0f7ff';
                    consentSection.style.borderColor = '#d0e4ff';
                    consentSection.style.boxShadow = 'none';
                }
            });
            
            // Agree button shows confirmation modal
            agreeBtn.addEventListener('click', function() {
                if (!consentCheckbox.checked) return;
                
                // Show confirmation modal
                confirmationModal.style.display = 'flex';
            });
            
            // Disagree button functionality
            disagreeBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to cancel? You will not be able to use our connection services without consent.')) {
                    // Reset checkbox
                    consentCheckbox.checked = false;
                    consentCheckbox.dispatchEvent(new Event('change'));
                    
                    alert('You have chosen not to proceed. If you change your mind, please return to this page and check the consent box.');
                }
            });
            
            // Confirm redirect to Google Form
            confirmRedirect.addEventListener('click', function() {
                // Close modal
                confirmationModal.style.display = 'none';
                
                // Visual feedback on the agree button
                agreeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
                agreeBtn.style.backgroundColor = '#2ecc71';
                
                // Open Google Form in new tab after a brief delay
                setTimeout(() => {
                    window.open('https://forms.gle/RHTZBuJmQLE6yqgGA', '_blank');
                    
                    // Reset button after a moment
                    setTimeout(() => {
                        agreeBtn.innerHTML = '<i class="fas fa-check-circle"></i> I Agree & Want to Proceed';
                        agreeBtn.style.backgroundColor = '';
                    }, 1000);
                }, 800);
            });
            
            // Cancel redirect
            cancelRedirect.addEventListener('click', function() {
                confirmationModal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            confirmationModal.addEventListener('click', function(e) {
                if (e.target === confirmationModal) {
                    confirmationModal.style.display = 'none';
                }
            });
            
            // Form link with consent check
            formLink.addEventListener('click', function(e) {
                if (!consentCheckbox.checked) {
                    e.preventDefault();
                    
                    // Highlight consent section to draw attention
                    const consentSection = document.querySelector('.consent-section');
                    consentSection.style.backgroundColor = '#ffeaea';
                    consentSection.style.borderColor = '#e74c3c';
                    
                    // Shake animation
                    consentSection.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        consentSection.style.animation = '';
                    }, 500);
                    
                    alert('Please check the consent box above before accessing the form.');
                    
                    // Scroll to consent section
                    consentSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Focus on checkbox
                    consentCheckbox.focus();
                }
            });
            
            // Add shake animation for CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
            
            // Add a visual indicator when form link is hovered
            formLink.addEventListener('mouseenter', function() {
                if (consentCheckbox.checked) {
                    this.style.transform = 'translateY(-3px)';
                    this.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.15)';
                }
            });
            
            formLink.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            });
        });