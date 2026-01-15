document.addEventListener('DOMContentLoaded', function() {
    // Utiliser le conteneur three-animation existant
    const container = document.querySelector('#three-animation');
    if (!container) return;
    
    // Charger Three.js
    const loadThreeJS = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = () => resolve();
            document.head.appendChild(script);
        });
    };
    
    // Fonction pour initialiser l'animation 3D
    const initAnimation = () => {
        // Configuration de base
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 30;
        
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        
        // Créer le cerveau IA
        const brainGroup = new THREE.Group();
        scene.add(brainGroup);
        
        // Paramètres pour les particules
        const particleCount = 2000;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        // Générer les positions des particules dans une forme de cerveau
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Forme de cerveau stylisée
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const r = 10 + Math.random() * 5;
            
            // Déformation pour ressembler à un cerveau
            let x = r * Math.sin(phi) * Math.cos(theta);
            let y = r * Math.sin(phi) * Math.sin(theta);
            let z = r * Math.cos(phi);
            
            // Aplatir légèrement sur l'axe Y
            y *= 0.8;
            
            // Déformation supplémentaire
            if (Math.abs(x) > 5) {
                y *= 1.2;
                z *= 1.2;
            }
            
            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;
            
            // Couleurs dégradées de bleu
            colors[i3] = 0.1 + 0.2 * Math.random();     // R
            colors[i3 + 1] = 0.4 + 0.2 * Math.random(); // G
            colors[i3 + 2] = 0.8 + 0.2 * Math.random(); // B
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Matériau pour les particules
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        // Créer le système de particules
        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        brainGroup.add(particleSystem);
        
        // Créer les connexions entre les particules
        const connectionCount = 200;
        const connectionGeometry = new THREE.BufferGeometry();
        const connectionPositions = new Float32Array(connectionCount * 6); // 2 points par ligne * 3 coordonnées
        const connectionColors = new Float32Array(connectionCount * 6);
        
        for (let i = 0; i < connectionCount; i++) {
            const i6 = i * 6;
            
            // Sélectionner deux particules aléatoires proches
            const p1Index = Math.floor(Math.random() * particleCount) * 3;
            const p2Index = Math.floor(Math.random() * particleCount) * 3;
            
            // Positions des deux extrémités de la ligne
            connectionPositions[i6] = positions[p1Index];
            connectionPositions[i6 + 1] = positions[p1Index + 1];
            connectionPositions[i6 + 2] = positions[p1Index + 2];
            
            connectionPositions[i6 + 3] = positions[p2Index];
            connectionPositions[i6 + 4] = positions[p2Index + 1];
            connectionPositions[i6 + 5] = positions[p2Index + 2];
            
            // Couleurs des connexions
            const blueIntensity = 0.7 + 0.3 * Math.random();
            
            connectionColors[i6] = 0.1;     // R
            connectionColors[i6 + 1] = 0.4; // G
            connectionColors[i6 + 2] = blueIntensity; // B
            
            connectionColors[i6 + 3] = 0.1;     // R
            connectionColors[i6 + 4] = 0.4; // G
            connectionColors[i6 + 5] = blueIntensity; // B
        }
        
        connectionGeometry.setAttribute('position', new THREE.BufferAttribute(connectionPositions, 3));
        connectionGeometry.setAttribute('color', new THREE.BufferAttribute(connectionColors, 3));
        
        const connectionMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.5
        });
        
        const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
        brainGroup.add(connections);
        
        // Ajouter des impulsions électriques
        const pulseCount = 50;
        const pulses = [];
        
        for (let i = 0; i < pulseCount; i++) {
            const pulseGeometry = new THREE.SphereGeometry(0.1, 8, 8);
            const pulseMaterial = new THREE.MeshBasicMaterial({
                color: 0x4285f4,
                transparent: true,
                opacity: 0.8
            });
            
            const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
            
            // Position initiale
            const startIndex = Math.floor(Math.random() * particleCount) * 3;
            pulse.position.set(
                positions[startIndex],
                positions[startIndex + 1],
                positions[startIndex + 2]
            );
            
            // Position finale
            const endIndex = Math.floor(Math.random() * particleCount) * 3;
            const endPosition = new THREE.Vector3(
                positions[endIndex],
                positions[endIndex + 1],
                positions[endIndex + 2]
            );
            
            // Paramètres d'animation
            pulse.userData = {
                startPosition: pulse.position.clone(),
                endPosition: endPosition,
                progress: 0,
                speed: 0.005 + Math.random() * 0.01,
                active: false,
                delay: Math.random() * 100
            };
            
            brainGroup.add(pulse);
            pulses.push(pulse);
        }
        
        // Animation
        let frame = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Rotation lente du cerveau
            brainGroup.rotation.y += 0.002;
            brainGroup.rotation.x = Math.sin(frame * 0.01) * 0.1;
            
            // Animation des impulsions
            pulses.forEach(pulse => {
                const data = pulse.userData;
                
                if (frame % 200 > data.delay && !data.active) {
                    data.active = true;
                    data.progress = 0;
                    
                    // Nouvelle position finale aléatoire
                    const endIndex = Math.floor(Math.random() * particleCount) * 3;
                    data.endPosition.set(
                        positions[endIndex],
                        positions[endIndex + 1],
                        positions[endIndex + 2]
                    );
                    
                    // Nouvelle position initiale aléatoire
                    const startIndex = Math.floor(Math.random() * particleCount) * 3;
                    data.startPosition.set(
                        positions[startIndex],
                        positions[startIndex + 1],
                        positions[startIndex + 2]
                    );
                    
                    pulse.position.copy(data.startPosition);
                }
                
                if (data.active) {
                    data.progress += data.speed;
                    
                    if (data.progress >= 1) {
                        data.active = false;
                        pulse.scale.set(1, 1, 1);
                        pulse.material.opacity = 0.8;
                    } else {
                        // Interpolation entre les positions
                        pulse.position.lerpVectors(
                            data.startPosition,
                            data.endPosition,
                            data.progress
                        );
                        
                        // Effet de pulsation
                        const pulseFactor = Math.sin(data.progress * Math.PI);
                        pulse.scale.set(1 + pulseFactor, 1 + pulseFactor, 1 + pulseFactor);
                        pulse.material.opacity = 0.8 * (1 - data.progress);
                    }
                }
            });
            
            // Animation subtile des particules
            const particlePositions = particleGeometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                particlePositions[i3 + 1] += Math.sin(frame * 0.01 + i * 0.1) * 0.01;
            }
            particleGeometry.attributes.position.needsUpdate = true;
            
            frame++;
            renderer.render(scene, camera);
        };
        
        // Gestion du redimensionnement
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
        
        // Interaction à la souris
        let mouseX = 0, mouseY = 0;
        let targetRotationX = 0, targetRotationY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            targetRotationY = mouseX * 0.5;
            targetRotationX = mouseY * 0.3;
        });
        
        // Démarrer l'animation
        animate();
    };
    
    // Charger Three.js puis initialiser l'animation
    loadThreeJS().then(initAnimation);
});
