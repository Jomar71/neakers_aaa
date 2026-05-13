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

    // --- LÓGICA DE CARRITO ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const toggleCart = () => {
        window.location.href = pathPrefix + 'carrito.html';
    };

    const updateCartBadge = () => {
        const badges = [
            document.getElementById('cart-badge'),
            document.getElementById('cart-badge-fab')
        ];
        badges.forEach(badge => {
            if (badge) badge.innerText = cart.length;
        });

        const fab = document.getElementById('cart-fab');
        if (fab) {
            if (cart.length > 0) {
                fab.classList.add('visible');
            } else {
                fab.classList.remove('visible');
            }
        }
    };

    window.changeProductImage = (thumbnail, newSrc) => {
        const gallery = thumbnail.parentElement;
        const card = gallery.closest('.product-card');
        const mainImg = card.querySelector('.product-image img');

        if (!mainImg) return;

        // Actualizar imagen principal con animación
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
        }, 200);

        // Actualizar thumbnails activos
        gallery.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
    };

    window.addToCart = (productId) => {
        const producto = productos.find(p => p.id === productId);
        if (!producto) return;

        const sizeSelector = document.querySelector(`.size-selector[data-product-id="${productId}"]`);
        const selectedSize = sizeSelector ? sizeSelector.value : 'N/A';

        cart.push({
            ...producto,
            tallaEscogida: selectedSize
        });

        saveCart();
        updateCartBadge();

        // Redirigir a la página de carrito
        window.location.href = pathPrefix + 'carrito.html';
    };

    const injectCartUI = () => {
        const navContent = document.querySelector('.nav-content');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        if (navContent && !document.getElementById('cart-toggle-btn')) {
            const cartDiv = document.createElement('div');
            cartDiv.id = 'cart-toggle-btn';
            cartDiv.className = 'cart-icon-container';
            cartDiv.title = 'Ver carrito';
            cartDiv.innerHTML = `
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-badge" class="cart-badge">${cart.length}</span>
            `;

            if (mobileToggle) {
                navContent.insertBefore(cartDiv, mobileToggle);
            } else {
                navContent.appendChild(cartDiv);
            }

            cartDiv.addEventListener('click', () => toggleCart());
        }

        if (!document.getElementById('cart-fab')) {
            const fab = document.createElement('button');
            fab.id = 'cart-fab';
            fab.className = 'cart-fab';
            fab.innerHTML = `
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-badge-fab" class="cart-badge">${cart.length}</span>
            `;
            document.body.appendChild(fab);
            fab.addEventListener('click', () => toggleCart());
            updateCartBadge();
        }
    };

    injectCartUI();

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
        const marcasDisponibles = [...new Set(productos.map(p => p.marca.toUpperCase()))];
        return marcasDisponibles.find(m => m.toLowerCase() === marcaSlug.toLowerCase()) || null;
    }

    const marcaActual = obtenerMarcaDeLaPagina();

    // --- RENDERIZADO DE PRODUCTOS ---
    if (grid) {
        let productosFiltrados = [];

        const urlParams = new URLSearchParams(window.location.search);
        const urlGender = urlParams.get('g') || gender;

        if (marcaActual) {
            productosFiltrados = productos.filter(p => p.marca.toUpperCase() === marcaActual.toUpperCase());
            
            // Si venimos de la página de hombres o mujeres, filtrar la marca por ese género
            if (urlGender && urlGender !== 'none' && urlGender !== 'unisex') {
                const normalizedGender = urlGender.toLowerCase();
                productosFiltrados = productosFiltrados.filter(p => {
                    const pGender = p.genero.toLowerCase();
                    return (normalizedGender === 'hombre' && (pGender === 'hombre' || pGender === 'caballero' || pGender === 'unisex')) ||
                           (normalizedGender === 'mujer' && (pGender === 'mujer' || pGender === 'dama' || pGender === 'unisex'));
                });
            }
        } else if (gender && gender !== 'none') {
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

            // Incluir marcas del config que NO tienen productos aún
            if (typeof marcasConfig !== 'undefined') {
                const existingBrands = new Set(productosFiltrados.map(m => m.marca.toUpperCase()));
                Object.keys(marcasConfig).forEach(marcaKey => {
                    if (!existingBrands.has(marcaKey.toUpperCase())) {
                        const config = marcasConfig[marcaKey];
                        productosFiltrados.push({
                            id: 90000 + productosFiltrados.length,
                            marca: marcaKey,
                            genero: normalizedGender,
                            imagen: config.banner || '',
                            descripcion: config.descripcion || `Colección Premium ${marcaKey}`
                        });
                    }
                });
            }
        }

        // --- ORDENAR ALFABÉTICAMENTE AUTOMÁTICAMENTE ---
        if (marcaActual) {
            // Si estamos viendo productos de una marca, ordenar por nombre del producto
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else {
            // Si estamos viendo las tarjetas de marcas, ordenar por nombre de la marca
            productosFiltrados.sort((a, b) => a.marca.localeCompare(b.marca));
        }

        if (productosFiltrados.length > 0) {
            productosFiltrados.forEach(item => {
                const card = document.createElement('div');
                card.className = 'product-card reveal';

                // Determinar si renderizar producto o marca
                const isProductView = marcaActual || (gender && gender !== 'none' && !productosFiltrados.every(p => p.descripcion));

                if (isProductView) {
                    const precioFormateado = new Intl.NumberFormat('es-CO', {
                        style: 'currency', currency: 'COP', minimumFractionDigits: 0
                    }).format(item.precio);

                    const imgSrc = pathPrefix + item.imagen;
                    const pGender = item.genero.toLowerCase();
                    let sizes = [];
                    if (pGender === 'hombre' || pGender === 'caballero') {
                        sizes = [40, 41, 42, 43, 44];
                    } else if (pGender === 'mujer' || pGender === 'dama') {
                        sizes = [36, 37, 38, 39];
                    } else {
                        sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44];
                    }

                    const allImages = item.imagenes ? [...new Set([item.imagen, ...item.imagenes])] : [item.imagen];
                    const hasMultipleImages = allImages.length > 1;
                    const galleryHtml = hasMultipleImages ? `
                        <div class="product-gallery">
                            ${allImages.map((img, index) => `
                                <div class="thumbnail ${index === 0 ? 'active' : ''}" 
                                     onclick="changeProductImage(this, '${pathPrefix + img}')">
                                    <img src="${pathPrefix + img}" alt="Vista ${index + 1}">
                                </div>
                            `).join('')}
                        </div>
                    ` : '';

                    card.innerHTML = `
                        <div class="product-image-container" data-product-id="${item.id}">
                            <img src="${imgSrc}" alt="${item.nombre}" id="main-image-${item.id}" loading="lazy" onerror="this.src='${pathPrefix}img/logos/2NIKE.jpeg'">
                            <div class="zoom-hint">
                                <i class="fas fa-search-plus"></i>
                                Click para zoom
                            </div>
                        </div>
                        ${galleryHtml}
                        <div class="product-info">
                            <h3 class="product-name">${item.nombre}</h3>
                            <p class="product-ref">Ref: ${item.referencia}</p>
                            
                            <div class="product-selection">
                                <label>Talla (EURO):</label>
                                <select class="size-selector" data-product-id="${item.id}">
                                    ${sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
                                </select>
                            </div>

                            <p class="product-price">${precioFormateado}</p>
                            
                            <button class="btn-whatsapp" onclick="addToCart(${item.id})">
                                <i class="fas fa-cart-plus"></i> Añadir al carrito
                            </button>
                        </div>
                    `;
                } else {
                    const brandSlug = item.marca.toLowerCase().replace(/\s+/g, '_');
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
                            
                            <a href="marcas/${brandSlug}.html${gender && gender !== 'none' ? '?g=' + gender : ''}" class="btn-ver-marcas">
                                Ver Colección
                            </a>
                        </div>
                    `;
                }
                grid.appendChild(card);
            });

            // --- LÓGICA DE ZOOM PROFESIONAL ---
            document.querySelectorAll('.product-image-container').forEach(container => {
                const img = container.querySelector('img');
                const hint = container.querySelector('.zoom-hint');
                
                container.addEventListener('mousemove', (e) => {
                    if (container.classList.contains('zoomed')) {
                        const rect = container.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        // Calcular porcentaje de posición
                        const xPercent = (x / rect.width) * 100;
                        const yPercent = (y / rect.height) * 100;
                        
                        // Mover el origen de la transformación para el efecto de pan
                        img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                    }
                });

                container.addEventListener('click', () => {
                    container.classList.toggle('zoomed');
                    
                    if (container.classList.contains('zoomed')) {
                        hint.innerHTML = '<i class="fas fa-search-minus"></i> Click para salir';
                    } else {
                        hint.innerHTML = '<i class="fas fa-search-plus"></i> Click para zoom';
                        img.style.transformOrigin = 'center center';
                    }
                });

                container.addEventListener('mouseleave', () => {
                    container.classList.remove('zoomed');
                    hint.innerHTML = '<i class="fas fa-search-plus"></i> Click para zoom';
                    img.style.transformOrigin = 'center center';
                });
            });

            setTimeout(() => {
                document.querySelectorAll('.reveal').forEach((el, index) => {
                    setTimeout(() => el.classList.add('active'), index * 100);
                });
            }, 100);

        } else {
            grid.innerHTML = '<p class="no-products">Próximamente nuevos modelos disponibles.</p>';
        }
    }
});