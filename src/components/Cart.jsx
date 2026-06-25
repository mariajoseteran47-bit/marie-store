import React from 'react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import styles from '../styles/Cart.module.css';

const Cart = () => {
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
        cartTotal,
        checkoutWhatsApp,
        clearCart
    } = useCart();
    
    const { processPurchase } = useStore();

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
                        <p className={styles.emptyMsg}>🛒 Tu carrito está vacío.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.cartId} className={styles.cartItem}>
                                <img src={item.images[0]} alt={item.name} className={styles.itemImage} />
                                <div className={styles.itemInfo}>
                                    <h4 className={styles.itemName}>{item.name}</h4>
                                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 5px 0' }}>
                                        {item.selectedSize !== 'Unica' ? `Talla: ${item.selectedSize} | ` : ''}
                                        {item.selectedColor !== 'Unico' ? `Color: ${item.selectedColor}` : ''}
                                    </p>
                                    
                                    {item.discount > 0 ? (
                                        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                            <p className={styles.itemPrice} style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>
                                                ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                                            </p>
                                            <p style={{ textDecoration: 'line-through', color: '#9CA3AF', fontSize: '12px' }}>
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                                    )}

                                    <div className={styles.quantityControls}>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.cartId, -1)}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.cartId, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeFromCart(item.cartId)}
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
                        <button 
                            className="btn-primary" 
                            style={{ width: '100%', marginBottom: '10px', padding: '15px', borderRadius: '30px' }}
                            onClick={() => {
                                const success = processPurchase(cartItems, { name: 'Cliente Web' });
                                if (success) {
                                    alert('¡Tu pedido ha sido procesado con éxito! Nos pondremos en contacto contigo en breve.');
                                    clearCart();
                                    toggleCart();
                                }
                            }}
                        >
                            🛍️ Confirmar Pedido
                        </button>
                        <button className={styles.checkoutBtn} onClick={checkoutWhatsApp}>
                            Preguntar por WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
