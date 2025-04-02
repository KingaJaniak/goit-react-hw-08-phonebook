import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsAsync } from '../redux/contactsSlice';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { contacts, status, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    console.log('Fetching contacts...');
    if (token) {
      dispatch(fetchContactsAsync(token));
    }
  }, [dispatch, token]);

  console.log('User:', user);
  console.log('Contacts:', contacts);
  console.log('Status:', status);
  console.log('Error:', error);


  return (
    <div>
      {status === 'loading' && <p>🔄 Loading...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      <h2>Hello, {user?.name}! 🎉</h2>

      <h1>Your Contacts</h1>
      <ContactForm />
      <Filter />

      <h3>📞 Contacts list:</h3>
      {contacts && contacts.length > 0 ? (
        <ContactList />
      ) : (
        <p>📭 No contacts.</p>
      )}
    </div>
  );
};

export default ContactsPage;
