import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ItemsPage from './pages/items';
import ItemPage from './pages/item';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);



  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <p>Home</p> 
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
