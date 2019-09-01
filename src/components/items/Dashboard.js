import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getStatus, getData } from "../../actions/itemActions";
import ScrollUp from "../layout/ScrollUp";

class Dashboard extends Component {
  state = {
    data: null,
    total: null,
    total_pages: null,
    per_page: null,
    current_page: 1,
    errors: null
  };

  componentDidMount() {
    this.props.getStatus();
    this.makeHttpRequestWithPage(1);
  }

  makeHttpRequestWithPage = async pageno => {
    const response = await fetch(
      `https://cb.niweera.gq/links?pageno=${pageno}&size=20`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    this.setState({
      data: data.data,
      total: data.total,
      total_pages: data.total_pages,
      per_page: data.per_page,
      current_page: data.page
    });
  };

  render() {
    const { cinebotStatus } = this.props.item;
    const { data, total, total_pages, current_page } = this.state;
    let linkComponent, renderPageNumbers;

    if (data !== null) {
      linkComponent = data.map((link, index) => (
        <div key={index}>
          <a href={link.link} style={{ color: "white" }}>
            <h5>
              {index + 1}. {link.name}
            </h5>
          </a>
          <a href={link.link} style={{ color: "white" }}>
            {link.link}
          </a>
          <br />
          <br></br>
          <br></br>
        </div>
      ));
    }

    const pageNumbers = [];
    if (total !== null) {
      for (let i = 1; i <= total_pages; i++) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map(number => {
        let classes = current_page === number ? "active" : "";

        if (
          number === 1 ||
          number === this.state.total ||
          (number >= current_page - 2 && number <= current_page + 2)
        ) {
          return (
            <li className="page-item" key={number}>
              <span
                className={classes}
                onClick={() => this.makeHttpRequestWithPage(number)}
              >
                {number}
              </span>
            </li>
          );
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
              <h1 className="h3">
                Welcome to CineBot!
                <br />{" "}
                <span className="h4">All the links from one place...</span>
              </h1>
              <hr />
              {cinebotStatus ? (
                <div>
                  <h1 className="h4">
                    CineBot last ran @: {cinebotStatus.lastRan}
                  </h1>
                  <h1 className="h4">
                    CineBot will run again @: {cinebotStatus.nextRun}
                  </h1>
                </div>
              ) : (
                <Spinner />
              )}
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
                  <div className="col-md-1"></div>
                  <div className="col-md-10 text-center">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <span onClick={() => this.makeHttpRequestWithPage(1)}>
                            &laquo;
                          </span>
                        </li>
                        {renderPageNumbers}
                        <li className="page-item">
                          <span onClick={() => this.makeHttpRequestWithPage(1)}>
                            &raquo;
                          </span>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="col-md-1"></div>
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

Dashboard.propTypes = {
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
)(Dashboard);
