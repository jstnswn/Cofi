import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import './components/Forms.css'
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { PathProvider } from './context/PathContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        {/* <PathProvider> */}
      <ModalProvider>
          <App />
      </ModalProvider>
        {/* </PathProvider> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
