import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ReactPaginate from 'react-paginate';
import Page from './components/page';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 1;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:1337/items'
    }).then(res => {
      setData(res.data)
    });
  }, []);


  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
  };

  if (!data) {
    return <div>loading</div>
  }

  return (
    <div className="App">

      <Page items={data} />

      <button
        className="button is-link"
        onClick={() => {
          dispatch({ type: "ADD_TO_CART", item: data[0] })
          console.log(cart)
        }}>
        Add to Cart
      </button>
      <hr />
      {cart.length}
      {cart.map(x => <h1>{x.item.name}</h1>)}

      {/* <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={data.length / perPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} /> */}
    </div>
  );
}

export default App;
