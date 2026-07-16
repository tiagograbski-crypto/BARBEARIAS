/*
 * navigation.js - Gerenciamento de navegação responsiva e smooth scrolling
 */

class NavigationManager {
    constructor() {
        this.navLinks = document.querySelector('.nav-links');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        // Configurar toggle do menu mobile
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Configurar navegação suave
        this.setupSmoothScrolling();
        
        // Configurar highlight de seção ativa
        this.setupActiveSection();
        
        // Fechar menu ao clicar fora
        this.setupClickOutside();
        
        // Configurar scroll do header
        this.setupHeaderScroll();
    }

    toggleMenu() {
        this.navLinks.style.display = 
            this.navLinks.style.display === 'flex' ? 'none' : 'flex';
        
        // Adicionar animação
        const spans = this.menuToggle.querySelectorAll('span');
        if (this.navLinks.style.display === 'flex') {
            // Menu aberto - transformar em X
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            // Menu fechado - resetar
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Verificar se é uma âncora interna
                if (href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Fechar menu mobile se aberto
                        this.navLinks.style.display = 'none';
                        this.resetMenuIcon();
                        
                        // Scroll suave
                        this.scrollToElement(targetElement);
                    }
                }
            });
        });
    }

    scrollToElement(element) {
        const headerHeight = this.header.offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    setupActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // Atualizar link ativo
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    setupClickOutside() {
        document.addEventListener('click', (e) => {
            const isNavLink = this.navLinks.contains(e.target);
            const isMenuToggle = this.menuToggle.contains(e.target);
            
            if (!isNavLink && !isMenuToggle && this.navLinks.style.display === 'flex') {
                this.navLinks.style.display = 'none';
                this.resetMenuIcon();
            }
        });
    }

    setupHeaderScroll() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scroll down - esconder header
                this.header.style.transform = 'translateY(-100%)';
            } else {
                // Scroll up - mostrar header
                this.header.style.transform = 'translateY(0)';
            }
            
            // Adicionar sombra quando scroll > 0
            if (scrollTop > 50) {
                this.header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                this.header.style.boxShadow = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    resetMenuIcon() {
        const spans = this.menuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }

    // Métodos públicos
    navigateTo(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            this.scrollToElement(element);
        }
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = null;
        let maxIntersection = 0;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const intersection = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            
            if (intersection > maxIntersection && intersection > 0) {
                maxIntersection = intersection;
                currentSection = section.id;
            }
        });

        return currentSection;
    }
}

// Adicionar estilos para link ativo
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary-color) !important;
        font-weight: 700;
        position: relative;
    }
    
    .nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--primary-color);
        border-radius: 2px;
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from { width: 0; }
        to { width: 100%; }
    }
    
    @media (max-width: 767px) {
        .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--secondary-color);
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .nav-links a {
            margin: 0.5rem 0;
            padding: 0.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .header {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
    }
`;
document.head.appendChild(style);

// Inicializar na carga da página
document.addEventListener('DOMContentLoaded', () => {
    const navigation = new NavigationManager();
    
    // Expor para uso global
    window.navigation = navigation;
    
    // Adicionar classe para animações após carregamento
    setTimeout(() => {
        document.body.classList.add('navigation-ready');
    }, 100);
});

// Export para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}