import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/filterSlice';

const Filter = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() === '') {
      dispatch(setFilter(''));
    } else {
      dispatch(setFilter(query));
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (query.trim() === '') {
      dispatch(setFilter(''));
    }
  }, [query, dispatch]);

  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="Search contacts" className="input-field"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button className="search-button" onClick={handleSearch}>Search</button> {}
    </div>
  );
};

export default Filter;
