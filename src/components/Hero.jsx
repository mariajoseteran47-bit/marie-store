import React from 'react';
import styles from '../styles/Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero} id="home">
            <div className={styles.circle + ' ' + styles.circle1}></div>
            <div className={styles.circle + ' ' + styles.circle2}></div>
            <div className={styles.heroContent}>
                <span className={styles.subtitle}>Colección 2026</span>
                <h1 className={styles.title}>
                    Encuentra tu <span>Elegancia</span> Interior
                </h1>
                <p className={styles.description}>
                    Descubre nuestra exclusiva selección de moda femenina diseñada para resaltar tu estilo único y sofisticado.
                </p>
                <button className={styles.ctaButton}>Ver Catálogo</button>
            </div>
        </section>
    );
};

export default Hero;
