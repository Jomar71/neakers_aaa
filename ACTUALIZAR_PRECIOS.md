# 📱 Guía de Actualización de Precios - JOMAR AAA

## 🎯 Flujo Rápido (3 pasos)

### **Paso 1: Editar `tenis.xlsx`**
1. Abre el archivo `tenis.xlsx` con Excel/LibreOffice/Google Sheets
2. Encuentra la hoja **HOMBRES** o **MUJERES**
3. Columnas requeridas:
   - **NOMBRE**: Marca + Modelo (ej: `NIKE AIR FORCE`, `ADIDAS SAMBAMS`)
   - **REF**: Referencia (ej: `MS1`, `DMS5`, `MS31`)
   - **PRECIO**: Precio en COP (ej: `185000`, `190.000`, `190000`)
4. Guarda los cambios

### **Paso 2: Generar precios.json**
Ejecuta en la terminal:
```bash
npm run precios
```
O manualmente:
```bash
node convertir.js
```

### **Paso 3: Generar archivos de productos**
Ejecuta:
```bash
npm run generar
```
O todo en una línea:
```bash
npm run update
```

✅ **Los cambios se reflejan automáticamente en la página.**

---

## 📋 Estructura de `tenis.xlsx`

### Hoja HOMBRES
| NOMBRE | REF | PRECIO |
|--------|-----|--------|
| NIKE AIR FORCE | MS1 | 185000 |
| ADIDAS SAMBAMS | MS2 | 190000 |
| HUGO BOSS CLASSIC | DMS1 | 138000 |

### Hoja MUJERES
| NOMBRE | REF | PRECIO |
|--------|-----|--------|
| NIKE AIR MAX | MS1 | 175000 |
| ADIDAS ULTRA BOOST | MS2 | 190000 |

**Nota:** Las referencias con `D` al inicio (DMS1, DMS2) se normalizan automáticamente a MS1, MS2, etc.

---

## 🔧 Cómo Funcionan los Scripts

### `convertir.js`
✅ Lee `tenis.xlsx`  
✅ Extrae marca, referencia y precio  
✅ Genera `precios.json` (mapa genero_marca_referencia → precio)

```json
{
  "hombre_NIKE_MS1": 185000,
  "mujer_NIKE_MS1": 175000,
  ...
}
```

### `generar_productos.js`
✅ Busca imágenes en `img/hombres/` e `img/mujeres/`  
✅ Lee precios desde `precios.json`  
✅ Genera `js/productos_hombres.js` y `js/productos_mujeres.js`  
✅ Estos archivos se cargan en las páginas HTML

---

## 🐛 Troubleshooting

### ❌ Error: "Cannot find module 'xlsx'"
```bash
npm install
```

### ❌ Precios no actualizados en la página
1. Verifica que ejecutaste `npm run update` (ambos scripts)
2. Borra el caché del navegador (Ctrl+Shift+Del)
3. Recarga la página (F5)
4. Verifica que `precios.json` tenga contenido:
   ```bash
   cat precios.json | head -20
   ```

### ❌ Error: "Carpeta no encontrada: img/hombres/"
- Asegúrate de crear las carpetas: `img/hombres/[MARCA]/` con las imágenes

### ❌ Referencia no encontrada
- Revisa que **REF** en Excel coincida exactamente con el nombre del archivo:
  - Archivo: `NIKEMS1.jpeg` → Debe ser REF: `MS1`
  - Archivo: `ADIDASDMS2.jpeg` → Debe ser REF: `DMS2` (se normaliza a MS2)

---

## 📊 Ejemplo Completo

**Archivo: tenis.xlsx (Hoja HOMBRES)**
```
NOMBRE                      | REF  | PRECIO
NIKE AIR FORCE              | MS1  | 185000
NIKE AIR MAX                | MS2  | 190000
ADIDAS ULTRABOOST           | MS1  | 180000
ADIDAS SAMBA                | MS2  | 180000
```

**Archivo: `img/hombres/Nike/NIKEAIRFORCEMS1.jpeg`**  
**Archivo: `img/hombres/Nike/NIKEAIRMAXMS2.jpeg`**  
**Archivo: `img/hombres/Adidas/ADIDASULTRABOOSTMS1.jpeg`**  
**Archivo: `img/hombres/Adidas/ADIDASSAMAMS2.jpeg`**

**Resultado final:**
- Nike Air Force (M) → $185.000
- Nike Air Max (M) → $190.000
- Adidas Ultraboost (H) → $180.000
- Adidas Samba (H) → $180.000

---

## 🚀 Comandos Disponibles

| Comando | Función |
|---------|---------|
| `npm run update` | ⚡ Actualiza todo (precios + productos) |
| `npm run precios` | Genera solo precios.json desde Excel |
| `npm run generar` | Genera solo archivos de productos JS |

---

## 💾 Archivos Generados Automáticamente

- `precios.json` — Mapa de precios (reutilizable)
- `js/productos_hombres.js` — Array de productos (hombres)
- `js/productos_mujeres.js` — Array de productos (mujeres)

**⚠️ NO editar manualmente** — Se regeneran cada vez que ejecutas los scripts.

---

## 📝 Notas Importantes

✅ Las marcas se detectan automáticamente  
✅ Los precios se sincronizan en carrito.html  
✅ Compatible con espacios y caracteres especiales en nombres  
✅ Maneja múltiples variantes de mismo producto (MS1, MS2, etc)  
✅ Soporta referencias con prefijo "D" (DMS1 → MS1)

---

**Última actualización:** 06/06/2026
