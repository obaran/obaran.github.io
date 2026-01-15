document.addEventListener('DOMContentLoaded', function() {
    // Gestion du thème sombre/clair
    function setupThemeToggle() {
        // Créer le bouton de basculement
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = `
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
        `;
        document.body.appendChild(themeToggle);
        
        // Vérifier les préférences système
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Vérifier si un thème est déjà enregistré
        const savedTheme = localStorage.getItem('theme');
        
        // Par défaut, activer le dark mode (sauf si l'utilisateur a explicitement choisi le light mode)
        if (savedTheme === 'dark' || !savedTheme) {
            document.body.classList.add('dark-theme');
            themeToggle.classList.add('dark');
        }
        
        // Événement de basculement
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            themeToggle.classList.toggle('dark');
            
            // Enregistrer la préférence
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Écouter les changements de préférence système
        prefersDarkScheme.addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark-theme');
                    themeToggle.classList.add('dark');
                } else {
                    document.body.classList.remove('dark-theme');
                    themeToggle.classList.remove('dark');
                }
            }
        });
    }
    
    // Gestion de la navigation transparente
    function setupTransparentNav() {
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.remove('transparent');
            } else {
                header.classList.add('transparent');
            }
        });
        
        // Initialiser l'état
        if (window.scrollY <= 50) {
            header.classList.add('transparent');
        }
    }
    
    // Convertir les barres de compétences en badges
    function setupSkillBadges() {
        const skillsProgress = document.querySelector('.skills-progress');
        if (!skillsProgress) return;
        
        // Créer le conteneur de badges
        const skillsBadges = document.createElement('div');
        skillsBadges.className = 'skills-badges';
        
        // Définir les compétences avec leurs icônes
        const skills = [
            { name: 'Gestion de Projet IA', icon: 'fa-project-diagram' },
            { name: 'Développement de Chatbots', icon: 'fa-robot' },
            { name: 'Azure AI & OpenAI', icon: 'fa-cloud' },
            { name: 'Formation & Pédagogie', icon: 'fa-chalkboard-teacher' },
            { name: 'Développement Web', icon: 'fa-code' },
            { name: 'Python', icon: 'fa-python' },
            { name: 'JavaScript', icon: 'fa-js' },
            { name: 'TypeScript', icon: 'fa-code' },
            { name: 'React', icon: 'fa-react' },
            { name: 'Azure', icon: 'fa-cloud' },
            { name: 'Docker', icon: 'fa-docker' },
            { name: 'Git', icon: 'fa-git-alt' },
            { name: 'Prompt Engineering', icon: 'fa-keyboard' },
            { name: 'RAG', icon: 'fa-database' }
        ];
        
        // Créer les badges
        skills.forEach(skill => {
            const badge = document.createElement('div');
            badge.className = 'skill-badge';
            badge.innerHTML = `<i class="fas ${skill.icon}"></i>${skill.name}`;
            skillsBadges.appendChild(badge);
        });
        
        // Remplacer les barres de progression par les badges
        skillsProgress.parentNode.replaceChild(skillsBadges, skillsProgress);
    }
    
    // Initialiser toutes les fonctionnalités
    setupThemeToggle();
    setupTransparentNav();
    setupSkillBadges();
});
