// ============================================
// GALLERY NAVIGATION - Gestion des galeries d'images dans les modals
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Fonction pour initialiser une galerie
    function initGallery(galleryElement) {
        const images = galleryElement.querySelectorAll('.gallery-image');
        const prevBtn = galleryElement.querySelector('.prev-btn');
        const nextBtn = galleryElement.querySelector('.next-btn');
        const indicators = galleryElement.querySelectorAll('.indicator');
        
        if (!images.length || images.length <= 1) return;
        
        let currentIndex = 0;
        
        // Fonction pour afficher une image spécifique
        function showImage(index) {
            // Gérer les limites circulaires
            if (index < 0) {
                index = images.length - 1;
            } else if (index >= images.length) {
                index = 0;
            }
            
            // Retirer la classe active de toutes les images
            images.forEach(img => {
                img.classList.remove('active');
            });
            
            // Retirer la classe active de tous les indicateurs
            indicators.forEach(ind => {
                ind.classList.remove('active');
            });
            
            // Ajouter la classe active à l'image courante
            images[index].classList.add('active');
            
            // Ajouter la classe active à l'indicateur correspondant
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
            
            currentIndex = index;
        }
        
        // Événement pour le bouton précédent
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showImage(currentIndex - 1);
            });
        }
        
        // Événement pour le bouton suivant
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showImage(currentIndex + 1);
            });
        }
        
        // Événements pour les indicateurs
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showImage(index);
            });
        });
        
        // Navigation au clavier
        document.addEventListener('keydown', function(e) {
            // Vérifier si le modal est ouvert
            const modal = galleryElement.closest('.portfolio-modal');
            if (modal && modal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    showImage(currentIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    showImage(currentIndex + 1);
                }
            }
        });
        
        // Swipe sur mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const galleryContainer = galleryElement.querySelector('.gallery-images');
        
        if (galleryContainer) {
            galleryContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            galleryContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50; // Distance minimale pour considérer un swipe
                
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swipe vers la gauche - image suivante
                    showImage(currentIndex + 1);
                }
                
                if (touchEndX > touchStartX + swipeThreshold) {
                    // Swipe vers la droite - image précédente
                    showImage(currentIndex - 1);
                }
            }
        }
        
        // Auto-play optionnel (commenté par défaut)
        /*
        let autoPlayInterval;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(function() {
                showImage(currentIndex + 1);
            }, 5000); // Change d'image toutes les 5 secondes
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // Démarrer l'auto-play
        startAutoPlay();
        
        // Arrêter l'auto-play au survol
        galleryElement.addEventListener('mouseenter', stopAutoPlay);
        galleryElement.addEventListener('mouseleave', startAutoPlay);
        */
    }
    
    // Initialiser toutes les galeries présentes sur la page
    function initAllGalleries() {
        const galleries = document.querySelectorAll('.modal-gallery');
        galleries.forEach(gallery => {
            initGallery(gallery);
        });
    }
    
    // Initialiser les galeries au chargement
    initAllGalleries();
    
    // Réinitialiser les galeries lorsqu'un modal est ouvert
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Attendre que le modal soit ouvert
            setTimeout(initAllGalleries, 300);
        });
    });
    
    console.log('✓ Gallery navigation initialized');
});
