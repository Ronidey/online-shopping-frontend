import React, { useContext, createRef, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CloseIcon from '@material-ui/icons/Close';
import './Search.css';

function Search() {
  const { appState, appDispatch } = useContext(AppContext);
  const history = useHistory();
  const searchField = createRef(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    appDispatch({ type: 'closeSearch' });
    appDispatch({ type: 'searching' });
    history.push('/search?q=' + encodeURIComponent(searchValue));
    setSearchValue('');
  };

  useEffect(() => {
    if (appState.isSearchOpen) {
      searchField.current.focus();
    }
  }, [appState.isSearchOpen]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClose = () => {
    appDispatch({ type: 'closeSearch' });
  };

  return (
    <div
      className={`search-box ${appState.isSearchOpen ? 'is-open' : ''}`}
      id='searchBox'
    >
      <div className='search-box__container'>
        <IconButton
          aria-label='close search'
          type='submit'
          onClick={handleSearchClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit} className='form-search'>
          <input
            ref={searchField}
            type='search'
            name='search'
            placeholder='Search products...'
            value={searchValue}
            onChange={handleChange}
          />
          <IconButton aria-label='search' type='submit'>
            <SearchOutlinedIcon fontSize='large' />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default Search;
