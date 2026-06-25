import React, { createContext, useState, useEffect, useContext } from 'react';

const StoreContext = createContext();

const initialInventory = [
    { 
        id: 1, name: "Vestido Seda Rosa", cost: 45, price: 85.00, category: "Vestidos", 
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop"], 
        isNew: true, discount: 0, sizes: ['S', 'M', 'L'], colors: ['Rosa Pastel', 'Fucsia'],
        variants: [
            { id: '1-S-Rosa Pastel', size: 'S', color: 'Rosa Pastel', stock: 3 },
            { id: '1-M-Rosa Pastel', size: 'M', color: 'Rosa Pastel', stock: 5 },
            { id: '1-L-Fucsia', size: 'L', color: 'Fucsia', stock: 4 }
        ]
    },
    { 
        id: 2, name: "Blusa Lino Blanca", cost: 20, price: 45.00, category: "Tops", 
        images: ["https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1564222256577-45e728f2c611?q=80&w=800&auto=format&fit=crop"], 
        isNew: false, discount: 10, sizes: ['XS', 'S', 'M', 'L'], colors: ['Blanco', 'Beige'],
        variants: [
            { id: '2-S-Blanco', size: 'S', color: 'Blanco', stock: 4 },
            { id: '2-M-Blanco', size: 'M', color: 'Blanco', stock: 2 },
            { id: '2-M-Beige', size: 'M', color: 'Beige', stock: 2 }
        ]
    },
    { 
        id: 3, name: "Pantalón Sastre Beige", cost: 30, price: 65.00, category: "Pantalones", 
        images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop"], 
        isNew: true, discount: 0, sizes: ['36', '38', '40', '42'], colors: ['Beige', 'Negro'],
        variants: [
            { id: '3-36-Beige', size: '36', color: 'Beige', stock: 2 },
            { id: '3-38-Beige', size: '38', color: 'Beige', stock: 3 }
        ]
    }
];

export const StoreProvider = ({ children }) => {
  // Inicializar estado desde Local Storage si existe
  const [inventory, setInventory] = useState(() => {
      const saved = localStorage.getItem('marie_inventory');
      return saved ? JSON.parse(saved) : initialInventory;
  });
  const [orders, setOrders] = useState(() => {
      const saved = localStorage.getItem('marie_orders');
      return saved ? JSON.parse(saved) : [];
  });
  const [sales, setSales] = useState(() => {
      const saved = localStorage.getItem('marie_sales');
      return saved ? JSON.parse(saved) : [];
  });
  const [merchandiseLog, setMerchandiseLog] = useState(() => {
      const saved = localStorage.getItem('marie_merchandise');
      return saved ? JSON.parse(saved) : [];
  });

  // Guardar en Local Storage cada vez que haya cambios
  useEffect(() => {
      localStorage.setItem('marie_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
      localStorage.setItem('marie_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
      localStorage.setItem('marie_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
      localStorage.setItem('marie_merchandise', JSON.stringify(merchandiseLog));
  }, [merchandiseLog]);

  // Obtener stock global derivado de las variantes
  const getGlobalStock = (variants) => variants ? variants.reduce((acc, v) => acc + v.stock, 0) : 0;

  // Process purchase from Cart
  const processPurchase = (cartItems, clientInfo) => {
    let newInventory = [...inventory];
    let totalSale = 0;

    const newSaleItems = cartItems.map(cartItem => {
      // Find item in inventory
      const idx = newInventory.findIndex(i => i.id === cartItem.id);
      if (idx !== -1) {
        // Decrease specific variant stock
        const item = newInventory[idx];
        if (item.variants) {
            const vIdx = item.variants.findIndex(v => v.size === cartItem.selectedSize && v.color === cartItem.selectedColor);
            if (vIdx !== -1) {
                item.variants[vIdx].stock = Math.max(0, item.variants[vIdx].stock - cartItem.quantity);
            }
        }
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

    setSales([...sales, ...newSaleItems]);
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

  const updateVariantStock = (productId, variantId, amount) => {
      setInventory(inventory.map(item => {
          if (item.id === productId && item.variants) {
              return {
                  ...item,
                  variants: item.variants.map(v => 
                      v.id === variantId ? { ...v, stock: Math.max(0, v.stock + amount) } : v
                  )
              };
          }
          return item;
      }));
  };

  const addVariant = (productId, size, color, stock) => {
      setInventory(inventory.map(item => {
          if (item.id === productId) {
              const newVariant = { id: `${productId}-${size}-${color}-${Date.now()}`, size, color, stock: Number(stock) };
              return { ...item, variants: [...(item.variants || []), newVariant] };
          }
          return item;
      }));
  };

  const removeVariant = (productId, variantId) => {
      setInventory(inventory.map(item => {
          if (item.id === productId && item.variants) {
              return { ...item, variants: item.variants.filter(v => v.id !== variantId) };
          }
          return item;
      }));
  };

  const registerIncomingMerchandise = (productId, size, color, qty, cost, date) => {
      let productName = '';
      setInventory(inventory.map(item => {
          if (item.id === productId) {
              productName = item.name;
              let variants = item.variants || [];
              let found = false;
              
              const updatedVariants = variants.map(v => {
                  if (v.size === size && v.color === color) {
                      found = true;
                      return { ...v, stock: v.stock + Number(qty) };
                  }
                  return v;
              });

              if (!found) {
                  updatedVariants.push({
                      id: `${productId}-${size}-${color}-${Date.now()}`,
                      size,
                      color,
                      stock: Number(qty)
                  });
              }

              return {
                  ...item,
                  cost: Number(cost) > 0 ? Number(cost) : item.cost,
                  variants: updatedVariants
              };
          }
          return item;
      }));

      const newEntry = {
          id: `M-${Date.now()}`,
          date: date || new Date().toISOString().split('T')[0],
          productName,
          size,
          color,
          qty: Number(qty),
          cost: Number(cost),
          total: Number(qty) * Number(cost)
      };

      setMerchandiseLog([newEntry, ...merchandiseLog]);
      return true;
  };

  const createProduct = (name, category, cost, price, imagesStr) => {
      const newProduct = {
          id: Date.now(),
          name,
          category,
          cost: Number(cost),
          price: Number(price),
          images: imagesStr ? imagesStr.split(',').map(i=>i.trim()) : [],
          isNew: true,
          discount: 0,
          sizes: [],
          colors: [],
          variants: []
      };
      setInventory([newProduct, ...inventory]);
      return newProduct.id;
  };

  return (
    <StoreContext.Provider value={{ 
      inventory, 
      orders, 
      sales, 
      processPurchase, 
      updateInventoryItem, 
      updateVariantStock,
      addVariant,
      removeVariant,
      getGlobalStock,
      merchandiseLog,
      registerIncomingMerchandise,
      createProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
