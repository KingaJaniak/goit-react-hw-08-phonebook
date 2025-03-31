import React from 'react';
import { useDispatch } from 'react-redux';
import { addContactAsync } from '../redux/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const number = e.target.elements.number.value;
    const newContact = { name, number };

    dispatch(addContactAsync(newContact));
    e.target.reset();
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" name="name" placeholder="Name" className="input-field filter-input" required />
        <input type="text" name="number" placeholder="Phone number" className="input-field filter-input" required />
        <button className="submit-button filter-input" type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;