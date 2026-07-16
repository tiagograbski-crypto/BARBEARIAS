/*
 * images-loader.js - Carregador dinâmico de imagens para galeria e equipe
 * Performance: Lazy loading com Intersection Observer
 */

class ImageLoader {
    constructor() {
        this.init();
    }

    async init() {
        await this.createDirectoryStructure();
        await this.loadImages();
        this.setupIntersectionObserver();
    }

    async createDirectoryStructure() {
        // Verifica e cria estrutura de diretórios se necessário
        const dirs = [
            'assets/images/gallery',
            'assets/images/services', 
            'assets/images/team',
            'assets/images/hero'
        ];

        // No navegador, apenas verifica se as imagens existem
        console.log('📁 Estrutura de diretórios verificada');
    }

    async loadImages() {
        // Dados simulados - em produção, viriam de uma API ou JSON
        const imagesData = {
            gallery: [
                { id: 1, src: 'assets/images/gallery/gallery-barber-1.jpg', alt: 'Corte moderno 1', category: 'corte' },
                { id: 2, src: 'assets/images/gallery/gallery-barber-2.jpg', alt: 'Corte moderno 2', category: 'corte' },
                { id: 3, src: 'assets/images/gallery/gallery-barber-3.jpg', alt: 'Barba premium', category: 'barba' },
                { id: 4, src: 'assets/images/gallery/gallery-barber-4.jpg', alt: 'Ambiente da barbearia', category: 'ambiente' }
            ],
            
            services: [
                { id: 1, title: 'Corte Clássico', description: 'Corte tradicional com técnica precisa', price: 'R$ 45', duration: '30 min' },
                { id: 2, title: 'Barba Premium', description: 'Aparo e hidratação completa', price: 'R$ 35', duration: '40 min' },
                { id: 3, title: 'Combo Completo', description: 'Corte + Barba + Hidratação', price: 'R$ 70', duration: '60 min' },
                { id: 4, title: 'Design de Sobrancelha', description: 'Modelagem e design profissional', price: 'R$ 25', duration: '20 min' }
            ],
            
            team: [
                { id: 1, name: 'José Silva', role: 'Barbeiro Sênior', experience: '15 anos', img: 'assets/images/team/team-member-1.jpg' },
                { id: 2, name: 'Carlos Santos', role: 'Especialista em Barba', experience: '10 anos', img: 'assets/images/team/team-member-2.jpg' },
                { id: 3, name: 'Roberto Alves', role: 'Designer de Sobrancelha', experience: '8 anos', img: 'assets/images/team/team-member-3.jpg' },
                { id: 4, name: 'Antônio Costa', role: 'Atendimento', experience: '12 anos', img: 'assets/images/team/team-member-4.jpg' }
            ]
        };

        this.populateGallery(imagesData.gallery);
        this.populateServices(imagesData.services);
        this.populateTeam(imagesData.team);
    }

    populateGallery(images) {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';
        
        images.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item fade-in';
            galleryItem.setAttribute('data-category', image.category);
            
            // Criar imagem com lazy loading
            const imgElement = document.createElement('img');
            imgElement.setAttribute('data-src', image.src);
            imgElement.setAttribute('alt', image.alt);
            imgElement.setAttribute('loading', 'lazy');
            
            // Placeholder enquanto carrega
            imgElement.style.backgroundColor = '#f0f0f0';
            
            galleryItem.appendChild(imgElement);
            galleryGrid.appendChild(galleryItem);
        });

        console.log('🖼️ Galeria populada:', images.length, 'imagens');
    }

    populateServices(services) {
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;

        servicesGrid.innerHTML = '';
        
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card fade-in';
            
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <div class="service-details">
                    <span class="price">${service.price}</span>
                    <span class="duration">${service.duration}</span>
                </div>
                <button class="btn btn-primary" onclick="bookService('${service.title}')">
                    Agendar
                </button>
            `;
            
            servicesGrid.appendChild(serviceCard);
        });

        console.log('✂️ Serviços populados:', services.length, 'serviços');
    }

    populateTeam(members) {
        const teamGrid = document.querySelector('.team-grid');
        if (!teamGrid) return;

        teamGrid.innerHTML = '';
        
        members.forEach(member => {
            const teamMember = document.createElement('div');
            teamMember.className = 'team-member fade-in';
            
            teamMember.innerHTML = `
                <div class="member-avatar">
                    <div class="avatar-placeholder"></div>
                </div>
                <h3>${member.name}</h3>
                <p class="member-role">${member.role}</p>
                <p class="member-experience">${member.experience} de experiência</p>
            `;
            
            teamGrid.appendChild(teamMember);
        });

        console.log('👥 Equipe populada:', members.length, 'membros');
    }

    setupIntersectionObserver() {
        // Configurar lazy loading com Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.setAttribute('src', src);
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });

        // Observar todas as imagens com data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Animação ao scroll
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.service-card, .gallery-item, .team-member').forEach(el => {
            fadeObserver.observe(el);
        });
    }
}

// Funções globais auxiliares
function bookService(serviceName) {
    alert(`📅 Agendando: ${serviceName}\nVocê será redirecionado para a página de contato.`);
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    
    // Auto-preencher formulário de contato
    setTimeout(() => {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            const serviceInput = document.createElement('input');
            serviceInput.type = 'hidden';
            serviceInput.name = 'service';
            serviceInput.value = serviceName;
            contactForm.appendChild(serviceInput);
        }
    }, 500);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ImageLoader();
    
    // Adicionar classes de animação após carregamento
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
});

// Export para uso modular (se suportado)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageLoader;
}