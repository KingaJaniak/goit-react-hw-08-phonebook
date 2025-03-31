import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsAsync, removeContactAsync } from '../redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContactsAsync());
    }
  }, [status, dispatch]);

  const handleRemoveContact = id => {
    dispatch(removeContactAsync(id));
  };

  const filteredContacts = items.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.phone.includes(filter)
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
            <li key={contact.id}>
              {contact.name} - {contact.phone}
              <button className="remove-button" onClick={() => handleRemoveContact(contact.id)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No contacts found.</li>
        )}
      </ul>
    </div>
  );
};

export default ContactList;