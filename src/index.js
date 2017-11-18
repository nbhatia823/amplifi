import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      reg => console.log('registration successful')
    ).catch(err => console.log('registration failed:', err));
  });
}

render(<App />, document.getElementById('main'));
