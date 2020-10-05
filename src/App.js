import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ItemsPage from './pages/items';
import ItemPage from './pages/item';
import LandingPage from './pages/landingpage';
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
          <Route path="/items" components={<ItemsPage />}>
            <ItemsPage /> 
            <Route path="/items/:id"> 
              <ItemPage />
            </Route>
          </Route>
        </Switch>
    </Router> 

    </div>
  );
}

export default App;
