document.addEventListener('DOMContentLoaded', function() {
    // Navigation sticky
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Menu mobile toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Navigation sticky au scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Mise à jour du lien actif au scroll
        updateActiveLink();
    });
    
    // Mise à jour du lien actif dans la navigation
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-per');
    
    skillBars.forEach(skill => {
        const percentage = skill.getAttribute('per');
        skill.style.width = '0%';
        
        setTimeout(() => {
            skill.style.width = percentage + '%';
        }, 500);
    });
    
    // Filtrage du portfolio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Gestion des modals du portfolio
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const modals = document.querySelectorAll('.portfolio-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        });
    });
    
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Animation d'apparition au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .skill');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Ne pas empêcher la soumission du formulaire car Formspree en a besoin
            // Mais ajouter une animation et un retour visuel
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;
            
            // Le reste du code est géré par le script dans index.html
        });
    }
    
    // Animation IA dans la section hero
    const createAIAnimation = () => {
        const aiContainer = document.querySelector('.ai-animation');
        if (!aiContainer) return;
        
        // Cette fonction pourrait être remplacée par une animation SVG ou Canvas plus complexe
        // Pour l'instant, nous utiliserons une animation CSS simple
        aiContainer.innerHTML = `
            <div class="ai-particles"></div>
            <div class="ai-brain"></div>
        `;
        
        // Ajouter des styles spécifiques à l'animation
        const style = document.createElement('style');
        style.textContent = `
            .ai-particles {
                position: absolute;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(78, 84, 200, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
                animation: pulse 3s infinite alternate;
            }
            
            .ai-brain {
                position: absolute;
                width: 60%;
                height: 60%;
                top: 20%;
                left: 20%;
                background-image: url('img/brain.svg');
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                animation: float 5s infinite ease-in-out;
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(0.95);
                    opacity: 0.7;
                }
                100% {
                    transform: scale(1.05);
                    opacity: 0.9;
                }
            }
            
            @keyframes float {
                0% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-20px);
                }
                100% {
                    transform: translateY(0px);
                }
            }
        `;
        
        document.head.appendChild(style);
    };
    
    createAIAnimation();
});
