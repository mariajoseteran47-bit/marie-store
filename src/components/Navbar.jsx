import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { toggleCart, cartCount } = useCart();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>MARIE STORE</Link>
      <ul className={styles.navLinks}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/catalog">Catálogo</Link></li>
        <li><Link to="/about">Nosotros</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
      </ul>
      <div className={styles.navActions}>
        <div className={styles.cartIcon} onClick={toggleCart}>
          🛒
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </div>
        {localStorage.getItem('isAdmin') === 'true' && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: '15px' }}>
            <Link to="/admin" style={{ fontSize: '12px', color: 'var(--primary-dark)', fontWeight: 'bold' }}>
              Panel Encargada
            </Link>
            <button 
              onClick={() => { localStorage.removeItem('isAdmin'); window.location.href='/'; }}
              style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', border: 'none', backgroundColor: '#FEE2E2', color: '#DC2626', cursor: 'pointer' }}
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
