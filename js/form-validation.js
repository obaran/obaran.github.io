document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Stocker la référence à l'événement de soumission existant
        const originalSubmitEvent = contactForm.onsubmit;
        
        // Ajouter un écouteur d'événement pour la soumission du formulaire
        contactForm.addEventListener('submit', function(e) {
            // Empêcher la soumission par défaut
            e.preventDefault();
            
            // Réinitialiser les états d'erreur
            resetFormErrors();
            
            // Valider tous les champs
            let isValid = validateForm();
            
            // Si le formulaire est valide, continuer avec la soumission normale
            if (isValid) {
                // Utiliser l'API Formspree pour soumettre le formulaire
                const formData = new FormData(contactForm);
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        window.location.href = contactForm.querySelector('input[name="_next"]').value;
                    } else {
                        throw new Error('Erreur lors de l\'envoi du formulaire');
                    }
                }).catch(error => {
                    console.error('Erreur:', error);
                });
            }
        });
        
        // Ajouter des écouteurs d'événements pour la validation en temps réel
        const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Si le champ était en erreur et que l'utilisateur commence à taper, enlever l'erreur
                if (this.classList.contains('error')) {
                    const formGroup = this.closest('.form-group');
                    formGroup.classList.remove('error');
                    this.classList.remove('error');
                }
            });
        });
    }
    
    // Fonction pour valider le formulaire entier
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Fonction pour valider un champ individuel
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        let isValid = true;
        
        // Vérifier si le champ est vide
        if (!field.value.trim()) {
            showError(formGroup, field);
            isValid = false;
        } 
        // Validation spécifique pour l'email
        else if (field.type === 'email' && !isValidEmail(field.value)) {
            showError(formGroup, field);
            isValid = false;
        }
        
        return isValid;
    }
    
    // Fonction pour afficher une erreur
    function showError(formGroup, field) {
        formGroup.classList.add('error');
        field.classList.add('error');
    }
    
    // Fonction pour réinitialiser toutes les erreurs
    function resetFormErrors() {
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            const input = group.querySelector('input, textarea');
            if (input) {
                input.classList.remove('error');
            }
        });
    }
    
    // Fonction pour valider un email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
