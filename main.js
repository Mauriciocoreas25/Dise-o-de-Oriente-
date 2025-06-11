document.addEventListener('DOMContentLoaded', () => {
    const productListDiv = document.getElementById('product-list');
    const cartCountSpan = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const openCartBtn = document.getElementById('openCart');
    const closeCartBtn = document.querySelector('#cart-modal .close-button');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    const paymentModal = document.getElementById('payment-modal');
    const closePaymentBtn = document.querySelector('#payment-modal .close-payment-button');
    const simulatePaymentBtn = document.getElementById('simulate-payment');

    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Cargar carrito desde LocalStorage

    // --- LISTA DE 50 PRODUCTOS CON ICONOS (EMOJIS) ---
    const products = [
        { id: 1, name: 'Manzanas Rojas (kg)', price: 2.50, icon: '🍎' },
        { id: 2, name: 'Leche Entera (1L)', price: 0.99, icon: '🥛' },
        { id: 3, name: 'Pan Blanco Rebanado', price: 1.80, icon: '🍞' },
        { id: 4, name: 'Huevos Grandes (docena)', price: 3.20, icon: '🥚' },
        { id: 5, name: 'Arroz Grano Largo (1kg)', price: 1.75, icon: '🍚' },
        { id: 6, name: 'Pasta Espagueti (500g)', price: 0.85, icon: '🍝' },
        { id: 7, name: 'Aceite Vegetal (1L)', price: 3.50, icon: '🧈' }, // Usando emoji de mantequilla o puedes buscar otro
        { id: 8, name: 'Azúcar Blanca (1kg)', price: 1.20, icon: '🍚' }, // Mismo que arroz, o buscar uno mejor
        { id: 9, name: 'Sal Refinada (500g)', price: 0.60, icon: '🧂' },
        { id: 10, name: 'Café Molido (250g)', price: 4.10, icon: '☕' },
        { id: 11, name: 'Jugo de Naranja (1.5L)', price: 2.75, icon: '🍊' },
        { id: 12, name: 'Refresco Cola (2L)', price: 1.90, icon: '🥤' },
        { id: 13, name: 'Agua Embotellada (6pk)', price: '3.00', icon: '💧' },
        { id: 14, name: 'Cereal de Maíz (300g)', price: 2.99, icon: '🥣' },
        { id: 15, name: 'Mermelada de Fresa (300g)', price: 2.15, icon: '🍓' },
        { id: 16, name: 'Atún en Lata', price: 1.25, icon: '🐟' },
        { id: 17, name: 'Sopa de Tomate (lata)', price: 0.70, icon: '🥫' },
        { id: 18, name: 'Frijoles Negros (lata)', price: 0.95, icon: '🫘' },
        { id: 19, name: 'Galletas de Vainilla', price: 1.60, icon: '🍪' },
        { id: 20, name: 'Chocolates Surtidos (barra)', price: 1.10, icon: '🍫' },
        { id: 21, name: 'Pollo Fresco (kg)', price: 5.80, icon: '🍗' },
        { id: 22, name: 'Carne Molida (500g)', price: 4.50, icon: '🥩' },
        { id: 23, name: 'Pescado Filete (200g)', price: 3.90, icon: '🐠' },
        { id: 24, name: 'Yogurt Natural (litro)', price: 2.30, icon: '🍦' }, // O 🍶
        { id: 25, name: 'Queso Mozzarella (200g)', price: 3.10, icon: '🧀' },
        { id: 26, name: 'Mantequilla (250g)', price: 2.60, icon: '🧈' },
        { id: 27, name: 'Pan de Hamburguesa (6u)', price: 2.00, icon: '🍔' },
        { id: 28, name: 'Tomates (kg)', price: 1.80, icon: '🍅' },
        { id: 29, name: 'Cebollas (kg)', price: 1.10, icon: '🧅' },
        { id: 30, name: 'Papas (kg)', price: 1.30, icon: '🥔' },
        { id: 31, name: 'Zanahorias (kg)', price: 1.40, icon: '🥕' },
        { id: 32, name: 'Pepinos (unidad)', price: 0.75, icon: '🥒' },
        { id: 33, name: 'Lechuga Romana (unidad)', price: 1.20, icon: '🥬' },
        { id: 34, name: 'Plátanos (kg)', price: 1.65, icon: '🍌' },
        { id: 35, name: 'Naranjas (kg)', price: 2.10, icon: '🍊' },
        { id: 36, name: 'Limones (unidad)', price: 0.30, icon: '🍋' },
        { id: 37, name: 'Manzanas Verdes (kg)', price: 2.60, icon: '🍏' },
        { id: 38, name: 'Jabon para Ropa (polvo 1kg)', price: 5.20, icon: '🧺' }, // O 🧼
        { id: 39, name: 'Detergente Lavavajillas (500ml)', price: 2.80, icon: '🫧' }, // Burbujas
        { id: 40, name: 'Limpiador Multiusos (1L)', price: 3.10, icon: '🧴' }, // Botella de loción, puedes cambiar
        { id: 41, name: 'Papel Higiénico (4 rollos)', price: 3.70, icon: '🚽' }, // O un rollo de papel
        { id: 42, name: 'Toallas de Cocina (1 rollo)', price: 1.95, icon: '🧻' }, // Rollo de papel de inodoro, similar
        { id: 43, name: 'Bolsas de Basura (20u)', price: 2.40, icon: '🗑️' },
        { id: 44, name: 'Pasta Dental (75ml)', price: 1.50, icon: '🦷' },
        { id: 45, name: 'Cepillo de Dientes', price: 1.80, icon: '🪥' },
        { id: 46, name: 'Champú (400ml)', price: 4.30, icon: '🧴' }, // Misma botella que el limpiador
        { id: 47, name: 'Jabón de Tocador (barra)', price: 0.80, icon: '🧼' },
        { id: 48, name: 'Acondicionador (400ml)', price: 4.30, icon: '🧴' }, // Misma botella
        { id: 49, name: 'Crema para Manos (100ml)', price: 3.00, icon: '🧴' }, // Misma botella
        { id: 50, name: 'Detergente para Platos (500ml)', price: 2.10, icon: '🫧' } // Burbujas
    ];

    // --- FIN DE LA LISTA DE 50 PRODUCTOS CON ICONOS ---


    // Función para renderizar los productos en la página
    function renderProducts() {
        productListDiv.innerHTML = ''; // Limpiar productos existentes
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <div class="product-icon">${product.icon}</div> <h4>${product.name}</h4>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="btn add-to-cart-btn" data-id="${product.id}">Agregar al Carrito</button>
            `;
            productListDiv.appendChild(productCard);
        });

        // Añadir listeners a los botones "Agregar al Carrito"
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.id);
                addToCart(productId);
            });
        });
    }

    // Función para añadir producto al carrito
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            // Se usa el 'icon' en lugar de 'image' al añadir al carrito
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
    }

    // Función para actualizar la visualización del carrito
    function updateCartDisplay() {
        cartItemsDiv.innerHTML = ''; // Limpiar el contenido actual del carrito
        let total = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutButton.disabled = true;
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutButton.disabled = false;
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <div class="product-icon-cart">${item.icon}</div> <div class="item-details">
                        <h5>${item.name}</h5>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="item-quantity">
                        <button data-id="${item.id}" data-action="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button data-id="${item.id}" data-action="increase">+</button>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">X</button>
                `;
                cartItemsDiv.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }

        cartTotalSpan.textContent = total.toFixed(2);
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en LocalStorage
    }

    // Event listeners para el carrito (mantienen la misma lógica)
    openCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    cartItemsDiv.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('remove-item-btn')) {
            const productId = parseInt(target.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            updateCartDisplay();
        } else if (target.dataset.action === 'increase') {
            const productId = parseInt(target.dataset.id);
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity++;
                updateCartDisplay();
            }
        } else if (target.dataset.action === 'decrease') {
            const productId = parseInt(target.dataset.id);
            const item = cart.find(i => i.id === productId);
            if (item && item.quantity > 1) {
                item.quantity--;
                updateCartDisplay();
            } else if (item && item.quantity === 1) {
                cart = cart.filter(it => it.id !== productId);
                updateCartDisplay();
            }
        }
    });

    // Abrir Modal de Pago
    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            cartModal.style.display = 'none';
            paymentModal.style.display = 'flex';
        } else {
            alert('Tu carrito está vacío. ¡Agrega productos para proceder al pago!');
        }
    });

    closePaymentBtn.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    // Simular Pago Completado
    simulatePaymentBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Previene el envío del formulario
        alert('¡Pago simulado exitoso! Tu pedido ha sido procesado.');
        cart = []; // Vaciar el carrito
        updateCartDisplay();
        paymentModal.style.display = 'none';
    });


    // Inicializar la página
    renderProducts();
    updateCartDisplay();
});