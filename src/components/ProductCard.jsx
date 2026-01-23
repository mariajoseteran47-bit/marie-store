import React from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className={styles.card}>
            {product.isNew && <span className={styles.badge}>Nuevo</span>}
            <div className={styles.imageContainer}>
                <img src={product.image} alt={product.name} className={styles.image} />
            </div>
            <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <button
                    className={styles.addButton}
                    onClick={() => addToCart(product)}
                >
                    Añadir al Carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
