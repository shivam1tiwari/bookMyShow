import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GoogleOAuthProvider } from '@react-oauth/google';

//  Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApolloProvider client={client}>
  <GoogleOAuthProvider clientId='1059403878755-sglfjv90ldg03j5hfvfo4korff174f3m.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>
  </ApolloProvider>
);
