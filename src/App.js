import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VoronoiTreeMap from './components/voronoiTreeMap';
import { useSelector, useDispatch } from 'react-redux';

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

  if (!items) {
    return <div>loading</div>
  }

  return (
    <div className="App">
      <VoronoiTreeMap items={items} />
      {/* <button
        className="button is-link"
        onClick={() => {
          dispatch({ type: "ADD_TO_CART", item: data[0] })
          console.log(cart)
        }}>
        Add to Cart
      </button>
      <hr />
      {cart.length}
      {cart.map(x => <h1>{x.item.name}</h1>)} */}
    </div>
  );
}

export default App;
