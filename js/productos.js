// Configuración de Banners y Descripciones de Marcas
// Aquí puedes cambiar la imagen que aparece en la tarjeta de "Ver Colección"
const marcasConfig = {
    "ADIDAS": {
        banner: "img/logos/LOGOADIDAS.jpeg",
        descripcion: "Estilo deportivo icónico y comodidad sin límites."
    },
    "NIKE": {
        banner: "img/logos/LOGONIKE.jpeg",
        descripcion: "Just Do It. Innovación y rendimiento en cada par."
    },
    "JORDAN": {
        banner: "img/logos/LOGONIKELOGO.jpeg",
        descripcion: "El legado de Su Majestad. Estilo premium de baloncesto."
    },
    "NEW BALANCE": {
        banner: "img/logos/LOGONEWBALANCE.jpeg",
        descripcion: "La mezcla perfecta entre funcionalidad y moda retro."
    },
    "PUMA": {
        banner: "img/logos/LOGOPUMA.jpeg",
        descripcion: "Forever Faster. Diseño vanguardista para el día a día."
    },
    // Agrega más marcas aquí siguiendo el mismo formato
};

const productos = [
    // Productos ADIDAS
    {
        id: 101,
        nombre: "Adidas Adistar",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_ADISTAR_MS1.jpeg",
        referencia: "MS1",
        precio: 185000,
        descripcion: "Zapatillas de alto rendimiento con tecnología boost"
    },
    {
        id: 102,
        nombre: "Adidas Adistar",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_ADISTAR_MS2.jpeg",
        referencia: "MS2",
        precio: 185000,
        descripcion: "Clásico diseño de zapatillas de moda"
    },
    {
        id: 103,
        nombre: "Adidas Blaze",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_BLAZE_MS1.jpeg",
        referencia: "MS1",
        precio: 180000,
        descripcion: "Zapatillas de alto rendimiento con tecnología boost"
    },
    {
        id: 104,
        nombre: "Adidas Blaze",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_BLAZE_MS2.jpeg",
        referencia: "MS2",
        precio: 180000,
        descripcion: "Clásico diseño de zapatillas de moda"
    },
    {
        id: 105,
        nombre: "Adidas Bounce",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_BOUNCE_MS1.jpeg",
        referencia: "MS1",
        precio: 185000,
        descripcion: "Zapatillas de alto rendimiento con tecnología boost"
    },
    {
        id: 106,
        nombre: "Adidas Equipm Nt",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_EQUIPM_NT_MS1.jpeg",
        referencia: "MS1",
        precio: 190000,
        descripcion: "Clásico diseño de zapatillas de moda"
    },
    {
        id: 107,
        nombre: "Adidas Equipm Nt",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_EQUIPM_NT_MS2.jpeg",
        referencia: "MS2",
        precio: 190000,
        descripcion: "Zapatillas de alto rendimiento con tecnología boost"
    },
    {
        id: 108,
        nombre: "Adidas Niteball",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_NITEBALL_MS1.jpeg",
        referencia: "MS1",
        precio: 190000,
        descripcion: "Clásico diseño de zapatillas de moda"
    },
    {
        id: 109,
        nombre: "Adidas Niteball",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_NITEBALL_MS2.jpeg",
        referencia: "MS2",
        precio: 190000,
        descripcion: "Zapatillas de alto rendimiento con tecnología boost"
    },
    {
        id: 110,
        nombre: "Adidas Niteball",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_NITEBALL_MS3.jpeg",
        referencia: "MS3",
        precio: 190000,
        descripcion: "Clásico diseño de zapatillas de moda"
    },
    {
        id: 111,
        nombre: "Adidas Samba",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_SAMBA_MS1.jpeg",
        referencia: "MS1",
        precio: 175000,
        descripcion: "Zapatillas de alto rendimiento con tecnología boost"
    },
    {
        id: 112,
        nombre: "Adidas Ultraboost",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_ULTRABOOST_MS1.jpeg",
        referencia: "MS1",
        precio: 180000,
        descripcion: "Clásico diseño de zapatillas de moda"
    },
    {
        id: 113,
        nombre: "Adidas Ultraboost",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_ULTRABOOST_MS2.jpeg",
        referencia: "MS2",
        precio: 180000,
        descripcion: "Zapatillas de alto rendimiento con tecnología boost"
    },
    {
        id: 114,
        nombre: "Adidas Yeezy",
        marca: "ADIDAS",
        genero: "hombre",
        imagen: "img/hombres/Adidas/ADIDAS_YEEZY_MS1.jpeg",
        referencia: "MS2",
        precio: 185000,
        descripcion: "Clásico diseño de zapatillas de moda"
    },


    // Productos ARMANI
    {
        id: 201,
        nombre: "Armani Exchange",
        marca: "ARMANI",
        genero: "hombre",
        imagen: "img/hombres/Armani/ARMANI_EXCHANGE_MS1.jpeg",
        referencia: "MS1",
        precio: 185000,
        descripcion: "Calzado elegante de diseñador"
    },
    {
        id: 202,
        nombre: "Armani Exchange",
        marca: "ARMANI",
        genero: "hombre",
        imagen: "img/hombres/Armani/ARMANI_EXCHANGE_MS2.jpeg",
        referencia: "MS2",
        precio: 185000,
        descripcion: "Calzado elegante de diseñador"
    },
    {
        id: 203,
        nombre: "Armani Exchange",
        marca: "ARMANI",
        genero: "hombre",
        imagen: "img/hombres/Armani/ARMANI_EXCHANGE_MS3.jpeg",
        referencia: "MS3",
        precio: 185000,
        descripcion: "Calzado elegante de diseñador"
    },
    {
        id: 204,
        nombre: "Armani Exchange",
        marca: "ARMANI",
        genero: "hombre",
        imagen: "img/hombres/Armani/ARMANI_EXCHANGE_MS4.jpeg",
        referencia: "MS4",
        precio: 185000,
        descripcion: "Calzado elegante de diseñador"
    },
    {
        id: 205,
        nombre: "Armani Exchange",
        marca: "ARMANI",
        genero: "hombre",
        imagen: "img/hombres/Armani/ARMANI_EXCHANGE_MS5.jpeg",
        referencia: "MS5",
        precio: 185000,
        descripcion: "Calzado elegante de diseñador"
    },
    {
        id: 206,
        nombre: "Armani Exchange",
        marca: "ARMANI",
        genero: "hombre",
        imagen: "img/hombres/Armani/ARMANI_EXCHANGE_MS6.jpeg",
        referencia: "MS6",
        precio: 185000,
        descripcion: "Calzado elegante de diseñador"
    },
    {
        id: 207,
        nombre: "Armani Exchange",
        marca: "ARMANI",
        genero: "hombre",
        imagen: "img/hombres/Armani/ARMANI_EXCHANGE_MS7.jpeg",
        referencia: "MS7",
        precio: 185000,
        descripcion: "Calzado elegante de diseñador"
    },
    {
        id: 208,
        nombre: "Armani Exchange",
        marca: "ARMANI",
        genero: "hombre",
        imagen: "img/hombres/Armani/ARMANI_EXCHANGEMS8.jpeg",
        referencia: "MS8",
        precio: 185000,
        descripcion: "Calzado elegante de diseñador"
    },

    // Productos ASICS
    {
        id: 301,
        nombre: "Asics",
        marca: "ASICS",
        genero: "hombre",
        imagen: "img/hombres/Asics/ASICSMS1.jpeg",
        referencia: "MS1",
        precio: 195000,
        descripcion: "Zapatillas de running con máxima estabilidad"
    },

    // Productos CATERPILLAR
    {
        id: 401,
        nombre: "Caterpillar Felton",
        marca: "CATERPILLAR",
        genero: "hombre",
        imagen: "img/hombres/Caterpillar/CATERPILLAR_BOOT_MS1.jpeg",
        referencia: "CAT001",
        precio: 320000,
        descripcion: "Botas resistentes de estilo industrial"
    },

    // Productos COACH
    {
        id: 501,
        nombre: "Coach",
        marca: "COACH",
        genero: "hombre",
        imagen: "img/hombres/Coach/COACHMS1.jpeg",
        referencia: "MS1",
        precio: 195000,
        descripcion: "Mocasines elegantes de cuero genuino"
    },

    // Productos CONVERSE
    {
        id: 601,
        nombre: "Converse Chuck Taylor All Star",
        marca: "CONVERSE",
        genero: "unisex",
        imagen: "img/hombres/Converse/CONVERSE_CHUCK_TAYLOR_MS1.jpeg",
        referencia: "CON001",
        precio: 180000,
        descripcion: "Iconicas zapatillas casuales"
    },

    // Productos DIESEL
    {
        id: 701,
        nombre: "Diesel",
        marca: "DIESEL",
        genero: "hombre",
        imagen: "img/hombres/Diesel/DIESELMS1.jpeg",
        referencia: "MS1",
        precio: 180000,
        descripcion: "Zapatillas urbanas de corte alto"
    },
    {
        id: 702,
        nombre: "Diesel",
        marca: "DIESEL",
        genero: "hombre",
        imagen: "img/hombres/Diesel/DIESELMS2.jpeg",
        referencia: "MS2",
        precio: 180000,
        descripcion: "Zapatillas urbanas de corte alto"
    },

    // Productos DOLCE & GABBANA
    {
        id: 801,
        nombre: "Dolce & Gabbana",
        marca: "DOLCE & GABBANA",
        genero: "hombre",
        imagen: "img/hombres/Dolce & Gabbana/DOLCE_GABBANA_SHOE_MS1.jpeg",
        referencia: "DOG001",
        precio: 1200000,
        descripcion: "Zapatillas de diseñador con estampado icónico"
    },

    // Productos FILA
    {
        id: 901,
        nombre: "Fila Zagatoms",
        marca: "FILA",
        genero: "hombre",
        imagen: "img/hombres/Fila/FILAZAGATOMS1.jpeg",
        referencia: "MS1",
        precio: 190000,
        descripcion: "Zapatillas chunky de estilo retro"
    },

    // Productos GUAYO
    {
        id: 1001,
        nombre: "Guayo Clásico",
        marca: "GUAYO",
        genero: "unisex",
        imagen: "img/hombres/Guayo/GUAYO_SHOE_MS1.jpeg",
        referencia: "GUA001",
        precio: 95000,
        descripcion: "Calzado tradicional colombiano"
    },

    // Productos HOKA
    {
        id: 1101,
        nombre: "Hoka",
        marca: "HOKA",
        genero: "hombre",
        imagen: "img/hombres/Hoka/HOKAMS1.jpeg",
        referencia: "MS1",
        precio: 200000,
        descripcion: "Zapatillas de running con máxima amortiguación"
    },
    {
        id: 1102,
        nombre: "Hoka",
        marca: "HOKA",
        genero: "hombre",
        imagen: "img/hombres/Hoka/HOKAMS2.jpeg",
        referencia: "MS2",
        precio: 200000,
        descripcion: "Zapatillas de running con máxima amortiguación"
    },
    {
        id: 1103,
        nombre: "Hoka",
        marca: "HOKA",
        genero: "hombre",
        imagen: "img/hombres/Hoka/HOKAMS3.jpeg",
        referencia: "MS3",
        precio: 200000,
        descripcion: "Zapatillas de running con máxima amortiguación"
    },
    {
        id: 1104,
        nombre: "Hoka",
        marca: "HOKA",
        genero: "hombre",
        imagen: "img/hombres/Hoka/HOKAMS4.jpeg",
        referencia: "MS4",
        precio: 200000,
        descripcion: "Zapatillas de running con máxima amortiguación"
    },

    // Productos HUGO BOSS
    {
        id: 1201,
        nombre: "Hugo Boss",
        marca: "HUGO BOSS",
        genero: "hombre",
        imagen: "img/hombres/Hugo Boss/HUGO_BOSSMS1.jpeg",
        referencia: "MS1",
        precio: 138000,
        descripcion: "Zapatos deportivos de diseño elegante"
    },
    {
        id: 1202,
        nombre: "Hugo Boss",
        marca: "HUGO BOSS",
        genero: "hombre",
        imagen: "img/hombres/Hugo Boss/HUGO_BOSSMS2.jpeg",
        referencia: "MS2",
        precio: 138000,
        descripcion: "Zapatos deportivos de diseño elegante"
    },
    {
        id: 1203,
        nombre: "Hugo Boss",
        marca: "HUGO BOSS",
        genero: "hombre",
        imagen: "img/hombres/Hugo Boss/HUGO_BOSSMS3.jpeg",
        referencia: "MS3",
        precio: 138000,
        descripcion: "Zapatos deportivos de diseño elegante"
    },
    {
        id: 1204,
        nombre: "Hugo Boss",
        marca: "HUGO BOSS",
        genero: "hombre",
        imagen: "img/hombres/Hugo Boss/HUGO_BOSSMS10.jpeg",
        referencia: "MS10",
        precio: 180000,
        descripcion: "Zapatos deportivos de diseño elegante"
    },
    {
        id: 1205,
        nombre: "Hugo Boss",
        marca: "HUGO BOSS",
        genero: "hombre",
        imagen: "img/hombres/Hugo Boss/HUGO_BOSSMS11.jpeg",
        referencia: "MS11",
        precio: 180000,
        descripcion: "Zapatos deportivos de diseño elegante"
    },
    {
        id: 1206,
        nombre: "Hugo Boss",
        marca: "HUGO BOSS",
        genero: "hombre",
        imagen: "img/hombres/Hugo Boss/HUGO_BOSSMS31.jpeg",
        referencia: "MS31",
        precio: 190000,
        descripcion: "Zapatos deportivos de diseño elegante"
    },
    {
        id: 1207,
        nombre: "Hugo Boss",
        marca: "HUGO BOSS",
        genero: "hombre",
        imagen: "img/hombres/Hugo Boss/HUGO_BOSSMS32.jpeg",
        referencia: "MS32",
        precio: 190000,
        descripcion: "Zapatos deportivos de diseño elegante"
    },

    // Productos LACOSTE
    {
        id: 1301,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS1.jpeg",
        referencia: "MS1",
        precio: 190000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1302,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS2.jpeg",
        referencia: "MS2",
        precio: 190000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1303,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS31.jpeg",
        referencia: "MS31",
        precio: 190000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1304,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS32.jpeg",
        referencia: "MS1",
        precio: 190000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1305,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS41.jpeg",
        referencia: "MS41",
        precio: 190000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1306,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS42.jpeg",
        referencia: "MS42",
        precio: 190000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1307,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS43.jpeg",
        referencia: "MS43",
        precio: 190000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1308,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS44.jpeg",
        referencia: "MS44",
        precio: 190000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1309,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS45.jpeg",
        referencia: "MS45",
        precio: 190000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1310,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS51.jpeg",
        referencia: "MS51",
        precio: 180000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1311,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS52.jpeg",
        referencia: "MS45",
        precio: 180000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },
    {
        id: 1312,
        nombre: "Lacoste",
        marca: "LACOSTE",
        genero: "hombre",
        imagen: "img/hombres/Lacoste/LACOSTEMS53.jpeg",
        referencia: "MS53",
        precio: 180000,
        descripcion: "Zapatillas casuales con el legendario cocodrilo"
    },

    // Productos LE COQ SPORTIF
    {
        id: 1401,
        nombre: "Le Coq",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQMS1.jpeg",
        referencia: "MS1",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1402,
        nombre: "Le Coq",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQMS2.jpeg",
        referencia: "MS2",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1403,
        nombre: "Le Coq",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQMS3.jpeg",
        referencia: "MS3",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1404,
        nombre: "Le Coq",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQMS4.jpeg",
        referencia: "MS4",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1405,
        nombre: "Le Coq",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQMS5.jpeg",
        referencia: "MS5",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1406,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS1.jpeg",
        referencia: "MS1",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1407,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS2.jpeg",
        referencia: "MS2",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1408,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS31.jpeg",
        referencia: "MS31",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1409,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS32.jpeg",
        referencia: "MS32",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1410,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS41.jpeg",
        referencia: "MS41",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1411,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS42.jpeg",
        referencia: "MS42",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1412,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS43.jpeg",
        referencia: "MS43",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1413,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS61.jpeg",
        referencia: "MS61",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1414,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS62.jpeg",
        referencia: "MS62",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1415,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS63.jpeg",
        referencia: "MS63",
        precio: 185000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1416,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS71.jpeg",
        referencia: "MS71",
        precio: 195000,
        descripcion: "Zapatillas de estilo retro francés"
    },
    {
        id: 1417,
        nombre: "Le Coq Sportif",
        marca: "LE COQ SPORTIF",
        genero: "Caballero",
        imagen: "img/hombres/le coq sportif/LE_COQ_SPORTIFMS72.jpeg",
        referencia: "MS72",
        precio: 195000,
        descripcion: "Zapatillas de estilo retro francés"
    },

    // Productos LOUIS VUITTON 
    {
        id: 1501,
        nombre: "Louis Vuitton",
        marca: "LOUIS VUITTON",
        genero: "Caballero",
        imagen: "img/hombres/Louis Vuitton/LOUIS_VUITTONMS1.jpeg",
        referencia: "MS1",
        precio: 1800000,
        descripcion: "Zapatillas de diseñador con silueta única"
    },
    {
        id: 1502,
        nombre: "Louis Vuitton",
        marca: "LOUIS VUITTON",
        genero: "Caballero",
        imagen: "img/hombres/Louis Vuitton/LOUIS_VUITTONMS2.jpeg",
        referencia: "MS2",
        precio: 1800000,
        descripcion: "Zapatillas de diseñador con silueta única"
    },

    // Productos NEW BALANCE
    {
        id: 1601,
        nombre: "New Balance 574 Classic",
        marca: "NEW BALANCE",
        genero: "unisex",
        imagen: "img/hombres/New Balance/NEW_BALANCE_SHOE_MS1.jpeg",
        referencia: "NB001",
        precio: 350000,
        descripcion: "Zapatillas clásicas de estilo retro"
    },

    // Productos NIKE
    {
        id: 1701,
        nombre: "Jordan Bota",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/JORDAN_BOTAMS1.jpeg",
        referencia: "MS1",
        precio: 195000,
        descripcion: "Zapatillas con unidad Air Max visible"
    },
    {
        id: 1702,
        nombre: "Jordan Cadence",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/JORDAN_CADENCEMS31.jpeg",
        referencia: "MS1",
        precio: 200000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1703,
        nombre: "Nike Correlate",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_CORRELATEMS1.jpeg",
        referencia: "MS1",
        precio: 190000,
        descripcion: "Zapatillas con unidad Air Max visible"
    },
    {
        id: 1704,
        nombre: "Nike Flex",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_FLEXMS1.jpeg",
        referencia: "MS1",
        precio: 180000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1705,
        nombre: "Nike Initiator",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_INITIATORMS1.jpeg",
        referencia: "MS1",
        precio: 195000,
        descripcion: "Zapatillas con unidad Air Max visible"
    },
    {
        id: 1706,
        nombre: "Nike",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKEMS1.jpeg",
        referencia: "MS1",
        precio: 185000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1707,
        nombre: "Nike",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKEMS31.jpeg",
        referencia: "MS31",
        precio: 185000,
        descripcion: "Zapatillas con unidad Air Max visible"
    },
    {
        id: 1708,
        nombre: "Nike",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKEMS32.jpeg",
        referencia: "MS32",
        precio: 185000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1709,
        nombre: "Nike P-6000",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_P-6000MS2.jpeg",
        referencia: "MS2",
        precio: 190000,
        descripcion: "Zapatillas con unidad Air Max visible"
    },
    {
        id: 1710,
        nombre: "Nike P-6000",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_P-6000MS3.jpeg",
        referencia: "MS3",
        precio: 190000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1711,
        nombre: "Nike Pulse",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_PULSEMS1.jpeg",
        referencia: "MS1",
        precio: 195000,
        descripcion: "Zapatillas con unidad Air Max visible"
    },
    {
        id: 1712,
        nombre: "Nike Pulse",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/NIKE_PULSEMS2.jpeg",
        referencia: "MS2",
        precio: 195000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1713,
        nombre: "Nike Pulse",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_PULSEMS3.jpeg",
        referencia: "MS3",
        precio: 195000,
        descripcion: "Zapatillas con unidad Air Max visible"
    },
    {
        id: 1714,
        nombre: "Nike Tn",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_TNMS.jpeg",
        referencia: "MS1",
        precio: 180000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1715,
        nombre: "Nike Tn",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_TNMS2.jpeg",
        referencia: "MS2",
        precio: 180000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1716,
        nombre: "Nike Trail",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_TRAILMS1.jpeg",
        referencia: "MS1",
        precio: 195000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1717,
        nombre: "Nike Vomero",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_VOMEROMS1.jpeg",
        referencia: "MS1",
        precio: 185000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1718,
        nombre: "Nike Zoom",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_ZOOMMS1.jpeg",
        referencia: "MS1",
        precio: 175000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1719,
        nombre: "Nike Zoom",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_ZOOMMS2.jpeg",
        referencia: "MS2",
        precio: 180000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1720,
        nombre: "Nike Zoom",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_ZOOMMS3.jpeg",
        referencia: "MS3",
        precio: 180000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1721,
        nombre: "Nike Zoom",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_ZOOMMS31.jpeg",
        referencia: "MS31",
        precio: 190000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1722,
        nombre: "Nike Zoom",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_ZOOMMS32.jpeg",
        referencia: "MS32",
        precio: 190000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1723,
        nombre: "Nike Zoom",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_ZOOMMS33.jpeg",
        referencia: "MS33",
        precio: 190000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },
    {
        id: 1724,
        nombre: "Nike Zoom",
        marca: "NIKE",
        genero: "Caballero",
        imagen: "img/hombres/Nike/NIKE_ZOOMMS34.jpeg",
        referencia: "MS34",
        precio: 190000,
        descripcion: "Iconicas zapatillas de baloncesto"
    },

    // Productos ON CLOUD
    {
        id: 1801,
        nombre: "On Cloud",
        marca: "ON CLOUD",
        genero: "unisex",
        imagen: "img/hombres/On Cloud/ON_CLOUDMS1.jpeg",
        referencia: "MS1",
        precio: 185000,
        descripcion: "Zapatillas con tecnología de amortiguación CloudTec"
    },
    {
        id: 1802,
        nombre: "On Cloud",
        marca: "ON CLOUD",
        genero: "unisex",
        imagen: "img/hombres/On Cloud/ON_CLOUDMS2.jpeg",
        referencia: "MS2",
        precio: 185000,
        descripcion: "Zapatillas con tecnología de amortiguación CloudTec"
    },
    {
        id: 1803,
        nombre: "On Cloud",
        marca: "ON CLOUD",
        genero: "unisex",
        imagen: "img/hombres/On Cloud/ON_CLOUDMS31.jpeg",
        referencia: "MS31",
        precio: 195000,
        descripcion: "Zapatillas con tecnología de amortiguación CloudTec"
    },
    {
        id: 1804,
        nombre: "On Cloud",
        marca: "ON CLOUD",
        genero: "unisex",
        imagen: "img/hombres/On Cloud/ON_CLOUDMS32.jpeg",
        referencia: "MS32",
        precio: 195000,
        descripcion: "Zapatillas con tecnología de amortiguación CloudTec"
    },
    {
        id: 1805,
        nombre: "On Cloud",
        marca: "ON CLOUD",
        genero: "unisex",
        imagen: "img/hombres/On Cloud/ON_CLOUDMS33.jpeg",
        referencia: "MS33",
        precio: 195000,
        descripcion: "Zapatillas con tecnología de amortiguación CloudTec"
    },

    // Productos PUMA
    {
        id: 1901,
        nombre: "Puma Suede XL",
        marca: "PUMA",
        genero: "Caballero",
        imagen: "img/hombres/Puma/PUMA_SUEDE_XL_MS1.jpeg",
        referencia: "MS1",
        precio: 185000,
        descripcion: "Zapatillas chunky con diseño audaz"
    },

    // Productos REEBOK
    {
        id: 2001,
        nombre: "Reebok Classic Leather",
        marca: "REEBOK",
        genero: "unisex",
        imagen: "img/hombres/Reebok/REEBOK_MASTERMS1.jpeg",
        referencia: "MS1",
        precio: 189000,
        descripcion: "Zapatillas clásicas de estilo retro"
    },

    // Productos SKECHERS
    {
        id: 2101,
        nombre: "Skechers Go Walk",
        marca: "SKECHERS",
        genero: "unisex",
        imagen: "img/hombres/Skechers/SKECHERS_SHOE_MS1.jpeg",
        referencia: "SKE001",
        precio: 250000,
        descripcion: "Zapatillas cómodas para caminar"
    },

    // Productos TIMBERLAND
    {
        id: 2201,
        nombre: "Timberland Bota",
        marca: "TIMBERLAND",
        genero: "hombre",
        imagen: "img/hombres/Timberland/TIMBERLAND_BOOT_MS1.jpeg",
        referencia: "TIM001",
        precio: 210000,
        descripcion: "Botas icónicas resistentes al agua"
    },
    {
        id: 2202,
        nombre: "Timberland",
        marca: "TIMBERLAND",
        genero: "hombre",
        imagen: "img/hombres/Timberland/TIMBERLANDMS1.jpeg",
        referencia: "MS1",
        precio: 200000,
        descripcion: "Botas icónicas resistentes al agua"
    },
    {
        id: 2203,
        nombre: "Timberland",
        marca: "TIMBERLAND",
        genero: "hombre",
        imagen: "img/hombres/Timberland/TIMBERLANDMS2.jpeg",
        referencia: "MS2",
        precio: 200000,
        descripcion: "Botas icónicas resistentes al agua"
    },
    {
        id: 2204,
        nombre: "Timberland",
        marca: "TIMBERLAND",
        genero: "hombre",
        imagen: "img/hombres/Timberland/TIMBERLANDMS3.jpeg",
        referencia: "MS3",
        precio: 200000,
        descripcion: "Botas icónicas resistentes al agua"
    },
    {
        id: 2205,
        nombre: "Timberland",
        marca: "TIMBERLAND",
        genero: "hombre",
        imagen: "img/hombres/Timberland/TIMBERLANDMS4.jpeg",
        referencia: "MS4",
        precio: 200000,
        descripcion: "Botas icónicas resistentes al agua"
    },
    {
        id: 2206,
        nombre: "Timberland",
        marca: "TIMBERLAND",
        genero: "hombre",
        imagen: "img/hombres/Timberland/TIMBERLANDMS21.jpeg",
        referencia: "MS21",
        precio: 200000,
        descripcion: "Botas icónicas resistentes al agua"
    },
    {
        id: 2207,
        nombre: "Timberland",
        marca: "TIMBERLAND",
        genero: "hombre",
        imagen: "img/hombres/Timberland/TIMBERLANDMS22.jpeg",
        referencia: "MS22",
        precio: 200000,
        descripcion: "Botas icónicas resistentes al agua"
    },
    {
        id: 2208,
        nombre: "Timberland",
        marca: "TIMBERLAND",
        genero: "hombre",
        imagen: "img/hombres/Timberland/TIMBERLANDMS23.jpeg",
        referencia: "MS23",
        precio: 200000,
        descripcion: "Botas icónicas resistentes al agua"
    },

    // Productos TOMMY HILFIGER
    {
        id: 2301,
        nombre: "Tommy Hilfiger Flag Sneaker",
        marca: "TOMMY HILFIGER",
        genero: "unisex",
        imagen: "img/hombres/Tommy Hilfiger/TOMMY_HILFIGER_SHOE_MS1.jpeg",
        referencia: "TOM001",
        precio: 420000,
        descripcion: "Zapatillas con logo distintivo"
    },

    // Productos UNDER ARMOUR
    {
        id: 2401,
        nombre: "Under Armour",
        marca: "UNDER ARMOUR",
        genero: "unisex",
        imagen: "img/hombres/Under Armour/UNDER_ARMOURMS1.jpeg",
        referencia: "MS1",
        precio: 210000,
        descripcion: "Zapatillas de running con tecnología de conexión"
    },
    {
        id: 2402,
        nombre: "Under Armour",
        marca: "UNDER ARMOUR",
        genero: "unisex",
        imagen: "img/hombres/Under Armour/UNDER_ARMOURMS2.jpeg",
        referencia: "MS2",
        precio: 210000,
        descripcion: "Zapatillas de running con tecnología de conexión"
    },

    // Productos VANS
    {
        id: 2501,
        nombre: "Vans Rowley",
        marca: "VANS",
        genero: "Caballero",
        imagen: "img/hombres/Vans/VANS_ROWLEYMS1.jpeg",
        referencia: "MS1",
        precio: 200000,
        descripcion: "Zapatillas clásicas con banda lateral distintiva"
    },
    {
        id: 2502,
        nombre: "Vans",
        marca: "VANS",
        genero: "Caballero",
        imagen: "img/hombres/Vans/VANSMS1.jpeg",
        referencia: "MS1",
        precio: 185000,
        descripcion: "Zapatillas clásicas con banda lateral distintiva"
    },
    {
        id: 2503,
        nombre: "Vans",
        marca: "VANS",
        genero: "Caballero",
        imagen: "img/hombres/Vans/VANSMS2.jpeg",
        referencia: "MS2",
        precio: 190000,
        descripcion: "Zapatillas clásicas con banda lateral distintiva"
    },
];