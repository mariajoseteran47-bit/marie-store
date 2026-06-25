import React from 'react';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import Catalog from '../components/Catalog';
import Newsletter from '../components/Newsletter';

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <Catalog />
      <Newsletter />
    </>
  );
};

export default HomePage;
