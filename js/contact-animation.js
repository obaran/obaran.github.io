document.addEventListener('DOMContentLoaded', function() {
    // Remplacer les informations de contact par une animation interactive
    const createContactAnimation = () => {
        const contactInfo = document.querySelector('.contact-info');
        if (!contactInfo) return;
        
        // Créer le conteneur pour l'animation
        const animationContainer = document.createElement('div');
        animationContainer.className = 'contact-animation-container';
        
        // Ajouter les éléments sociaux
        const socialLinks = contactInfo.querySelector('.social-links');
        const socialLinksClone = socialLinks ? socialLinks.cloneNode(true) : null;
        
        // Vider le conteneur d'origine et ajouter le nouveau conteneur d'animation
        contactInfo.innerHTML = '';
        contactInfo.appendChild(animationContainer);
        
        // Réajouter les liens sociaux s'ils existent
        if (socialLinksClone) {
            socialLinksClone.className = 'social-links enhanced';
            contactInfo.appendChild(socialLinksClone);
        }
        
        // Créer l'animation de connexion
        createConnectionAnimation(animationContainer);
    };
    
    // Créer l'animation de connexion
    const createConnectionAnimation = (container) => {
        // Créer le canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'connection-canvas';
        container.appendChild(canvas);
        
        // Ajouter des éléments flottants
        const elements = [
            { icon: 'fa-envelope', text: 'Contact', color: '#1a73e8' },
            { icon: 'fa-comments', text: 'Discussion', color: '#34a853' },
            { icon: 'fa-handshake', text: 'Collaboration', color: '#4285f4' },
            { icon: 'fa-lightbulb', text: 'Idées', color: '#1a73e8' },
            { icon: 'fa-project-diagram', text: 'Projets', color: '#4285f4' },
            { icon: 'fa-brain', text: 'Innovation', color: '#1a73e8' }
        ];
        
        elements.forEach((element, index) => {
            const floatingElement = document.createElement('div');
            floatingElement.className = 'connection-element';
            floatingElement.innerHTML = `
                <div class="connection-icon">
                    <i class="fas ${element.icon}"></i>
                </div>
                <div class="connection-text">${element.text}</div>
            `;
            floatingElement.style.setProperty('--element-color', element.color);
            floatingElement.style.setProperty('--element-index', index);
            container.appendChild(floatingElement);
        });
        
        // Initialiser le canvas
        const ctx = canvas.getContext('2d');
        let width, height;
        
        // Redimensionner le canvas
        const resizeCanvas = () => {
            width = container.offsetWidth;
            height = container.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };
        
        // Appeler le redimensionnement initial
        resizeCanvas();
        
        // Écouter les redimensionnements de fenêtre
        window.addEventListener('resize', resizeCanvas);
        
        // Animation des connexions
        const connectionElements = container.querySelectorAll('.connection-element');
        let positions = [];
        
        // Initialiser les positions
        const initPositions = () => {
            positions = [];
            connectionElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                positions.push({
                    x: rect.left + rect.width / 2 - containerRect.left,
                    y: rect.top + rect.height / 2 - containerRect.top,
                    element: element
                });
            });
        };
        
        // Dessiner les connexions
        const drawConnections = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Mettre à jour les positions
            initPositions();
            
            // Dessiner les lignes entre les éléments
            for (let i = 0; i < positions.length; i++) {
                for (let j = i + 1; j < positions.length; j++) {
                    const pos1 = positions[i];
                    const pos2 = positions[j];
                    
                    // Calculer la distance
                    const dx = pos2.x - pos1.x;
                    const dy = pos2.y - pos1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Ne dessiner que si la distance est inférieure à un seuil
                    if (distance < 200) {
                        // Calculer l'opacité en fonction de la distance
                        const opacity = 1 - distance / 200;
                        
                        // Créer un dégradé pour la ligne
                        const gradient = ctx.createLinearGradient(pos1.x, pos1.y, pos2.x, pos2.y);
                        gradient.addColorStop(0, `rgba(26, 115, 232, ${opacity * 0.5})`);
                        gradient.addColorStop(1, `rgba(66, 133, 244, ${opacity * 0.5})`);
                        
                        // Dessiner la ligne
                        ctx.beginPath();
                        ctx.moveTo(pos1.x, pos1.y);
                        ctx.lineTo(pos2.x, pos2.y);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        
                        // Dessiner des particules qui se déplacent le long de la ligne
                        const time = Date.now() * 0.001;
                        const particleCount = Math.floor(distance / 30);
                        
                        for (let k = 0; k < particleCount; k++) {
                            const progress = (k / particleCount + (time % 1)) % 1;
                            const particleX = pos1.x + dx * progress;
                            const particleY = pos1.y + dy * progress;
                            
                            ctx.beginPath();
                            ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(66, 133, 244, ${opacity * 0.8})`;
                            ctx.fill();
                        }
                    }
                }
            }
            
            // Dessiner des cercles pulsants autour des éléments
            positions.forEach((pos, index) => {
                const time = Date.now() * 0.001;
                const pulse = Math.sin(time * 1.5 + index) * 0.5 + 0.5;
                const radius = 10 + pulse * 15;
                
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(66, 133, 244, 0.1)';
                ctx.fill();
            });
            
            // Continuer l'animation
            requestAnimationFrame(drawConnections);
        };
        
        // Ajouter un effet de survol interactif
        connectionElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('active');
                // Créer un effet d'onde
                const ripple = document.createElement('div');
                ripple.className = 'connection-ripple';
                element.appendChild(ripple);
                
                // Supprimer l'effet après l'animation
                setTimeout(() => {
                    ripple.remove();
                }, 1000);
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('active');
            });
        });
        
        // Démarrer l'animation
        drawConnections();
        
        // Ajouter un effet de particules en arrière-plan
        const createBackgroundParticles = () => {
            const particleCount = 50;
            const particles = [];
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
            
            const drawParticles = () => {
                particles.forEach(particle => {
                    // Mettre à jour la position
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Rebondir sur les bords
                    if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
                    
                    // Dessiner la particule
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(66, 133, 244, ${particle.opacity})`;
                    ctx.fill();
                });
                
                // Continuer l'animation
                requestAnimationFrame(drawParticles);
            };
            
            // Démarrer l'animation des particules
            drawParticles();
        };
        
        // Initialiser les particules d'arrière-plan
        createBackgroundParticles();
    };
    
    // Initialiser l'animation
    createContactAnimation();
});
