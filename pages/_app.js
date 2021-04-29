import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp;
