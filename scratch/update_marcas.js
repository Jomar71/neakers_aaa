const fs = require('fs');
const path = require('path');

const marcasDir = 'marcas';
const files = fs.readdirSync(marcasDir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(marcasDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Update script imports
        const oldImport = '<script src="../js/marcas_config.js"></script>';
        const newImports = '<script src="../js/marcas_config_hombres.js"></script>\n    <script src="../js/marcas_config_mujeres.js"></script>';
        
        if (content.includes(oldImport)) {
            content = content.replace(oldImport, newImports);
        }

        // Update merging logic
        const oldMerge = 'const productos = [...(typeof productosHombres !== \'undefined\' ? productosHombres : []), ...(typeof productosMujeres !== \'undefined\' ? productosMujeres : [])];';
        const newMerge = `const productos = [...(typeof productosHombres !== 'undefined' ? productosHombres : []), ...(typeof productosMujeres !== 'undefined' ? productosMujeres : [])];
        const marcasConfig = { ... (typeof marcasConfigHombres !== 'undefined' ? marcasConfigHombres : {}), ... (typeof marcasConfigMujeres !== 'undefined' ? marcasConfigMujeres : {}) };`;

        if (content.includes(oldMerge) && !content.includes('const marcasConfig =')) {
            content = content.replace(oldMerge, newMerge);
        }

        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
});