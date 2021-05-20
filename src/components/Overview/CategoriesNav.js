import React from 'react';
import './CategoriesNav.css';

function CategoriesNav({ categories, activeCategory, setActiveCategory }) {
  const handleClick = (e) => {
    e.preventDefault();
    setActiveCategory(e.currentTarget.dataset.category);
  };

  return (
    <div className='CategoriesNav'>
      {categories.map((data) => (
        <a
          href='#'
          key={data.ct}
          data-category={data.ct}
          onClick={handleClick}
          className={`CategoriesNav__link ${
            activeCategory === data.ct ? 'is-active' : ''
          }`}
        >
          {data.txt}
        </a>
      ))}
    </div>
  );
}

export default CategoriesNav;
