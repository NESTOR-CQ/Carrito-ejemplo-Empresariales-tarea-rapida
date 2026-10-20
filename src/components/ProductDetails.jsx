// src/components/ProductDetails.jsx
// Componente hijo — recibe props desde App:
//   selectedProduct → producto actualmente seleccionado (null si ninguno)
//   onAddToCart     → función para agregar al carrito

import { formatPEN } from '../App.jsx'

function ProductDetails({ selectedProduct, onAddToCart }) {
  // Estado inicial: ningún producto seleccionado
  if (!selectedProduct) {
    return (
      <section className="product-details-section" aria-labelledby="details-heading">
        <div className="section-header">
          <h2 id="details-heading" className="section-title">
            <span className="section-icon">📋</span>
            Ficha del Producto
          </h2>
        </div>
        <div className="details-empty" role="status">
          <span className="details-empty-icon">👆</span>
          <p className="details-empty-text">
            Selecciona un producto del catálogo para ver su ficha detallada
          </p>
        </div>
      </section>
    )
  }

  // El usuario pulsa "Agregar al carrito" en la ficha → avisa al padre
  const handleAddClick = () => {
    onAddToCart(selectedProduct)
  }

  return (
    <section
      className="product-details-section"
      aria-labelledby="details-heading"
      data-testid="product-details"
    >
      <div className="section-header">
        <h2 id="details-heading" className="section-title">
          <span className="section-icon">📋</span>
          Ficha del Producto
        </h2>
      </div>

      <div className="details-card">
        {/* Imagen grande */}
        <div
          className="details-image"
          style={{
            backgroundColor: selectedProduct.color + '15',
            border: `2px solid ${selectedProduct.color}`,
          }}
        >
          <span className="details-emoji" role="img" aria-label={selectedProduct.name}>
            {selectedProduct.emoji}
          </span>
        </div>

        {/* Datos del producto */}
        <div className="details-info">
          <span
            className="details-category"
            style={{ backgroundColor: selectedProduct.color }}
          >
            {selectedProduct.category}
          </span>
          <h3 className="details-name" data-testid="details-name">
            {selectedProduct.name}
          </h3>
          <p className="details-description" data-testid="details-description">
            {selectedProduct.description}
          </p>
          <p className="details-price" data-testid="details-price">
            {formatPEN(selectedProduct.price)}
          </p>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleAddClick}
            aria-label={`Agregar ${selectedProduct.name} al carrito desde la ficha`}
            id="btn-details-add-to-cart"
            data-testid="btn-details-add"
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
