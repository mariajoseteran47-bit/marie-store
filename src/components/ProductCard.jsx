import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToCart = () => {
        if (product.sizes?.length > 0 && !selectedSize) {
            setError('Selecciona una talla');
            return;
        }
        if (product.colors?.length > 0 && !selectedColor) {
            setError('Selecciona un color');
            return;
        }
        setError('');
        addToCart(product, selectedSize || 'Unica', selectedColor || 'Unico');
        setSelectedSize('');
        setSelectedColor('');
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className={styles.card}>
            {product.isNew && <span className={styles.badge}>Nuevo</span>}
            {product.discount > 0 && <span className={styles.badge} style={{ backgroundColor: '#111827', color: 'white', top: product.isNew ? '40px' : '10px' }}>-{product.discount}%</span>}
            
            <div className={styles.imageContainer}>
                {product.images && product.images.length > 0 && (
                    <>
                        <img src={product.images[currentImageIndex]} alt={product.name} className={styles.image} />
                        
                        {/* Controles de Carrusel */}
                        {product.images.length > 1 && (
                            <>
                                <button className={styles.carouselBtnLeft} onClick={prevImage}>&lt;</button>
                                <button className={styles.carouselBtnRight} onClick={nextImage}>&gt;</button>
                                
                                {/* Puntitos de indicador */}
                                <div className={styles.dotsContainer}>
                                    {product.images.map((img, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`${styles.dot} ${idx === currentImageIndex ? styles.activeDot : ''}`}
                                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.name}>{product.name}</h3>
                
                {product.discount > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <p className={styles.price}>
                            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </p>
                        <p style={{ textDecoration: 'line-through', color: '#9CA3AF', fontSize: '14px' }}>
                            ${product.price.toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                )}

                {/* Variantes (Tallas y Colores) */}
                <div className={styles.variants}>
                    {product.sizes && product.sizes.length > 0 && (
                        <div className={styles.variantGroup}>
                            {product.sizes.map(size => (
                                <button 
                                    key={size}
                                    onClick={() => {setSelectedSize(size); setError('');}}
                                    className={`${styles.variantPill} ${selectedSize === size ? styles.variantPillActive : ''}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}
                    {product.colors && product.colors.length > 0 && (
                        <div className={styles.variantGroup}>
                            {product.colors.map(color => (
                                <button 
                                    key={color}
                                    onClick={() => {setSelectedColor(color); setError('');}}
                                    className={`${styles.variantPill} ${selectedColor === color ? styles.variantPillActive : ''}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {error && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px', fontWeight: 'bold' }}>{error}</p>}

                <button
                    className={styles.addButton}
                    onClick={handleAddToCart}
                >
                    Añadir al Carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
