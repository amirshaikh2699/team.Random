import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import chunk from "chunk";
import {
  faEdit,
  faTrash,
  faLaptopCode,
  faDatabase,
  faServer,
  faPencilRuler,
  faUserShield,
  faToolbox,
  faUserPlus,
  faCheckDouble
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
import "./css/User.css";
import Toaster from "./Toaster";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empList: [],
      user: localStorage.getItem("user"),
      testState: false,
      modal: false,
      designation: "",
      fName: "",
      lName: "",
      empLength: 0,
      modalTitle: "",
      index: "",
      isOpen: false
    };

    //bindings to prevent errors.
    this.toggle = this.toggle.bind(this);
    this.delete = this.delete.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    this.splitIntoSubArray = this.splitIntoSubArray.bind(this);

    //const to prevent multiple fetch requests.
    const _isMounted = false;

    //databse ref.
    this.database = firebase
      .database()
      .ref("users")
      .child("" + props.user);
  }

  componentDidMount() {
    this._isMounted = true;

    //removing listener to avoid multiple fetch requests.
    firebase
      .database()
      .ref("users")
      .off();
    firebase
      .database()
      .ref("users")
      .child("" + this.state.user)
      .child("empList")
      .on("value", snap => {
        if (snap.val() != null) {
          if (this._isMounted) {
            //split array into 4 sub arrays and store into state.
            let tempArray = snap.val();
            let len = tempArray.length;
            let arr = Object.keys(tempArray).map(k => tempArray[k]);
            tempArray = arr;
            for (let i = 0; i < len; i++) {
              if (tempArray[i] === undefined) {
              } else {
                if (tempArray[i].designation === "Developer") {
                  tempArray[i] = { ...tempArray[i], icon: faLaptopCode };
                } else if (tempArray[i].designation === "Backend Dev") {
                  tempArray[i] = { ...tempArray[i], icon: faDatabase };
                } else if (tempArray[i].designation === "Dev OPS") {
                  tempArray[i] = { ...tempArray[i], icon: faServer };
                } else if (tempArray[i].designation === "Designer") {
                  tempArray[i] = { ...tempArray[i], icon: faPencilRuler };
                } else if (tempArray[i].designation === "IT") {
                  tempArray[i] = { ...tempArray[i], icon: faToolbox };
                } else if (tempArray[i].designation === "Admin") {
                  tempArray[i] = { ...tempArray[i], icon: faUserShield };
                } else if (tempArray[i].designation === "QA") {
                  tempArray[i] = { ...tempArray[i], icon: faCheckDouble };
                }
              }
            }
            tempArray = this.splitIntoSubArray(tempArray, 4);
            this.setState({
              empList: tempArray,
              testState: true,
              empLength: len
            });
          } else {
          }
        }
      });
  }

  //split array function.
  splitIntoSubArray(arr, count) {
    var newArray = [];
    let i = 0;
    while (arr.length > 0) {
      newArray.push(arr.splice(0, count));
      i++;
    }
    return newArray;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //toggle modal.
  toggle(args, obj) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      fName: "",
      lName: "",
      designation: ""
    }));
    if (args == "Add") {
      this.setState({ modalTitle: "Add" });
    } else if (args == "Edit") {
      let name = obj.name.split(" ");
      this.setState({
        modalTitle: "Edit",
        fName: name[0],
        lName: name[1],
        designation: obj.designation,
        index: obj.id
      });
    } else {
      this.setState({ modalTitle: " " });
    }
  }

  //delete entry from firebase DB.
  delete = obj => {
    this.setState({
      isOpen: true
    });
    this.database = firebase
      .database()
      .ref("users")
      .child("" + this.state.user)
      .child("empList")
      .child("" + obj.id)
      .remove();
    setTimeout(() => {
      this.setState({
        isOpen: false
      });
    }, 3000);
  };

  //change handler for input fields
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Push to firebase DB on Modal Submit.
  onModalSubmit = () => {
    let obj = {
      name: this.state.fName.trim() + " " + this.state.lName.trim(),
      designation: this.state.designation
    };
    if (this.state.modalTitle === "Add") {
      obj = { ...obj, id: this.state.empLength };
      this.database = firebase
        .database()
        .ref("users")
        .child("" + this.state.user)
        .child("empList")
        .child("" + this.state.empLength)
        .set(obj);
    } else {
      obj = { ...obj, id: this.state.index };
      this.database = firebase
        .database()
        .ref("users")
        .child("" + this.state.user)
        .child("empList")
        .child("" + obj.id)
        .update(obj);
    }
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.state.isOpen ? <Toaster msg={"Deleted last Selection"} /> : null}
        <div className='add-class'>
          <Button
            outline
            color='secondary'
            onClick={() => this.toggle("Add")}
            size='md'
          >
            <FontAwesomeIcon icon={faUserPlus} /> Add
          </Button>
        </div>
        {this.state.testState ? (
          <div style={{ width: "90%", margin: "0 auto" }}>
            {this.state.empList.map((array, index) => {
              return (
                <Row
                  className='mx-auto my-3 justify-content-center'
                  key={index}
                >
                  {array.map((child, index) => {
                    return (
                      <Col className='w-25' xs='auto' key={index}>
                        <Card>
                          <CardBody>
                            <CardTitle>{child.name}</CardTitle>
                            <div className='designation-icon'>
                              <FontAwesomeIcon icon={child.icon} />
                            </div>
                            <Row className='justify-content-end'>
                              <Col xs='auto'>
                                <Button
                                  onClick={() => this.toggle("Edit", child)}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                              </Col>
                              <Col xs='auto'>
                                <Button onClick={() => this.delete(child)}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </Col>
                            </Row>
                          </CardBody>
                          <CardImg top width='100%' />
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </div>
        ) : (
          <div />
        )}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.state.modalTitle}
          </ModalHeader>
          <ModalBody>
            <Input
              placeholder='First Name'
              value={this.state.fName}
              onChange={this.changeHandler}
              name='fName'
              type='text'
            />
            <Input
              placeholder='Second Name'
              value={this.state.lName}
              onChange={this.changeHandler}
              name='lName'
              type='text'
            />
            <ButtonGroup className='designation-group'>
              <Button
                data-toggle='tooltip'
                onClick={() => this.setState({ designation: "Developer" })}
                data-placement='bottom'
                title='Developer'
              >
                <FontAwesomeIcon icon={faLaptopCode} />
              </Button>
              <Button
                data-toggle='tooltip'
                onClick={() => this.setState({ designation: "Backend Dev" })}
                data-placement='bottom'
                title='Backend'
              >
                <FontAwesomeIcon icon={faDatabase} />
              </Button>
              <Button
                data-toggle='tooltip'
                onClick={() => this.setState({ designation: "Dev OPS" })}
                data-placement='bottom'
                title='Dev OPS'
              >
                <FontAwesomeIcon icon={faServer} />
              </Button>
              <Button
                data-toggle='tooltip'
                onClick={() => this.setState({ designation: "Designer" })}
                data-placement='bottom'
                title='Designer'
              >
                <FontAwesomeIcon icon={faPencilRuler} />
              </Button>
              <Button
                data-toggle='tooltip'
                onClick={() => this.setState({ designation: "Admin" })}
                data-placement='bottom'
                title='Admin'
              >
                <FontAwesomeIcon icon={faUserShield} />
              </Button>
              <Button
                data-toggle='tooltip'
                onClick={() => this.setState({ designation: "IT" })}
                data-placement='bottom'
                title='IT'
              >
                <FontAwesomeIcon icon={faToolbox} />
              </Button>
              <Button
                data-toggle='tooltip'
                onClick={() => this.setState({ designation: "QA" })}
                data-placement='bottom'
                title='Quality Assurance'
              >
                <FontAwesomeIcon icon={faCheckDouble} />
              </Button>
            </ButtonGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.onModalSubmit}>
              {this.state.modalTitle}
            </Button>{" "}
            <Button color='secondary' onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

User.propTypes = {};

export default User;
