#!/usr/bin/env node
/**
 * sync-precios.js
 * ===============
 * Script mejorado para actualizar precios y verificar sincronización
 * Uso: node sync-precios.js
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

console.log('\n' + '═'.repeat(60));
console.log('  🔄 SINCRONIZADOR DE PRECIOS — JOMAR AAA SNEAKERS');
console.log('═'.repeat(60) + '\n');

// ══════════════════════════════════════════════════════════════
// PASO 1: LEER EXCEL Y GENERAR PRECIOS.JSON
// ══════════════════════════════════════════════════════════════
console.log('📋 PASO 1: Leyendo tenis.xlsx...\n');

let preciosConteo = 0;
let erroresConteo = 0;

try {
    const workbook = XLSX.readFile('tenis.xlsx');
    const hojaHombres = workbook.Sheets['HOMBRES'];
    const hojaMujeres = workbook.Sheets['MUJERES'];

    if (!hojaHombres) throw new Error('Falta la hoja "HOMBRES" en tenis.xlsx');
    if (!hojaMujeres) throw new Error('Falta la hoja "MUJERES" en tenis.xlsx');

    const hombres = XLSX.utils.sheet_to_json(hojaHombres, { defval: "" });
    const mujeres = XLSX.utils.sheet_to_json(hojaMujeres, { defval: "" });

    console.log(`  📊 Hombres encontrados: ${hombres.length}`);
    console.log(`  👗 Mujeres encontradas: ${mujeres.length}\n`);

    const MARCAS_CONOCIDAS = [
        'DOLCE & GABBANA', 'TOMMY HILFIGER', 'UNDER ARMOUR', 'LE COQ SPORTIF',
        'LOUIS VUITTON', 'HUGO BOSS', 'NEW BALANCE', 'ON CLOUD',
        'ADIDAS', 'ARMANI', 'ASICS', 'CATERPILLAR', 'COACH', 'CONVERSE',
        'DIESEL', 'FILA', 'GUAYO', 'GUCCI', 'HOKA', 'LACOSTE',
        'NIKE', 'PUMA', 'REEBOK', 'SKECHERS', 'TIMBERLAND', 'VANS'
    ];

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
        if (refLimpia.startsWith('D')) refLimpia = refLimpia.substring(1);
        return refLimpia;
    }

    function extraerMarca(nombre) {
        const nombreUpper = nombre.trim().toUpperCase();
        for (const marca of MARCAS_CONOCIDAS) {
            if (nombreUpper === marca || nombreUpper.startsWith(marca + ' ') || nombreUpper.startsWith(marca + '_')) {
                return marca;
            }
        }
        return nombreUpper.split(' ')[0];
    }

    const mapaPrecios = {};

    hombres.forEach(item => {
        const nombre = String(item.NOMBRE || '').trim().toUpperCase();
        let ref = String(item.REF || '').trim().toUpperCase();
        let precio = limpiarPrecio(item.PRECIO);

        if (!nombre || !ref || !precio) return;

        ref = normalizarReferencia(ref);
        const marca = extraerMarca(nombre);
        const clave = `hombre_${marca}_${ref}`;

        if (!mapaPrecios[clave]) {
            mapaPrecios[clave] = precio;
            preciosConteo++;
        }
    });

    mujeres.forEach(item => {
        const nombre = String(item.NOMBRE || '').trim().toUpperCase();
        let ref = String(item.REF || '').trim().toUpperCase();
        let precio = limpiarPrecio(item.PRECIO);

        if (!nombre || !ref || !precio) return;

        ref = normalizarReferencia(ref);
        const marca = extraerMarca(nombre);
        const clave = `mujer_${marca}_${ref}`;

        if (!mapaPrecios[clave]) {
            mapaPrecios[clave] = precio;
            preciosConteo++;
        }
    });

    fs.writeFileSync('precios.json', JSON.stringify(mapaPrecios, null, 2));
    console.log(`  ✅ precios.json generado: ${preciosConteo} precios\n`);

} catch(e) {
    console.error(`  ❌ ERROR: ${e.message}\n`);
    erroresConteo++;
    process.exit(1);
}

// ══════════════════════════════════════════════════════════════
// PASO 2: VERIFICAR SINCRONIZACIÓN CON IMÁGENES
// ══════════════════════════════════════════════════════════════
console.log('📋 PASO 2: Verificando sincronización con imágenes...\n');

const preciosData = JSON.parse(fs.readFileSync('precios.json', 'utf8'));
let imagenesEncontradas = 0;
let imagenesConPrecio = 0;
let imagenesSinPrecio = [];

function verificarCarpeta(genero) {
    const carpeta = `img/${genero}`;
    if (!fs.existsSync(carpeta)) return;

    const marcas = fs.readdirSync(carpeta).filter(f =>
        fs.statSync(path.join(carpeta, f)).isDirectory()
    );

    marcas.forEach(marca => {
        const rutaMarca = path.join(carpeta, marca);
        const archivos = fs.readdirSync(rutaMarca).filter(f =>
            /\.(jpeg|jpg|png)$/i.test(f)
        );

        archivos.forEach(archivo => {
            imagenesEncontradas++;
            // Intentar extraer ref
            const match = archivo.match(/(D?MS\d+)/i);
            const ref = match ? match[1].toUpperCase() : null;

            if (ref) {
                const refNormalizada = ref.startsWith('D') ? ref.substring(1) : ref;
                const clave = `${genero}_*_${refNormalizada}`;

                // Buscar si existe algún precio para esta referencia
                const tienePrecio = Object.keys(preciosData).some(k =>
                    k.endsWith(`_${refNormalizada}`) && k.startsWith(genero + '_')
                );

                if (tienePrecio) {
                    imagenesConPrecio++;
                } else {
                    imagenesSinPrecio.push({ genero, archivo, ref: refNormalizada });
                }
            }
        });
    });
}

verificarCarpeta('hombres');
verificarCarpeta('mujeres');

const pct = imagenesEncontradas > 0 ? Math.round((imagenesConPrecio / imagenesEncontradas) * 100) : 0;
console.log(`  📸 Imágenes encontradas: ${imagenesEncontradas}`);
console.log(`  ✅ Con precio sincronizado: ${imagenesConPrecio} (${pct}%)`);
console.log(`  ⚠️  Sin precio: ${imagenesSinPrecio.length}\n`);

if (imagenesSinPrecio.length > 0 && imagenesSinPrecio.length <= 10) {
    console.log('  Imágenes sin precio sincronizado:');
    imagenesSinPrecio.forEach(item => {
        console.log(`    - ${item.archivo} (${item.genero}/${item.ref})`);
    });
    console.log();
}

// ══════════════════════════════════════════════════════════════
// PASO 3: GENERAR ARCHIVOS DE PRODUCTOS
// ══════════════════════════════════════════════════════════════
console.log('📋 PASO 3: Generando archivos de productos...\n');

try {
    require('./generar_productos.js');
} catch(e) {
    console.error(`  ❌ Error en generar_productos.js: ${e.message}\n`);
}

console.log('\n' + '═'.repeat(60));
console.log('  ✅ SINCRONIZACIÓN COMPLETADA');
console.log('═'.repeat(60) + '\n');
console.log('💡 Próximos pasos:');
console.log('   1. Borra caché: Ctrl+Shift+Del en tu navegador');
console.log('   2. Recarga la página: F5');
console.log('   3. Los precios deberían estar actualizados\n');
