import React from 'react';
import Catalog from '../components/Catalog';

const CatalogPage = () => {
  return (
    <div style={{ padding: '40px 20px', minHeight: '80vh' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--primary-dark)', marginBottom: '20px' }}>Nuestro Catálogo</h1>
      <Catalog />
    </div>
  );
};

export default CatalogPage;
