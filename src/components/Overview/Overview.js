import React, { useState } from 'react';
import Banners from './Banners';
import Collection from './Collection';
import TrendingProducts from './TrendingProducts';
import Page from '../Page';
import Testimonials from './Testimonials';
import Footer from '../Footer';
import Search from '../Search';
import MainHeader from '../MainHeader';

function Overview() {
  return (
    <Page title='Welcome!'>
      <Search />
      <MainHeader />
      <main>
        <Banners />
        <Collection />
        <TrendingProducts />
        <Testimonials />
      </main>
      <Footer />
    </Page>
  );
}

export default React.memo(Overview);
