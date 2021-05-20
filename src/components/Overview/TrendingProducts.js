import React, { useState, useEffect } from 'react';
import ProductsSection from './ProductsSection';
import axios from 'axios';

function TrendingProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Fecting Best Selling Products
  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          '/products?sort=-avgRating&limit=10&fields=title,imgUrl,currentPrice,oldPrice,category',
          {
            cancelToken: ourRequest.token
          }
        );
        setProducts(res.data.docs);
        setIsLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          alert(err.response.data.error);
        }
      }
    };
    fetchProducts();

    return () => {
      ourRequest.cancel();
    };
  }, []);

  return (
    <ProductsSection
      id='bestSelling'
      className='best-selling'
      products={products}
      isLoading={isLoading}
    >
      <>
        <h2 className='products__heading'>Popular Collection</h2>
      </>
    </ProductsSection>
  );
}

export default TrendingProducts;
