// src/components/ProductList.jsx
// Componente hijo — recibe props desde App:
//   products        → arreglo con el catálogo completo
//   onSelectProduct → función para seleccionar un producto (ficha detallada)
//   onAddToCart     → función para agregar al carrito
//   selectedProduct → producto actualmente seleccionado

import ProductCard from './ProductCard.jsx'

function ProductList({ products, onSelectProduct, onAddToCart, selectedProduct }) {
  return (
    <section className="product-list-section" aria-labelledby="catalog-heading">
      <div className="section-header">
        <h2 id="catalog-heading" className="section-title">
          <span className="section-icon">🛍️</span>
          Catálogo de Productos
        </h2>
        <span className="product-count">{products.length} productos</span>
      </div>

      <div className="products-grid">
        {/* Padre: ProductList  →  Hijo: ProductCard
            Props que bajan: product, onAddToCart, onSelectProduct, isSelected */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
            isSelected={selectedProduct?.id === product.id}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductList
