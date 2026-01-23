import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Cart />
      <main>
        <Hero />
        <Catalog />
        {/* Further sections like About, etc. will go here */}
      </main>
    </div>
  );
}

export default App;
