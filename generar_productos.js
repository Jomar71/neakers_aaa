/**
 * generar_productos.js
 * =============================================
 * Escanea las carpetas img/hombres/ e img/mujeres/
 * y genera automáticamente productos_hombres.js y productos_mujeres.js
 *
 * USO:
 *   1. node convertir.js   (convierte Excel a precios.json)
 *   2. node generar_productos.js
 */

const fs = require('fs');
const path = require('path');

// ======================================================
// CARGAR PRECIOS DESDE EXCEL (precios.json)
// ======================================================
let preciosDesdeExcel = {};
try {
    preciosDesdeExcel = JSON.parse(fs.readFileSync('precios.json', 'utf8'));
    console.log('✅ Precios desde Excel cargados correctamente\n');
} catch(e) {
    console.log('⚠️  No se encontró precios.json, usando precios por defecto\n');
}

// ======================================================
// CONFIGURACIÓN DE DESCRIPCIONES POR MARCA
// ======================================================
const MARCA_CONFIG = {
    'ADIDAS': 'Estilo deportivo icónico y comodidad sin límites.',
    'ARMANI': 'Elegancia italiana con un toque moderno y exclusivo.',
    'ASICS': 'Tecnología japonesa para un rendimiento superior.',
    'CATERPILLAR': 'Durabilidad y resistencia para cada terreno.',
    'COACH': 'Lujo accesible con diseño sofisticado.',
    'CONVERSE': 'El clásico atemporal que nunca pasa de moda.',
    'DIESEL': 'Estilo audaz e industrial para los más atrevidos.',
    'DOLCE & GABBANA': 'Alta costura italiana en cada detalle.',
    'FILA': 'Estilo retro deportivo con máximo confort.',
    'GUAYO': 'Rendimiento en la cancha con estilo propio.',
    'GUCCI': 'El máximo exponente del lujo y la moda italiana.',
    'HOKA': 'Máxima amortiguación con peso pluma.',
    'HUGO BOSS': 'Sofisticación alemana en cada paso.',
    'LACOSTE': 'Sofisticación deportiva con el icónico cocodrilo.',
    'LE COQ SPORTIF': 'Elegancia y rendimiento con el toque clásico francés.',
    'LOUIS VUITTON': 'La cúspide del lujo y la exclusividad.',
    'NEW BALANCE': 'La mezcla perfecta entre funcionalidad y moda retro.',
    'NIKE': 'Just Do It. Innovación y rendimiento en cada par.',
    'ON CLOUD': 'Siente que caminas sobre nubes en cada paso.',
    'PUMA': 'Forever Faster. Diseño vanguardista para el día a día.',
    'REEBOK': 'Rendimiento clásico para el deportista moderno.',
    'SKECHERS': 'Comodidad excepcional para el bienestar de tus pies.',
    'TIMBERLAND': 'Resistencia y estilo para el aire libre.',
    'TOMMY HILFIGER': 'Estilo americano clásico con un toque moderno.',
    'UNDER ARMOUR': 'Rendimiento técnico y durabilidad en cada entrenamiento.',
    'VANS': 'Cultura urbana y estilo skate en cada paso.'
};

const PRECIO_POR_DEFECTO = 180000;

// Normalización de nombres de carpetas a marcas
const CARPETA_A_MARCA = {
    'adidas': 'ADIDAS',
    'armani': 'ARMANI',
    'asics': 'ASICS',
    'caterpillar': 'CATERPILLAR',
    'coach': 'COACH',
    'converse': 'CONVERSE',
    'diesel': 'DIESEL',
    'dolce & gabbana': 'DOLCE & GABBANA',
    'fila': 'FILA',
    'guayo': 'GUAYO',
    'gucci': 'GUCCI',
    'hoka': 'HOKA',
    'hugo boss': 'HUGO BOSS',
    'hugo boos': 'HUGO BOSS', // carpeta con typo en mujeres
    'lacoste': 'LACOSTE',
    'le coq sportif': 'LE COQ SPORTIF',
    'louis vuitton': 'LOUIS VUITTON',
    'new balance': 'NEW BALANCE',
    'nike': 'NIKE',
    'on cloud': 'ON CLOUD',
    'puma': 'PUMA',
    'reebok': 'REEBOK',
    'reebook': 'REEBOK', // carpeta con typo en mujeres
    'skechers': 'SKECHERS',
    'timberland': 'TIMBERLAND',
    'tommy': 'TOMMY HILFIGER',
    'tommy hilfiger': 'TOMMY HILFIGER',
    'under armour': 'UNDER ARMOUR',
    'vans': 'VANS'
};

