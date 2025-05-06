document.addEventListener('DOMContentLoaded', function() {
    // Animation des compétences flottantes
    const animateFloatingSkills = () => {
        const floatingSkills = document.querySelectorAll('.floating-skill');
        if (!floatingSkills.length) return;
        
        // Initialiser les positions aléatoires
        floatingSkills.forEach(skill => {
            // Obtenir la vitesse de l'élément
            const speed = parseFloat(skill.getAttribute('data-speed')) || 2;
            
            // Ajouter des propriétés pour l'animation
            skill.style.animationDuration = `${8 / speed}s`;
            
            // Ajouter un effet de survol interactif
            skill.addEventListener('mouseenter', () => {
                skill.style.transform = 'translateY(-5px) scale(1.05)';
                skill.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.5)';
                skill.style.background = 'rgba(26, 115, 232, 0.2)';
                skill.style.zIndex = '10';
            });
            
            skill.addEventListener('mouseleave', () => {
                skill.style.transform = '';
                skill.style.boxShadow = '';
                skill.style.background = '';
                skill.style.zIndex = '';
            });
        });
    };
    
    // Ajouter un effet de parallaxe aux compétences
    const addParallaxEffect = () => {
        const skillsContainer = document.querySelector('.skills-container');
        if (!skillsContainer) return;
        
        const floatingSkills = document.querySelectorAll('.floating-skill');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            floatingSkills.forEach(skill => {
                const speed = parseFloat(skill.getAttribute('data-speed')) || 2;
                const offsetX = mouseX * 20 * speed;
                const offsetY = mouseY * 20 * speed;
                
                skill.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    };
    
    // Initialiser les animations
    animateFloatingSkills();
    addParallaxEffect();
});
