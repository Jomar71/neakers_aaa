document.addEventListener('DOMContentLoaded', () => {
    const NUMERO_WHATSAPP = "573205032772";
    const grid = document.getElementById('productos-grid');
    const gender = document.body.dataset.gender;
    const themeBtn = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // ─── PATH PREFIX ──────────────────────────────────────────────────────────
    // Detectar si estamos en un subdirectorio (/marcas/)
    const isSubDir = /\/marcas\//i.test(window.location.pathname) ||
                     window.location.pathname.toLowerCase().includes('marcas/');
    const pathPrefix = isSubDir ? '../' : '';

    // ─── NORMALIZAR RUTAS (espacios y caracteres especiales) ──────────────────
    const normalizarRuta = (ruta) => {
        if (!ruta) return '';
        return encodeURI(ruta).replace(/'/g, "%27");
    };

    // ─── TEMA ─────────────────────────────────────────────────────────────────
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ─── MENÚ MÓVIL ──────────────────────────────────────────────────────────
    if (menuToggle && navLinks) {
        const closeMobileMenu = () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) { icon.className = 'fas fa-bars'; }
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                e.target !== menuToggle) {
                closeMobileMenu();
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // ─── CARRITO ──────────────────────────────────────────────────────────────
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

    const updateCartBadge = () => {
        const badges = [
            document.getElementById('cart-badge'),
            document.getElementById('cart-badge-fab')
        ];
        const count = cart.length;
        badges.forEach(badge => {
            if (!badge) return;
            badge.innerText = count;
            // Bump animation
            badge.classList.remove('bump');
            void badge.offsetWidth;
            if (count > 0) badge.classList.add('bump');
        });

        const fab = document.getElementById('cart-fab');
        if (fab) {
            fab.classList.toggle('visible', count > 0);
        }
    };

    const injectCartUI = () => {
        const navContent = document.querySelector('.nav-content');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        if (navContent && !document.getElementById('cart-toggle-btn')) {
            const cartDiv = document.createElement('div');
            cartDiv.id = 'cart-toggle-btn';
            cartDiv.className = 'cart-icon-container';
            cartDiv.title = 'Ver carrito';
            cartDiv.setAttribute('role', 'button');
            cartDiv.setAttribute('aria-label', 'Ver carrito de compras');
            cartDiv.innerHTML = `
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-badge" class="cart-badge">${cart.length}</span>
            `;
            if (mobileToggle) {
                navContent.insertBefore(cartDiv, mobileToggle);
            } else {
                navContent.appendChild(cartDiv);
            }
            cartDiv.addEventListener('click', () => {
                window.location.href = pathPrefix + 'carrito.html';
            });
        }

        if (!document.getElementById('cart-fab')) {
            const fab = document.createElement('button');
            fab.id = 'cart-fab';
            fab.className = 'cart-fab';
            fab.setAttribute('aria-label', 'Ver carrito');
            fab.innerHTML = `
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-badge-fab" class="cart-badge">${cart.length}</span>
            `;
            document.body.appendChild(fab);
            fab.addEventListener('click', () => {
                window.location.href = pathPrefix + 'carrito.html';
            });
        }

        updateCartBadge();
    };

    injectCartUI();

    // ─── CAMBIAR IMAGEN PRODUCTO (thumbnails) ──────────────────────────────
    window.changeProductImage = (thumbnail, newSrc) => {
        const gallery = thumbnail.parentElement;
        const card = gallery.closest('.product-card');
        const mainImg = card ? card.querySelector('.product-image-container img') : null;
        if (!mainImg) return;

        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
        }, 180);

        gallery.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
    };

    // ─── AGREGAR AL CARRITO ────────────────────────────────────────────────
    window.addToCart = (productId) => {
        const producto = (typeof productos !== 'undefined' ? productos : []).find(p => p.id === productId);
        if (!producto) return;

        const sizeSelector = document.querySelector(`.size-selector[data-product-id="${productId}"]`);
        const selectedSize = sizeSelector ? sizeSelector.value : 'N/A';

        cart.push({ ...producto, tallaEscogida: selectedSize });
        saveCart();
        updateCartBadge();

        window.location.href = pathPrefix + 'carrito.html';
    };

    // ─── DETECTAR MARCA DE LA PÁGINA ──────────────────────────────────────
    function obtenerMarcaDeLaPagina() {
        const urlParams = new URLSearchParams(window.location.search);
        const queryBrand = urlParams.get('m');

        if (queryBrand) {
            const marcasDisponibles = [...new Set((typeof productos !== 'undefined' ? productos : []).map(p => p.marca.toUpperCase()))];
            return marcasDisponibles.find(m => m.toLowerCase() === queryBrand.toLowerCase()) || null;
        }

        const fileName = window.location.pathname.split('/').pop();
        if (!fileName || ['index.html','hombres.html','mujeres.html','coleccion.html',''].includes(fileName)) {
            return null;
        }

        const marcaSlug = fileName.replace('.html','').replace(/_/g,' ');
        const marcasDisponibles = [...new Set((typeof productos !== 'undefined' ? productos : []).map(p => p.marca.toUpperCase()))];
        return marcasDisponibles.find(m => m.toLowerCase() === marcaSlug.toLowerCase()) || null;
    }

    const marcaActual = obtenerMarcaDeLaPagina();

    // ─── RENDERIZADO ──────────────────────────────────────────────────────
    if (grid) {
        let productosFiltrados = [];
        const urlParams = new URLSearchParams(window.location.search);
        const urlGender = urlParams.get('g') || gender;
        const todosProductos = typeof productos !== 'undefined' ? productos : [];
        const config = typeof marcasConfig !== 'undefined' ? marcasConfig : {};

        if (marcaActual) {
            // Vista de productos de una marca
            productosFiltrados = todosProductos.filter(p =>
                p.marca.toUpperCase() === marcaActual.toUpperCase()
            );
            if (urlGender && urlGender !== 'none' && urlGender !== 'unisex') {
                const ng = urlGender.toLowerCase();
                productosFiltrados = productosFiltrados.filter(p => {
                    const pg = p.genero.toLowerCase();
                    return (ng === 'hombre' && ['hombre','caballero','unisex'].includes(pg)) ||
                           (ng === 'mujer'  && ['mujer','dama','unisex'].includes(pg));
                });
            }

        } else if (gender && gender !== 'none') {
            // Vista de marcas de un género
            const ng = gender.toLowerCase();
            const marcasMap = new Map();

            todosProductos.forEach(p => {
                const pg = p.genero.toLowerCase();
                const match =
                    (ng === 'hombre' && ['hombre','caballero'].includes(pg)) ||
                    (ng === 'mujer'  && ['mujer','dama'].includes(pg));
                if (match && !marcasMap.has(p.marca.toUpperCase())) {
                    const mc = config[p.marca.toUpperCase()];
                    marcasMap.set(p.marca.toUpperCase(), {
                        id: p.id,
                        marca: p.marca,
                        genero: p.genero,
                        imagen: mc?.banner || p.imagen,
                        descripcion: mc?.descripcion || `Colección Premium ${p.marca}`
                    });
                }
            });

            // Agregar marcas de config que no tienen productos aún
            Object.keys(config).forEach(marcaKey => {
                if (!marcasMap.has(marcaKey.toUpperCase())) {
                    const mc = config[marcaKey];
                    marcasMap.set(marcaKey.toUpperCase(), {
                        id: 90000 + marcasMap.size,
                        marca: marcaKey,
                        genero: ng,
                        imagen: mc.banner || '',
                        descripcion: mc.descripcion || `Colección Premium ${marcaKey}`
                    });
                }
            });

            productosFiltrados = [...marcasMap.values()].sort((a, b) =>
                a.marca.localeCompare(b.marca)
            );
        }

        // Ordenar
        if (marcaActual) {
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }

        if (productosFiltrados.length > 0) {
            // Renderizar cards
            const fallbackImg = normalizarRuta(pathPrefix + 'img/logos/2NIKE.webp');

            productosFiltrados.forEach(item => {
                const card = document.createElement('div');
                card.className = 'product-card reveal';

                if (marcaActual) {
                    // ── TARJETA DE PRODUCTO ──
                    const precioFormateado = new Intl.NumberFormat('es-CO', {
                        style: 'currency', currency: 'COP', minimumFractionDigits: 0
                    }).format(item.precio);

                    const imgSrc = normalizarRuta(pathPrefix + item.imagen);

                    const pg = item.genero.toLowerCase();
                    let sizes = [36,37,38,39,40,41,42,43,44];
                    if (['hombre','caballero'].includes(pg)) sizes = [38,39,40,41,42,43,44,45];
                    else if (['mujer','dama'].includes(pg)) sizes = [35,36,37,38,39,40];

                    const allImages = item.imagenes ? [...new Set([item.imagen, ...item.imagenes])] : [item.imagen];
                    const galleryHtml = allImages.length > 1 ? `
                        <div class="product-gallery">
                            ${allImages.map((img, i) => `
                                <div class="thumbnail ${i === 0 ? 'active' : ''}"
                                     onclick="changeProductImage(this,'${normalizarRuta(pathPrefix + img)}')">
                                    <img src="${normalizarRuta(pathPrefix + img)}" alt="Vista ${i+1}" loading="lazy">
                                </div>
                            `).join('')}
                        </div>
                    ` : '';

                    card.innerHTML = `
                        <div class="product-image-container" data-product-id="${item.id}">
                            <img src="${imgSrc}" alt="${item.nombre}" loading="lazy"
                                 onerror="this.onerror=null;this.src='${fallbackImg}';">
                            <div class="product-image-overlay"></div>
                        </div>
                        ${galleryHtml}
                        <div class="product-info">
                            <h3 class="product-name">${item.nombre}</h3>
                            <p class="product-ref"><i class="fas fa-barcode" style="opacity:0.4;margin-right:4px;"></i> ${item.referencia}</p>
                            <p class="product-price">${precioFormateado}</p>
                            <div class="product-selection">
                                <label>Talla (EURO):</label>
                                <select class="size-selector" data-product-id="${item.id}">
                                    ${sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
                                </select>
                            </div>
                            <button class="btn-whatsapp" onclick="addToCart(${item.id})">
                                <i class="fas fa-cart-plus"></i> Agregar al carrito
                            </button>
                        </div>
                    `;
                } else {
                    // ── TARJETA DE MARCA ──
                    const brandSlug = item.marca.toLowerCase().replace(/\s+/g,'_').replace(/&/g,'');
                    const mc = config[item.marca.toUpperCase()];
                    const bannerSrc  = mc?.banner ? normalizarRuta(pathPrefix + mc.banner) : null;
                    const fallbackBrand = normalizarRuta(pathPrefix + item.imagen);
                    const brandImgSrc = bannerSrc || fallbackBrand;

                    const genderParam = gender && gender !== 'none' ? `?g=${gender}` : '';

                    card.innerHTML = `
                        <div class="brand-image">
                            <img src="${brandImgSrc}" alt="${item.marca}"
                                 loading="lazy"
                                 onerror="this.onerror=null;this.src='${fallbackBrand}';">
                        </div>
                        <div class="brand-info">
                            <h3 class="brand-name">${item.marca}</h3>
                            <p class="brand-description">${item.descripcion}</p>
                            <a href="${isSubDir ? '' : ''}marcas/${brandSlug}.html${genderParam}"
                               class="btn-ver-marcas">
                               Ver Colección <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    `;
                }

                grid.appendChild(card);
            });

            // ── ZOOM EN IMÁGENES DE PRODUCTO ──────────────────────────────
            document.querySelectorAll('.product-image-container').forEach(container => {
                const img = container.querySelector('img');
                if (!img) return;

                container.addEventListener('mousemove', (e) => {
                    const rect = container.getBoundingClientRect();
                    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
                    const yPct = ((e.clientY - rect.top)  / rect.height) * 100;
                    container.classList.add('zoomed');
                    img.style.transformOrigin = `${xPct}% ${yPct}%`;
                });

                container.addEventListener('mouseleave', () => {
                    container.classList.remove('zoomed');
                    img.style.transformOrigin = 'center center';
                });

                container.addEventListener('click', (e) => {
                    if (e.target.closest('button')) return;
                    container.classList.toggle('zoomed');
                });
            });

            // ── REVEAL con IntersectionObserver ───────────────────────────
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => entry.target.classList.add('active'), i * 50);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        } else {
            grid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-shoe-prints"></i>
                    <p>Próximamente nuevos modelos disponibles.</p>
                </div>
            `;
        }
    } else {
        // Página sin grid (index.html) — solo activar reveals
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
});