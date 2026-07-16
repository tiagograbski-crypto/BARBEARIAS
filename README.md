# 🪒 Barbearia Premium - Projeto Web

![Status](https://img.shields.io/badge/Status-Desenvolvimento_Ativo-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Recursos](#recursos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Scripts Úteis](#scripts-úteis)
- [Arquitetura Frontend](#arquitetura-frontend)
- [SEO e Performance](#seo-e-performance)
- [Deploy](#deploy)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Visão Geral

Site institucional completo para uma barbearia premium, desenvolvido com **melhores práticas de desenvolvimento web**, **SEO otimizado** e **design responsivo**.

**Status atual**: ✅ Fundamentos implementados | 🚀 Pronto para produção

## ✨ Recursos

### ✅ Implementados
- ✅ **Design Responsivo** - Mobile-first approach
- ✅ **SEO Otimizado** - Meta tags, Open Graph, Schema.org
- ✅ **Performance** - Lazy loading, otimização de imagens
- ✅ **Acessibilidade** - ARIA labels, semântica HTML5
- ✅ **Validação de Formulários** - Client-side com feedback em tempo real
- ✅ **Navegação Suave** - Scroll animado e seção ativa
- ✅ **Organização de Assets** - Estrutura profissional de arquivos

### 🚧 Em desenvolvimento
- ⏳ Analytics e Heatmaps
- ⏳ Integração com APIs de agendamento
- ⏳ Página de admin para gestão de conteúdo

## 📁 Estrutura do Projeto

```
PROJETO BARBER/
├── assets/                   # Recursos estáticos
│   ├── images/              # Imagens organizadas por tipo
│   │   ├── gallery/         # Fotos do estabelecimento
│   │   ├── hero/           # Imagens principais
│   │   ├── services/       # Imagens dos serviços
│   │   └── team/           # Fotos da equipe
│   ├── icons/              # Ícones e favicons
│   └── fonts/              # Fontes personalizadas
├── src/                    # Código fonte
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/             # Páginas adicionais
│   ├── styles/            # CSS organizado
│   │   └── main.css       # Estilos principais
│   └── utils/             # Utilitários JavaScript
│       ├── images-loader.js   # Carregamento de imagens
│       ├── navigation.js      # Navegação responsiva
│       └── contact-form.js    # Validação de formulário
├── docs/                  # Documentação do projeto
│   ├── requirements/      # Requisitos funcionais
│   └── designs/          # Wireframes e mockups
├── public/               # Arquivos públicos servidos
│   ├── robots.txt        # Configuração de crawlers
│   └── sitemap.xml       # Mapa do site
├── index.html            # Página principal
├── README.md             # Esta documentação
└── organize_images.ps1   # Script de organização
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+)
- Servidor web local (opcional para desenvolvimento)

### Configuração Rápida
1. Clone ou extraia o projeto
2. Abra `index.html` no navegador
3. Para desenvolvimento local, inicie um servidor:

```powershell
# Recomendado: PC + celular na mesma rede Wi-Fi
powershell -ExecutionPolicy Bypass -File .\start-server.ps1
```

```bash
# Python 3 (acessível no mobile)
python -m http.server 8000 --bind 0.0.0.0

# Node.js com serve
npx serve . -l tcp://0.0.0.0:8000
```

**No celular:** abra `http://SEU_IP_LOCAL:8000` (ex.: `http://192.168.0.106:8000`). O script `start-server.ps1` mostra o IP automaticamente.

### Organização de Imagens
Execute o script para organizar imagens automaticamente:

```powershell
powershell -ExecutionPolicy Bypass -File .\organize_images.ps1
```

## 🔧 Scripts Úteis

### Organização Automática
```powershell
# Organiza imagens por tipo (gallery/services/team)
.\organize_images.ps1
```

### Verificação de Links
```html
<!-- HTML básico para verificação -->
<a href="#" aria-label="Página inicial">Início</a>
```

### Validação de SEO
```html
<!-- Meta tags recomendadas -->
<meta name="description" content="Descrição de 150-160 caracteres">
<meta name="keywords" content="palavra-chave1, palavra-chave2">
```

## 🏗️ Arquitetura Frontend

### 1. **Design Patterns Implementados**
- **Modular JavaScript**: Separação por responsabilidade
- **Mobile-First CSS**: Media queries progressivas
- **Progressive Enhancement**: Funcionalidade básica antes de JS
- **Lazy Loading**: Carregamento sob demanda de imagens

### 2. **Performance**
```javascript
// Carregamento otimizado
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Carregar imagem apenas quando visível
            loadImage(entry.target);
        }
    });
});
```

### 3. **Acessibilidade**
```html
<!-- Boas práticas ARIA -->
<button class="menu-toggle" aria-label="Menu de navegação">
    <span aria-hidden="true"></span>
</button>
```

## 📈 SEO e Performance

### Otimizações Implementadas
1. **Meta Tags Estratégicas**
   - Description otimizada
   - Keywords relevantes
   - Open Graph para redes sociais

2. **Performance Core Web Vitals**
   - CSS crítico inline (recomendado para produção)
   - Lazy loading de imagens
   - Fontes otimizadas

3. **Schema.org Markup** (recomendado para adicionar)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Barbearia Premium",
  "image": "https://seusite.com/logo.jpg",
  "telephone": "+5511999999999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Principal, 123",
    "addressLocality": "São Paulo",
    "addressRegion": "SP"
  }
}
</script>
```

## 🚀 Deploy

### Opção 1: GitHub Pages
1. Crie repositório no GitHub
2. Envie os arquivos
3. Ative GitHub Pages em Settings > Pages

### Opção 2: Netlify/Vercel
1. Conecte seu repositório
2. Configuração automática detecta projeto estático
3. Deploy automático em cada push

### Opção 3: Hosting Tradicional
```bash
# Estrutura mínima para deploy
index.html
assets/
├── css/
├── js/
└── images/

# Upload via FTP/SSH
```

### Configurações de Produção
```nginx
# Exemplo de configuração Nginx
location / {
    try_files $uri $uri/ =404;
    add_header Cache-Control "public, max-age=31536000";
}

# Gzip compression
gzip on;
gzip_types text/css application/javascript;
```

## 🤝 Contribuição

### Guidelines de Desenvolvimento
1. **Commits Semânticos**
   ```
   feat: Nova funcionalidade
   fix: Correção de bug
   docs: Documentação
   style: Formatação/estilo
   refactor: Refatoração
   test: Testes
   ```

2. **Code Style**
   - 2 espaços (não tabs)
   - Nomes em inglês para variáveis/funções
   - Comentários em português para documentação

3. **Pull Requests**
   - Descreva mudanças
   - Inclua screenshots se aplicável
   - Teste em múltiplos navegadores

### Ambiente de Desenvolvimento
```bash
# Recomendado: VSCode com extensões
- Live Server
- Prettier
- ESLint
- Auto Rename Tag
```

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

**Issues**: [Abra uma issue](link-para-issues)  
**Email**: suporte@barbeariapremium.com  
**Site**: [www.barbeariapremium.com](https://www.barbeariapremium.com)

---

## 🎨 Brand Guidelines

### Cores
- **Primary**: `#d4af37` (Dourado premium)
- **Secondary**: `#1a1a1a` (Preto elegante)
- **Accent**: `#8b7355` (Marrom madeira)

### Tipografia
- **Headings**: Montserrat (700, 600 weights)
- **Body**: Open Sans (400, 600 weights)

### Espaçamento
- `--spacing-sm`: 1rem
- `--spacing-md`: 2rem
- `--spacing-lg`: 4rem

---

**Última atualização**: Julho 2024  
**Versão**: 1.0.0  
**Desenvolvido por**: Equipe Barbearia Premium  
**Tecnologias**: HTML5, CSS3, ES6+

---

<div align="center">
  <sub>Feito com ❤️ para barbearias premium</sub><br>
  <sub>Contribuições são sempre bem-vindas!</sub>
</div>