import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import PlaceholderCards from './PlaceholderCards';
import Page from './Page';
import MainHeader from './MainHeader';
import Search from './Search';
import ProductsGrid from './ProductsGrid';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const params = useLocation();
  const searchValue = decodeURIComponent(params.search.split('=')[1]);

  const cards = loadingResults ? (
    <PlaceholderCards />
  ) : (
    results.map((data) => <ProductCard key={data._id} product={data} />)
  );

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    setLoadingResults(true); //Do not remove

    axios
      .get(`/products/search?q=${searchValue}`)
      .then((res) => {
        setResults(res.data.results);
        setLoadingResults(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          alert(err.response.data.error);
        }
      });

    return () => ourRequest.cancel();
  }, [searchValue]);

  return (
    <Page title={searchValue}>
      <Search />
      <MainHeader />
      <main>
        <section className='search-results'>
          <div className='container'>
            <header>
              <h3 className='search-results__heading text-center'>
                {!loadingResults && <>You searched for "{searchValue}"</>}
              </h3>
              {!loadingResults && !results.length && <p>No Results found!</p>}
            </header>
            <ProductsGrid cards={cards} />
          </div>
        </section>
      </main>
    </Page>
  );
}

export default SearchResults;
