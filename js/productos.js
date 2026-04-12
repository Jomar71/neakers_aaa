const productos = [
    // HOMBRES (9)
    {
        id: 1,
        nombre: "Nike Air Jordan 1 Retro",
        genero: "hombre",
        imagen: "https://images.unsplash.com/photo-1584908191173-ef0b5cf0dfd4?w=500",
        tallas: [38, 39, 40, 41, 42],
        colores: ["Rojo/Negro", "Blanco", "Azul"],
        precio: 170000
    },
    {
        id: 2,
        nombre: "Adidas Yeezy Boost 350",
        genero: "hombre",
        imagen: "https://images.unsplash.com/photo-1586525198428-225f6f12cff5?w=500",
        tallas: [39, 40, 41, 42],
        colores: ["Gris Zebra", "Negro", "Crema"],
        precio: 170000
    },
    {
        id: 3,
        nombre: "Nike Air Force 1 '07",
        genero: "hombre",
        imagen: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
        tallas: [38, 40, 41, 42],
        colores: ["Blanco", "Negro"],
        precio: 170000
    },
    {
        id: 4,
        nombre: "New Balance 550",
        genero: "hombre",
        imagen: "https://images.unsplash.com/photo-1621611030999-e685f0945939?w=500",
        tallas: [39, 40, 41, 42],
        colores: ["Blanco/Azul", "Blanco/Verde"],
        precio: 170000
    },
    {
        id: 5,
        nombre: "Nike Dunk Low Panda",
        genero: "hombre",
        imagen: "https://images.unsplash.com/photo-1636718282214-0b4100688383?w=500",
        tallas: [38, 39, 40, 41, 42],
        colores: ["Blanco/Negro"],
        precio: 170000
    },
    {
        id: 6,
        nombre: "Jordan 4 Retro Military",
        genero: "hombre",
        imagen: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
        tallas: [40, 41, 42],
        colores: ["Azul/Blanco", "Negro"],
        precio: 170000
    },
    {
        id: 7,
        nombre: "Puma RS-X Bold",
        genero: "hombre",
        imagen: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500",
        tallas: [38, 39, 40, 41],
        colores: ["Multicolor", "Negro", "Blanco"],
        precio: 170000
    },
    {
        id: 8,
        nombre: "Reebok Classic Leather",
        genero: "hombre",
        imagen: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500",
        tallas: [39, 40, 41, 42],
        colores: ["Blanco", "Negro"],
        precio: 170000
    },
    {
        id: 9,
        nombre: "Asics Gel-Lyte III",
        genero: "hombre",
        imagen: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500",
        tallas: [38, 39, 40, 41],
        colores: ["Gris", "Azul", "Rojo"],
        precio: 170000
    },

    // MUJERES (9)
    {
        id: 10,
        nombre: "Nike Air Max 270 React",
        genero: "mujer",
        imagen: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
        tallas: [36, 37, 38, 39],
        colores: ["Pastel", "Blanco", "Rosado"],
        precio: 170000
    },
    {
        id: 11,
        nombre: "Adidas Forum Low",
        genero: "mujer",
        imagen: "https://images.unsplash.com/photo-1612902376491-7a8a99b424e8?w=500",
        tallas: [36, 37, 38, 39, 40],
        colores: ["Blanco/Rosa", "Blanco/Azul"],
        precio: 170000
    },
    {
        id: 12,
        nombre: "Nike Blazer Mid '77",
        genero: "mujer",
        imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        tallas: [35, 36, 37, 38, 39],
        colores: ["Blanco/Negro", "Blanco/Azul"],
        precio: 170000
    },
    {
        id: 13,
        nombre: "Converse Chuck Taylor High",
        genero: "mujer",
        imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        tallas: [35, 36, 37, 38, 39],
        colores: ["Rojo", "Negro", "Blanco"],
        precio: 170000
    },
    {
        id: 14,
        nombre: "Nike Air Force 1 Shadow",
        genero: "mujer",
        imagen: "https://images.unsplash.com/photo-1615290642882-6b950072912c?w=500",
        tallas: [36, 37, 38, 39],
        colores: ["Multicolor Pastel", "Triple White"],
        precio: 170000
    },
    {
        id: 15,
        nombre: "Fila Disruptor II",
        genero: "mujer",
        imagen: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
        tallas: [36, 37, 38, 39, 40],
        colores: ["Blanco", "Rosado"],
        precio: 170000
    },
    {
        id: 16,
        nombre: "Vans Old Skool Platform",
        genero: "mujer",
        imagen: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500",
        tallas: [36, 37, 38, 39],
        colores: ["Negro/Blanco"],
        precio: 170000
    },
    {
        id: 17,
        nombre: "Nike Air Jordan 1 Mid",
        genero: "mujer",
        imagen: "https://images.unsplash.com/photo-1597044738507-5d519634f19b?w=500",
        tallas: [36, 37, 38, 40],
        colores: ["Lila", "Blanco", "Negro"],
        precio: 170000
    },
    {
        id: 18,
        nombre: "Adidas Grand Court",
        genero: "mujer",
        imagen: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500",
        tallas: [36, 37, 38, 39],
        colores: ["Blanco/Oro", "Blanco/Negro"],
        precio: 170000
    }
];
