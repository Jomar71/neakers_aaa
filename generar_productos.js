/**
 * generar_productos.js
 * =============================================
 * Escanea las carpetas img/hombres/ e img/mujeres/
 * y genera automáticamente productos_hombres.js y productos_mujeres.js
 * con una entrada por cada imagen encontrada.
 *
 * USO: node generar_productos.js
 *
 * Cada vez que agregues imágenes nuevas, simplemente vuelve a ejecutar
 * este script y los archivos JS se actualizarán automáticamente.
 */

const fs = require('fs');
const path = require('path');

// ======================================================
// CONFIGURACIÓN DE PRECIOS Y DESCRIPCIONES POR MARCA
// ======================================================
const MARCA_CONFIG = {
    'ADIDAS':         { precio: 185000, descripcion: 'Estilo deportivo icónico y comodidad sin límites.' },
    'ARMANI':         { precio: 320000, descripcion: 'Elegancia italiana con un toque moderno y exclusivo.' },
    'ASICS':          { precio: 245000, descripcion: 'Tecnología japonesa para un rendimiento superior.' },
    'CATERPILLAR':    { precio: 250000, descripcion: 'Durabilidad y resistencia para cada terreno.' },
    'COACH':          { precio: 280000, descripcion: 'Lujo accesible con diseño sofisticado.' },
    'CONVERSE':       { precio: 170000, descripcion: 'El clásico atemporal que nunca pasa de moda.' },
    'DIESEL':         { precio: 210000, descripcion: 'Estilo audaz e industrial para los más atrevidos.' },
    'DOLCE & GABBANA':{ precio: 380000, descripcion: 'Alta costura italiana en cada detalle.' },
    'FILA':           { precio: 175000, descripcion: 'Estilo retro deportivo con máximo confort.' },
    'GUAYO':          { precio: 160000, descripcion: 'Rendimiento en la cancha con estilo propio.' },
    'GUCCI':          { precio: 450000, descripcion: 'El máximo exponente del lujo y la moda italiana.' },
    'HOKA':           { precio: 260000, descripcion: 'Máxima amortiguación con peso pluma.' },
    'HUGO BOSS':      { precio: 310000, descripcion: 'Sofisticación alemana en cada paso.' },
    'LACOSTE':        { precio: 210000, descripcion: 'Sofisticación deportiva con el icónico cocodrilo.' },
    'LE COQ SPORTIF': { precio: 180000, descripcion: 'Elegancia y rendimiento con el toque clásico francés.' },
    'LOUIS VUITTON':  { precio: 480000, descripcion: 'La cúspide del lujo y la exclusividad.' },
    'NEW BALANCE':    { precio: 215000, descripcion: 'La mezcla perfecta entre funcionalidad y moda retro.' },
    'NIKE':           { precio: 200000, descripcion: 'Just Do It. Innovación y rendimiento en cada par.' },
    'ON CLOUD':       { precio: 270000, descripcion: 'Siente que caminas sobre nubes en cada paso.' },
    'PUMA':           { precio: 190000, descripcion: 'Forever Faster. Diseño vanguardista para el día a día.' },
    'REEBOK':         { precio: 185000, descripcion: 'Rendimiento clásico para el deportista moderno.' },
    'SKECHERS':       { precio: 175000, descripcion: 'Comodidad excepcional para el bienestar de tus pies.' },
    'TIMBERLAND':     { precio: 235000, descripcion: 'Resistencia y estilo para el aire libre.' },
    'TOMMY HILFIGER': { precio: 280000, descripcion: 'Estilo americano clásico con un toque moderno.' },
    'UNDER ARMOUR':   { precio: 210000, descripcion: 'Rendimiento técnico y durabilidad en cada entrenamiento.' },
    'VANS':           { precio: 185000, descripcion: 'Cultura urbana y estilo skate en cada paso.' },
};

