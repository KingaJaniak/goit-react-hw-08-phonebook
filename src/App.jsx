import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import './index.css';


const App = () => {
  return (
    <Provider store={store}>
      <h1>Phone Book</h1>
      <ContactForm />
      <Filter />
      <ContactList />
    </Provider>
  );
};

export default App;
