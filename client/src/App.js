import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./components/pages/Welcome";
import About from "./components/pages/About";
import Region from "./components/pages/Region";
import Bills from "./components/pages/Bills";
import BillDetail from "./components/pages/BillDetail";
import API from "./utils/API.js"

import DemoForm from "./components/pages/DemoForm";

import Chart from "./components/pages/Stats";

import "./App.css";


class App extends Component {

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false, userId: "", userName: "", userExist: false };
  }

  componentDidMount() {
    window.sessionStorage.setItem("votedBills", "");
    let loginBool = (window.sessionStorage.getItem("loggedIn"));
    let userBool = (window.sessionStorage.getItem("userExist"));

   if (JSON.parse(loginBool) === true) {
      this.setState({ isLoggedIn: true });
      this.handleLoginClick();
      console.log("logging in!");
    }else {
      this.setState({ isLoggedIn: false });
      this.handleLogoutClick();
      console.log(window.sessionStorage.getItem("loggedIn"));
    };
    if (JSON.parse(userBool) === true) {
      this.setState({ userExist: true });
    }else {
      this.setState({ userExist: false });
    };
  }
// <<<<<handle change in state, state controls which button is displayed>>>>>
  handleLoginClick(response) {
    if(response) {
      console.log("finding user, ID: " + response.getId());
      window.sessionStorage.setItem("loggedIn", true);
      window.sessionStorage.setItem("user", response.getId());
      this.setState({ isLoggedIn: true, userId: response.getId(), userName: response.w3.ig });
      this.getUser();

    }
  }
  
  handleLogoutClick() {
    this.setState({ isLoggedIn: false, userExist: false, userId: "", userName: "" });
    window.sessionStorage.setItem("loggedIn", false);
    window.sessionStorage.setItem("userExist", false);
    console.log("logging user out");
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  getUser(id) {
    console.log("in here");
    console.log(id);
    let userId;
    if (this.state) {
      userId = this.state.userId; 
    }else {
      userId = id;
    };

    API.getUser(userId)
      .then(res => {
        console.log(res.data);
        if (res.data[0]) {
          console.log("Helllooooo")
          window.sessionStorage.setItem("userExist", true);
          if (this.state){
            this.setState({ userExist: true });            
          }
        };
      })
      .catch(err => console.log(err));
  }


  render() {

    return (
      <Router>
        <div>
          <Header 
            handleLoginClick={this.handleLoginClick}
            handleLogoutClick={this.handleLogoutClick}
            isLoggedIn={this.state.isLoggedIn}
            button={this.state.button}
            userId={this.state.userId}
          />
          <Route exact path="/" 
            render={() => this.state.isLoggedIn ? 
              [ 
                (this.state.userExist) 
                ? <Redirect to="/region" /> 
                : <DemoForm 
                  userId={this.state.userId} 
                  userName={this.state.userName}
                  exists={this.state.userExist}
                  getUser={this.getUser} /> 
              ] : <Welcome />
            }
          />
          <Route exact path="/demoform" component={DemoForm} />
          <Route exact path="/about" component={About} />
          <Route exact path="/region" component={Region} />
          <Route exact path="/bills" component={Bills} />
          <Route path="/billdetail/:bill_id" 
          render={(props) => (<BillDetail userId={this.state.userId} {...props} />)} 
          />
          <Route path="/stats" component={Chart} />

          <Footer/>

        </div>
      </Router>
    )
  }
}


export default App;
