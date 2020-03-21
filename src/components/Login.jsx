import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row
} from "reactstrap";
import fire from "../Config/Fire";
import Loader from "./Loader";
import "./css/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      email: "",
      password: "",
      cnfrmPassword: "",
      newUser: false,
      loader: false
    };
  }
  componentDidMount() {
    if (this.props.user) {
      this.setState({
        loader: false,
        loggedIn: true
      });
    } else {
      this.setState({
        loader: false
      });
    }
  }
  //change handler for Input fields
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Register into firebase
  register = e => {
    e.preventDefault();
    this.props.history.push("/");
    if (this.state.password === this.state.cnfrmPassword) {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
    } else {
      alert("Passwords don't match");
    }
  };

  render() {
    return (
      <div className='wrapper'>
        {this.state.loader ? <Loader /> : null}
        <Row className='register no-gutters'>
          <Col xs='9' />
          <Col className='register-div' xs='3'>
            {this.state.newUser ? (
              <div>
                <h3>Do you often regret your actions?</h3>
                <Button
                  color='link'
                  onClick={() => this.setState({ newUser: false })}
                >
                  Click here to go back
                </Button>
              </div>
            ) : (
              <div>
                <h3>Don't have an account?</h3>
                <Button
                  color='link'
                  onClick={() => this.setState({ newUser: true })}
                >
                  Click here to Register!!
                </Button>
              </div>
            )}
          </Col>
          <div>
            {this.state.newUser ? (
              <Form className='loginForm' onSubmit={this.register}>
                <FormGroup>
                  <Label>REGISTER</Label>
                  <FormGroup className='formInputWrapper'>
                    <Input
                      type='email'
                      name='email'
                      id='signInEmail'
                      placeholder='Email'
                      value={this.state.email}
                      onChange={this.changeHandler}
                    />
                    <Input
                      type='password'
                      name='password'
                      id='signInPassword'
                      placeholder='password'
                      value={this.state.password}
                      onChange={this.changeHandler}
                    />
                    <Input
                      type='password'
                      name='cnfrmPassword'
                      id='cnfrmSignInPassword'
                      style={{ transition: "1s" }}
                      placeholder='Re Enter Password'
                      value={this.state.cnfrmPassword}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                  <Button color='secondary'>REGISTER</Button>
                </FormGroup>
              </Form>
            ) : (
              <Form
                className='loginForm'
                onSubmit={e =>
                  this.props.login(e, this.state.email, this.state.password)
                }
              >
                <FormGroup>
                  <Label>LOGIN</Label>
                  <FormGroup className='formInputWrapper'>
                    <Input
                      type='email'
                      name='email'
                      id='signInEmail'
                      placeholder='Email'
                      value={this.state.email}
                      onChange={this.changeHandler}
                    />
                    <Input
                      type='password'
                      name='password'
                      id='signInPassword'
                      placeholder='password'
                      value={this.state.password}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                  <Button color='secondary'>LOGIN</Button>
                </FormGroup>
              </Form>
            )}
          </div>
        </Row>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
