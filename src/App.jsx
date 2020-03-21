import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import User from "./components/User";
import fire from "./Config/Fire";
import "./App.css";
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: "",
      currentPage: "/"
    };
    this.authListener = this.authListener.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }
  signOut = async () => {
    fire.auth().signOut();
    localStorage.setItem("user", null);
    this.setState({
      currentPage: "/login"
    });
  };
  //login into firebase
  login = (e, id, pss) => {
    e.preventDefault();
    this.setState({
      loader: true
    });
    fire
      .auth()
      .signInWithEmailAndPassword(id, pss)
      .then(res => {
        this.setState({
          loader: false,
          currentPage: "/"
        });
      })
      .catch(err => {
        alert("Error In Sign In", err);
        return false;
      });
  };
  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.email.substring(0, user.email.indexOf("@"));
        this.setState({ user: uid });
        localStorage.setItem("user", uid);
      } else {
        this.setState({ user: null });
        localStorage.setItem("user", null);
      }
    });
  }

  render() {
    return (
      <HashRouter>
        <Header signOut={this.signOut} user={this.state.user} />
        <Switch>
          <Route
            exact
            path='/login'
            render={routeProps => (
              <Login
                {...routeProps}
                login={this.login}
                user={this.state.user}
                signOut={this.signOut}
              />
            )}
          />
          <Route
            exact
            path='/'
            render={routeProps => (
              <Home {...routeProps} user={this.state.user} />
            )}
          />
          <Route
            path='/user'
            render={routeProps => (
              <User {...routeProps} user={this.state.user} />
            )}
          />
        </Switch>
        <Redirect to={this.state.currentPage} />
      </HashRouter>
    );
  }
}

export default App;
