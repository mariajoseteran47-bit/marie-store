import React from 'react';
import ProductCard from './ProductCard';
import styles from '../styles/Catalog.module.css';

const products = [
    {
        id: 1,
        name: "Vestido Seda Rosa",
        price: 85.00,
        category: "Vestidos",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
        isNew: true
    },
    {
        id: 2,
        name: "Blusa Lino Blanca",
        price: 45.00,
        category: "Tops",
        image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=1000&auto=format&fit=crop",
        isNew: false
    },
    {
        id: 3,
        name: "Pantalón Sastre Beige",
        price: 65.00,
        category: "Pantalones",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
        isNew: true
    },
    {
        id: 4,
        name: "Chaqueta Tweed Cream",
        price: 120.00,
        category: "Outerwear",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
        isNew: false
    },
    {
        id: 5,
        name: "Falda Midi Plisada",
        price: 55.00,
        category: "Faldas",
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop",
        isNew: false
    },
    {
        id: 6,
        name: "Top Satén Champagne",
        price: 38.00,
        category: "Tops",
        image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1000&auto=format&fit=crop",
        isNew: true
    }
];

const Catalog = () => {
    return (
        <section className={styles.catalog} id="catalog">
            <div className={styles.header}>
                <h2 className={styles.title}>Nueva Colección</h2>
                <div className={styles.divider}></div>
                <p>Elegancia que trasciende el tiempo.</p>
            </div>
            <div className={styles.grid}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default Catalog;
