document.addEventListener('DOMContentLoaded', function() {
    // Créer un conteneur de popup pour l'image
    const popupContainer = document.createElement('div');
    popupContainer.className = 'image-popup-container';
    document.body.appendChild(popupContainer);
    
    // Ajouter le contenu du popup
    popupContainer.innerHTML = `
        <div class="image-popup-content">
            <img class="popup-image" src="" alt="Image agrandie">
            <div class="close-popup">&times;</div>
        </div>
    `;
    
    // Récupérer les éléments
    const popupContent = popupContainer.querySelector('.image-popup-content');
    const popupImage = popupContainer.querySelector('.popup-image');
    const closeButton = popupContainer.querySelector('.close-popup');
    
    // Fonction pour initialiser les images cliquables
    function initializeZoomableImages() {
        const modalImages = document.querySelectorAll('.modal-img img');
        
        modalImages.forEach(img => {
            // Vérifier si l'image a déjà été initialisée
            if (!img.dataset.zoomInitialized) {
                img.dataset.zoomInitialized = 'true';
                img.style.cursor = 'pointer';
                img.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Définir la source de l'image agrandie
                    popupImage.src = this.src;
                    popupImage.alt = this.alt;
                    
                    // Afficher le popup
                    popupContainer.style.display = 'flex';
                    
                    // Animation d'entrée
                    setTimeout(() => {
                        popupContainer.classList.add('active');
                        popupContent.classList.add('active');
                    }, 10);
                    
                    return false;
                });
            }
        });
    }
    
    // Initialiser les images au chargement
    initializeZoomableImages();
    
    // Réinitialiser les images lorsqu'un modal est ouvert
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Attendre que le modal soit ouvert
            setTimeout(initializeZoomableImages, 500);
        });
    });
    
    // Fermer le popup en cliquant sur le bouton de fermeture
    closeButton.addEventListener('click', function() {
        popupContainer.classList.remove('active');
        popupContent.classList.remove('active');
        
        // Cacher le popup après l'animation
        setTimeout(() => {
            popupContainer.style.display = 'none';
        }, 300);
    });
    
    // Fermer le popup en cliquant en dehors de l'image
    popupContainer.addEventListener('click', function(e) {
        if (e.target === popupContainer) {
            popupContainer.classList.remove('active');
            popupContent.classList.remove('active');
            
            // Cacher le popup après l'animation
            setTimeout(() => {
                popupContainer.style.display = 'none';
            }, 300);
        }
    });
    
    // Fermer le popup avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
            popupContainer.classList.remove('active');
            popupContent.classList.remove('active');
            
            // Cacher le popup après l'animation
            setTimeout(() => {
                popupContainer.style.display = 'none';
            }, 300);
        }
    });
});
