import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`¡Gracias por suscribirte con ${email}! Revisa tu correo para obtener tu cupón de descuento.`);
      setEmail('');
    }
  };

  return (
    <section style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Únete a Nuestro Club</h2>
        <p style={styles.text}>
          Suscríbete a nuestro boletín y obtén un <strong>10% de descuento</strong> en tu primera compra, además de acceso anticipado a nuevas colecciones.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="email" 
            placeholder="Tu correo electrónico..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Suscribirme</button>
        </form>
      </div>
    </section>
  );
};

const styles = {
  container: {
    backgroundColor: '#FDF2F8', /* Rosa muy pálido */
    padding: '80px 20px',
    textAlign: 'center',
    borderTop: '1px solid #FBCFE8',
    borderBottom: '1px solid #FBCFE8'
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2.5rem',
    color: '#111827',
    marginBottom: '15px'
  },
  text: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
    marginBottom: '30px',
    lineHeight: '1.6'
  },
  form: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  input: {
    flex: '1 1 250px',
    padding: '15px 20px',
    borderRadius: '30px',
    border: '1px solid #F472B6',
    outline: 'none',
    fontSize: '1rem'
  },
  button: {
    padding: '15px 30px',
    borderRadius: '30px',
    backgroundColor: '#111827',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

export default Newsletter;
