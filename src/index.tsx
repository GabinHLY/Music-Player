import React from 'react';
import ReactDOM from 'react-dom';
import { KitchnProvider } from 'kitchn'; // Import KitchnProvider
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <KitchnProvider>
      <App />
    </KitchnProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
