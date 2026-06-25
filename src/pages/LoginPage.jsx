import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Contraseña de prueba secreta
    if (password === 'marie2026') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
      // Forzamos la recarga para que el Navbar actualice el botón
      window.location.reload();
    } else {
      setError('Contraseña incorrecta.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Acceso Restringido</h1>
        <p style={styles.text}>Solo personal autorizado (Encargada).</p>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="password" 
            placeholder="Contraseña de Encargada" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input} 
          />
          {error && <p style={{ color: 'red', fontSize: '14px', margin: '0' }}>{error}</p>}
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '16px' }}>Entrar al Panel</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '60px 20px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: 'var(--surface-color)', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(240, 98, 146, 0.1)', maxWidth: '400px', width: '100%', border: '1px solid var(--border-color)', textAlign: 'center' },
  title: { color: 'var(--primary-dark)', marginBottom: '10px' },
  text: { color: 'var(--text-secondary)', marginBottom: '30px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '16px', textAlign: 'center' }
};

export default LoginPage;
