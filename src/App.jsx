// src/App.jsx
// ESTADO PRINCIPAL DEL CARRITO — vive aquí en App.
// Los componentes hijos reciben datos y funciones mediante props.

import { useState, useCallback } from 'react'
import Header from './components/Header.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import Cart from './components/Cart.jsx'
import Footer from './components/Footer.jsx'
import { products as initialProducts } from './data/products.js'
import './index.css'

// Formateador de moneda peruana (Soles — PEN)
export const formatPEN = (amount) =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount)

function App() {
  // ── Estado 1: catálogo de productos ──────────────────────────────────────
  const [products] = useState(initialProducts)

  // ── Estado 2: elementos del carrito ──────────────────────────────────────
  // Cada elemento: { id, name, price, description, category, emoji, color, quantity }
  const [cartItems, setCartItems] = useState([])

  // ── Estado 3: producto seleccionado para la ficha detallada ───────────────
  const [selectedProduct, setSelectedProduct] = useState(null)

  // ── Estado 4: mensaje de confirmación ─────────────────────────────────────
  const [confirmationMessage, setConfirmationMessage] = useState('')

  // ── Utilidad: mostrar mensaje de confirmación ──────────────────────────────
  const showConfirmation = useCallback((text) => {
    setConfirmationMessage(text)
    setTimeout(() => setConfirmationMessage(''), 3000)
  }, [])

  // ── Función: seleccionar un producto (ficha detallada) ─────────────────────
  const handleSelectProduct = useCallback((product) => {
    setSelectedProduct(product)
  }, [])

  // ── Función: agregar producto al carrito ───────────────────────────────────
  // Si ya existe, incrementa su cantidad; si no, lo agrega con quantity = 1.
  const handleAddToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id)
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
    showConfirmation(`✅ "${product.name}" agregado al carrito`)
  }, [showConfirmation])

  // ── Función: incrementar cantidad ──────────────────────────────────────────
  const handleIncreaseQuantity = useCallback((productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }, [])

  // ── Función: disminuir cantidad (mínimo 1) ─────────────────────────────────
  const handleDecreaseQuantity = useCallback((productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }, [])

  // ── Función: eliminar producto del carrito ─────────────────────────────────
  const handleRemoveFromCart = useCallback((productId) => {
    setCartItems((prevItems) => {
      const removed = prevItems.find((item) => item.id === productId)
      if (removed) showConfirmation(`🗑️ "${removed.name}" eliminado del carrito`)
      return prevItems.filter((item) => item.id !== productId)
    })
  }, [showConfirmation])

  // ── Función: limpiar todo el carrito ──────────────────────────────────────
  const handleClearCart = useCallback(() => {
    setCartItems([])
    showConfirmation('🧹 Carrito vaciado correctamente')
  }, [showConfirmation])

  // ── Derivados del estado (no se duplican en estado separado) ───────────────
  // subtotal = precio × cantidad  |  total = suma de todos los subtotales
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app">
      {/* ─────────── ENCABEZADO ─────────── */}
      {/* Padre: App  →  Hijo: Header
          Props que bajan: totalUnits, confirmationMessage */}
      <Header
        totalUnits={totalUnits}
        confirmationMessage={confirmationMessage}
      />

      <main className="main-content">
        <div className="content-grid">
          {/* ─────────── COLUMNA IZQUIERDA ─────────── */}
          <div className="left-column">
            {/* Catálogo de productos
                Padre: App  →  Hijo: ProductList
                Props que bajan: products, onSelectProduct, onAddToCart, selectedProduct */}
            <ProductList
              products={products}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              selectedProduct={selectedProduct}
            />

            {/* Ficha detallada del producto seleccionado
                Padre: App  →  Hijo: ProductDetails
                Props que bajan: selectedProduct, onAddToCart */}
            <ProductDetails
              selectedProduct={selectedProduct}
              onAddToCart={handleAddToCart}
            />
          </div>

          {/* ─────────── COLUMNA DERECHA — CARRITO ─────────── */}
          {/* Padre: App  →  Hijo: Cart
              Props que bajan: cartItems, totalAmount, totalUnits,
              onIncreaseQuantity, onDecreaseQuantity,
              onRemoveFromCart, onClearCart */}
          <Cart
            cartItems={cartItems}
            totalAmount={totalAmount}
            totalUnits={totalUnits}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        </div>
      </main>

      {/* ─────────── PIE DE PÁGINA ─────────── */}
      <Footer />
    </div>
  )
}

export default App
