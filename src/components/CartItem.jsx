// src/components/CartItem.jsx
// Componente hijo — recibe props desde Cart:
//   item                → objeto del producto en el carrito (incluye quantity)
//   onIncreaseQuantity  → función para incrementar cantidad (aviso al padre)
//   onDecreaseQuantity  → función para disminuir cantidad  (aviso al padre)
//   onRemoveFromCart    → función para eliminar el producto (aviso al padre)

import { formatPEN } from '../App.jsx'

function CartItem({ item, onIncreaseQuantity, onDecreaseQuantity, onRemoveFromCart }) {
  // subtotal = precio × cantidad
  const subtotal = item.price * item.quantity

  return (
    <article
      className="cart-item"
      data-testid={`cart-item-${item.id}`}
      aria-label={`${item.name} en el carrito`}
    >
      {/* Emoji del producto */}
      <div
        className="cart-item-icon"
        style={{ backgroundColor: item.color + '20', border: `2px solid ${item.color}` }}
      >
        <span role="img" aria-label={item.name}>{item.emoji}</span>
      </div>

      {/* Datos del producto */}
      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-unit-price">{formatPEN(item.price)} c/u</p>
        <p
          className="cart-item-subtotal"
          data-testid={`subtotal-${item.id}`}
        >
          Subtotal: {formatPEN(subtotal)}
        </p>
      </div>

      {/* Controles de cantidad */}
      <div className="cart-item-controls">
        <button
          className="qty-btn qty-btn--decrease"
          onClick={() => onDecreaseQuantity(item.id)}
          aria-label={`Disminuir cantidad de ${item.name}`}
          id={`btn-decrease-${item.id}`}
          data-testid={`btn-decrease-${item.id}`}
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <span
          className="qty-display"
          aria-label={`Cantidad: ${item.quantity}`}
          data-testid={`qty-${item.id}`}
        >
          {item.quantity}
        </span>
        <button
          className="qty-btn qty-btn--increase"
          onClick={() => onIncreaseQuantity(item.id)}
          aria-label={`Aumentar cantidad de ${item.name}`}
          id={`btn-increase-${item.id}`}
          data-testid={`btn-increase-${item.id}`}
        >
          +
        </button>
      </div>

      {/* Botón eliminar */}
      <button
        className="btn-remove"
        onClick={() => onRemoveFromCart(item.id)}
        aria-label={`Eliminar ${item.name} del carrito`}
        id={`btn-remove-${item.id}`}
        data-testid={`btn-remove-${item.id}`}
        title="Eliminar producto"
      >
        ✕
      </button>
    </article>
  )
}

export default CartItem
