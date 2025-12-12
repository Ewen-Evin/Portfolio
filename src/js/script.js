// Initialisation des particules
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#6e57e0', '#ff6b6b', '#2f2b3a'] },
        shape: { type: ['circle', 'polygon'], polygon: { nb_sides: 6 } },
        opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 5,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: { enable: true, distance: 150, color: '#6e57e0', opacity: 0.4, width: 1 },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 50) {
        header.classList.add('sticky');
        backToTop.classList.add('active');
    } else {
        header.classList.remove('sticky');
        backToTop.classList.remove('active');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu mobile quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Animation des barres de compétences
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item.visible');
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.level-progress');
        const level = progressBar.getAttribute('data-level');
        progressBar.style.setProperty('--level-width', level + '%');
        void progressBar.offsetWidth; // reset animation
    });
}

// Vérifier la visibilité des éléments
function checkScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
            if (element.classList.contains('skill-item')) {
                setTimeout(animateSkillBars, 300);
            }
        }
    });
}

// Fonctionnalité d'agrandissement des projets
function setupProjectExpansion() {
    const projectItems = document.querySelectorAll('.project-item');
    const projectsContainer = document.querySelector('.projects-container');
    const projectOverlay = document.createElement('div');
    projectOverlay.className = 'project-overlay';
    document.body.appendChild(projectOverlay);
    
    let isExpanded = false;
    let expandedItem = null;
    
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.project-close') || e.target.closest('a')) return;
            if (!isExpanded) expandProject(item);
        });
    });
    
    projectOverlay.addEventListener('click', collapseProjects);
    
    function expandProject(item) {
        isExpanded = true;
        expandedItem = item;
        projectsContainer.classList.add('animating');
        projectOverlay.classList.add('active');
        
        setTimeout(() => {
            projectsContainer.classList.remove('animating');
            item.classList.add('expanded');
            document.querySelectorAll('.project-item:not(.expanded)').forEach(other => {
                other.style.opacity = '0.3';
            });
        }, 50);
        
        setTimeout(() => {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
    
    function collapseProjects() {
        if (!isExpanded) return;
        isExpanded = false;
        projectOverlay.classList.remove('active');
        if (expandedItem) expandedItem.classList.remove('expanded');
        setTimeout(() => {
            document.querySelectorAll('.project-item').forEach(item => item.style.opacity = '1');
            expandedItem = null;
        }, 400);
    }

    document.querySelectorAll('.project-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', collapseProjects);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isExpanded) collapseProjects();
    });
}

// Effet de vague pour le magic scroll
function setupMagicScroll() {
    const magicScroll = document.getElementById('magic-scroll-link');
    if (!magicScroll) return;

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(110, 87, 224, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(2.5);
        opacity: 0;
    }
}

.magic-scroll {
    position: absolute;
    bottom: -130px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    opacity: 0;
    animation: magicAppear 2s ease-out 1.5s forwards;
    cursor: pointer;
    transition: all 0.3s ease;
}

.magic-scroll:hover {
    transform: translateX(-50%) translateY(-5px);
}

.magic-text {
    color: transparent;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 15px;
    background: linear-gradient(45deg, #6e57e0, #ff6b6b, #2f2b3a);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: gradientShift 3s infinite, textReveal 1.5s ease-out 2s forwards;
}

.magic-sparkle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sparkle-container {
    position: absolute;
    width: 50px;
    height: 50px;
}

.sparkle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #6e57e0;
    border-radius: 50%;
    opacity: 0;
}

.sparkle:nth-child(1) {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    animation: sparkleAnimation 2s infinite 2.5s;
    --tx: 0;
    --ty: -15px;
}

.sparkle:nth-child(2) {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    animation: sparkleAnimation 2s infinite 2.7s;
    --tx: 15px;
    --ty: 0;
}

.sparkle:nth-child(3) {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    animation: sparkleAnimation 2s infinite 2.9s;
    --tx: 0;
    --ty: 15px;
}

.sparkle:nth-child(4) {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    animation: sparkleAnimation 2s infinite 3.1s;
    --tx: -15px;
    --ty: 0;
}

