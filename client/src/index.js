import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './redux/apiSlice';
import reportWebVitals from './reportWebVitals';
import App from './App';

const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});

const root = document.getElementById('root');

const index = () => {
  createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

index();
reportWebVitals();
