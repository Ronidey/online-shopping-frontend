import React from 'react';
import './PlaceholderCards.css';

function PlaceholderCards({ count = 5 }) {
  return (
    <>
      {Array(count)
        .fill('')
        .map((txt, idx) => (
          <div key={idx} className='PlaceholderCard'></div>
        ))}
    </>
  );
}

export default PlaceholderCards;
