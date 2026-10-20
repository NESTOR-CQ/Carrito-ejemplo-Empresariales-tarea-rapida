// src/components/Header.jsx
// Componente hijo — recibe props desde App:
//   totalUnits        → número total de unidades en el carrito
//   confirmationMessage → mensaje de confirmación temporal

function Header({ totalUnits, confirmationMessage }) {
  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo y nombre de la tienda */}
        <div className="header-brand">
          <span className="brand-icon">🛒</span>
          <div className="brand-text">
            <span className="brand-name">TechStore</span>
            <span className="brand-tagline">Tecnología al mejor precio</span>
          </div>
        </div>

        {/* Contador del carrito */}
        <div className="header-cart-indicator" aria-label={`${totalUnits} unidades en el carrito`}>
          <span className="cart-icon-header">🛒</span>
          <span className="cart-label">Carrito</span>
          {totalUnits > 0 && (
            <span className="cart-badge" data-testid="cart-badge">
              {totalUnits}
            </span>
          )}
        </div>
      </div>

      {/* Mensaje de confirmación — aparece temporalmente */}
      {confirmationMessage && (
        <div className="confirmation-banner" role="alert" aria-live="polite">
          {confirmationMessage}
        </div>
      )}
    </header>
  )
}

export default Header
