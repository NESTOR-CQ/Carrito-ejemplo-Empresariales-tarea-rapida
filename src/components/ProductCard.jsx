// src/components/ProductCard.jsx
// Componente hijo — recibe props desde ProductList (que las recibió de App):
//   product         → objeto con datos del producto (id, name, price, ...)
//   onAddToCart     → función que avisa al padre para agregar al carrito
//   onSelectProduct → función que avisa al padre para mostrar la ficha
//   isSelected      → booleano que indica si está seleccionado actualmente

import { formatPEN } from '../App.jsx'

function ProductCard({ product, onAddToCart, onSelectProduct, isSelected }) {
  // El usuario pulsa "Agregar" → el hijo ejecuta onAddToCart(product)
  // → App actualiza el estado del carrito → React re-renderiza
  const handleAddClick = () => {
    onAddToCart(product)
  }

  // El usuario pulsa "Ver detalles" → el hijo ejecuta onSelectProduct(product)
  const handleSelectClick = () => {
    onSelectProduct(product)
  }

  return (
    <article
      className={`product-card ${isSelected ? 'product-card--selected' : ''}`}
      data-testid={`product-card-${product.id}`}
    >
      {/* Imagen/representación visual del producto */}
      <div
        className="product-card-image"
        style={{ backgroundColor: product.color + '15', borderBottom: `3px solid ${product.color}` }}
        aria-label={`Imagen de ${product.name}`}
      >
        <span className="product-emoji" role="img" aria-label={product.name}>
          {product.emoji}
        </span>
        <span
          className="product-category-badge"
          style={{ backgroundColor: product.color }}
        >
          {product.category}
        </span>
      </div>

      {/* Información del producto */}
      <div className="product-card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price" data-testid={`price-${product.id}`}>
          {formatPEN(product.price)}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="product-card-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleSelectClick}
          aria-label={`Ver detalles de ${product.name}`}
          id={`btn-details-${product.id}`}
        >
          👁️ Ver detalles
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleAddClick}
          aria-label={`Agregar ${product.name} al carrito`}
          id={`btn-add-${product.id}`}
          data-testid={`btn-add-${product.id}`}
        >
          🛒 Agregar
        </button>
      </div>
    </article>
  )
}

export default ProductCard
