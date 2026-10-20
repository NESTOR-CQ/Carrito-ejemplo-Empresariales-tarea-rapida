# Referencias en Formato APA 7 — Mini-Carrito Funcional

**Proyecto:** Mini-Carrito Funcional  
**Integrantes:** Sullca Avalos Jhordan Marius · Checa Quispe Nestor

---

> **Nota sobre verificación**: Todas las referencias listadas a continuación corresponden a páginas de documentación oficial activamente mantenidas. Las URLs fueron verificadas durante el desarrollo del proyecto (octubre de 2026).

---

## Referencias

### 1. Passing props to a component

React. (s. f.). *Passing props to a component*. React Documentation. https://react.dev/learn/passing-props-to-a-component

**Concepto que respalda:**  
Esta referencia fundamenta el mecanismo central de comunicación entre componentes en el Mini-Carrito: la transmisión de datos desde el componente padre (`App`) hacia los componentes hijos (`ProductCard`, `Cart`, `CartItem`, etc.) mediante props. La documentación explica cómo declarar props en el componente padre y cómo recibirlas mediante destructuración en el hijo, garantizando que los nombres coincidan exactamente. Este principio se aplica en todas las relaciones padre-hijo del proyecto (ver `docs/Ficha-Tecnica.md`, sección 7).

---

### 2. Sharing state between components

React. (s. f.). *Sharing state between components*. React Documentation. https://react.dev/learn/sharing-state-between-components

**Concepto que respalda:**  
Esta referencia justifica la decisión de centralizar el estado del carrito en `App.jsx` (*lifting state up* — elevación del estado). La documentación explica que cuando dos o más componentes necesitan reflejar el mismo dato, se debe mover el estado al ancestro común más cercano. En el proyecto, `Header` (badge del carrito), `Cart` (lista e ítems) y `ProductList` (tarjeta seleccionada) comparten datos del estado; por eso el estado vive en `App` y se distribuye hacia abajo mediante props.

---

### 3. Passing data deeply with context

React. (s. f.). *Passing data deeply with context*. React Documentation. https://react.dev/learn/passing-data-deeply-with-context

**Concepto que respalda:**  
Esta referencia explica la alternativa a las props para compartir datos entre componentes profundamente anidados: la Context API con `createContext`, `Provider` y `useContext`. En la `Ficha-Tecnica.md` (sección 9), se compara este enfoque con el *prop drilling* del Mini-Carrito actual. La conclusión es que, dado el árbol poco profundo de la aplicación (2–3 niveles) y el requisito académico de que el estado viva en App, las props son la solución adecuada. Context API sería apropiada si la aplicación creciera a 5 o más niveles de anidamiento.

---

### 4. useState — React hook

React. (s. f.). *useState*. React API Reference. https://react.dev/reference/react/useState

**Concepto que respalda:**  
Esta referencia documenta el hook `useState`, utilizado en `App.jsx` para declarar y actualizar los cuatro estados del proyecto: `products`, `cartItems`, `selectedProduct` y `confirmationMessage`. La documentación explica el patrón de actualización funcional (`setCartItems(prev => ...)`) que se emplea en el proyecto para garantizar la inmutabilidad y evitar errores al leer el estado anterior.

---

### 5. useCallback — React hook

React. (s. f.). *useCallback*. React API Reference. https://react.dev/reference/react/useCallback

**Concepto que respalda:**  
Esta referencia documenta el hook `useCallback`, utilizado en `App.jsx` para memorizar todas las funciones de manejo (`handleAddToCart`, `handleRemoveFromCart`, etc.) que se pasan como props a los componentes hijos. Esto evita que los hijos se re-rendericen innecesariamente cuando `App` vuelve a renderizarse por cambios en el estado que no afectan a esas funciones.

---

### 6. Vite — Guía oficial

Vitejs.dev. (s. f.). *Getting started*. Vite Documentation. https://vitejs.dev/guide/

**Concepto que respalda:**  
Esta referencia documenta la configuración del servidor de desarrollo, el sistema de módulos ES y el bundler de producción de Vite, utilizados como base del proyecto. En particular, justifica el uso de `vite.config.js` para integrar el plugin `@vitejs/plugin-react` (que habilita JSX y Fast Refresh) y la configuración del entorno de pruebas con Vitest.

---

### 7. Intl.NumberFormat — MDN Web Docs

MDN Web Docs. (s. f.). *Intl.NumberFormat*. Mozilla Developer Network. https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

**Concepto que respalda:**  
Esta referencia documenta la API estándar de JavaScript para el formato de números internacionales, utilizada en el proyecto para mostrar los precios en soles peruanos (PEN):

```js
new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount)
```

La configuración `es-PE` garantiza el formato regional correcto para Perú (separador de miles con coma, símbolo de moneda "S/").

---

### 8. Vitest — Documentación oficial

Vitest. (s. f.). *Getting started*. Vitest Documentation. https://vitest.dev/guide/

**Concepto que respalda:**  
Esta referencia documenta el framework de pruebas Vitest, compatible con Vite y la sintaxis de Jest. Justifica la configuración del entorno `jsdom` en `vite.config.js` para simular el DOM del navegador durante las pruebas, el uso de `vi.stubGlobal` para simular `window.confirm`, y la integración con `@testing-library/react` para las pruebas de componentes.

---

## Citas en el Proyecto

Las siguientes citas en el texto de la documentación se derivan de las referencias anteriores:

| Cita en el documento | Referencia utilizada |
|---|---|
| "Elevar el estado al ancestro común más cercano" | React (s. f.) — Sharing state between components |
| "Los nombres de las props deben coincidir exactamente entre padre e hijo" | React (s. f.) — Passing props to a component |
| "Context API evita el prop drilling en árboles profundos" | React (s. f.) — Passing data deeply with context |
| Formato `Intl.NumberFormat('es-PE', ...)` | MDN Web Docs (s. f.) |
| Configuración `environment: 'jsdom'` en Vitest | Vitest (s. f.) |
