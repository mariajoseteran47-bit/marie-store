import React, { useState } from 'react';
import ProductCard from './ProductCard';
import styles from '../styles/Catalog.module.css';
import { useStore } from '../context/StoreContext';

const Catalog = () => {
    const { inventory } = useStore();
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['Todos', ...new Set(inventory.map(item => item.category))];

    const filteredInventory = inventory.filter(item => {
        const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className={styles.catalog} id="catalog">
            <div className={styles.header}>
                <h2 className={styles.title}>Nueva Colección</h2>
                <div className={styles.divider}></div>
                <p>Elegancia que trasciende el tiempo.</p>
            </div>

            {/* Buscador y Filtros */}
            <div style={{ maxWidth: '600px', margin: '0 auto 30px' }}>
                <input 
                    type="text" 
                    placeholder="Buscar producto (Ej: Vestido Seda)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '15px 20px',
                        fontSize: '16px',
                        border: '1px solid #E5E7EB',
                        borderBottom: '2px solid #111827',
                        outline: 'none',
                        backgroundColor: 'transparent'
                    }}
                />
            </div>

            {/* Filtros de Categoría */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '8px 20px',
                            borderRadius: '30px',
                            border: '1px solid var(--primary-dark)',
                            backgroundColor: activeCategory === cat ? 'var(--primary-dark)' : 'transparent',
                            color: activeCategory === cat ? 'white' : 'var(--primary-dark)',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredInventory.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            {filteredInventory.length === 0 && (
                <div style={{ textAlign: 'center', width: '100%', padding: '40px', color: '#888' }}>
                    <p>No hay productos en esta categoría por ahora.</p>
                </div>
            )}
        </section>
    );
};

export default Catalog;
