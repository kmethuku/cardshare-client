import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';
import { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;
  return (
    <AuthProvider>
      <>
        <Component {...pageProps}/>
      </>
    </AuthProvider>
  )
}

export default MyApp;
