import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Compra por Categoría</h2>
      <div style={styles.grid}>
        <Link to="/catalog" style={styles.card}>
          <img 
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop" 
            alt="Vestidos" 
            style={styles.image} 
          />
          <div style={styles.overlay}>
            <h3 style={styles.categoryName}>Vestidos</h3>
            <span style={styles.linkText}>Ver Colección &rarr;</span>
          </div>
        </Link>
        <Link to="/catalog" style={styles.card}>
          <img 
            src="https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop" 
            alt="Tops y Blusas" 
            style={styles.image} 
          />
          <div style={styles.overlay}>
            <h3 style={styles.categoryName}>Tops y Blusas</h3>
            <span style={styles.linkText}>Ver Colección &rarr;</span>
          </div>
        </Link>
        <Link to="/catalog" style={styles.card}>
          <img 
            src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop" 
            alt="Pantalones y Faldas" 
            style={styles.image} 
          />
          <div style={styles.overlay}>
            <h3 style={styles.categoryName}>Pantalones y Faldas</h3>
            <span style={styles.linkText}>Ver Colección &rarr;</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

const styles = {
  container: {
    padding: '60px 5%',
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2.5rem',
    color: '#111827',
    marginBottom: '40px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  card: {
    position: 'relative',
    height: '400px',
    overflow: 'hidden',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'block'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '30px',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    color: 'white',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  categoryName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.8rem',
    margin: 0,
    color: 'white'
  },
  linkText: {
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '10px',
    fontWeight: '600'
  }
};

export default FeaturedCategories;
