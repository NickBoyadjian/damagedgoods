import React from 'react';
import { Link } from 'react-router-dom';

export default function Index() {

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

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-link">
                  <strong>Shopping Cart</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
