// Sistema principal da JKN Store
class JKNStore {
    constructor() {
        this.currentUser = null;
        this.products = [];
        this.sales = [];
        this.CONFIG = {
            MERCADO_PAGO_TOKEN: 'APP_USR-7098968529035237-110321-fb353ee3e51b9c24b83a635c464d992e-276762745',
            GOOGLE_CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID',
        };
        this.init();
    }

    async init() {
        this.loadUserSession();
        await this.loadProducts();
        this.setupEventListeners();
        this.setupGoogleLogin();
        this.loadUI();
    }

    loadUserSession() {
        const savedUser = localStorage.getItem('jkn_user_session');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateLoginButton();
        }
    }

    async loadProducts() {
        // Tentar carregar do admin primeiro
        const adminProducts = localStorage.getItem('jkn_products');
        if (adminProducts) {
            this.products = JSON.parse(adminProducts);
        } else {
            // Produtos padrão
            this.products = this.getDefaultProducts();
            this.saveProducts();
        }
    }

    getDefaultProducts() {
        return [
            {
                id: 1,
                name: 'MusicBot Pro',
                description: 'Bot de música completo com queue, playlists e alta qualidade de áudio. Suporte a Spotify, YouTube e SoundCloud.',
                price: 25.00,
                stock: 15,
                maxStock: 20,
                features: ['Queue infinita', 'Playlists personalizadas', 'Comandos slash', 'Interface web', 'Suporte multi-plataforma'],
                icon: 'fa-music',
                downloads: {
                    botFile: 'https://drive.google.com/file/d/EXEMPLO_MUSICBOT/view',
                    documentation: 'https://docs.google.com/document/d/EXEMPLO_DOC',
                    installation: 'https://github.com/jkn/musicbot-guide',
                    support: 'https://discord.gg/jkn-music'
                },
                emailTemplate: {
                    subject: '🎵 MusicBot Pro - Download e Instalação',
                    content: 'Parabéns pela compra do MusicBot Pro! Aqui estão seus arquivos:'
                }
            },
            {
                id: 2,
                name: 'ModerBot Advanced',
                description: 'Sistema de moderação avançado com auto-mod, logs detalhados e sistema de punições automáticas.',
                price: 35.00,
                stock: 8,
                maxStock: 15,
                features: ['Auto-moderação', 'Sistema de warns', 'Logs completos', 'Anti-spam/raid', 'Filtros personalizados'],
                icon: 'fa-shield-alt',
                downloads: {
                    botFile: 'https://drive.google.com/file/d/EXEMPLO_MODERBOT/view',
                    documentation: 'https://docs.google.com/document/d/EXEMPLO_DOC2',
                    installation: 'https://github.com/jkn/moderbot-guide',
                    support: 'https://discord.gg/jkn-mod'
                },
                emailTemplate: {
                    subject: '🛡️ ModerBot Advanced - Download e Instalação',
                    content: 'Obrigado pela compra do ModerBot Advanced! Seus arquivos estão prontos:'
                }
            },
            {
                id: 3,
                name: 'EconomyBot Ultimate',
                description: 'Sistema de economia completo com loja virtual, trabalhos, cassino e sistema de investimentos.',
                price: 30.00,
                stock: 0,
                maxStock: 12,
                features: ['Sistema de moedas', 'Loja virtual', 'Mini-games', 'Trabalhos e daily', 'Sistema de investimentos'],
                icon: 'fa-coins',
                downloads: {
                    botFile: 'https://drive.google.com/file/d/EXEMPLO_ECONOMYBOT/view',
                    documentation: 'https://docs.google.com/document/d/EXEMPLO_DOC3',
                    installation: 'https://github.com/jkn/economybot-guide',
                    support: 'https://discord.gg/jkn-economy'
                },
                emailTemplate: {
                    subject: '💰 EconomyBot Ultimate - Download e Instalação',
                    content: 'Sua compra do EconomyBot Ultimate foi confirmada! Downloads disponíveis:'
                }
            },
            {
                id: 4,
                name: 'TicketBot Pro',
                description: 'Sistema de tickets profissional para suporte ao cliente com transcrições e painel de controle.',
                price: 20.00,
                stock: 25,
                maxStock: 30,
                features: ['Tickets por categoria', 'Transcrições', 'Painel de controle', 'Notificações', 'Sistema de prioridades'],
                icon: 'fa-ticket-alt',
                downloads: {
                    botFile: 'https://drive.google.com/file/d/EXEMPLO_TICKETBOT/view',
                    documentation: 'https://docs.google.com/document/d/EXEMPLO_DOC4',
                    installation: 'https://github.com/jkn/ticketbot-guide',
                    support: 'https://discord.gg/jkn-tickets'
                },
                emailTemplate: {
                    subject: '🎫 TicketBot Pro - Download e Instalação',
                    content: 'TicketBot Pro adquirido com sucesso! Acesse seus arquivos:'
                }
            },
            {
                id: 5,
                name: 'MultiBot Supreme',
                description: 'Bot all-in-one com música, moderação, economia e sistema de níveis integrados.',
                price: 50.00,
                stock: 3,
                maxStock: 10,
                features: ['Música + Moderação', 'Sistema de XP/Level', 'Economia integrada', 'Customização total', 'Dashboard web'],
                icon: 'fa-robot',
                downloads: {
                    botFile: 'https://drive.google.com/file/d/EXEMPLO_MULTIBOT/view',
                    documentation: 'https://docs.google.com/document/d/EXEMPLO_DOC5',
                    installation: 'https://github.com/jkn/multibot-guide',
                    support: 'https://discord.gg/jkn-multi'
                },
                emailTemplate: {
                    subject: '🤖 MultiBot Supreme - Download e Instalação',
                    content: 'MultiBot Supreme está pronto! Todos os arquivos e guias:'
                }
            },
            {
                id: 6,
                name: 'GamingBot Elite',
                description: 'Bot focado em gaming com stats, torneios, ranking e integrações com APIs de jogos populares.',
                price: 40.00,
                stock: 12,
                maxStock: 20,
                features: ['Stats de jogos', 'Sistema de torneios', 'Ranking global', 'Integrações API', 'Notificações de partidas'],
                icon: 'fa-gamepad',
                downloads: {
                    botFile: 'https://drive.google.com/file/d/EXEMPLO_GAMINGBOT/view',
                    documentation: 'https://docs.google.com/document/d/EXEMPLO_DOC6',
                    installation: 'https://github.com/jkn/gamingbot-guide',
                    support: 'https://discord.gg/jkn-gaming'
                },
                emailTemplate: {
                    subject: '🎮 GamingBot Elite - Download e Instalação',
                    content: 'GamingBot Elite foi enviado! Aqui estão todos os recursos:'
                }
            }
        ];
    }

    loadUI() {
        this.loadProductsUI();
        this.checkAdminAccess();
    }

    loadProductsUI() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        productsGrid.innerHTML = '';
        
        this.products.forEach(product => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = `product-card ${product.stock === 0 ? 'out-of-stock' : ''}`;
        
        let stockStatus = '';
        let stockClass = '';
        
        if (product.stock === 0) {
            stockStatus = 'Esgotado';
            stockClass = 'stock-out';
        } else if (product.stock <= 5) {
            stockStatus = `Últimas ${product.stock}`;
            stockClass = 'stock-low';
        } else {
            stockStatus = `${product.stock} disponíveis`;
            stockClass = 'stock-normal';
        }
        
        card.innerHTML = `
            <div class="product-header">
                <div class="product-icon">
                    <i class="fas ${product.icon}"></i>
                </div>
                <div class="stock-badge ${stockClass}">
                    <i class="fas fa-${product.stock === 0 ? 'times-circle' : 'check-circle'}"></i>
                    ${stockStatus}
                </div>
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <ul class="product-features">
                    ${product.features.map(feature => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `).join('')}
                </ul>
                <div class="stock-progress">
                    <div class="stock-bar">
                        <div class="stock-fill" style="width: ${(product.stock / product.maxStock) * 100}%"></div>
                    </div>
                    <div class="stock-text">${product.stock}/${product.maxStock} unidades</div>
                </div>
                <div class="product-footer">
                    <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                    <button class="buy-btn ${product.stock === 0 ? 'disabled' : ''}" 
                            onclick="jknStore.purchaseProduct(${product.id})" 
                            ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-${product.stock === 0 ? 'ban' : 'shopping-cart'}"></i>
                        <span>${product.stock === 0 ? 'Esgotado' : 'Comprar'}</span>
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    checkAdminAccess() {
        const adminEmails = ['mendesmiguel591@gmail.com', 'miguelmendes999@gmail.com'];
        const adminLink = document.querySelector('.admin-link');
        
        if (this.currentUser && adminEmails.includes(this.currentUser.email)) {
            if (adminLink) adminLink.style.display = 'flex';
        } else {
            if (adminLink) adminLink.style.display = 'none';
        }
    }

    purchaseProduct(productId) {
        if (!this.currentUser) {
            this.openModal('loginModal');
            this.showMessage('Faça login para comprar produtos!', 'error');
            return;
        }

        const product = this.products.find(p => p.id === productId);
        if (!product) {
            this.showMessage('Produto não encontrado!', 'error');
            return;
        }

        if (product.stock === 0) {
            this.showMessage('Este produto está fora de estoque!', 'error');
            return;
        }

        this.openPurchaseModal(product);
    }

    openPurchaseModal(product) {
        const modal = document.getElementById('purchaseModal');
        const content = document.getElementById('purchaseContent');
        
        if (!modal || !content) return;

        const pixCode = this.generatePixCode(product);
        
        content.innerHTML = `
            <h3>Finalizar Compra</h3>
            
            <div class="purchase-details">
                <h4><i class="fas fa-receipt"></i> Detalhes da Compra</h4>
                <div class="detail-item">
                    <span>Produto:</span>
                    <span>${product.name}</span>
                </div>
                <div class="detail-item">
                    <span>Estoque:</span>
                    <span class="${product.stock <= 5 ? 'stock-warning' : ''}">${product.stock} disponíveis</span>
                </div>
                <div class="detail-item">
                    <span>Preço:</span>
                    <span>R$ ${product.price.toFixed(2)}</span>
                </div>
                <div class="detail-item">
                    <span>Total:</span>
                    <span>R$ ${product.price.toFixed(2)}</span>
                </div>
            </div>

            <div class="delivery-info">
                <h4><i class="fas fa-envelope"></i> Entrega por Email</h4>
                <p>Após a confirmação do pagamento, você receberá um email em <strong>${this.currentUser.email}</strong> com:</p>
                <ul>
                    <li><i class="fas fa-download"></i> Link para download do bot</li>
                    <li><i class="fas fa-book"></i> Documentação completa</li>
                    <li><i class="fas fa-tools"></i> Guia de instalação</li>
                    <li><i class="fas fa-headset"></i> Link do suporte no Discord</li>
                </ul>
            </div>

            <div class="pix-instructions">
                <h4><i class="fab fa-pix"></i> Pagamento PIX</h4>
                <p>Copie o código PIX abaixo e efetue o pagamento:</p>
                <div class="pix-code" id="pixCode">${pixCode}</div>
                <button class="copy-btn" onclick="jknStore.copyPixCode()">
                    <i class="fas fa-copy"></i> Copiar Código PIX
                </button>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                    Após o pagamento, clique em "Confirmar Pagamento" para receber o email com os downloads.
                </p>
            </div>

            <div class="purchase-actions">
                <button class="confirm-btn" onclick="jknStore.confirmPurchase(${product.id})">
                    <i class="fas fa-check"></i> Confirmar Pagamento
                </button>
                <button class="cancel-btn" onclick="jknStore.closeModal('purchaseModal')">
                    <i class="fas fa-times"></i> Cancelar
                </button>
            </div>
        `;
        
        modal.style.display = 'flex';
    }

    generatePixCode(product) {
        const timestamp = Date.now();
        const productId = product.id.toString().padStart(4, '0');
        return `00020126570014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-426614174000520400005303986540${product.price.toFixed(2)}5802BR5913JKN STORE LTDA6008SAO PAULO62070503***6304${timestamp}`;
    }

    copyPixCode() {
        const pixCode = document.getElementById('pixCode');
        if (pixCode) {
            navigator.clipboard.writeText(pixCode.textContent).then(() => {
                this.showMessage('📋 Código PIX copi