.sparkle:nth-child(5) {
    top: 15px;
    left: 15px;
    animation: sparkleAnimation 2s infinite 3.3s;
    --tx: 10px;
    --ty: -10px;
}

.magic-arrow {
    font-size: 28px;
    color: #6e57e0;
    animation: magicBounce 2s infinite, arrowGlow 3s infinite;
    transition: all 0.3s ease;
}

.magic-scroll:hover .magic-arrow {
    transform: scale(1.2);
    color: #ff6b6b;
}

.magic-scroll:active {
    transform: translateX(-50%) scale(0.95);
}

.magic-scroll:active .magic-arrow {
    transform: scale(1.1);
}

/* Animations */
@keyframes magicAppear {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(30px) scale(0.8);
    }
    100% {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
    }
}

@keyframes textReveal {
    0% {
        letter-spacing: 10px;
        opacity: 0;
    }
    100% {
        letter-spacing: 2px;
        opacity: 0.9;
    }
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

@keyframes sparkleAnimation {
    0% {
        opacity: 0;
        transform: translate(0, 0) scale(0);
    }
    50% {
        opacity: 1;
        transform: translate(var(--tx), var(--ty)) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(calc(var(--tx) * 1.5), calc(var(--ty) * 1.5)) scale(0);
    }
}

@keyframes magicBounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

@keyframes arrowGlow {
    0%, 100% {
        text-shadow: 0 0 5px rgba(110, 87, 224, 0.5);
    }
    50% {
        text-shadow: 0 0 15px rgba(110, 87, 224, 0.8),
                     0 0 25px rgba(110, 87, 224, 0.4);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .magic-text {
        font-size: 0.9rem;
    }
    .magic-arrow {
        font-size: 24px;
    }
}
`;
    document.head.appendChild(rippleStyle);

    magicScroll.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        const aboutSection = document.getElementById('about');
        if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => ripple.remove(), 600);
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    setupProjectExpansion();
    setupMagicScroll();
});

// Suppression du # dans l'URL après scroll
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash) {
        const section = document.querySelector(window.location.hash);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            history.replaceState(null, "", window.location.pathname);
        }
    }
    document.querySelectorAll("a[href^='#']").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                history.replaceState(null, "", window.location.pathname);
            }
        });
    });
});

// Fonction pour ajuster la hauteur des colonnes d'expérience
function adjustExperienceColumns() {
    const columns = document.querySelectorAll('.experience-column');
    if (columns.length < 2) return;
    
    const firstColumn = columns[0];  // Parcours scolaire
    const secondColumn = columns[1]; // Expériences pro
    
    // Réinitialiser les styles
    firstColumn.style.height = 'auto';
    secondColumn.style.height = 'auto';
    
    const firstContainer = firstColumn.querySelector('.timeline-container');
    const secondContainer = secondColumn.querySelector('.timeline-container');
    
    if (firstContainer && secondContainer) {
        firstContainer.style.maxHeight = 'none';
        secondContainer.style.maxHeight = 'none';
    }
    
    // Attendre que le DOM se mette à jour
    setTimeout(() => {
        // Obtenir la hauteur réelle de la première colonne (la plus courte)
        const firstColumnHeight = firstColumn.offsetHeight;
        
        // Appliquer cette hauteur aux deux colonnes
        secondColumn.style.height = firstColumnHeight + 'px';
        
        // Calculer la hauteur disponible pour le contenu scrollable
        const titleHeight = secondColumn.querySelector('.column-title').offsetHeight;
        const padding = 50; // Padding de la colonne (25px * 2) + marge
        
        const availableHeight = firstColumnHeight - titleHeight - padding;
        
        // Appliquer la hauteur max au container scrollable
        if (secondContainer) {
            secondContainer.style.maxHeight = availableHeight + 'px';
        }
    }, 100);
}

// Appeler la fonction
window.addEventListener('load', adjustExperienceColumns);
window.addEventListener('resize', adjustExperienceColumns);
setTimeout(adjustExperienceColumns, 1000);
