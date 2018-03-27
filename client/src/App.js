import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import $ from "jquery";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./components/pages/Welcome";
import About from "./components/pages/About";
import Region from "./components/pages/Region";
import Bills from "./components/pages/Bills";
import "./App.css";

  // ajax() {
  //   let url = "https://api.propublica.org/congress/v1/115/senate/bills/active.json";

  //   $.ajax({
  //     url: url,
  //     type: "GET",
  //     dataType: "json",
  //     headers: {"X-API-Key": "7BoKxES5grHLDPrdYNsMrvhgNQuN5aZL0Jdr0ZDU"}
  //   }).then(function(bills) {
  //     console.log(bills);
  //   });
  // }


class App extends Component {




  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.initLogin = this.initLogin.bind(this);
    this.initLogout = this.initLogout.bind(this);
    // this.ajax = this.ajax.bind(this);
    this.state = { isLoggedIn: false, userId: "" };
  }

  // componentDidMount() {
  //   console.log(window.sessionStorage.getItem("loggedIn"));
  //   this.changeLoginState()
  // }

  componentDidMount() {
    let bool = (window.sessionStorage.getItem("loggedIn"));
    console.log(bool.valueOf());
   if (JSON.parse(bool) === true) {
      this.setState({ isLoggedIn: true });
      this.handleLoginClick();
      console.log("logging in!!!!!!!!!!!!!!!!!!!!!!");
    }else {
      this.setState({ isLoggedIn: false });
      this.handleLogoutClick();
      console.log(window.sessionStorage.getItem("loggedIn"));
    }
  }
// <<<<<handle change in state, state controls which button is displayed>>>>>
  handleLoginClick(response) {
    this.setState({ isLoggedIn: true });
    window.sessionStorage.setItem("loggedIn", true);
    if(response) {
      // console.log(response);
      console.log("Logged in? " + this.state.isLoggedIn);
      this.initLogin(response);
    }
    // this.ajax();
  }
  
  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
    window.sessionStorage.setItem("loggedIn", false);
    console.log("Logged in? " + this.state.isLoggedIn);

    this.initLogout();
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  initLogin(response) {
    console.log("finding user, ID: " + response.getId());
    const userId = response.getId();
    this.setState({ userId });
    // <<<<<<Search for user in DB...>>>>>>
  }

  initLogout() {
    console.log("logging user out, ID: " +  this.state.userId);
    // <<<<Should chain to any logout functions...>>>>
  }

  render() {

    return (
      <Router>
        <div>
          <Header 
            handleLoginClick={this.handleLoginClick}
            handleLogoutClick={this.handleLogoutClick}
            isLoggedIn={this.state.isLoggedIn}
          />
          <Route exact path="/" component={this.state.isLoggedIn ? Region : Welcome} />
          <Route exact path="/about" component={About } />
          <Route exact path="/region" component={Region} />
          <Route exact path="/bills" component={Bills} />
          <Route exact path="/region/bills" component={Bills} />
          <Footer />
        </div>
      </Router>
    )
  }
}



export default App;
