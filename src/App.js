import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ItemsPage from './pages/items';
import './App.scss';

function App() {
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:1337/items'
    }).then(res => {
      setItems(res.data)
    });
  }, []);


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <p>Home</p> 
          </Route>
          <Route path="/items">
            <ItemsPage items={items} /> 
          </Route>
          <Route> 
                
          </Route>
        </Switch>
    </Router> 

    </div>
  );
}

export default App;
