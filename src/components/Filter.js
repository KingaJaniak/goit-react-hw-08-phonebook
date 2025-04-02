import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/contactsSlice'; 


const Filter = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => {
    setQuery(e.target.value);
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="Search contacts"
        className="input-field"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
