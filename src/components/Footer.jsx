// src/components/Footer.jsx
// Pie de página — no requiere props (información estática)

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🛒</span>
          <span className="footer-brand-name">TechStore</span>
        </div>

        <div className="footer-info">
          <p className="footer-project">
            <strong>Mini-Carrito Funcional</strong> — Proyecto académico
          </p>
          <p className="footer-members">
            Integrantes: Sullca Avalos Jhordan Marius · Checa Quispe Nestor
          </p>
          <p className="footer-tech">
            Desarrollado con React + Vite + JavaScript
          </p>
        </div>

        <div className="footer-copy">
          <p>© {year} TechStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
