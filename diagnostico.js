const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('tenis.xlsx');

console.log('\n===== HOJAS DEL EXCEL =====');
console.log('Hojas:', workbook.SheetNames);

// Leer primera hoja (hombres)
const hoja1 = workbook.Sheets[workbook.SheetNames[0]];
const datos1 = XLSX.utils.sheet_to_json(hoja1);

console.log('\n===== PRIMEROS 5 PRODUCTOS (HOJA HOMBRES) =====');
for(let i = 0; i < Math.min(5, datos1.length); i++) {
    console.log(`Fila ${i+1}:`, datos1[i]);
}

// Leer segunda hoja (mujeres)
if(workbook.SheetNames[1]) {
    const hoja2 = workbook.Sheets[workbook.SheetNames[1]];
    const datos2 = XLSX.utils.sheet_to_json(hoja2);
    
    console.log('\n===== PRIMEROS 5 PRODUCTOS (HOJA MUJERES) =====');
    for(let i = 0; i < Math.min(5, datos2.length); i++) {
        console.log(`Fila ${i+1}:`, datos2[i]);
    }
}

console.log('\n===== NOMBRES DE COLUMNAS =====');
console.log('Hoja 1 columnas:', Object.keys(datos1[0] || {}));
if(workbook.SheetNames[1]) {
    const hoja2 = workbook.Sheets[workbook.SheetNames[1]];
    const datos2 = XLSX.utils.sheet_to_json(hoja2);
    console.log('Hoja 2 columnas:', Object.keys(datos2[0] || {}));
}