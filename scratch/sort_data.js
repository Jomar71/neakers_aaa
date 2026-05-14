const fs = require('fs');
const path = require('path');

const filesToProcess = [
    {
        path: 'js/productos_hombres.js',
        varName: 'productosHombres',
        sortBy: ['marca', 'nombre', 'referencia']
    },
    {
        path: 'js/productos_mujeres.js',
        varName: 'productosMujeres',
        sortBy: ['marca', 'nombre', 'referencia']
    },
    {
        path: 'js/marcas_config_hombres.js',
        varName: 'marcasConfigHombres',
        isObject: true
    },
    {
        path: 'js/marcas_config_mujeres.js',
        varName: 'marcasConfigMujeres',
        isObject: true
    }
];

filesToProcess.forEach(fileInfo => {
    const fullPath = path.join(process.cwd(), fileInfo.path);
    if (!fs.existsSync(fullPath)) return;

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Extraer el array u objeto
    const regex = new RegExp(`const ${fileInfo.varName} = ([\\s\\S]*?);`, 'm');
    const match = content.match(regex);
    
    if (match) {
        let data;
        try {
            // Evaluar el contenido para obtener el objeto real
            // Usamos eval de forma segura aquí porque controlamos el input
            data = eval(`(${match[1]})`);
        } catch (e) {
            console.error(`Error parsing ${fileInfo.path}:`, e);
            return;
        }

        if (Array.isArray(data)) {
            data.sort((a, b) => {
                for (let field of fileInfo.sortBy) {
                    const valA = String(a[field] || '').toUpperCase();
                    const valB = String(b[field] || '').toUpperCase();
                    if (valA < valB) return -1;
                    if (valA > valB) return 1;
                }
                return 0;
            });
        } else if (typeof data === 'object') {
            const sortedObj = {};
            Object.keys(data).sort().forEach(key => {
                sortedObj[key] = data[key];
            });
            data = sortedObj;
        }

        const newDataStr = JSON.stringify(data, null, 4);
        const newContent = content.replace(match[1], newDataStr);
        fs.writeFileSync(fullPath, newContent);
        console.log(`Sorted ${fileInfo.path}`);
    }
});