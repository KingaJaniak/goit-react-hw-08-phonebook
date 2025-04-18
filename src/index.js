import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router> {}
      <App />
    </Router>
  </Provider>
);
