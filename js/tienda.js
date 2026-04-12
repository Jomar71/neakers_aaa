document.addEventListener('DOMContentLoaded', () => {
    const NUMERO_WHATSAPP = "573205032772";
    const grid = document.getElementById('productos-grid');
    const gender = document.body.dataset.gender;
    const themeBtn = document.getElementById('theme-toggle');

    // --- LÓGICA DE TEMA (CLARO/OSCURO) ---
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- RENDERIZADO DE PRODUCTOS ---
    if (grid) {
        const productosFiltrados = gender === 'all' 
            ? productos 
            : productos.filter(p => p.genero === gender);

        productosFiltrados.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.id = `prod-${producto.id}`;
        
        const precioFormateado = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(producto.precio);

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${producto.nombre}</h3>
                <p class="product-price">${precioFormateado}</p>
                
                <div class="selector-group">
                    <label>Talla Euro</label>
                    <select class="talla-select">
                        ${producto.tallas.map(t => `<option value="${t}">${t}</option>`).join('')}
                    </select>
                </div>

                <div class="selector-group">
                    <label>Color</label>
                    <select class="color-select">
                        ${producto.colores.map(c => `<option value="${c}">${c}</option>`).join('')}
                    </select>
                </div>

                <button class="btn-whatsapp" onclick="comprarWhatsApp(${producto.id})">
                    <i class="fab fa-whatsapp"></i> Comprar por WhatsApp
                </button>
            </div>
        `;
        grid.appendChild(productCard);
        });
    }

    // --- EVENTO WHATSAPP ---
    window.comprarWhatsApp = (productId) => {
        const producto = productos.find(p => p.id === productId);
        const card = document.getElementById(`prod-${productId}`);
        
        const talla = card.querySelector('.talla-select').value;
        const color = card.querySelector('.color-select').value;
        const precio = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(producto.precio);

        const mensaje = `Hola, quiero comprar el tenis: *${producto.nombre}*\n\n` +
                        `📌 Talla: ${talla}\n` +
                        `🎨 Color: ${color}\n` +
                        `💰 Precio: ${precio}\n` +
                        `🖼️ Imagen: ${producto.imagen}\n\n` +
                        `¿Está disponible?`;

        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };
});
