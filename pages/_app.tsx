import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app'
import Navbar from '../components/Navbar'

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <AuthProvider>
      <>
        <Navbar />
        <Component {...pageProps} />
      </>
    </AuthProvider>
  )
}

export default MyApp;
