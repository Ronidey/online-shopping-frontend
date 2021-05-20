import React, { useState, useEffect } from 'react';
import ProductsSection from './ProductsSection';
import axios from 'axios';
import CategoriesNav from './CategoriesNav';

function Collection() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('jean');

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    const path = '/products/category';
    const query =
      '?fields=title,imgUrl,currentPrice,oldPrice,category&limit=10';

    // Fetching All Collection products
    const fetchProducts = async () => {
      try {
        const [res1, res2, res3, res4] = await Promise.all([
          axios.get(`${path}/jean${query}`, { cancelToken: ourRequest.token }),
          axios.get(`${path}/tShirt${query}`, {
            cancelToken: ourRequest.token
          }),
          axios.get(`${path}/trouser${query}`, {
            cancelToken: ourRequest.token
          }),
          axios.get(`${path}/shoes${query}`, {
            cancelToken: ourRequest.token
          })
        ]);

        setProducts([
          ...res1.data.docs,
          ...res2.data.docs,
          ...res3.data.docs,
          ...res4.data.docs
        ]);
        setIsLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          alert(err.response.data.error);
        }
      }
    };
    fetchProducts();

    return () => ourRequest.cancel();
  }, []);

  const categories = [
    { ct: 'jean', txt: 'Jeans' },
    { ct: 'tShirt', txt: 'T-Shirts' },
    { ct: 'shoes', txt: 'Shoes' },
    { ct: 'trouser', txt: 'Trousers' }
  ];

  const visibleProducts = products.filter((p) => p.category === activeCategory);

  return (
    <ProductsSection
      id='collection'
      className='collection'
      products={visibleProducts}
      isLoading={isLoading}
    >
      <h2>Our Latest Collection</h2>
      <CategoriesNav
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </ProductsSection>
  );
}

export default Collection;
