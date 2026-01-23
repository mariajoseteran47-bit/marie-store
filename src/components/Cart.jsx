import React from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/Cart.module.css';

const Cart = () => {
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
        cartTotal,
        checkoutWhatsApp
    } = useCart();

    return (
        <>
            <div
                className={`${styles.overlay} ${isCartOpen ? styles.overlayOpen : ''}`}
                onClick={toggleCart}
            />
            <div className={`${styles.cartDrawer} ${isCartOpen ? styles.cartOpen : ''}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Tu Carrito</h2>
                    <button className={styles.closeBtn} onClick={toggleCart}>✕</button>
                </div>

                <div className={styles.itemsContainer}>
                    {cartItems.length === 0 ? (
                        <p className={styles.emptyMsg}>Tu carrito está vacío.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className={styles.cartItem}>
                                <img src={item.image} alt={item.name} className={styles.itemImage} />
                                <div className={styles.itemInfo}>
                                    <h4 className={styles.itemName}>{item.name}</h4>
                                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                                    <div className={styles.quantityControls}>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.total}>
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className={styles.checkoutBtn} onClick={checkoutWhatsApp}>
                            Checkout - Finalizar Pedido
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
