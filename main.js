document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
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
    const testPaymentProcessBtn = document.getElementById('test-payment-process-btn');

    // Campos del formulario de pago
    const cardNumberInput = document.getElementById('card-number');
    const cardNameInput = document.getElementById('card-name');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    const payButton = document.getElementById('pay-with-card-btn');

    // Cargar carrito desde LocalStorage o inicializarlo vacío
    // Esta línea es la que recupera los datos guardados.
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // --- LISTA DE 50 PRODUCTOS CON ICONOS (EMOJIS) ---
    const products = [
        { id: 1, name: 'Manzanas Rojas (kg)', price: 2.50, icon: '🍎' },
        { id: 2, name: 'Leche Entera (1L)', price: 0.99, icon: '🥛' },
        { id: 3, 'name': 'Pan Blanco Rebanado', 'price': 1.80, 'icon': '🍞' },
        { id: 4, 'name': 'Huevos (docena)', 'price': 2.30, 'icon': '🥚' },
        { id: 5, 'name': 'Arroz Blanco (1kg)', 'price': 1.50, 'icon': '🍚' },
        { id: 6, 'name': 'Frijoles Rojos (1kg)', 'price': 1.20, 'icon': '🫘' },
        { id: 7, 'name': 'Azúcar Blanca (1kg)', 'price': 1.05, 'icon': '🍚' },
        { id: 8, 'name': 'Aceite Vegetal (1L)', 'price': 2.10, 'icon': '🍾' },
        { id: 9, 'name': 'Café Molido (250g)', 'price': 3.80, 'icon': '☕' },
        { id: 10, 'name': 'Sal Refinada (500g)', 'price': 0.75, 'icon': '🧂' },
        { id: 11, 'name': 'Pechuga de Pollo (kg)', 'price': 5.75, 'icon': '🍗' },
        { id: 12, 'name': 'Carne Molida (kg)', 'price': 6.20, 'icon': '🥩' },
        { id: 13, 'name': 'Tomates (kg)', 'price': 1.60, 'icon': '🍅' },
        { id: 14, 'name': 'Cebollas (kg)', 'price': 1.10, 'icon': '🧅' },
        { id: 15, 'name': 'Papas (kg)', 'price': 1.30, 'icon': '🥔' },
        { id: 16, 'name': 'Zanahorias (manojo)', 'price': 0.90, 'icon': '🥕' },
        { id: 17, 'name': 'Naranjas (kg)', 'price': 1.70, 'icon': '🍊' },
        { id: 18, 'name': 'Bananas (kg)', 'price': 1.40, 'icon': '🍌' },
        { id: 19, 'name': 'Aguacates (unidad)', 'price': 0.85, 'icon': '🥑' },
        { id: 20, 'name': 'Pasta Dental', 'price': 2.90, 'icon': '🦷' },
        { id: 21, 'name': 'Jabón de Tocador', 'price': 0.60, 'icon': '🧼' },
        { id: 22, 'name': 'Champú (500ml)', 'price': 4.50, 'icon': '🧴' },
        { id: 23, 'name': 'Detergente de Ropa (kg)', 'price': 5.10, 'icon': '🧺' },
        { id: 24, 'name': 'Papel Higiénico (4 rollos)', 'price': 3.20, 'icon': '🧻' },
        { id: 25, 'name': 'Limpiador Multiusos', 'price': 2.70, 'icon': '🧽' },
        { id: 26, 'name': 'Refresco Cola (2L)', 'price': 1.60, 'icon': '🥤' },
        { id: 27, 'name': 'Jugo de Naranja (1L)', 'price': 1.95, 'icon': '🍊' },
        { id: 28, 'name': 'Cereal de Desayuno', 'price': 3.10, 'icon': '🥣' },
        { id: 29, 'name': 'Yogurt Natural (litro)', 'price': 2.40, 'icon': '🍦' },
        { id: 30, 'name': 'Queso Fresco (250g)', 'price': 3.00, 'icon': '🧀' },
        { id: 31, 'name': 'Mantequilla (200g)', 'price': 2.60, 'icon': '🧈' },
        { id: 32, 'name': 'Gelatina (paquete)', 'price': 0.80, 'icon': '🍮' },
        { id: 33, 'name': 'Galletas Surtidas', 'price': 2.20, 'icon': '🍪' },
        { id: 34, 'name': 'Chocolate en Barra', 'price': 1.50, 'icon': '🍫' },
        { id: 35, 'name': 'Atún en Lata', 'price': 1.30, 'icon': '🐟' },
        { id: 36, 'name': 'Sopa Instantánea', 'price': 0.70, 'icon': '🍜' },
        { id: 37, 'name': 'Salsa de Tomate (bote)', 'price': 1.10, 'icon': '🥫' },
        { id: 38, 'name': 'Mayonesa (frasco)', 'price': 2.45, 'icon': '🧴' },
        { id: 39, 'name': 'Mostaza (frasco)', 'price': 1.90, 'icon': '🌭' },
        { id: 40, 'name': 'Pan para Hot Dog (paquete)', 'price': 1.99, 'icon': '🥖' },
        { id: 41, 'name': 'Salchichas (paquete)', 'price': 2.80, 'icon': '🌭' },
        { id: 42, 'name': 'Hielo (bolsa)', 'price': 1.00, 'icon': '🧊' },
        { id: 43, 'name': 'Servilletas (paquete)', 'price': 1.20, 'icon': ' napkins' },
        { id: 44, 'name': 'Fósforos', 'price': 0.50, 'icon': '🔥' },
        { id: 45, 'name': 'Velas (paquete)', 'price': 1.60, 'icon': '🕯️' },
        { id: 46, 'name': 'Bombillas (unidad)', 'price': 2.00, 'icon': '💡' },
        { id: 47, 'name': 'Bolsas de Basura', 'price': 1.70, 'icon': '🗑️' },
        { id: 48, 'name': 'Esponjas (paquete)', 'price': 1.30, 'icon': '🧽' },
        { id: 49, 'name': 'Detergente de Platos', 'price': 2.20, 'icon': '🍽️' },
        { id: 50, 'name': 'Pasta para Sopa', 'price': 0.95, 'icon': '🍝' }
    ];

    // --- FUNCIONES DEL CARRITO ---

    function renderProducts() {
        if (!productListDiv) return;
        productListDiv.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <div class="product-icon">${product.icon}</div>
                <h4>${product.name}</h4>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="btn add-to-cart-btn" data-id="${product.id}">Añadir al Carrito</button>
            `;
            productListDiv.appendChild(productCard);
        });
    }

    function updateCartDisplay() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block'; // Muestra el mensaje de carrito vacío
            cartItemsDiv.style.display = 'none'; // Oculta la lista de ítems del carrito
            checkoutButton.disabled = true; // Desactivar botón de checkout si el carrito está vacío.
            checkoutButton.style.opacity = '0.6'; // Añadir un estilo visual para indicar que está deshabilitado
            checkoutButton.style.cursor = 'not-allowed';
        } else {
            emptyCartMessage.style.display = 'none'; // Oculta el mensaje de carrito vacío
            cartItemsDiv.style.display = 'block'; // Muestra la lista de ítems del carrito
            checkoutButton.disabled = false; // Activar botón de checkout
            checkoutButton.style.opacity = '1'; // Restaurar el estilo visual
            checkoutButton.style.cursor = 'pointer';

            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (product) {
                    const itemTotal = product.price * item.quantity;
                    total += itemTotal;
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item');
                    cartItemDiv.innerHTML = `
                        <div class="product-icon-cart">${product.icon}</div>
                        <div class="item-details">
                            <h5>${product.name}</h5>
                            <p>$${product.price.toFixed(2)} c/u</p>
                        </div>
                        <div class="item-quantity">
                            <button data-action="decrease" data-id="${product.id}">-</button>
                            <span>${item.quantity}</span>
                            <button data-action="increase" data-id="${product.id}">+</button>
                        </div>
                        <p class="item-total">$${itemTotal.toFixed(2)}</p>
                        <button class="remove-item-btn" data-id="${product.id}">🗑️</button>
                    `;
                    cartItemsDiv.appendChild(cartItemDiv);
                }
            });
        }

        cartTotalSpan.textContent = total.toFixed(2);
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        saveCart();
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // --- EVENT LISTENERS ---

    productListDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(event.target.dataset.id);
            const productToAdd = products.find(p => p.id === productId);

            if (productToAdd) {
                const existingItem = cart.find(item => item.id === productId);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({ id: productId, quantity: 1 });
                }
                updateCartDisplay();
            }
        }
    });

    openCartBtn.addEventListener('click', (event) => {
        event.preventDefault();
        cartModal.style.display = 'flex';
        updateCartDisplay(); // Asegura que el carrito se actualice cuando se abre el modal
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

    checkoutButton.addEventListener('click', () => {
        // Only proceed if the cart is NOT empty and the button is enabled
        if (cart.length > 0 && !checkoutButton.disabled) {
            cartModal.style.display = 'none';
            paymentModal.style.display = 'flex';
        } else {
            alert('Tu carrito está vacío. ¡Agrega productos para proceder al pago!');
        }
    });

    closePaymentBtn.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    // --- VALIDACIÓN DE FORMULARIO DE PAGO Y PROCESO DE PRUEBA ---

    function validateCardNumber(number) {
        const cleanNumber = number.replace(/[\s-]/g, '');
        return /^\d{13,19}$/.test(cleanNumber);
    }

    function formatCardNumber(number) {
        const cleanNumber = number.replace(/\D/g, '');
        const parts = [];
        for (let i = 0; i < cleanNumber.length; i += 4) {
            parts.push(cleanNumber.substring(i, i + 4));
        }
        return parts.join(' ').trim();
    }

    function validateExpiryDate(date) {
        const parts = date.split('/');
        if (parts.length !== 2) return false;

        const month = parseInt(parts[0], 10);
        const year = parseInt(parts[1], 10);

        if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return false;

        // Año actual completo
        const currentFullYear = new Date().getFullYear();
        // Las tarjetas suelen usar AA (últimos dos dígitos del año)
        const currentTwoDigitYear = currentFullYear % 100;

        // Si el año ingresado es menor que el año actual de dos dígitos, inválido
        if (year < currentTwoDigitYear) {
            return false;
        }

        // Si el año es el actual, verificar el mes
        if (year === currentTwoDigitYear) {
            const currentMonth = new Date().getMonth() + 1; // getMonth() es 0-index
            if (month < currentMonth) {
                return false;
            }
        }
        return true;
    }

    function formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
    }

    function validateCvv(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }

    cardNumberInput.addEventListener('input', (event) => {
        event.target.value = formatCardNumber(event.target.value);
    });

    expiryDateInput.addEventListener('input', (event) => {
        formatExpiryDate(event.target);
    });

    function validatePaymentForm() {
        let isValid = true;

        const inputs = [cardNumberInput, cardNameInput, expiryDateInput, cvvInput];
        inputs.forEach(input => input.classList.remove('is-invalid')); // Limpiar estados de error previos

        if (!validateCardNumber(cardNumberInput.value)) {
            cardNumberInput.classList.add('is-invalid');
            isValid = false;
        }

        if (cardNameInput.value.trim() === '') {
            cardNameInput.classList.add('is-invalid');
            isValid = false;
        }

        if (!validateExpiryDate(expiryDateInput.value)) {
            expiryDateInput.classList.add('is-invalid');
            isValid = false;
        }

        if (!validateCvv(cvvInput.value)) {
            cvvInput.classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }

    // Event listener para el botón de proceso de pago de prueba
    if (testPaymentProcessBtn) {
        testPaymentProcessBtn.addEventListener('click', (event) => {
            event.preventDefault();

            if (validatePaymentForm()) {
                alert('¡El proceso de pago se ha completado con éxito! Su pedido ha sido registrado.');
                cart = []; // Vaciar el carrito
                updateCartDisplay();
                paymentModal.style.display = 'none';
                // Limpiar campos del formulario después del pago
                cardNumberInput.value = '';
                cardNameInput.value = '';
                expiryDateInput.value = '';
                cvvInput.value = '';
            } else {
                alert('Por favor, corrige los errores en el formulario de pago.');
            }
        });
    }

    // Event listener para el botón "Pagar con Tarjeta de Crédito" (para pasarela real)
    if (payButton) {
        payButton.addEventListener('click', (event) => {
            if (!validatePaymentForm()) {
                event.preventDefault(); // Detener la acción si hay errores
                alert('Por favor, corrige los errores en el formulario de pago antes de continuar.');
            } else {
                // Si la validación es exitosa, redirige a la pasarela
                // **IMPORTANTE:** Reemplaza 'https://checkout.wompi.co/checkout/YOUR_PUBLIC_KEY'
                // con la URL real de tu pasarela de pago (ej. Wompi, Stripe, etc.)
                // e incluye tu clave pública si es necesario.
                window.open('https://checkout.wompi.co/checkout/YOUR_PUBLIC_KEY', '_blank');

                // En un escenario real, el carrito solo se vaciaría después de recibir
                // una confirmación de éxito de la pasarela de pago (usualmente a través de un webhook
                // o un callback en tu servidor). Por simplicidad aquí, lo vaciamos inmediatamente.
                cart = [];
                updateCartDisplay();
                paymentModal.style.display = 'none';
                 // Limpiar campos del formulario después de intentar el pago
                cardNumberInput.value = '';
                cardNameInput.value = '';
                expiryDateInput.value = '';
                cvvInput.value = '';
            }
        });
    }


    // --- Inicialización ---
    renderProducts();
    updateCartDisplay(); // Llama a esta función al inicio para asegurar que el display esté correcto.
});
