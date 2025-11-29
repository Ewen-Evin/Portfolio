// Gestion du formulaire de contact pour index.html
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactFormIndex');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('formMessage');
            
            // Change le texte du bouton pendant l'envoi
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Envoi en cours...';
            submitBtn.disabled = true;
            formMessage.style.display = 'block';
            formMessage.className = 'form-message';
            
            // Récupération des données du formulaire
            const formData = new FormData(this);
            
            // Envoi des données via fetch
            fetch('./src/php/envoyer_mail.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                if (data.includes('Succès')) {
                    formMessage.innerHTML = 'Message envoyé avec succès ! Je vous répondrai rapidement.';
                    formMessage.classList.add('success');
                    contactForm.reset();
                } else {
                    throw new Error(data);
                }
            })
            .catch(error => {
                formMessage.innerHTML = 'Une erreur s\'est produite. Veuillez réessayer ou me contacter directement à contact@ewenevin.fr';
                formMessage.classList.add('error');
                console.error('Erreur:', error);
            })
            .finally(() => {
                // Réinitialise le bouton
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Cache le message après 5 secondes
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
            });
        });
    }
});

