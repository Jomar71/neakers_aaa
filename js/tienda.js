document.addEventListener('DOMContentLoaded', () => {
    const NUMERO_WHATSAPP = "573205032772";
    const grid = document.getElementById('productos-grid');
    const gender = document.body.dataset.gender;
    const themeBtn = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Detectar si estamos en un subdirectorio (como /marcas/)
    const isSubDir = window.location.pathname.includes('/marcas/');
    const pathPrefix = isSubDir ? '../' : '';

    // --- LÓGICA DE TEMA (CLARO/OSCURO) ---
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- LÓGICA DE MENÚ MÓVIL ---
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== menuToggle) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // --- FUNCIONES AUXILIARES ---
    function obtenerMarcaDeLaPagina() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        if (!fileName || fileName === 'index.html' || fileName === 'hombres.html' || fileName === 'mujeres.html') {
            return null;
        }

        const marcaSlug = fileName.split('.')[0].replace(/_/g, ' ');

        // Verificar si es una página de marca específica
        const marcasDisponibles = [...new Set(productos.map(p => p.marca.toUpperCase()))];
        return marcasDisponibles.find(m => m.toLowerCase() === marcaSlug.toLowerCase()) || null;
    }

    const marcaActual = obtenerMarcaDeLaPagina();

    // --- RENDERIZADO DE PRODUCTOS ---
    if (grid) {
        let productosFiltrados = [];

        if (marcaActual) {
            // Caso 1: Estamos en una página de marca (ej: marcas/adidas.html)
            productosFiltrados = productos.filter(p => p.marca.toUpperCase() === marcaActual.toUpperCase());
        } else if (gender && gender !== 'none') {
            // Caso 2: Estamos en una página de género (ej: hombres.html)
            // Agrupar por marcas que tengan productos de este género
            const normalizedGender = gender.toLowerCase();

            const marcasConGenero = productos.filter(p => {
                const pGender = p.genero.toLowerCase();
                const isMatch = (normalizedGender === 'hombre' && (pGender === 'hombre' || pGender === 'caballero')) ||
                    (normalizedGender === 'mujer' && (pGender === 'mujer' || pGender === 'dama')) ||
                    (pGender === 'unisex');
                return isMatch;
            });

            productosFiltrados = marcasConGenero.reduce((marcasUnicas, producto) => {
                if (!marcasUnicas.some(m => m.marca === producto.marca)) {
                    // Buscar si hay una configuración de banner para esta marca en productos.js
                    // (Asumiremos que si existe marcasConfig, la usamos)
                    const config = (typeof marcasConfig !== 'undefined') ? marcasConfig[producto.marca.toUpperCase()] : null;

                    marcasUnicas.push({
                        id: producto.id,
                        marca: producto.marca,
                        genero: producto.genero,
                        imagen: config?.banner || producto.imagen,
                        descripcion: config?.descripcion || `Colección Premium ${producto.marca}`
                    });
                }
                return marcasUnicas;
            }, []);
        }

        if (productosFiltrados.length > 0) {
            productosFiltrados.forEach(item => {
                const card = document.createElement('div');
                card.className = 'product-card reveal';

                if (marcaActual) {
                    // Renderizar producto individual
                    const precioFormateado = new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0
                    }).format(item.precio);

                    // Ajustar ruta de imagen si estamos en subdirectorio
                    const imgSrc = pathPrefix + item.imagen;

                    card.innerHTML = `
                        <div class="product-image">
                            <img src="${imgSrc}" alt="${item.nombre}" loading="lazy" onerror="this.src='${pathPrefix}img/logos/2NIKE.jpeg'">
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${item.nombre}</h3>
                            <p class="product-ref">Ref: ${item.referencia}</p>
                            <p class="product-price">${precioFormateado}</p>
                            
                            <button class="btn-whatsapp" onclick="comprarWhatsApp(${item.id})">
                                <i class="fab fa-whatsapp"></i> Consultar disponibilidad
                            </button>
                        </div>
                    `;
                } else {
                    // Renderizar tarjeta de marca
                    const brandSlug = item.marca.toLowerCase().replace(/\s+/g, '_');

                    // Priorizar imagen de banner si está definida, sino usar lógica de logo o fallback
                    const config = (typeof marcasConfig !== 'undefined') ? marcasConfig[item.marca.toUpperCase()] : null;
                    const brandBannerSrc = config?.banner ? pathPrefix + config.banner : null;

                    const brandFileName = item.marca.toUpperCase().replace(/\s+/g, '');
                    const brandLogoSrc = `${pathPrefix}img/logos/LOGO${brandFileName}.jpeg`;
                    const fallbackSrc = pathPrefix + item.imagen;

                    card.innerHTML = `
                        <div class="brand-image">
                            <img src="${brandBannerSrc || brandLogoSrc}" alt="${item.marca}" loading="lazy" 
                                 onerror="this.onerror=null; this.src='${pathPrefix}img/logos/LOGO${brandFileName}.png'; 
                                 this.onerror=function(){this.src='${fallbackSrc}';}">
                        </div>
                        <div class="brand-info">
                            <h3 class="brand-name">${item.marca}</h3>
                            <p class="brand-description">${item.descripcion}</p>
                            
                            <a href="marcas/${brandSlug}.html" class="btn-ver-marcas">
                                Ver Colección
                            </a>
                        </div>
                    `;
                }

                grid.appendChild(card);
            });

            // Trigger animation
            setTimeout(() => {
                document.querySelectorAll('.reveal').forEach((el, index) => {
                    setTimeout(() => el.classList.add('active'), index * 100);
                });
            }, 100);

        } else {
            grid.innerHTML = '<p class="no-products">Próximamente nuevos modelos disponibles.</p>';
        }
    }

    // --- EVENTO WHATSAPP ---
    window.comprarWhatsApp = (productId) => {
        const producto = productos.find(p => p.id === productId);

        if (!producto) return;

        const precio = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(producto.precio);

        // Construir una URL absoluta limpia sin ".."
        const imgUrl = new URL(pathPrefix + producto.imagen, window.location.href).href;

        const mensaje = `Hola SNEAKERSAAA, estoy interesado(a) en:\n\n` +
            `👟 *${producto.nombre}*\n` +
            `🏷️ Ref: ${producto.referencia}\n` +
            `💰 Precio: ${precio}\n\n` +
            `¿Tienen disponibilidad en mi talla?\n\n` +
            `${imgUrl}`;

        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

});