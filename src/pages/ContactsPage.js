import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsAsync, addContactAsync } from '../redux/contactsSlice';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';


const ContactsPage = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { items: contacts, status, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    if (token) {
      dispatch(fetchContactsAsync(token));
    }
  }, [dispatch, token]);

  const handleAddContact = (contact) => {
    dispatch(addContactAsync(contact));
  };

  return (
    <div>
      {status === 'loading' && <p>🔄 Loading...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      <h2 className="title-wrapper">Hello, {user?.name}! 🎉</h2>

    
      <ContactForm onAddContact={handleAddContact} />

      
      <Filter />

      {contacts && contacts.length > 0 ? (
        <ContactList contacts={contacts} />
      ) : (
        <p>📭 No contacts.</p>
      )}
    </div>
  );
};

export default ContactsPage;
