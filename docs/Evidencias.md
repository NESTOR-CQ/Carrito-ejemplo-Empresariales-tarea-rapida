# Evidencias — Mini-Carrito Funcional

**Proyecto:** Mini-Carrito Funcional  
**Integrantes:** Sullca Avalos Jhordan Marius · Checa Quispe Nestor

---

## Estado de las Evidencias

Las capturas de pantalla se encuentran en la carpeta [`evidencias/`](../evidencias/) en la raíz del proyecto.

> **Nota:** Las capturas se generaron durante la ejecución real de la aplicación con `npm run dev`.  
> Si deseas actualizarlas, sigue las instrucciones de la sección siguiente.

---

## Capturas Disponibles

| Archivo | Descripción |
|---|---|
| `evidencias/01-catalogo-inicial.png` | Vista inicial de la tienda con el catálogo de 6 productos |
| `evidencias/02-ficha-producto.png` | Ficha detallada de un producto seleccionado |
| `evidencias/03-producto-agregado.png` | Carrito con un producto agregado y mensaje de confirmación |
| `evidencias/04-carrito-varios-productos.png` | Carrito con múltiples productos, subtotales y total |
| `evidencias/05-cantidad-actualizada.png` | Cantidad incrementada con subtotal y total actualizados |
| `evidencias/06-carrito-vacio.png` | Estado vacío del carrito |
| `evidencias/07-diseño-responsive.png` | Vista en pantalla pequeña (tablet/móvil) |
| `evidencias/08-resultado-pruebas.png` | Resultado de `npm test` con las 12 pruebas pasando |

---

## Cómo Obtener las Capturas Manualmente

Si el entorno no permite capturas automáticas, sigue estos pasos:

### 1. Iniciar la aplicación

```bash
cd Mini-Carrito-Funcional
npm install
npm run dev
```

Abrir en el navegador: **http://localhost:5173**

### 2. Capturas recomendadas

**Captura 1 — Catálogo inicial**
- Abrir la aplicación recién cargada.
- Verificar que se muestran los 6 productos (Laptop, Audífonos, Mouse, Teclado, Monitor, Webcam).
- Tomar captura con `Win + Shift + S` (Windows) o `Cmd + Shift + 4` (macOS).

**Captura 2 — Ficha del producto**
- Pulsar "👁️ Ver detalles" en cualquier tarjeta de producto.
- Verificar que la sección "Ficha del Producto" muestra el nombre, imagen, precio, categoría y descripción.

**Captura 3 — Producto agregado**
- Pulsar "🛒 Agregar" en una tarjeta.
- Verificar que:
  - El banner verde de confirmación aparece en el encabezado.
  - El badge del carrito muestra "1".
  - El producto aparece en el panel del carrito con subtotal y total.

**Captura 4 — Múltiples productos**
- Agregar al menos 3 productos distintos.
- Verificar subtotales individuales y total general.

**Captura 5 — Cantidad actualizada**
- Pulsar "+" varias veces en un ítem del carrito.
- Verificar que la cantidad, el subtotal y el total se actualizan.

**Captura 6 — Carrito vacío**
- Pulsar "🧹 Vaciar carrito" y confirmar.
- Verificar el mensaje "Tu carrito está vacío".

**Captura 7 — Responsive**
- Usar las DevTools del navegador (`F12` → ícono de dispositivo móvil).
- Seleccionar una resolución de 375px × 812px (iPhone SE o similar).
- Verificar que la interfaz se adapta correctamente.

**Captura 8 — Pruebas**
- En la terminal, ejecutar:
  ```bash
  npm test
  ```
- Tomar captura del resultado mostrando todas las pruebas en verde.

### 3. Guardar las capturas

Guardar los archivos en la carpeta `evidencias/` con los nombres de la tabla anterior.

---

## Criterios Verificados en las Evidencias

| Criterio | Evidencia |
|---|---|
| Catálogo de productos visible | Captura 1 |
| Ficha del producto funciona | Captura 2 |
| Agregar al carrito funciona | Captura 3 |
| Contador del encabezado actualizado | Captura 3 |
| Subtotales calculados correctamente | Capturas 4 y 5 |
| Total general calculado | Capturas 4 y 5 |
| Cantidades actualizables | Captura 5 |
| Estado vacío del carrito | Captura 6 |
| Diseño responsive | Captura 7 |
| Pruebas automáticas pasando | Captura 8 |
