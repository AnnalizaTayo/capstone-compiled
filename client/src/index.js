import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './redux/store/store';
import reportWebVitals from './reportWebVitals';
import App from './App';

const root = document.getElementById('root');

const index = () => {
  createRoot(root).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

index();
reportWebVitals();
