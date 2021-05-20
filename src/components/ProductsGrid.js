import React from 'react';
import './ProductsGrid.css';

function ProductsGrid({ cards, ...rest }) {
  return (
    <div className='ProductsGrid' {...rest}>
      {cards}
    </div>
  );
}

export default ProductsGrid;
