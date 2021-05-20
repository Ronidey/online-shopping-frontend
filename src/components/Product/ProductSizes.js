import React from 'react';

function ProductSizes(props) {
  return (
    <div className='product-sizes d-flex align-items-center flex-wrap'>
      <h6>Sizes- US/India:</h6>
      <div>
        {props.sizes.map((s) => (
          <span
            onClick={() => props.changeSize(s)}
            key={s}
            className={s == props.selectedSize ? 'is-active' : ''}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ProductSizes);
