import React from 'react';

const AboutPage = () => {
  return (
    <div style={styles.container}>
      
      {/* Sección Hero Editorial */}
      <section style={styles.heroSection}>
        <div style={styles.imageBlock}>
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop" 
            alt="Moda Elegante" 
            style={styles.image}
          />
        </div>
        <div style={styles.textBlock}>
          <h1 style={styles.title}>La Esencia de Marie</h1>
          <div style={styles.divider}></div>
          <p style={styles.paragraph}>
            En <strong>Marie Store</strong>, no solo vendemos ropa; ofrecemos una declaración de intenciones. Creemos firmemente que la elegancia y el estilo son herramientas fundamentales para resaltar la belleza interior y la confianza de cada mujer.
          </p>
          <p style={styles.paragraph}>
            Nacimos en 2026 con un propósito claro: curar colecciones de la más alta calidad, donde cada pieza, desde un vestido de seda hasta una paleta de sombras, es seleccionada meticulosamente pensando en la mujer moderna, empoderada y sofisticada.
          </p>
        </div>
      </section>

      {/* Sección de Calidad y Valores */}
      <section style={styles.valuesSection}>
        <h2 style={styles.valuesTitle}>Por qué elegirnos</h2>
        
        <div style={styles.valuesGrid}>
          <div style={styles.valueCard}>
            <div style={styles.iconCircle}>✨</div>
            <h3 style={styles.valueHeading}>Materiales Premium</h3>
            <p style={styles.valueText}>Trabajamos exclusivamente con telas de primera calidad, asegurando durabilidad, confort y una caída perfecta en cada prenda.</p>
          </div>

          <div style={styles.valueCard}>
            <div style={styles.iconCircle}>✂️</div>
            <h3 style={styles.valueHeading}>Diseño Exclusivo</h3>
            <p style={styles.valueText}>Nuestras colecciones son limitadas. Cada diseño está pensado para que te sientas única y destaques en cualquier ocasión.</p>
          </div>

          <div style={styles.valueCard}>
            <div style={styles.iconCircle}>🛍️</div>
            <h3 style={styles.valueHeading}>Atención Personalizada</h3>
            <p style={styles.valueText}>Tu experiencia de compra es nuestra prioridad. Te asesoramos y acompañamos desde el primer clic hasta que recibes tu paquete.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  heroSection: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '70vh',
  },
  imageBlock: {
    flex: '1 1 500px',
    minHeight: '400px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textBlock: {
    flex: '1 1 500px',
    padding: '8% 8%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FDF2F8' /* Rosa muy sutil */
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: '3rem',
    color: '#111827',
    marginBottom: '20px',
  },
  divider: {
    width: '60px',
    height: '3px',
    backgroundColor: 'var(--primary-dark)',
    marginBottom: '30px',
  },
  paragraph: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginBottom: '20px',
  },
  
  valuesSection: {
    padding: '80px 5%',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  valuesTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2.5rem',
    color: '#111827',
    marginBottom: '60px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  valueCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  iconCircle: {
    width: '80px',
    height: '80px',
    backgroundColor: '#FDF2F8',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '30px',
    marginBottom: '20px',
  },
  valueHeading: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.4rem',
    color: '#111827',
    marginBottom: '15px',
  },
  valueText: {
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  }
};

export default AboutPage;
