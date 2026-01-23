import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart when item is added
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, amount) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    const newQuantity = item.quantity + amount;
                    return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const checkoutWhatsApp = () => {
        const phoneNumber = "50555555555"; // Reemplazar con el número real de Maria Store
        let message = "¡Hola Maria Store! Me gustaría realizar el siguiente pedido:\n\n";

        cartItems.forEach(item => {
            message += `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
        });

        message += `\n*TOTAL: $${cartTotal.toFixed(2)}*\n\n¿Me podrían confirmar disponibilidad y métodos de pago?`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            toggleCart,
            cartTotal,
            cartCount,
            checkoutWhatsApp
        }}>
            {children}
        </CartContext.Provider>
    );
};
