import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();

const initialInventory = [
    { id: 1, name: "Vestido Seda Rosa", cost: 45, price: 85.00, stock: 12, category: "Vestidos", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop"], isNew: true, discount: 0, sizes: ['S', 'M', 'L'], colors: ['Rosa Pastel', 'Fucsia'] },
    { id: 2, name: "Blusa Lino Blanca", cost: 20, price: 45.00, stock: 8, category: "Tops", images: ["https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1564222256577-45e728f2c611?q=80&w=800&auto=format&fit=crop"], isNew: false, discount: 10, sizes: ['XS', 'S', 'M', 'L'], colors: ['Blanco', 'Beige'] },
    { id: 3, name: "Pantalón Sastre Beige", cost: 30, price: 65.00, stock: 5, category: "Pantalones", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop"], isNew: true, discount: 0, sizes: ['36', '38', '40', '42'], colors: ['Beige', 'Negro'] },
    { id: 4, name: "Chaqueta Tweed Cream", cost: 60, price: 120.00, stock: 3, category: "Outerwear", images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800&auto=format&fit=crop"], isNew: false, discount: 0, sizes: ['S', 'M'], colors: ['Crema'] },
    { id: 5, name: "Falda Midi Plisada", cost: 25, price: 55.00, stock: 10, category: "Faldas", images: ["https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=800&auto=format&fit=crop"], isNew: false, discount: 20, sizes: ['S', 'M', 'L'], colors: ['Negro', 'Gris'] },
    { id: 6, name: "Top Satén Champagne", cost: 15, price: 38.00, stock: 0, category: "Tops", images: ["https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"], isNew: true, discount: 0, sizes: ['S', 'M', 'L'], colors: ['Champagne'] }
];

export const StoreProvider = ({ children }) => {
  const [inventory, setInventory] = useState(initialInventory);
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);

  // Process purchase from Cart
  const processPurchase = (cartItems, clientInfo) => {
    // 1. Update Inventory
    let newInventory = [...inventory];
    let totalSale = 0;

    const newSaleItems = cartItems.map(cartItem => {
      // Find item in inventory
      const idx = newInventory.findIndex(i => i.id === cartItem.id);
      if (idx !== -1) {
        // Decrease stock
        newInventory[idx].stock = Math.max(0, newInventory[idx].stock - cartItem.quantity);
      }
      const finalPrice = cartItem.discount > 0 
        ? cartItem.price * (1 - cartItem.discount / 100)
        : cartItem.price;

      totalSale += (finalPrice * cartItem.quantity);
      
      return {
        id: `V-${Date.now()}-${cartItem.cartId || cartItem.id}`,
        date: new Date().toISOString().split('T')[0],
        item: `${cartItem.name} (${cartItem.selectedSize || 'U'}, ${cartItem.selectedColor || 'U'})`,
        qty: cartItem.quantity,
        price: cartItem.price,
        discount: cartItem.discount > 0 ? `${cartItem.discount}%` : '0%',
        total: finalPrice * cartItem.quantity
      };
    });

    setSales([...sales, ...newSales]);
    setInventory(newInventory);
    
    // Create Order
    const newOrder = {
      id: `#${1000 + orders.length + 1}`,
      client: clientInfo.name,
      total: totalSale,
      status: 'Pendiente',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([newOrder, ...orders]);

    return true; // Success
  };

  const updateInventoryItem = (id, newCost, newPrice, newDiscount, newSizes, newColors, newImagesStr) => {
    setInventory(inventory.map(item => 
      item.id === id ? { 
        ...item, 
        cost: Number(newCost), 
        price: Number(newPrice), 
        discount: Number(newDiscount),
        sizes: newSizes ? newSizes.split(',').map(s=>s.trim()) : item.sizes,
        colors: newColors ? newColors.split(',').map(c=>c.trim()) : item.colors,
        images: newImagesStr ? newImagesStr.split(',').map(i=>i.trim()) : item.images
      } : item
    ));
  };

  const changeStock = (id, amount) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item
    ));
  };

  return (
    <StoreContext.Provider value={{ 
      inventory, 
      orders, 
      sales, 
      processPurchase, 
      updateInventoryItem, 
      changeStock 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
