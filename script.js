const products = [
    {
        id: 1,
        name: "Nike Air Jordan 1 Retro",
        price: "$280,000",
        category: "hombre",
        img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=800&auto=format&fit=crop",
        description: "Calidad Triple A con acabados en cuero genuino."
    },
    {
        id: 2,
        name: "Nike Dunk Low Panda",
        price: "$245,000",
        category: "dama",
        img: "https://images.unsplash.com/photo-1600185365483-e6d90c18f0c5?q=80&w=800&auto=format&fit=crop",
        description: "El modelo más versátil para tu outfit diario."
    },
    {
        id: 3,
        name: "Adidas Bad Bunny Forum",
        price: "$310,000",
        category: "hombre",
        img: "https://images.unsplash.com/photo-1551107643-518206d288d3?q=80&w=800&auto=format&fit=crop",
        description: "Detalles premium y máxima comodidad."
    },
    {
        id: 4,
        name: "Nike Air Force 1 Shadow",
        price: "$230,000",
        category: "dama",
        img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop",
        description: "Diseño moderno con capas dobles exclusivas."
    },
    {
        id: 5,
        name: "Yeezy Boost 350 V2",
        price: "$340,000",
        category: "hombre",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
        description: "Tecnología de amortiguación avanzada."
    },
    {
        id: 6,
        name: "Jordan 4 Black Cat",
        price: "$390,000",
        category: "hombre",
        img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
        description: "Elegancia total en ante de alta calidad."
    }
];

const WHATSAPP_NUMBER = "573000000000";

// DOM Elements
const productContainer = document.getElementById('product-grid');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Functions
function renderProducts(filter = 'all') {
    if (!productContainer) return;
    
    productContainer.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    filtered.forEach(p => {
        const productHTML = `
            <div class="card reveal">
                <img src="${p.img}" alt="${p.name}" class="card-img" loading="lazy">
                <div class="card-body">
                    <h3 class="card-title">${p.name}</h3>
                    <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1rem">${p.description}</p>
                    <p class="card-price">${p.price} COP</p>
                    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me interesa el modelo: ' + p.name)}" 
                       class="btn btn-whatsapp" style="width:100%; justify-content:center">
                       <i class="fab fa-whatsapp"></i> Pedir por WhatsApp
                    </a>
                </div>
            </div>
        `;
        productContainer.insertAdjacentHTML('beforeend', productHTML);
    });

    // Re-trigger scroll reveal for newly injected items
    observeElements();
}

window.filterProducts = function(cat) {
    const btn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
    if (btn) btn.click();
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Theme Logic
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Filtering Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.filter);
    });
});

// Mobile Menu Toggle
const burger = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = burger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close menu when clicking a link & Smooth Navigation Fix
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Si es un ancla interna
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 90; // Espacio para el header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }

        // Cerrar menú móvil
        navLinks.classList.remove('active');
        const icon = burger?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Dropdown Toggle on Mobile
document.querySelectorAll('.dropdown').forEach(drop => {
    drop.addEventListener('click', function(e) {
        if (window.innerWidth < 968) {
            this.classList.toggle('active');
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Efecto visual de carga
        const btn = this.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            alert('¡Gracias! Tu mensaje ha sido enviado. Recibirás una respuesta por WhatsApp o correo en breve.');
            btn.innerHTML = originalText;
            btn.disabled = false;
            this.reset();
        }, 1500);
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
