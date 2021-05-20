import React from 'react';
import Container from '@material-ui/core/Container';
import PlaceholderCards from '../PlaceholderCards';
import ProductCard from '../ProductCard';
import ProductsGrid from '../ProductsGrid';
import './ProductsSection.css';

function ProductsSection(props) {
  // If isLoading is true then render Placeholder cards
  const cards = props.isLoading ? (
    <PlaceholderCards />
  ) : (
    props.products.map((data) => <ProductCard key={data._id} product={data} />)
  );

  return (
    <section className={`ProductsSection ${props.className}`} id={props.id}>
      <Container maxWidth='lg'>
        <header className='ProductsSection__header'>{props.children}</header>
        <ProductsGrid cards={cards} />
      </Container>
    </section>
  );
}

export default ProductsSection;
