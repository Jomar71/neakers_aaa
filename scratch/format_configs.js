const fs = require('fs');

const processConfig = (filePath, isMujeres) => {
    let code = fs.readFileSync(filePath, 'utf8');
    const varName = isMujeres ? 'marcasConfigMujeres' : 'marcasConfigHombres';
    
    // Evaluate to object
    let configObj;
    try {
        const match = code.match(new RegExp(`const ${varName} = ([\\s\\S]*?);`, 'm'));
        configObj = eval(`(${match[1]})`);
    } catch (e) {
        console.error('Error parsing', filePath);
        return;
    }
    
    // Sort object keys
    const sortedObj = {};
    Object.keys(configObj).sort().forEach(key => {
        sortedObj[key] = configObj[key];
    });

    let result = `// ==========================================\n`;
    result += `// CONFIGURACIÓN DE MARCAS PARA ${isMujeres ? 'MUJERES' : 'HOMBRES'}\n`;
    result += `// ==========================================\n`;
    result += `// Utiliza este archivo para configurar los banners (imágenes principales)\n`;
    result += `// y descripciones de cada marca que aparecerán en la sección de ${isMujeres ? 'mujeres' : 'hombres'}.\n`;
    result += `// IMPORTANTE: Asegúrate de mantener el formato exacto.\n\n`;
    
    result += `const ${varName} = ${JSON.stringify(sortedObj, null, 4)};\n`;
    
    fs.writeFileSync(filePath, result);
    console.log('Formatted', filePath);
};

processConfig('js/marcas_config_hombres.js', false);
processConfig('js/marcas_config_mujeres.js', true);