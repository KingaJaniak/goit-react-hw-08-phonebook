import axios from 'axios';

const API_URL = 'https://67e051137635238f9aad3350.mockapi.io/contacts';

export const fetchContacts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const addContactAPI = async contact => {
  try {
    const { name, number } = contact;
    const response = await axios.post(API_URL, { name, phone: number });
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

export const removeContactAPI = async id => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error('Error removing contact:', error);
    throw error;
  }
};
