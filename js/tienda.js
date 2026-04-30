document.addEventListener('DOMContentLoaded', () => {
    const NUMERO_WHATSAPP = "573205032772";
    const grid = document.getElementById('productos-grid');
    const gender = document.body.dataset.gender;
    const marcaActual = obtenerMarcaDeLaPagina();
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

    // --- FUNCIONES AUXILIARES ---
    function obtenerMarcaDeLaPagina() {
        const path = window.location.pathname;
        const marca = path.split('/').pop().split('.')[0].replace(/_/g, ' ');
        // Verificar si es una página de marca específica
        const marcas = [
            "ADIDAS", "ARMANI", "ASICS", "CATERPILLAR", "COACH", "CONVERSE", 
            "DIESEL", "DOLCE & GABBANA", "FILA", "GUAYO", "HOKA", "HUGO BOSS", 
            "LACOSTE", "LE COQ SPORTIF", "LOUIS VUITTON", "NEW BALANCE", "NIKE", 
            "ON CLOUD", "PUMA", "REEBOK", "SKECHERS", "TIMBERLAND", "TOMMY HILFIGER", 
            "UNDER ARMOUR", "VANS"
        ];
        
        return marcas.find(m => m.toUpperCase() === marca.toUpperCase()) || null;
    }

    // --- RENDERIZADO DE PRODUCTOS POR MARCA ---
    if (grid) {
        let productosFiltrados = [];
        
        if (marcaActual) {
            // Si estamos en una página de marca específica, mostrar solo productos de esa marca
            productosFiltrados = productos.filter(p => p.marca.toUpperCase() === marcaActual.toUpperCase());
        } else {
            // En páginas generales (hombres/mujeres), mostrar marcas
            productosFiltrados = productos.reduce((marcasUnicas, producto) => {
                if (!marcasUnicas.some(m => m.marca === producto.marca)) {
                    marcasUnicas.push({
                        id: producto.id,
                        marca: producto.marca,
                        genero: producto.genero,
                        imagen: producto.imagen.replace(/\/[^\/]*$/, '/marca.jpg'), // Imagen genérica de marca
                        descripcion: `Productos de ${producto.marca}`
                    });
                }
                return marcasUnicas;
            }, []);
        }

        if (productosFiltrados.length > 0) {
            productosFiltrados.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.id = `prod-${producto.id}`;
                
                if (marcaActual) {
                    // Vista de productos dentro de una marca
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
                            <p class="product-ref">Ref: ${producto.referencia}</p>
                            <p class="product-price">${precioFormateado}</p>
                            
                            <button class="btn-whatsapp" onclick="comprarWhatsApp(${producto.id})">
                                <i class="fab fa-whatsapp"></i> Consultar disponibilidad
                            </button>
                        </div>
                    `;
                } else {
                    // Vista de marcas en páginas generales
                    productCard.innerHTML = `
                        <div class="brand-image">
                            <img src="${producto.imagen}" alt="${producto.marca}" loading="lazy">
                        </div>
                        <div class="brand-info">
                            <h3 class="brand-name">${producto.marca}</h3>
                            <p class="brand-description">${producto.descripcion}</p>
                            
                            <a href="marcas/${producto.marca.toLowerCase().replace(/\s+/g, '_')}.html" class="btn-ver-marcas">
                                Ver Colección
                            </a>
                        </div>
                    `;
                }
                
                grid.appendChild(productCard);
            });
        } else {
            grid.innerHTML = '<p class="no-products">Actualmente no hay productos disponibles para esta marca.</p>';
        }
    }

    // --- EVENTO WHATSAPP ---
    window.comprarWhatsApp = (productId) => {
        const producto = productos.find(p => p.id === productId);
        
        if (!producto) {
            console.error('Producto no encontrado:', productId);
            return;
        }
        
        const precio = new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: 'COP', 
            minimumFractionDigits: 0 
        }).format(producto.precio);

        const mensaje = `Hola, estoy interesado(a) en el producto: *${producto.nombre}*\n\n` +
                        `📌 Marca: ${producto.marca}\n` +
                        `🏷️ Referencia: ${producto.referencia}\n` +
                        `💰 Precio: ${precio}\n` +
                        `🖼️ Imagen: ${producto.imagen}\n\n` +
                        `¿Está disponible para comprar?`;

        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };
});