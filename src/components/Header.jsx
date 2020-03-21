import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import fire from "../Config/Fire";
import { Button, Col, Row } from "reactstrap";
import "./css/Header.css";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUsersCog, faUser } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "home-span",
      toggleDrop: false
    };
  }
  render() {
    return (
      <Row className='header no-gutters'>
        <Col xs='8' className='d-flex align-items-center'>
          <Link
            to='/'
            className='home-button'
            onMouseEnter={() => this.setState({ className: "home-span w-100" })}
            onMouseLeave={() => this.setState({ className: "home-span" })}
          >
            team.Random(<span className={this.state.className}>Home</span>)
          </Link>
        </Col>
        {this.props.user ? (
          <Col xs='4' className='drowDown-main'>
            <Link to='user'><FontAwesomeIcon icon={faUsersCog} /> Users</Link>
            <div className='dropDown-sub'>
              <div
                className='dropDown-Button'
                onMouseEnter={() => {
                  this.setState({
                    toggleDrop: true
                  });
                }}
                onMouseLeave={() => {
                  this.setState({
                    toggleDrop: false
                  });
                }}
              >
                <FontAwesomeIcon icon={faUser} /> {this.props.user} <FontAwesomeIcon icon={faCaretDown} size="xs"/>
                <div className={this.state.toggleDrop ? "drowpDown" : "d-none"}>
                  <ul>
                    <li onClick={this.props.signOut}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        ) : null}
      </Row>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  signOut: PropTypes.func
};

export default Header;
