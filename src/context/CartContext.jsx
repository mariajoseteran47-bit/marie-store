import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product, selectedSize = 'U', selectedColor = 'U') => {
        setCartItems((prevItems) => {
            const cartId = `${product.id}-${selectedSize}-${selectedColor}`;
            const existingItem = prevItems.find((item) => item.cartId === cartId);
            
            if (existingItem) {
                return prevItems.map((item) =>
                    item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, cartId, selectedSize, selectedColor, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (cartId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));
    };

    const updateQuantity = (cartId, amount) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.cartId === cartId) {
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

    const cartTotal = cartItems.reduce((total, item) => {
        const finalPrice = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
        return total + finalPrice * item.quantity;
    }, 0);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const checkoutWhatsApp = () => {
        const phoneNumber = "50555555555"; // Reemplazar con el número real de Maria Store
        let message = "¡Hola Maria Store! Me gustaría realizar el siguiente pedido:\n\n";

        cartItems.forEach(item => {
            message += `- ${item.name} (${item.selectedSize}, ${item.selectedColor}) (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
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
