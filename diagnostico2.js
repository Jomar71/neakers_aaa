const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('tenis.xlsx');
const hojaHombres = workbook.Sheets['HOMBRES'];
const hojaMujeres = workbook.Sheets['MUJERES'];

const hombres = XLSX.utils.sheet_to_json(hojaHombres, { defval: "" });
const mujeres = XLSX.utils.sheet_to_json(hojaMujeres, { defval: "" });

console.log('\n===== PRECIOS EN EXCEL (HOMBRES) =====');
let count = 0;
for (let item of hombres) {
    if (item.NOMBRE && item.REF && count < 10) {
        const nombre = String(item.NOMBRE).trim().toUpperCase();
        const ref = String(item.REF).trim().toUpperCase();
        const precio = item.PRECIO;
        const marca = nombre.split(' ')[0];
        console.log(`  EXCEL: hombre_${marca}_${ref} = ${precio}`);
        count++;
    }
}

console.log('\n===== PRECIOS EN EXCEL (MUJERES) =====');
count = 0;
for (let item of mujeres) {
    if (item.NOMBRE && item.REF && count < 10) {
        const nombre = String(item.NOMBRE).trim().toUpperCase();
        const ref = String(item.REF).trim().toUpperCase();
        const precio = item.PRECIO;
        const marca = nombre.split(' ')[0];
        console.log(`  EXCEL: mujer_${marca}_${ref} = ${precio}`);
        count++;
    }
}

// También mostrar lo que genera el script al leer las imágenes
const path = require('path');
const fs2 = require('fs');

console.log('\n===== EJEMPLO DE CLAVES QUE BUSCA EL SISTEMA =====');

function extraerReferencia(archivo) {
    const base = path.basename(archivo, path.extname(archivo));
    const match = base.match(/(D?MS\d+)$/i);
    return match ? match[1].toUpperCase() : 'MS1';
}

// Leer algunas imágenes de ejemplo
const carpetaHombres = path.join(__dirname, 'img', 'hombres');
if (fs2.existsSync(carpetaHombres)) {
    const marcas = fs2.readdirSync(carpetaHombres).filter(f => fs2.statSync(path.join(carpetaHombres, f)).isDirectory());
    for (let marcaCarpeta of marcas.slice(0, 3)) {
        const rutaMarca = path.join(carpetaHombres, marcaCarpeta);
        const archivos = fs2.readdirSync(rutaMarca).filter(f => /\.(jpeg|jpg|png|webp)$/i.test(f));
        for (let archivo of archivos.slice(0, 2)) {
            const ref = extraerReferencia(archivo);
            const marca = marcaCarpeta.toUpperCase();
            console.log(`  BUSCA: hombre_${marca}_${ref}`);
        }
    }
}