document.addEventListener('DOMContentLoaded', function() {
    // Créer l'effet de glitch sur le titre
    const createGlitchEffect = () => {
        const title = document.querySelector('.hero h1');
        if (!title) return;
        
        // Créer les éléments pour l'effet de glitch
        const glitchWrapper = document.createElement('div');
        glitchWrapper.className = 'glitch-wrapper';
        
        const originalText = title.innerHTML;
        
        // Créer les couches de glitch
        const glitchText = document.createElement('div');
        glitchText.className = 'glitch-text';
        glitchText.innerHTML = originalText;
        
        const glitchBefore = document.createElement('div');
        glitchBefore.className = 'glitch-text glitch-before';
        glitchBefore.setAttribute('data-text', originalText);
        glitchBefore.innerHTML = originalText;
        
        const glitchAfter = document.createElement('div');
        glitchAfter.className = 'glitch-text glitch-after';
        glitchAfter.setAttribute('data-text', originalText);
        glitchAfter.innerHTML = originalText;
        
        // Ajouter les éléments au DOM
        glitchWrapper.appendChild(glitchBefore);
        glitchWrapper.appendChild(glitchText);
        glitchWrapper.appendChild(glitchAfter);
        
        // Remplacer le titre original par l'effet de glitch
        title.innerHTML = '';
        title.appendChild(glitchWrapper);
    };
    
    // Créer l'effet de code matrix en arrière-plan
    const createMatrixEffect = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Créer le canvas pour l'effet matrix
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-canvas';
        canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; opacity: 0.05;';
        
        hero.appendChild(canvas);
        
        // Initialiser le canvas
        const ctx = canvas.getContext('2d');
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
        
        // Caractères pour l'effet matrix
        const chars = '01'.split('');
        
        // Colonnes de caractères
        const columns = canvas.width / 20;
        
        // Position Y de chaque colonne
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        // Dessiner l'effet matrix
        function drawMatrix() {
            // Fond semi-transparent pour créer l'effet de fondu
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Couleur des caractères
            ctx.fillStyle = '#1a73e8';
            ctx.font = '15px monospace';
            
            // Dessiner les caractères
            for (let i = 0; i < drops.length; i++) {
                // Caractère aléatoire
                const text = chars[Math.floor(Math.random() * chars.length)];
                
                // Position x = i * largeur de caractère
                // Position y = valeur de drops[i] * hauteur de caractère
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                // Réinitialiser la position Y ou incrémenter
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Incrémenter Y
                drops[i]++;
            }
        }
        
        // Animation
        setInterval(drawMatrix, 50);
        
        // Redimensionnement
        window.addEventListener('resize', () => {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        });
    };
    
    // Créer l'effet de particules holographiques
    const createHolographicParticles = () => {
        const heroAnimation = document.querySelector('.hero-animation');
        if (!heroAnimation) return;
        
        // Créer le conteneur pour les particules
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'holographic-particles';
        particlesContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none;';
        
        heroAnimation.appendChild(particlesContainer);
        
        // Créer les particules
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'holo-particle';
            
            // Styles aléatoires pour chaque particule
            const size = 2 + Math.random() * 8;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 5 + Math.random() * 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background-color: rgba(66, 133, 244, 0.7);
                box-shadow: 0 0 ${size * 2}px rgba(66, 133, 244, 0.7);
                left: ${posX}%;
                top: ${posY}%;
                opacity: 0;
                animation: float-particle ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Ajouter le style pour l'animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                25% { opacity: 0.8; }
                50% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
                75% { opacity: 0.8; }
                100% { transform: translateY(0) translateX(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Créer l'effet de lignes de code
    const createCodeLines = () => {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        // Créer le conteneur pour les lignes de code
        const codeContainer = document.createElement('div');
        codeContainer.className = 'code-lines';
        codeContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; opacity: 0.1; overflow: hidden;';
        
        heroContent.appendChild(codeContainer);
        
        // Exemples de lignes de code IA
        const codeSnippets = [
            'import tensorflow as tf',
            'model = tf.keras.Sequential()',
            'model.add(tf.keras.layers.Dense(128))',
            'model.compile(optimizer="adam")',
            'def train_model(data, labels):',
            '    return model.fit(data, labels)',
            'class NeuralNetwork:',
            '    def __init__(self, layers):',
            '        self.layers = layers',
            'from transformers import GPT2Model',
            'tokenizer = AutoTokenizer.from_pretrained("gpt2")',
            'import torch.nn as nn',
            'class Attention(nn.Module):',
            '    def forward(self, query, key, value):',
            'def create_embeddings(text):',
            'async def generate_response(prompt):',
            'const response = await openai.createCompletion({',
            '  model: "gpt-4",',
            '  prompt: userInput,',
            '  temperature: 0.7',
            '});'
        ];
        
        // Créer les lignes de code
        const lineCount = 15;
        for (let i = 0; i < lineCount; i++) {
            const codeLine = document.createElement('div');
            codeLine.className = 'code-line';
            
            // Texte aléatoire pour chaque ligne
            const codeText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            
            // Position et animation aléatoires
            const posY = 5 + (i * 6);
            const delay = Math.random() * 5;
            const duration = 20 + Math.random() * 10;
            
            codeLine.style.cssText = `
                position: absolute;
                left: -300px;
                top: ${posY}%;
                font-family: monospace;
                font-size: 12px;
                color: #1a73e8;
                white-space: nowrap;
                animation: slide-code ${duration}s linear ${delay}s infinite;
            `;
            
            codeLine.textContent = codeText;
            codeContainer.appendChild(codeLine);
        }
        
        // Ajouter le style pour l'animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slide-code {
                from { transform: translateX(0); }
                to { transform: translateX(calc(100vw + 300px)); }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Initialiser tous les effets
    createGlitchEffect();
    createMatrixEffect();
    createHolographicParticles();
    createCodeLines();
});
