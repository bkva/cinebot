import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            CineBot
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://niweera.gq"
                >
                  Niweera.GQ
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://blog.niweera.gq"
                >
                  <i className="fab fa-wordpress"></i> Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://github.com/Niweera/cinebot"
                >
                  <i style={{ fontSize: "25px" }} className="fab fa-github" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
