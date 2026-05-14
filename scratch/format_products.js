const fs = require('fs');

const formatArray = (arrayName, items, isMujeres) => {
    // Sort items
    items.sort((a, b) => {
        if (a.marca.toUpperCase() < b.marca.toUpperCase()) return -1;
        if (a.marca.toUpperCase() > b.marca.toUpperCase()) return 1;
        if (a.nombre.toUpperCase() < b.nombre.toUpperCase()) return -1;
        if (a.nombre.toUpperCase() > b.nombre.toUpperCase()) return 1;
        if (a.referencia.toUpperCase() < b.referencia.toUpperCase()) return -1;
        if (a.referencia.toUpperCase() > b.referencia.toUpperCase()) return 1;
        return 0;
    });

    let currentMarca = '';
    let result = `// Lista de productos para ${isMujeres ? 'mujeres' : 'hombres'}\n`;
    result += `const ${arrayName} = [\n`;

    items.forEach((item, index) => {
        if (item.marca.toUpperCase() !== currentMarca) {
            currentMarca = item.marca.toUpperCase();
            result += `    // ==========================================\n`;
            result += `    // ${currentMarca}\n`;
            result += `    // ==========================================\n`;
        }
        
        let itemStr = JSON.stringify(item, null, 4);
        // Indent correctly
        itemStr = itemStr.split('\n').map(line => '    ' + line).join('\n');
        // Remove first indentation since we'll add it
        itemStr = itemStr.substring(4);
        
        result += `    ${itemStr}`;
        if (index < items.length - 1) {
            result += `,`;
        }
        result += `\n\n`;
    });

    result += `];\n`;
    return result;
};

['hombres', 'mujeres'].forEach(gender => {
    const file = `js/productos_${gender}.js`;
    let code = fs.readFileSync(file, 'utf8');
    const varName = gender === 'hombres' ? 'productosHombres' : 'productosMujeres';
    
    // Evaluate safely
    eval(code.replace('const ', 'var '));
    const items = gender === 'hombres' ? productosHombres : productosMujeres;
    
    const newCode = formatArray(varName, items, gender === 'mujeres');
    fs.writeFileSync(file, newCode);
    console.log(`Formatted ${file}`);
});