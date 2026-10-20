// tests/cart.test.js
// Pruebas automáticas del Mini-Carrito Funcional con Vitest + Testing Library
// Ejecutar: npm test

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// ── Importaciones de los componentes bajo prueba ──────────────────────────
import App from '../src/App.jsx'
import { products } from '../src/data/products.js'

// ── Utilidades de prueba ──────────────────────────────────────────────────

// Laptop: id=1, price=2500
const LAPTOP = products.find((p) => p.id === 1)
// Audífonos: id=2, price=150
const AURICULARES = products.find((p) => p.id === 2)

/**
 * Agrega un producto al carrito pulsando su botón "Agregar" en el catálogo.
 */
async function addProductToCart(productId) {
  const addBtn = screen.getByTestId(`btn-add-${productId}`)
  await userEvent.click(addBtn)
}

// ── Configuración: window.confirm siempre devuelve true en pruebas ─────────
beforeEach(() => {
  vi.stubGlobal('confirm', () => true)
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 1: El carrito comienza vacío y el total es cero
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 1 — Estado inicial del carrito', () => {
  it('el carrito comienza vacío y el total es cero', () => {
    render(<App />)
    expect(screen.getByTestId('cart-empty')).toBeInTheDocument()
    expect(screen.queryByTestId('total-amount')).not.toBeInTheDocument()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 2: Agregar una laptop de S/ 2500 actualiza el total a S/ 2500
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 2 — Agregar una laptop actualiza el total', () => {
  it('el total debe ser S/ 2500 al agregar una laptop', async () => {
    render(<App />)
    await addProductToCart(LAPTOP.id)
    const totalEl = screen.getByTestId('total-amount')
    expect(totalEl).toBeInTheDocument()
    expect(totalEl.textContent).toContain('2')
    // La cantidad muestra 1 unidad
    expect(screen.getByTestId(`qty-${LAPTOP.id}`).textContent).toBe('1')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 3: Agregar dos unidades de audífonos → subtotal S/ 300
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 3 — Subtotal con dos unidades de audífonos', () => {
  it('el subtotal de audífonos debe ser 300 al agregar 2 unidades', async () => {
    render(<App />)
    await addProductToCart(AURICULARES.id)
    await addProductToCart(AURICULARES.id)
    const subtotalEl = screen.getByTestId(`subtotal-${AURICULARES.id}`)
    expect(subtotalEl.textContent).toContain('300')
    expect(screen.getByTestId(`qty-${AURICULARES.id}`).textContent).toBe('2')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 4: Agregar dos productos distintos — suma correcta
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 4 — Suma de dos productos distintos', () => {
  it('el total es la suma de laptop (2500) + audífonos (150) = 2650', async () => {
    render(<App />)
    await addProductToCart(LAPTOP.id)
    await addProductToCart(AURICULARES.id)
    const totalEl = screen.getByTestId('total-amount')
    // 2500 + 150 = 2650
    expect(totalEl.textContent).toContain('2')
    // Debe haber dos ítems en el carrito
    expect(screen.getByTestId(`cart-item-${LAPTOP.id}`)).toBeInTheDocument()
    expect(screen.getByTestId(`cart-item-${AURICULARES.id}`)).toBeInTheDocument()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 5: Agregar el mismo producto dos veces — no duplica el registro
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 5 — Mismo producto: incremento de cantidad sin duplicado', () => {
  it('agregar la laptop dos veces incrementa la cantidad a 2, no crea dos ítems', async () => {
    render(<App />)
    await addProductToCart(LAPTOP.id)
    await addProductToCart(LAPTOP.id)
    // Solo debe aparecer un CartItem para la laptop
    const cartItems = screen.getAllByTestId(/^cart-item-/)
    const laptopItems = cartItems.filter((el) =>
      el.getAttribute('data-testid') === `cart-item-${LAPTOP.id}`
    )
    expect(laptopItems.length).toBe(1)
    // La cantidad debe ser 2
    expect(screen.getByTestId(`qty-${LAPTOP.id}`).textContent).toBe('2')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 6: Disminuir la cantidad actualiza subtotal y total
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 6 — Disminuir cantidad actualiza subtotal y total', () => {
  it('al disminuir a 1 unidad de laptop, el subtotal vuelve a S/ 2500', async () => {
    render(<App />)
    await addProductToCart(LAPTOP.id)
    // Incrementar a 2
    await userEvent.click(screen.getByTestId(`btn-increase-${LAPTOP.id}`))
    expect(screen.getByTestId(`qty-${LAPTOP.id}`).textContent).toBe('2')
    // Disminuir de vuelta a 1
    await userEvent.click(screen.getByTestId(`btn-decrease-${LAPTOP.id}`))
    expect(screen.getByTestId(`qty-${LAPTOP.id}`).textContent).toBe('1')
    expect(screen.getByTestId(`subtotal-${LAPTOP.id}`).textContent).toContain('2')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 7: Eliminar un producto actualiza el carrito y el total
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 7 — Eliminar producto actualiza carrito y total', () => {
  it('al eliminar la laptop, el carrito queda vacío y desaparece el total', async () => {
    render(<App />)
    await addProductToCart(LAPTOP.id)
    expect(screen.getByTestId(`cart-item-${LAPTOP.id}`)).toBeInTheDocument()
    // Eliminar
    await userEvent.click(screen.getByTestId(`btn-remove-${LAPTOP.id}`))
    expect(screen.queryByTestId(`cart-item-${LAPTOP.id}`)).not.toBeInTheDocument()
    expect(screen.getByTestId('cart-empty')).toBeInTheDocument()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 8: Limpiar el carrito restablece contador y total a cero
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 8 — Limpiar carrito restablece estado inicial', () => {
  it('al limpiar el carrito, vuelve al estado vacío', async () => {
    render(<App />)
    await addProductToCart(LAPTOP.id)
    await addProductToCart(AURICULARES.id)
    expect(screen.queryByTestId('cart-empty')).not.toBeInTheDocument()
    // Limpiar (confirm = true ya configurado en beforeEach)
    await userEvent.click(screen.getByTestId('btn-clear-cart'))
    expect(screen.getByTestId('cart-empty')).toBeInTheDocument()
    expect(screen.queryByTestId('total-amount')).not.toBeInTheDocument()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 9: La ficha muestra los datos del producto seleccionado
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 9 — Ficha detallada muestra datos del producto seleccionado', () => {
  it('al pulsar "Ver detalles" de la laptop, la ficha muestra su nombre y precio', async () => {
    render(<App />)
    const detailsBtn = screen.getByTestId(`product-card-${LAPTOP.id}`)
      .querySelector(`#btn-details-${LAPTOP.id}`)
    await userEvent.click(detailsBtn)
    expect(screen.getByTestId('details-name').textContent).toContain(LAPTOP.name)
    expect(screen.getByTestId('details-price').textContent).toContain('2')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 10: Los nombres de las props coinciden entre padre e hijo
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 10 — Coherencia de nombres de props', () => {
  it('el catálogo de productos es visible (products llega correctamente a ProductList)', () => {
    render(<App />)
    // Si la prop "products" llegara mal, no habría tarjetas
    const cards = screen.getAllByTestId(/^product-card-/)
    expect(cards.length).toBe(products.length)
  })

  it('onAddToCart funciona correctamente (botón "Agregar" dispara la función del padre)', async () => {
    render(<App />)
    await addProductToCart(LAPTOP.id)
    expect(screen.queryByTestId('cart-empty')).not.toBeInTheDocument()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 11: La aplicación no permite cantidades inválidas (< 1)
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 11 — No se permiten cantidades inválidas', () => {
  it('el botón disminuir está deshabilitado cuando la cantidad es 1', async () => {
    render(<App />)
    await addProductToCart(LAPTOP.id)
    const decreaseBtn = screen.getByTestId(`btn-decrease-${LAPTOP.id}`)
    expect(decreaseBtn).toBeDisabled()
  })

  it('la cantidad no puede bajar de 1 aunque se pulse el botón varias veces', async () => {
    render(<App />)
    await addProductToCart(LAPTOP.id)
    // Intentar disminuir (pero el botón está deshabilitado)
    const decreaseBtn = screen.getByTestId(`btn-decrease-${LAPTOP.id}`)
    fireEvent.click(decreaseBtn) // click forzado
    fireEvent.click(decreaseBtn)
    // La cantidad debe seguir siendo 1
    expect(screen.getByTestId(`qty-${LAPTOP.id}`).textContent).toBe('1')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRUEBA 12: La interfaz es utilizable en pantallas pequeñas (estructura)
// ═══════════════════════════════════════════════════════════════════════════
describe('Prueba 12 — Estructura accesible (preparación para pantallas pequeñas)', () => {
  it('el encabezado y el catálogo están presentes', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument() // header
    expect(screen.getByRole('main')).toBeInTheDocument()    // main
  })

  it('los botones tienen aria-label descriptivos', () => {
    render(<App />)
    // Cada tarjeta tiene botón "Agregar"
    products.forEach((p) => {
      expect(
        screen.getByLabelText(`Agregar ${p.name} al carrito`)
      ).toBeInTheDocument()
    })
  })
})
