# Mini-Carrito Funcional

> **Tienda de tecnología con React + Vite** — Proyecto académico de gestión de estado y comunicación entre componentes.

---

## 📋 Información del Proyecto

| Campo | Detalle |
|---|---|
| **Nombre** | Mini-Carrito Funcional |
| **Integrantes** | Sullca Avalos Jhordan Marius · Checa Quispe Nestor |
| **Curso** | Desarrollo de Aplicaciones Web |
| **Institución** | [Nombre de la Institución] |
| **Versión** | 1.0.0 |

---

## 🎯 Objetivo

Desarrollar una aplicación web funcional que permita visualizar productos, agregarlos a un carrito de compras, consultar una ficha breve del producto seleccionado, actualizar el total de compra y demostrar correctamente el **manejo del estado en React** y la **comunicación mediante props** entre componentes padre e hijo.

---

## ⚙️ Tecnologías Utilizadas

| Tecnología | Versión | Rol |
|---|---|---|
| React | ^18.3.1 | Framework de UI |
| Vite | ^6.x | Bundler y servidor de desarrollo |
| JavaScript (ES2022+) | — | Lógica de la aplicación |
| HTML5 | — | Estructura semántica |
| CSS3 (Vanilla) | — | Estilos y diseño responsive |
| Vitest | ^3.x | Framework de pruebas |
| Testing Library/React | ^16.x | Pruebas de componentes |
| npm | 11.x | Gestor de paquetes |

---

## 📦 Requisitos Previos

- [Node.js](https://nodejs.org/) v18 o superior (probado con v24.15.0)
- npm v9 o superior

Verificar disponibilidad:

```bash
node --version
npm --version
```

---

## 🚀 Instalación y Ejecución

```bash
# 1. Clonar o abrir la carpeta del proyecto
cd Mini-Carrito-Funcional

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 📜 Comandos Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Compilación de producción en `/dist` |
| `npm run preview` | Vista previa del build de producción |
| `npm test` | Ejecutar todas las pruebas (modo run) |
| `npm run test:watch` | Pruebas en modo observador |
| `npm run test:ui` | Interfaz visual de pruebas (Vitest UI) |

---

## ✅ Funcionalidades

- [x] Catálogo de 6 productos tecnológicos
- [x] Ficha detallada del producto seleccionado
- [x] Agregar productos al carrito
- [x] Incrementar / disminuir cantidad por producto
- [x] Eliminar producto del carrito individualmente
- [x] Vaciar todo el carrito con confirmación
- [x] Subtotal por producto (`precio × cantidad`)
- [x] Total general calculado dinámicamente
- [x] Contador de unidades en el encabezado
- [x] Mensaje de confirmación visual al agregar/eliminar
- [x] Estado vacío cuando el carrito no tiene productos
- [x] Prevención de cantidades menores a 1
- [x] Sin duplicados al agregar el mismo producto
- [x] Precios formateados en Soles peruanos (`Intl.NumberFormat`, `es-PE`, `PEN`)
- [x] Diseño responsive (desktop, tablet, móvil)
- [x] Accesibilidad (`aria-label`, `role`, `aria-live`)

---

## 🗂️ Estructura del Proyecto

```
Mini-Carrito-Funcional/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx          ← Encabezado y badge del carrito
│   │   ├── ProductList.jsx     ← Catálogo (grilla de tarjetas)
│   │   ├── ProductCard.jsx     ← Tarjeta individual de producto
│   │   ├── ProductDetails.jsx  ← Ficha detallada del producto seleccionado
│   │   ├── Cart.jsx            ← Panel del carrito con resumen
│   │   ├── CartItem.jsx        ← Ítem individual del carrito
│   │   └── Footer.jsx          ← Pie de página
│   ├── data/
│   │   └── products.js         ← Catálogo de productos (fuente de datos)
│   ├── App.jsx                 ← ESTADO PRINCIPAL (useState)
│   ├── main.jsx                ← Entry point de React
│   ├── index.css               ← Estilos globales
│   └── setupTests.js           ← Configuración de pruebas
├── tests/
│   └── cart.test.js            ← 12 pruebas automáticas con Vitest
├── docs/
│   ├── Ficha-Tecnica.md
│   ├── Explicacion-del-Flujo.md
│   ├── Evidencias.md
│   └── Referencias-APA7.md
├── evidencias/                 ← Capturas de pantalla
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
```

---

## 🧠 Estado Principal en App

Todo el estado compartido vive en `src/App.jsx`:

```jsx
const [products]            = useState(initialProducts)   // catálogo
const [cartItems, setCartItems] = useState([])           // carrito
const [selectedProduct, ...]    = useState(null)         // ficha
const [confirmationMessage, ...]= useState('')           // mensajes
```

Los valores derivados **no se duplican en estado**; se calculan en el render:

```js
const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const totalUnits  = cartItems.reduce((sum, item) => sum + item.quantity, 0)
```

---

## 📡 Props Principales

| Prop | Tipo | Flujo | Propósito |
|---|---|---|---|
| `products` | Array | App → ProductList | Catálogo de productos |
| `product` | Object | ProductList → ProductCard | Datos de un producto |
| `onAddToCart` | Function | App → ProductCard | Agregar al carrito |
| `onSelectProduct` | Function | App → ProductCard | Seleccionar producto |
| `cartItems` | Array | App → Cart | Ítems del carrito |
| `totalAmount` | Number | App → Cart | Total calculado |
| `selectedProduct` | Object\|null | App → ProductDetails | Producto en la ficha |
| `onRemoveFromCart` | Function | App → Cart → CartItem | Eliminar del carrito |
| `onClearCart` | Function | App → Cart | Vaciar carrito |

---

## 📸 Evidencias

Las capturas de pantalla se encuentran en la carpeta [`evidencias/`](./evidencias/).  
Consulta [`docs/Evidencias.md`](./docs/Evidencias.md) para la documentación completa.

---

## ⚠️ Problemas Conocidos

- `window.confirm` en las pruebas se reemplaza con `vi.stubGlobal` para evitar bloqueos en jsdom.
- Las imágenes se representan con emojis SVG/Unicode para garantizar compatibilidad sin dependencias externas.

---

## 📚 Referencias

Ver [`docs/Referencias-APA7.md`](./docs/Referencias-APA7.md)
