import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ItemsPage from './pages/items';
import ItemPage from './pages/item';
import LandingPage from './pages/landingpage';
import AboutPage from './pages/about';
import Error from './pages/error';
import Navbar from './components/navbar';
import './App.scss';

function App() {
  // const dispatch = useDispatch();
  // const cart = useSelector(state => state.cart);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/about" >
            <AboutPage />
          </Route>
          <Route path="/items" components={<ItemsPage />}>
            <ItemsPage />
            <Route path="/items/:id">
              <ItemPage />
            </Route>
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
