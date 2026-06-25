import React from 'react';
import styles from '../styles/Contact.module.css';

const ContactPage = () => {
  return (
    <div className={styles.container}>
      {/* Hero Header Minimalista */}
      <div className={styles.heroBanner}>
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
          alt="Atención al Cliente" 
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>Atención al Cliente</h1>
          <p className={styles.heroSubtitle}>¿En qué podemos ayudarte hoy?</p>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        
        {/* Tarjetas de Asistencia Rápida */}
        <div className={styles.helpGrid}>
          <a href="https://wa.me/50555555555" target="_blank" rel="noreferrer" className={styles.helpCard}>
            <span className={styles.icon}>💬</span>
            <h3>Chat en Vivo</h3>
            <p>Escríbenos por WhatsApp. Tiempo de respuesta: Inmediato.</p>
            <span className={styles.linkText}>Iniciar Chat &rarr;</span>
          </a>
          
          <div className={styles.helpCard}>
            <span className={styles.icon}>✉️</span>
            <h3>Correo Electrónico</h3>
            <p>hola@mariestore.com. Tiempo de respuesta: 24 horas.</p>
            <button className={styles.linkText} style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit'}}>
              Enviar Email &rarr;
            </button>
          </div>

          <div className={styles.helpCard}>
            <span className={styles.icon}>📦</span>
            <h3>Envíos y Devoluciones</h3>
            <p>Consulta el estado de tu pedido o nuestras políticas de cambio.</p>
            <span className={styles.linkText}>Ver Políticas &rarr;</span>
          </div>
        </div>

        {/* Sección de Formulario Estilo E-commerce */}
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Envíanos un mensaje</h2>
            <p>Si tienes alguna consulta sobre un pedido específico, por favor incluye tu número de orden (#1000) en el mensaje.</p>
          </div>

          <form className={styles.contactForm}>
            <div className={styles.inputGroup}>
              <div className={styles.inputField}>
                <label>Nombre Completo *</label>
                <input type="text" placeholder="Ej. Maria Lopez" required />
              </div>
              <div className={styles.inputField}>
                <label>Correo Electrónico *</label>
                <input type="email" placeholder="tu@correo.com" required />
              </div>
            </div>
            
            <div className={styles.inputField}>
              <label>Número de Pedido (Opcional)</label>
              <input type="text" placeholder="Ej. #1024" />
            </div>

            <div className={styles.inputField}>
              <label>Tu Mensaje *</label>
              <textarea rows="5" placeholder="Escribe aquí los detalles..." required></textarea>
            </div>

            <button type="button" className={styles.submitBtn} onClick={() => alert("Mensaje enviado con éxito.")}>
              Enviar Mensaje
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
