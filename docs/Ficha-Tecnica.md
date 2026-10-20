# Ficha Técnica — Mini-Carrito Funcional

**Proyecto:** Mini-Carrito Funcional  
**Integrantes:** Sullca Avalos Jhordan Marius · Checa Quispe Nestor  
**Curso:** Desarrollo de Aplicaciones Web  
**Fecha:** Octubre 2026

---

## 1. Descripción General

Mini-Carrito Funcional es una aplicación web de comercio electrónico simplificada (SPA — Single Page Application), desarrollada con React 18 y Vite. Simula una tienda de tecnología en la que el usuario puede explorar un catálogo de productos, consultar fichas detalladas y gestionar un carrito de compras en tiempo real.

La aplicación fue diseñada con fines académicos para demostrar el manejo del **estado local con `useState`**, la **comunicación unidireccional de datos mediante props** y la **separación de responsabilidades** entre componentes.

---

## 2. Objetivo

Demostrar que una aplicación React funcional puede construirse siguiendo correctamente estos principios:

- El estado vive en el componente más alto que lo necesita (elevación del estado).
- Los datos fluyen hacia abajo a través de props.
- Los eventos fluyen hacia arriba a través de funciones recibidas por props (callbacks).
- Los valores derivados no se duplican en el estado; se calculan en el render.

---

## 3. Funcionalidades Principales

| N.° | Funcionalidad | Estado |
|---|---|---|
| 1 | Mostrar catálogo de 6 productos | ✅ Implementado |
| 2 | Ficha detallada del producto seleccionado | ✅ Implementado |
| 3 | Agregar producto al carrito | ✅ Implementado |
| 4 | Incrementar / disminuir cantidad | ✅ Implementado |
| 5 | Eliminar producto del carrito | ✅ Implementado |
| 6 | Vaciar carrito con confirmación | ✅ Implementado |
| 7 | Subtotal por producto (precio × cantidad) | ✅ Implementado |
| 8 | Total general calculado dinámicamente | ✅ Implementado |
| 9 | Contador de unidades en el encabezado | ✅ Implementado |
| 10 | Mensaje visual de confirmación | ✅ Implementado |
| 11 | Estado vacío del carrito | ✅ Implementado |
| 12 | Prevención de cantidades inválidas | ✅ Implementado |
| 13 | Sin duplicados al agregar el mismo producto | ✅ Implementado |
| 14 | Formato de moneda peruana (PEN) | ✅ Implementado |
| 15 | Diseño responsive (mobile-first) | ✅ Implementado |

---

## 4. Componentes Desarrollados

| Componente | Archivo | Responsabilidad |
|---|---|---|
| `App` | `src/App.jsx` | Estado global, funciones de manejo, árbol de componentes |
| `Header` | `src/components/Header.jsx` | Encabezado, logo, badge del carrito, mensaje de confirmación |
| `ProductList` | `src/components/ProductList.jsx` | Grilla del catálogo de productos |
| `ProductCard` | `src/components/ProductCard.jsx` | Tarjeta individual de producto |
| `ProductDetails` | `src/components/ProductDetails.jsx` | Ficha detallada del producto seleccionado |
| `Cart` | `src/components/Cart.jsx` | Panel del carrito, resumen, botón limpiar |
| `CartItem` | `src/components/CartItem.jsx` | Ítem individual del carrito con controles de cantidad |
| `Footer` | `src/components/Footer.jsx` | Pie de página con información del proyecto |

---

## 5. Tecnologías Utilizadas

| Tecnología | Propósito | Referencia |
|---|---|---|
| React 18 | Librería de UI declarativa | React (s. f.). Sharing state between components |
| Vite 6 | Bundler y servidor de desarrollo | Vitejs.dev (s. f.) |
| JavaScript ES2022+ | Lógica de la aplicación | — |
| CSS3 Variables | Sistema de diseño con tokens | — |
| Vitest 3 | Framework de pruebas unitarias | — |
| Testing Library | Pruebas de componentes React | — |
| Intl.NumberFormat | Formato de moneda (PEN) | MDN Web Docs |

---

## 6. Explicación del Estado

### 6.1 Por qué el estado vive en App

Según React (s. f.), cuando dos o más componentes necesitan compartir el mismo estado, la solución correcta es **"elevar el estado"** al ancestro común más cercano (*lifting state up*). En este proyecto:

- `CartItem` necesita mostrar el subtotal → necesita `price` y `quantity`.
- `Cart` necesita calcular el total → necesita todos los `cartItems`.
- `Header` necesita mostrar el contador → necesita `totalUnits`.
- `ProductDetails` necesita saber qué producto mostrar → necesita `selectedProduct`.

Todos estos componentes son descendientes de `App`, por eso **el estado vive en App** y se distribuye hacia abajo mediante props. Esto evita la sincronización manual entre copias del estado y garantiza una única fuente de verdad.

### 6.2 Estados declarados en App

```jsx
// catálogo de productos (fuente de datos estática)
const [products] = useState(initialProducts)

// ítems del carrito con su cantidad
const [cartItems, setCartItems] = useState([])

// producto seleccionado para la ficha detallada
const [selectedProduct, setSelectedProduct] = useState(null)

// mensaje de confirmación temporal
const [confirmationMessage, setConfirmationMessage] = useState('')
```

### 6.3 Valores derivados (no en estado)

Los valores derivados se calculan en cada render, no se guardan en estado propio para evitar inconsistencias:

