import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Container,
  Row,
} from "reactstrap";
// import { div } from 'react-router-dom';
import React, { Component } from "react";
import "./HeaderComponent.css";
// import { baseUrl } from '../../../../shared/baseURL';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import $ from "jquery";
class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      nav_class_name: "",
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  componentDidMount() {
    let closure_closeNav = this.closeNav; // since this is't defined inside jqury i will pass it as closure
    $("body").click(function (event) {
      // check if the clicked element is a descendent of navigation
      if ($(event.target).closest(".navbar").length) {
        return; //do nothing if event target is within the navigation
      } else {
        // do something if the event target is outside the navigation
        // code for collapsing menu here...
        closure_closeNav();
      }
    });
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
    if (!this.state.isNavOpen) {
      this.setState({
        nav_class_name: "navbar-collapsed",
      });
    } else if (this.state.isNavOpen) {
      this.setState({
        nav_class_name: "",
      });
    }
  }

  closeNav() {
    this.setState({
      isNavOpen: false,
    });
    if (!this.state.isNavOpen) {
      this.setState({
        nav_class_name: "navbar-collapsed",
      });
    }
  }

  render() {
    return (
      <div className={this.state.nav_class_name}>
        <Navbar
          light
          className="light py-1  border-bottom fixed-top p-5"
          expand="xl"
        >
          <div
            style={{
              position: "relative",
              top: "",
            }}
          >
            <NavbarBrand className="mr-auto" href="/">
              <span className="brand_title">ADMIN</span>
            </NavbarBrand>
          </div>
          <div style={{ flexGrow: "1" }}> </div>
          <NavbarToggler onClick={this.toggleNav} className="mr-2" />
          <Collapse
            className="justify-content-end"
            isOpen={this.state.isNavOpen}
            navbar
          >
            <Nav style={{}} className="ml-4 ml-xl-auto" navbar>
              <NavItem onClick={this.closeNav} className="">
                <Link to="/HELP">
                  <div className="nav-link" to="/WORKSPACESVIEW">
                    <span className="fa fa-address-card fa-lg"></span> HELP
                  </div>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <div className="nav_icon">
          <img
            src="/logo.png"
            alt="l"
            style={{ width: "80%", height: "80%" }}
          />
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
