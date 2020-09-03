import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'; 
import App from './App';

// Redux store for the shopping cart
const store = createStore(rootReducer);

// Sets up the connection to out graphql server
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <Provider store={store}> 
      <App />
    </Provider>
  </ApolloProvider>, document.getElementById('root'))