// Carpeta a nombre de marca (normalización)
const CARPETA_A_MARCA = {
    'adidas':          'ADIDAS',
    'armani':          'ARMANI',
    'asics':           'ASICS',
    'coach':           'COACH',
    'converse':        'CONVERSE',
    'diesel':          'DIESEL',
    'dolce & gabbana': 'DOLCE & GABBANA',
    'fila':            'FILA',
    'guayo':           'GUAYO',
    'gucci':           'GUCCI',
    'hoka':            'HOKA',
    'hugo boss':       'HUGO BOSS',
    'lacoste':         'LACOSTE',
    'le coq sportif':  'LE COQ SPORTIF',
    'louis vuitton':   'LOUIS VUITTON',
    'new balance':     'NEW BALANCE',
    'nike':            'NIKE',
    'on cloud':        'ON CLOUD',
    'puma':            'PUMA',
    'reebok':          'REEBOK',
    'skechers':        'SKECHERS',
    'timberland':      'TIMBERLAND',
    'tommy':           'TOMMY HILFIGER',
    'tommy hilfiger':  'TOMMY HILFIGER',
    'under armour':    'UNDER ARMOUR',
    'vans':            'VANS',
};

// Extensiones válidas de imagen
const IMAGE_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.webp', '.gif'];

let idCounter = 10000; // ID base para productos auto-generados

function obtenerNuevoId() {
    return idCounter++;
}

/**
 * Normaliza el nombre de la carpeta a nombre de marca
 */
function resolverMarca(carpeta) {
    const lower = carpeta.toLowerCase();
    return CARPETA_A_MARCA[lower] || carpeta.toUpperCase();
}

/**
 * Extrae un nombre legible del nombre de archivo de imagen
 * Ej: "NIKE_AIRMAX90_MS1.jpeg" → "Nike Air Max 90"
 */
function nombreDesdArchivo(archivo, marca) {
    let base = path.basename(archivo, path.extname(archivo));
    
    // Quitar sufijos de referencia comunes al final: MS1, DMS1, MS31, etc.
    base = base.replace(/[_\s]?(D?MS\d+)$/i, '').trim();
    
    // Intentar quitar nombre de marca del inicio (sin espacios ni guiones)
    // Ejemplo: "ADIDASALPHADMS1" → "Alpha"
    const marcaCompact = marca.replace(/[\s&-]+/g, '').toUpperCase();
    const marcaWords = marca.split(/\s+/).map(w => w.toUpperCase());
    
    // Si el base empieza con la marca compacta, quitarla
    if (base.toUpperCase().startsWith(marcaCompact)) {
        base = base.slice(marcaCompact.length).replace(/^[_\s]+/, '');
    } else {
        // Intentar quitar la primera palabra de la marca si es prefijo
        const firstWord = marcaWords[0];
        if (base.toUpperCase().startsWith(firstWord)) {
            base = base.slice(firstWord.length).replace(/^[_\s]+/, '');
        }
    }
    
    // Reemplazar underscores, guiones, y espacios múltiples
    base = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Capitalizar cada palabra
    const capitalizar = str => str.split(' ')
        .filter(w => w.length > 0)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');

    // Nombre de marca en formato presentable (ej: "Le Coq Sportif")
    const marcaDisplay = capitalizar(marca.toLowerCase());
    
    if (!base) return marcaDisplay;
    return `${marcaDisplay} ${capitalizar(base)}`;
}

/**
 * Extrae la referencia del nombre del archivo
 * Ej: "ADIDAS_SAMBA_MS2.jpeg" → "MS2"
 */
function referenciaDesdArchivo(archivo) {
    const base = path.basename(archivo, path.extname(archivo));
    const match = base.match(/([D]?MS\d+)$/i);
    return match ? match[1].toUpperCase() : 'MS1';
}

/**
 * Escanea una carpeta de género y genera un array de productos
 */
