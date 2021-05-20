import React from 'react';
import './SingleProductDesc.css';

function SingleProductDesc(props) {
  const desc = [];

  for (let prop in props.desc) {
    desc.push(
      <div key={prop}>
        <span>{prop}</span>
        <span>{props.desc[prop]}</span>
      </div>
    );
  }

  return (
    <div className='product-details'>
      <h3>Product Details</h3>
      <div className='details-container'>{desc}</div>
    </div>
  );
}

export default React.memo(SingleProductDesc);