```js
// subtotal = precio × cantidad (por ítem)
// total = suma de todos los subtotales
const totalAmount = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity, 0
)

// contador total de unidades
const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0)
```

---

## 7. Ejemplos de Comunicación Padre-Hijo

### Ejemplo A — App → ProductCard

**Componente padre (App.jsx):**
```jsx
<ProductCard
  product={product}
  onAddToCart={handleAddToCart}
  onSelectProduct={handleSelectProduct}
  isSelected={selectedProduct?.id === product.id}
/>
```

**Componente hijo (ProductCard.jsx):**
```jsx
function ProductCard({ product, onAddToCart, onSelectProduct, isSelected }) {
  const handleAddClick = () => {
    onAddToCart(product)  // ← aviso que sube al padre
  }
  // ...
}
```

| Campo | Valor |
|---|---|
| Componente padre | `App` |
| Componente hijo | `ProductCard` |
| Props que bajan | `product`, `onAddToCart`, `onSelectProduct`, `isSelected` |
| Evento que sube | `onAddToCart(product)` cuando el usuario pulsa "Agregar" |

---

### Ejemplo B — Cart → CartItem

**Componente padre (Cart.jsx):**
```jsx
<CartItem
  item={item}
  onIncreaseQuantity={onIncreaseQuantity}
  onDecreaseQuantity={onDecreaseQuantity}
  onRemoveFromCart={onRemoveFromCart}
/>
```

**Componente hijo (CartItem.jsx):**
```jsx
function CartItem({ item, onIncreaseQuantity, onDecreaseQuantity, onRemoveFromCart }) {
  return (
    <button onClick={() => onIncreaseQuantity(item.id)}>+</button>
    // ...
  )
}
```

| Campo | Valor |
|---|---|
| Componente padre | `Cart` |
| Componente hijo | `CartItem` |
| Props que bajan | `item`, `onIncreaseQuantity`, `onDecreaseQuantity`, `onRemoveFromCart` |
| Evento que sube | `onIncreaseQuantity(item.id)` cuando el usuario pulsa "+" |

---

## 8. Criterios de Aceptación

| N.° | Criterio | Verificación |
|---|---|---|
| 1 | Carrito vacío al inicio, total = 0 | Prueba automática 1 |
| 2 | Agregar laptop → total S/ 2500 | Prueba automática 2 |
| 3 | 2× audífonos → subtotal S/ 300 | Prueba automática 3 |
| 4 | Dos productos distintos → suma correcta | Prueba automática 4 |
| 5 | Mismo producto no crea duplicado | Prueba automática 5 |
| 6 | Disminuir cantidad actualiza subtotal | Prueba automática 6 |
| 7 | Eliminar producto actualiza carrito | Prueba automática 7 |
| 8 | Limpiar carrito → estado inicial | Prueba automática 8 |
| 9 | Ficha muestra datos del producto | Prueba automática 9 |
| 10 | Props coherentes entre padre e hijo | Prueba automática 10 |
| 11 | No permite cantidades < 1 | Prueba automática 11 |
| 12 | Estructura accesible y navegable | Prueba automática 12 |

---

## 9. Extensión Opcional: Context API vs Props

### 9.1 Pasar props por varios niveles (Prop Drilling)

En la implementación actual, los datos fluyen así:

```
App → ProductList → ProductCard
App → Cart → CartItem
```

Este patrón funciona bien cuando el árbol de componentes es poco profundo (2–3 niveles). Es explícito: cada componente declara exactamente qué datos necesita. La desventaja aparece cuando un dato debe atravesar muchos componentes intermedios que no lo usan directamente.

**Ventajas:**
- Código predecible y fácil de depurar.
- Sin dependencias externas.
- Las pruebas unitarias son sencillas.

**Desventajas:**
- Prop drilling: pasar props a través de componentes intermedios que no las usan.
- En aplicaciones grandes, el código se vuelve verboso.

### 9.2 Context API

React Context permite compartir datos entre componentes sin pasar props manualmente en cada nivel (React, s. f.).

```jsx
// Crear el contexto
const CartContext = createContext()

// Proveer el contexto en App
<CartContext.Provider value={{ cartItems, onAddToCart }}>
  <ProductList />
</CartContext.Provider>

// Consumir en cualquier descendiente
function ProductCard() {
  const { onAddToCart } = useContext(CartContext)
  // ...
}
```

**Ventajas:**
- Evita el prop drilling en árboles profundos.
- Código más limpio en componentes intermedios.

**Desventajas:**
- Menos explícito que las props.
- Dificulta las pruebas unitarias aisladas.
- Puede causar re-renders innecesarios si no se optimiza.

### 9.3 Por qué el mini-carrito usa props

La aplicación tiene un árbol de solo 2–3 niveles. El criterio académico de evaluación requiere que el estado viva en App y se comparta mediante props. Context API sería una mejora arquitectónica para aplicaciones con 5+ niveles de anidamiento.

### 9.4 Qué cambiaría si la aplicación creciera

1. Crear `CartContext` y `ProductContext`.
2. Envolver la aplicación en los proveedores correspondientes.
3. Reemplazar las props en los componentes profundamente anidados por `useContext`.
4. Considerar también `useReducer` para manejar acciones complejas del carrito.

---

## 10. Referencias Bibliográficas

Ver [`Referencias-APA7.md`](./Referencias-APA7.md)
