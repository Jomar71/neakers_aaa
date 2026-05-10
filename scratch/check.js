const fs = require('fs');

const hombres = fs.readFileSync('js/productos_hombres.js', 'utf8');
const mujeres = fs.readFileSync('js/productos_mujeres.js', 'utf8');

const hMatch = hombres.match(/"genero":\s*"([^"]+)"/g);
console.log('Hombres generos:', [...new Set(hMatch)]);

const mMatch = mujeres.match(/"genero":\s*"([^"]+)"/g);
console.log('Mujeres generos:', [...new Set(mMatch)]);