const IMAGE_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.webp', '.gif'];
let idCounter = 10000;

function obtenerNuevoId() {
    return idCounter++;
}

function resolverMarca(carpeta) {
    const lower = carpeta.toLowerCase();
    return CARPETA_A_MARCA[lower] || carpeta.toUpperCase();
}

function normalizarReferencia(ref) {
    let refLimpia = ref.toUpperCase();
    if (refLimpia.startsWith('D')) {
        refLimpia = refLimpia.substring(1);
    }
    return refLimpia;
}

/**
 * Busca el precio en precios.json usando múltiples patrones de clave.
 * Primero intenta con el nombre completo de la marca, luego con la primera palabra.
 * Esto garantiza compatibilidad con precios.json generados por versiones anteriores.
 */
function obtenerPrecio(marca, referencia, genero) {
    if (!preciosDesdeExcel || Object.keys(preciosDesdeExcel).length === 0) return null;

    const refLimpia = normalizarReferencia(referencia);

    // Intento 1: clave con marca completa (formato nuevo de convertir.js)
    const claveCompleta = `${genero}_${marca}_${refLimpia}`;
    if (preciosDesdeExcel[claveCompleta]) return preciosDesdeExcel[claveCompleta];

    // Intento 2: marca normalizada (sin espacios ni &)
    const marcaNormalizada = marca.replace(/[&\s]/g, '');
    const claveNormalizada = `${genero}_${marcaNormalizada}_${refLimpia}`;
    if (preciosDesdeExcel[claveNormalizada]) return preciosDesdeExcel[claveNormalizada];

    // Intento 3: clave con primera palabra (formato anterior — compatibilidad)
    const primeraPalabra = marca.split(' ')[0];
    if (primeraPalabra !== marca) {
        const clavePrimeraPalabra = `${genero}_${primeraPalabra}_${refLimpia}`;
        if (preciosDesdeExcel[clavePrimeraPalabra]) return preciosDesdeExcel[clavePrimeraPalabra];
    }

    // Intento 4: género normalizado (hombre/mujer → caballero/dama, variantes)
    const generoAlt = genero === 'hombre' ? 'caballero' : 'dama';
    const claveAlt = `${generoAlt}_${marca}_${refLimpia}`;
    if (preciosDesdeExcel[claveAlt]) return preciosDesdeExcel[claveAlt];

    return null;
}

function extraerReferencia(archivo) {
    const base = path.basename(archivo, path.extname(archivo));
    const match = base.match(/(D?MS\d+)$/i);
    return match ? match[1].toUpperCase() : 'MS1';
}