function escanearCarpeta(carpetaBase, genero) {
    const productos = [];
    
    if (!fs.existsSync(carpetaBase)) {
        console.warn(`⚠️  Carpeta no encontrada: ${carpetaBase}`);
        return productos;
    }
    
    const marcasCarpetas = fs.readdirSync(carpetaBase).filter(f => {
        return fs.statSync(path.join(carpetaBase, f)).isDirectory();
    });
    
    marcasCarpetas.forEach(carpetaMarca => {
        const rutaMarca = path.join(carpetaBase, carpetaMarca);
        const marca = resolverMarca(carpetaMarca);
        const config = MARCA_CONFIG[marca] || { precio: 180000, descripcion: `Colección premium ${marca}.` };
        
        const archivos = fs.readdirSync(rutaMarca).filter(f => {
            const ext = path.extname(f).toLowerCase();
            return IMAGE_EXTENSIONS.includes(ext);
        }).sort();
        
        archivos.forEach(archivo => {
            const rutaRelativa = `img/${genero === 'hombre' ? 'hombres' : 'mujeres'}/${carpetaMarca}/${archivo}`;
            const referencia = referenciaDesdArchivo(archivo);
            const nombre = nombreDesdArchivo(archivo, marca);
            
            productos.push({
                id: obtenerNuevoId(),
                nombre,
                marca,
                genero,
                imagen: rutaRelativa,
                referencia,
                precio: config.precio,
                descripcion: config.descripcion
            });
        });
        
        console.log(`  ✅ ${marca} (${genero}): ${archivos.length} imágenes encontradas`);
    });
    
    return productos;
}

/**
 * Genera el contenido JS para el array de productos
 */
function generarArchivoJS(productos, nombreVariable) {
    const lineas = productos.map(p => {
        return `    {
        "id": ${p.id},
        "nombre": "${p.nombre}",
        "marca": "${p.marca}",
        "genero": "${p.genero}",
        "imagen": "${p.imagen}",
        "referencia": "${p.referencia}",
        "precio": ${p.precio},
        "descripcion": "${p.descripcion}"
    }`;
    });
    
    return `// ============================================================
// ARCHIVO AUTO-GENERADO POR generar_productos.js
// NO EDITAR MANUALMENTE - Ejecuta el script para regenerar
// Última actualización: ${new Date().toLocaleDateString('es-CO')}
// ============================================================

const ${nombreVariable} = [
${lineas.join(',\n')}
];
`;
}

// ======================================================
// EJECUCIÓN PRINCIPAL
// ======================================================
console.log('\n🚀 Generando archivos de productos...\n');
console.log('📦 HOMBRES:');

const carpetaHombres = path.join(__dirname, 'img', 'hombres');
const carpetaMujeres = path.join(__dirname, 'img', 'mujeres');
const carpetaJS = path.join(__dirname, 'js');

const productosHombres = escanearCarpeta(carpetaHombres, 'hombre');

console.log('\n👗 MUJERES:');
const productosMujeres = escanearCarpeta(carpetaMujeres, 'mujer');

// Escribir archivos
const archivoHombres = path.join(carpetaJS, 'productos_hombres.js');
const archivoMujeres = path.join(carpetaJS, 'productos_mujeres.js');

fs.writeFileSync(archivoHombres, generarArchivoJS(productosHombres, 'productosHombres'), 'utf8');
fs.writeFileSync(archivoMujeres, generarArchivoJS(productosMujeres, 'productosMujeres'), 'utf8');

console.log(`\n✅ Generado: js/productos_hombres.js (${productosHombres.length} productos)`);
console.log(`✅ Generado: js/productos_mujeres.js (${productosMujeres.length} productos)`);
console.log('\n🎉 ¡Listo! Los archivos de productos han sido actualizados.\n');
console.log('💡 Tip: Para añadir nuevos productos, sube la imagen a la carpeta');
console.log('   correspondiente (img/hombres/MARCA/ o img/mujeres/MARCA/)');
console.log('   y vuelve a ejecutar: node generar_productos.js\n');
