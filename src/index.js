import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import App from './App';


// Link to damaged goods shopify graphql 
const httpLink = createHttpLink({ uri: 'https://damagedgoods-fashion.myshopify.com/api/graphql' });

const middlewareLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': '458de1ddc1b6b63768978b56a88d1cbe'
  }
}));

// Sets up the connection to out graphql server
const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache()
});



// Redux store for the shopping cart
const store = createStore(rootReducer);

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>, document.getElementById('root'))
