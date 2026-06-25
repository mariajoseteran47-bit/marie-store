import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.brand}>
                    <h3 style={styles.title}>Marie Store</h3>
                    <p style={styles.subtitle}>Tu Tienda 100% Online</p>
                </div>
                <div style={styles.contact}>
                    <p style={styles.text}><strong>WhatsApp:</strong> +505 5555 5555</p>
                    <p style={styles.text}><strong>Correo:</strong> hola@mariestore.com</p>
                </div>
            </div>
            <div style={styles.bottom}>
                <p>&copy; 2026 Marie Store. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: 'var(--surface-color)',
        borderTop: '1px solid var(--border-color)',
        padding: '40px 20px 20px',
        marginTop: 'auto',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '30px'
    },
    brand: {
        flex: 1,
        minWidth: '200px'
    },
    title: {
        fontFamily: 'var(--font-serif)',
        color: 'var(--primary-dark)',
        fontSize: '24px',
        marginBottom: '5px'
    },
    subtitle: {
        color: 'var(--text-secondary)',
        fontSize: '14px'
    },
    contact: {
        flex: 1,
        minWidth: '200px',
        textAlign: 'right'
    },
    text: {
        color: 'var(--text-main)',
        marginBottom: '8px',
        fontSize: '15px'
    },
    bottom: {
        textAlign: 'center',
        paddingTop: '20px',
        borderTop: '1px solid #E5E7EB',
        color: 'var(--text-muted)',
        fontSize: '13px'
    }
};

export default Footer;
