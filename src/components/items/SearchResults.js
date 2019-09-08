import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getStatus, getData } from "../../actions/itemActions";
import ScrollUp from "../layout/ScrollUp";

class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      total: null,
      total_pages: null,
      per_page: null,
      current_page: null,
      errors: null,
      title: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { title } = this.state;
    console.log(title);
  }

  componentDidMount() {
    this.props.getStatus();
    this.props.getData(1);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }

    if (nextProps.item.links !== null) {
      if (nextProps.item.links.page !== prevState.current_page) {
        return {
          data: nextProps.item.links.data,
          total: nextProps.item.links.total,
          per_page: nextProps.item.links.per_page,
          current_page: nextProps.item.links.page,
          total_pages: nextProps.item.links.total_pages
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  render() {
    const { data, total, total_pages, current_page, title } = this.state;
    let linkComponent, renderPageNumbers;

    if (data !== null) {
      linkComponent = data.map((link, index) => (
        <div className="mt-3" key={index}>
          <a href={link.link} style={{ color: "white" }}>
            <h5>{link.name}</h5>
          </a>
          <a href={link.link} style={{ color: "white" }}>
            {link.link}
          </a>
          <hr />
          <div className="container mt-3 text-center">
            <div className="row">
              <div className="col-xl-4 col-lg-0 col-md-0 col-sm-0 col-0"></div>
              <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                {link.img === "null" ? (
                  <a href={link.link}>
                    <img
                      style={{ maxWidth: "100%" }}
                      src="https://tvdb.niweera.gq/sample_poster.jpg"
                      className="img-fluid"
                      alt="Poster"
                    />
                  </a>
                ) : (
                  <a href={link.link}>
                    <img
                      src={link.img}
                      style={{ maxWidth: "100%" }}
                      className="img-fluid"
                      alt="Poster"
                    />
                  </a>
                )}
              </div>
              <div className="col-xl-4 col-lg-0 col-md-0 col-sm-0 col-0"></div>
            </div>
          </div>
          <hr />
          <br />
        </div>
      ));
    }

    const pageNumbers = [];
    if (total !== null) {
      for (let i = 1; i <= total_pages; i++) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map(number => {
        let classes =
          current_page === number ? "page-item active" : "page-item";

        if (
          number === 1 ||
          number === this.state.total ||
          (number >= current_page - 2 && number <= current_page + 2)
        ) {
          return (
            <li className={classes} key={number}>
              <span
                className="page-link"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  this.props.getData(number);
                }}
              >
                {number}
              </span>
            </li>
          );
        } else {
          return null;
        }
      });
    }

    if (data) {
      return (
        <div className="container mt-5">
          <ScrollUp />
          <div
            className="container pt-3 pb-3"
            style={{
              backgroundColor: "#3b3a30",
              textShadow: "0 1px 3px rgba(0,0,0,.5)",
              color: "white"
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-6"></div>
                <div className="col-md-2">
                  <button type="button" className="btn btn-secondary btn-block">
                    {"< Go Back"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="jumbotron jumbotron-fluid mt-5"
            style={{
              backgroundColor: "#3b3a30",
              textShadow: "0 1px 3px rgba(0,0,0,.5)",
              color: "white"
            }}
          >
            <div className="container">
              <p className="h5 mb-4">Search movie or TV series</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-row">
                  <div className="col-lg-3 col-md-3 col-sm-1 col-0" />
                  <div className="col-lg-3 col-md-3 col-sm-5 col-12">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter name"
                      name="title"
                      value={title}
                      onChange={this.onChange}
                      autoFocus
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-5 mb-2 col-12">
                    <button
                      type="submit"
                      id="specialButton"
                      className="btn btn-secondary mb-2 btn-block"
                    >
                      Search
                    </button>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-1 col-0" />
                </div>
              </form>
            </div>
          </div>

          <div
            className="jumbotron mt-5 mb-5"
            style={{
              backgroundColor: "#3b3a30",
              textShadow: "0 1px 3px rgba(0,0,0,.5)",
              color: "white"
            }}
          >
            <div id="linkSection" className="container">
              <div className={"ml-3 mr-3"} style={{ textAlign: "left" }}>
                {linkComponent}
                <div className="row">
                  <div className="col-md-12 text-center">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination text-center flex-wrap">
                        <li className="page-item">
                          <span
                            className="page-link"
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              this.props.getData(1);
                            }}
                          >
                            &laquo;
                          </span>
                        </li>
                        {renderPageNumbers}
                        <li className="page-item">
                          <span
                            className="page-link"
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              this.props.getData(total_pages);
                            }}
                          >
                            &raquo;
                          </span>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

SearchResults.propTypes = {
  getStatus: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  item: PropTypes.object,
  errors: PropTypes.object
};

const mapDispatchToProps = {
  getStatus: getStatus,
  getData: getData
};

const mapStateToProps = state => ({
  errors: state.errors,
  item: state.item
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
