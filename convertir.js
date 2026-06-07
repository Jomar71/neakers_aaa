const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('tenis.xlsx');
const hojaHombres = workbook.Sheets['HOMBRES'];
const hojaMujeres = workbook.Sheets['MUJERES'];

const hombres = XLSX.utils.sheet_to_json(hojaHombres, { defval: "" });
const mujeres = XLSX.utils.sheet_to_json(hojaMujeres, { defval: "" });

const mapaPrecios = {};

// ===================================================
// LISTA DE MARCAS CONOCIDAS (ordenadas de mayor a menor longitud
// para que el match sea correcto: "DOLCE & GABBANA" antes que "DOLCE")
// ===================================================
const MARCAS_CONOCIDAS = [
    'DOLCE & GABBANA', 'TOMMY HILFIGER', 'UNDER ARMOUR', 'LE COQ SPORTIF',
    'LOUIS VUITTON', 'HUGO BOSS', 'NEW BALANCE', 'ON CLOUD',
    'ADIDAS', 'ARMANI', 'ASICS', 'CATERPILLAR', 'COACH', 'CONVERSE',
    'DIESEL', 'FILA', 'GUAYO', 'GUCCI', 'HOKA', 'LACOSTE',
    'NIKE', 'PUMA', 'REEBOK', 'SKECHERS', 'TIMBERLAND', 'VANS'
];

function limpiarTexto(str) {
    if (!str) return "";
    return String(str).trim().toUpperCase();
}

function limpiarPrecio(valor) {
    if (typeof valor === 'number') return valor;
    if (typeof valor === 'string') {
        const numero = parseFloat(valor.replace(/[^0-9]/g, ''));
        return isNaN(numero) ? 0 : numero;
    }
    return 0;
}

function normalizarReferencia(ref) {
    let refLimpia = ref.toUpperCase();
    if (refLimpia.startsWith('D')) {
        refLimpia = refLimpia.substring(1);
    }
    return refLimpia;
}

/**
 * Detecta la marca correcta usando la lista de marcas conocidas.
 * Ordena por longitud descendente para que "DOLCE & GABBANA" tenga precedencia sobre "DOLCE".
 */
function extraerMarca(nombre) {
    const nombreUpper = nombre.trim().toUpperCase();
    for (const marca of MARCAS_CONOCIDAS) {
        if (nombreUpper === marca || nombreUpper.startsWith(marca + ' ') || nombreUpper.startsWith(marca + '_')) {
            return marca;
        }
    }
    // Fallback: primera palabra
    return nombreUpper.split(' ')[0];
}

console.log('\n📋 PROCESANDO HOMBRES:');
hombres.forEach(item => {
    const nombre = limpiarTexto(item.NOMBRE);
    let ref = limpiarTexto(item.REF);
    let precio = limpiarPrecio(item.PRECIO);

    if (!nombre || !ref) return;

    ref = normalizarReferencia(ref);
    const marca = extraerMarca(nombre);
    const clave = `hombre_${marca}_${ref}`;

    // Solo guardar si no existe (la primera ocurrencia de una clave tiene prioridad)
    if (!mapaPrecios[clave]) {
        mapaPrecios[clave] = precio;
        console.log(`  ${clave} = ${precio}`);
    }
});

console.log('\n📋 PROCESANDO MUJERES:');
mujeres.forEach(item => {
    const nombre = limpiarTexto(item.NOMBRE);
    let ref = limpiarTexto(item.REF);
    let precio = limpiarPrecio(item.PRECIO);

    if (!nombre || !ref) return;

    ref = normalizarReferencia(ref);
    const marca = extraerMarca(nombre);
    const clave = `mujer_${marca}_${ref}`;

    if (!mapaPrecios[clave]) {
        mapaPrecios[clave] = precio;
        console.log(`  ${clave} = ${precio}`);
    }
});

fs.writeFileSync('precios.json', JSON.stringify(mapaPrecios, null, 2));

console.log(`\n✅ precios.json generado con ${Object.keys(mapaPrecios).length} precios únicos`);
console.log('\n📋 Ahora ejecuta: node generar_productos.js');