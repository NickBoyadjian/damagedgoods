import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function Index() {
  const cart = useSelector(state => state.cart);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <h1 className="title">Damaged Goods</h1>
          </a>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>

            <Link to="/items" className="navbar-item">
              Store
            </Link>

            <Link to="/about" className="navbar-item">
              About
            </Link>



            <div className="navbar-item has-dropdown is-hoverable">

              <div className="navbar-dropdown">
                <a className="navbar-item">
                  About
          </a>
                <a className="navbar-item">
                  Jobs
          </a>
                <a className="navbar-item">
                  Contact
          </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  Report an issue
          </a>
              </div>
            </div>
          </div>

        </div>
      </nav>
    </>
  )
}
