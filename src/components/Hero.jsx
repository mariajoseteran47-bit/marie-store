import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero} id="home">
            <div className={styles.overlay}></div>
            <div className={styles.heroContent}>
                <span className={styles.subtitle}>Colección 2026</span>
                <h1 className={styles.title}>
                    Especialistas en <span>Alta</span> Moda
                </h1>
                <p className={styles.description}>
                    Selección exclusiva de prendas de diseño y Alta Costura. Piezas creadas para la mujer moderna que busca destacar con absoluta elegancia.
                </p>
                <Link to="/catalog" className={styles.ctaButton}>
                    Ver Catálogo
                </Link>
            </div>
        </section>
    );
};

export default Hero;
