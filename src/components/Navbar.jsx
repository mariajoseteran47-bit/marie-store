import React from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { toggleCart, cartCount } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MARIE STORE</div>
      <ul className={styles.navLinks}>
        <li><a href="#home">Inicio</a></li>
        <li><a href="#catalog">Catálogo</a></li>
        <li><a href="#about">Nosotros</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
      <div className={styles.navActions}>
        <div className={styles.cartIcon} onClick={toggleCart}>
          🛒
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