function extraerNombre(archivo, marca) {
    let base = path.basename(archivo, path.extname(archivo));

    // Quitar referencia del final
    base = base.replace(/[_\s]?(D?MS\d+)$/i, '').trim();

    // Quitar marca del inicio
    const marcaUpper = marca.toUpperCase();
    const baseUpper = base.toUpperCase();

    if (baseUpper === marcaUpper) {
        base = '';
    } else if (baseUpper.startsWith(marcaUpper)) {
        base = base.slice(marcaUpper.length).replace(/^[_\s]+/, '');
    } else {
        const primeraPalabra = marca.split(' ')[0].toUpperCase();
        if (baseUpper.startsWith(primeraPalabra)) {
            base = base.slice(primeraPalabra.length).replace(/^[_\s]+/, '');
        }
    }

    // Reemplazar guiones bajos por espacios
    base = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();

    // Capitalizar palabras
    const capitalizar = (str) => {
        return str.split(' ').map(w => {
            if (w.length === 0) return w;
            return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
        }).join(' ');
    };

    const marcaDisplay = capitalizar(marca.toLowerCase());

    if (!base) return marcaDisplay;
    return `${marcaDisplay} ${capitalizar(base)}`;
}

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
        const descripcion = MARCA_CONFIG[marca] || `Colección premium ${marca}.`;

        const archivos = fs.readdirSync(rutaMarca).filter(f => {
            const ext = path.extname(f).toLowerCase();
            return IMAGE_EXTENSIONS.includes(ext);
        }).sort();

        let conPrecio = 0;
        let sinPrecio = 0;

        archivos.forEach(archivo => {
            const referencia = extraerReferencia(archivo);
            const nombre = extraerNombre(archivo, marca);
            const rutaImagen = `img/${genero === 'hombre' ? 'hombres' : 'mujeres'}/${carpetaMarca}/${archivo}`;

            let precio = obtenerPrecio(marca, referencia, genero);

            if (!precio) {
                precio = PRECIO_POR_DEFECTO;
                sinPrecio++;
            } else {
                conPrecio++;
            }

            productos.push({
                id: obtenerNuevoId(),
                nombre: nombre,
                marca: marca,
                genero: genero,
                imagen: rutaImagen,
                referencia: referencia,
                precio: precio,
                descripcion: descripcion
            });
        });

        const pct = archivos.length > 0 ? Math.round((conPrecio / archivos.length) * 100) : 0;
        const status = sinPrecio === 0 ? '✅' : sinPrecio === archivos.length ? '❌' : '⚠️ ';
        console.log(`  ${status} ${marca} (${genero}): ${archivos.length} productos (${conPrecio} con precio [${pct}%], ${sinPrecio} sin precio)`);
    });

    return productos;
}

function generarArchivoJS(productos, nombreVariable) {
    const lineas = productos.map(p => {
        return `    {
        "id": ${p.id},
        "nombre": "${p.nombre.replace(/"/g, '\\"')}",
        "marca": "${p.marca}",
        "genero": "${p.genero}",
        "imagen": "${p.imagen.replace(/\\/g, '/')}",
        "referencia": "${p.referencia}",
        "precio": ${p.precio},
        "descripcion": "${p.descripcion.replace(/"/g, '\\"')}"
    }`;
    });

    return `// ============================================================
// ARCHIVO AUTO-GENERADO POR generar_productos.js
// NO EDITAR MANUALMENTE - Ejecuta el script para regenerar
// Última actualización: ${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO')}
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

// Asegurar que la carpeta js existe
if (!fs.existsSync(carpetaJS)) {
    fs.mkdirSync(carpetaJS);
}

// Escribir archivos
const archivoHombres = path.join(carpetaJS, 'productos_hombres.js');
const archivoMujeres = path.join(carpetaJS, 'productos_mujeres.js');

fs.writeFileSync(archivoHombres, generarArchivoJS(productosHombres, 'productosHombres'), 'utf8');
fs.writeFileSync(archivoMujeres, generarArchivoJS(productosMujeres, 'productosMujeres'), 'utf8');

const totalConPrecio = [...productosHombres, ...productosMujeres].filter(p => p.precio !== PRECIO_POR_DEFECTO).length;
const totalProductos = productosHombres.length + productosMujeres.length;

console.log(`\n✅ Generado: js/productos_hombres.js (${productosHombres.length} productos)`);
console.log(`✅ Generado: js/productos_mujeres.js (${productosMujeres.length} productos)`);
console.log(`\n📊 Resumen: ${totalConPrecio}/${totalProductos} productos con precio real (${Math.round(totalConPrecio/totalProductos*100)}%)`);
console.log('\n🎉 ¡Listo! Los archivos de productos han sido actualizados.\n');
console.log('💡 Tip: Para actualizar precios, modifica tenis.xlsx y ejecuta:');
console.log('   1. node convertir.js');
console.log('   2. node generar_productos.js\n');