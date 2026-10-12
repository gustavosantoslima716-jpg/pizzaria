document.addEventListener('DOMContentLoaded', () => {
    // Função para escapar caracteres HTML e prevenir XSS
    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }

    // Dados do Cardápio
    const menuItems = [
        {
            id: 1,
            name: "Margherita D.O.P.",
            category: "tradicionais",
            price: "R$ 82",
            description: "Molho de tomates San Marzano, Mozzarella di Bufala Campana, manjericão fresco e azeite extra virgem D.O.P.",
            image: "assets/pizza-margherita.svg"
        },
        {
            id: 2,
            name: "Diavola Piccante",
            category: "tradicionais",
            price: "R$ 94",
            description: "Molho de tomate, Mozzarella fior di latte, salame piccante calabacês, pimenta dedo-de-moça e manjericão.",
            image: "assets/pizza-diavola.svg"
        },
        {
            id: 3,
            name: "Quattro Formaggi & Tartufo",
            category: "especiais",
            price: "R$ 112",
            description: "Fior di latte, Gorgonzola D.O.P., Fontina, Parmigiano Reggiano 24 meses e gotas de creme de trufas negras.",
            image: "assets/pizza-truffle.svg"
        },
        {
            id: 4,
            name: "Prosciutto & Funghi",
            category: "especiais",
            price: "R$ 108",
            description: "Fior di latte, cogumelos Portobello grelhados, presunto Parma 18 meses e lâminas de trufa fresca.",
            image: "assets/pizza-prosciutto.svg"
        },
        {
            id: 5,
            name: "Carbonara 1910",
            category: "especiais",
            price: "R$ 98",
            description: "Base branca com fior di latte, guanciale crocante, gema orgânica curada e Pecorino Romano ralado na hora.",
            image: "assets/pizza-carbonara.svg"
        },
        {
            id: 6,
            name: "Nutella & Pistacchio",
            category: "doces",
            price: "R$ 78",
            description: "Massa fermentada artesanal assada, generosa camada de Nutella cremosa e granulado de pistache siciliano.",
            image: "assets/pizza-sweet.svg"
        }
    ];

    // Renderizar Menu
    const menuGrid = document.getElementById('menuGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function displayMenuItems(category) {
        menuGrid.innerHTML = '';
        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);

        filteredItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.innerHTML = `
                <div class="menu-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="menu-details">
                    <div class="menu-item-header">
                        <h3>${item.name}</h3>
                        <span class="price">${item.price}</span>
                    </div>
                    <p>${item.description}</p>
                    <button class="btn btn-outline order-btn" data-name="${item.name}">Encomendar</button>
                </div>
            `;
            menuGrid.appendChild(card);
        });

        // Adicionar eventos aos novos botões
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pizzaName = e.target.getAttribute('data-name');
                openModal(`Pedido: ${pizzaName}`, `Excelente escolha! Para finalizar seu pedido da ${pizzaName}, entre em contato via WhatsApp (11) 3191-1910 ou finalize pelo nosso atendimento exclusivo.`);
            });
        });
    }

    // Filtros do Cardápio
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            displayMenuItems(category);
        });
    });

    // Inicializar cardápio
    displayMenuItems('all');

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu Mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Modal Functionality
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');

    function openModal(title, text) {
        modalBody.innerHTML = `
            <h3>${title}</h3>
            <p>${text}</p>
            <button class="btn btn-primary btn-block" id="modalActionBtn">Entrar em Contato</button>
        `;
        modal.classList.add('active');

        document.getElementById('modalActionBtn').addEventListener('click', () => {
            alert('Redirecionando para o atendimento WhatsApp da Pizzaria 1910...');
            modal.classList.remove('active');
        });
    }

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Formulário de Reserva
    const reservationForm = document.getElementById('reservationForm');
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;

        const escapedName = escapeHTML(name);
        const escapedDate = escapeHTML(date);
        const escapedTime = escapeHTML(time);
        const escapedGuests = escapeHTML(guests);

        openModal('Reserva Solicitada!', `Obrigado, ${escapedName}! Sua mesa para ${escapedGuests} pessoa(s) no dia ${escapedDate} às ${escapedTime} foi pré-reservada com sucesso. Entraremos em contato para confirmação.`);
        reservationForm.reset();
    });
});
