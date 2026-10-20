// src/components/Cart.jsx
// Componente hijo — recibe props desde App:
//   cartItems           → arreglo de productos en el carrito (con quantity)
//   totalAmount         → total calculado (derivado del estado en App)
//   totalUnits          → suma de todas las unidades
//   onIncreaseQuantity  → función para incrementar cantidad
//   onDecreaseQuantity  → función para disminuir cantidad
//   onRemoveFromCart    → función para eliminar un producto
//   onClearCart         → función para vaciar el carrito

import CartItem from './CartItem.jsx'
import { formatPEN } from '../App.jsx'

function Cart({
  cartItems,
  totalAmount,
  totalUnits,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
  onClearCart,
}) {
  // Confirmación antes de limpiar el carrito
  const handleClearClick = () => {
    if (window.confirm('¿Deseas vaciar todo el carrito?')) {
      onClearCart()
    }
  }

  return (
    <aside className="cart-section" aria-labelledby="cart-heading">
      {/* Encabezado del carrito */}
      <div className="section-header">
        <h2 id="cart-heading" className="section-title">
          <span className="section-icon">🛒</span>
          Carrito de Compras
        </h2>
        {cartItems.length > 0 && (
          <span className="cart-count-badge">{totalUnits} uds.</span>
        )}
      </div>

      {/* Estado vacío */}
      {cartItems.length === 0 ? (
        <div className="cart-empty" role="status" data-testid="cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <p className="cart-empty-title">Tu carrito está vacío</p>
          <p className="cart-empty-subtitle">
            Agrega productos desde el catálogo
          </p>
        </div>
      ) : (
        <>
          {/* Lista de productos en el carrito */}
          <div className="cart-items-list" data-testid="cart-items-list">
            {/* Padre: Cart  →  Hijo: CartItem
                Props que bajan: item, onIncreaseQuantity, onDecreaseQuantity, onRemoveFromCart */}
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncreaseQuantity={onIncreaseQuantity}
                onDecreaseQuantity={onDecreaseQuantity}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))}
          </div>

          {/* Resumen del carrito */}
          <div className="cart-summary">
            <div className="summary-row">
              <span className="summary-label">Productos:</span>
              <span className="summary-value">{cartItems.length} tipos</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Unidades:</span>
              <span className="summary-value" data-testid="total-units">
                {totalUnits}
              </span>
            </div>
            <div className="summary-row summary-row--total">
              <span className="summary-label summary-label--total">Total:</span>
              <span
                className="summary-value summary-value--total"
                data-testid="total-amount"
              >
                {formatPEN(totalAmount)}
              </span>
            </div>

            {/* Botón limpiar carrito con confirmación */}
            <button
              className="btn btn-danger btn-full"
              onClick={handleClearClick}
              aria-label="Vaciar todo el carrito"
              id="btn-clear-cart"
              data-testid="btn-clear-cart"
            >
              🧹 Vaciar carrito
            </button>
          </div>
        </>
      )}
    </aside>
  )
}

export default Cart
