/*
 * contact-form.js - Validação e envio de formulário de contato
 * Features: Validação em tempo real, feedback visual, envio simulado
 */

class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        // Configurar validação em tempo real
        this.setupValidation();
        
        // Configurar envio do formulário
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Configurar máscaras de input
        this.setupInputMasks();
        
        // Configurar feedback visual
        this.setupVisualFeedback();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            // Validação em tempo real
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
            
            // Validação customizada por tipo
            switch(input.type) {
                case 'email':
                    input.addEventListener('input', () => this.validateEmail(input));
                    break;
                case 'tel':
                    input.addEventListener('input', () => this.validatePhone(input));
                    break;
            }
        });
    }

    validateField(field) {
        let isValid = true;
        let errorMessage = '';

        // Validações básicas por tipo
        if (field.required && !field.value.trim()) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        } else if (field.type === 'email' && field.value.trim()) {
            if (!this.isValidEmail(field.value)) {
                isValid = false;
                errorMessage = 'Digite um e-mail válido';
            }
        } else if (field.type === 'tel' && field.value.trim()) {
            if (!this.isValidPhone(field.value)) {
                isValid = false;
                errorMessage = 'Digite um telefone válido';
            }
        } else if (field.tagName === 'TEXTAREA' && field.value.trim().length < 10) {
            isValid = false;
            errorMessage = 'A mensagem deve ter pelo menos 10 caracteres';
        }

        // Aplicar feedback visual
        this.setFieldStatus(field, isValid, errorMessage);
        return isValid;
    }

    validateEmail(input) {
        if (input.value.trim() && !this.isValidEmail(input.value)) {
            this.setFieldStatus(input, false, 'Digite um e-mail válido');
        } else {
            this.clearFieldError(input);
        }
    }

    validatePhone(input) {
        if (input.value.trim() && !this.isValidPhone(input.value)) {
            this.setFieldStatus(input, false, 'Digite um telefone válido');
        } else {
            this.clearFieldError(input);
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        // Aceita (00) 00000-0000, 00 00000-0000 ou 00000000000
        const phoneRegex = /^(?:\(\d{2}\)\s?|\d{2}\s?)?\d{4,5}[-\s]?\d{4}$/;
        return phoneRegex.test(phone);
    }

    setFieldStatus(field, isValid, message = '') {
        const fieldContainer = field.parentElement;
        
        // Remover classes anteriores
        field.classList.remove('valid', 'invalid');
        
        if (isValid) {
            field.classList.add('valid');
            this.removeError(field);
        } else {
            field.classList.add('invalid');
            this.showError(field, message);
        }
    }

    clearFieldError(field) {
        field.classList.remove('invalid');
        this.removeError(field);
    }

    showError(field, message) {
        // Remover erro anterior
        this.removeError(field);
        
        // Criar elemento de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: fadeIn 0.3s ease;
        `;
        
        field.insertAdjacentElement('afterend', errorElement);
    }

    removeError(field) {
        const error = field.nextElementSibling;
        if (error && error.classList.contains('field-error')) {
            error.remove();
        }
    }

    setupInputMasks() {
        const phoneInput = this.form.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    if (value.length <= 2) {
                        value = `(${value}`;
                    } else if (value.length <= 7) {
                        value = `(${value.substring(0,2)}) ${value.substring(2)}`;
                    } else {
                        value = `(${value.substring(0,2)}) ${value.substring(2,7)}-${value.substring(7,11)}`;
                    }
                }
                
                e.target.value = value;
            });
        }
    }

    setupVisualFeedback() {
        // Adicionar estilos para validação
        const style = document.createElement('style');
        style.textContent = `
            input.valid, textarea.valid {
                border-color: #27ae60 !important;
                background-color: rgba(39, 174, 96, 0.05);
            }
            
            input.invalid, textarea.invalid {
                border-color: #e74c3c !important;
                background-color: rgba(231, 76, 60, 0.05);
            }
            
            input:focus, textarea:focus {
                border-color: var(--primary-color) !important;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .form-success {
                background-color: rgba(39, 174, 96, 0.1);
                border: 2px solid #27ae60;
                border-radius: var(--radius-md);
                padding: 1rem;
                margin: 1rem 0;
                animation: slideIn 0.5s ease;
                text-align: center;
                color: #27ae60;
            }
            
            .form-error {
                background-color: rgba(231, 76, 60, 0.1);
                border: 2px solid #e74c3c;
                border-radius: var(--radius-md);
                padding: 1rem;
                margin: 1rem 0;
                animation: slideIn 0.5s ease;
                text-align: center;
                color: #e74c3c;
            }
            
            @keyframes slideIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validar todos os campos
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showMessage('Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        // Coletar dados do formulário
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Mostrar loading
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        try {
            // Simular envio para uma API (substituir por fetch real em produção)
            const response = await this.simulateApiCall(data);
            
            if (response.success) {
                // Sucesso
                this.showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                this.form.reset();
                this.clearAllErrors();
                
                // Rolar para cima para mostrar mensagem de sucesso
                setTimeout(() => {
                    this.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            } else {
                throw new Error(response.message || 'Erro ao enviar mensagem');
            }
        } catch (error) {
            // Erro
            this.showMessage(`Erro: ${error.message}`, 'error');
        } finally {
            // Restaurar botão
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    async simulateApiCall(data) {
        // Simular atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Validação simulada do backend
        if (!data.email || !this.isValidEmail(data.email)) {
            return { success: false, message: 'E-mail inválido' };
        }
        
        if (data.phone && !this.isValidPhone(data.phone)) {
            return { success: false, message: 'Telefone inválido' };
        }
        
        // Sucesso
        console.log('📨 Dados do formulário:', data);
        return { 
            success: true, 
            message: 'Mensagem recebida',
            data: data 
        };
    }

    showMessage(text, type = 'info') {
        // Remover mensagens anteriores
        this.removeMessages();
        
        // Criar nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-${type}`;
        messageDiv.textContent = text;
        
        // Inserir antes do botão de submit
        const submitButton = this.form.querySelector('button[type="submit"]');
        this.form.insertBefore(messageDiv, submitButton);
        
        // Auto-remover após alguns segundos (exceto sucesso)
        if (type !== 'success') {
            setTimeout(() => {
                if (messageDiv.parentElement) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }

    removeMessages() {
        const messages = this.form.querySelectorAll('.form-success, .form-error, .form-info');
        messages.forEach(msg => msg.remove());
    }

    clearAllErrors() {
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.classList.remove('invalid', 'valid');
            this.removeError(field);
        });
    }
}

// Inicializar na carga da página
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});

// Export para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactForm;
}