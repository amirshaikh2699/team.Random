import React, { Component } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Row,
  Input,
  Toast,
  ToastHeader,
  ToastBody,
  Jumbotron
} from "reactstrap";
import firebase from "firebase";
import "./css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Draggable, Droppable } from "react-drag-and-drop";
import Loader from "./Loader";
import Footer from "./Footer";
import Toaster from "./Toaster";

class Home extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: {},
      empList: "",
      generatedTeams: null,
      generatedTeam: null,
      noFGeneratedTeams: null,
      teamNames: "",
      testState: "",
      range: 50,
      user: localStorage.getItem("user"),
      divideCount: 4,
      showToast: false,
      loader: true,
      dragging: false,
      hovering: "",
      completedDrop: false,
      backUpState: null,
      lastKnowPos: null,
      inRange: false,
      isVisible: false,
      draggingData: null,
      toasterIsOpen: false
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
    let user = localStorage.getItem("user");
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchData = () => {
    firebase
      .database()
      .ref("users")
      .off();
    firebase
      .database()
      .ref("users")
      .child("" + this.state.user)
      .on("value", snap => {
        if (this._isMounted) {
          if (snap.val() != null && snap.val() != undefined) {
            let temp = snap.val();
            let newArr = [];
            temp.empList.forEach(function(ele) {
              newArr.push(ele);
            });
            this.setState({
              empList: newArr,
              toasterIsOpen: false
            });
            if (temp.generatedTeams != undefined) {
              temp.generatedTeams = Object.keys(temp.generatedTeams).map(
                k => temp.generatedTeams[k]
              );
              let cnt = temp.generatedTeams.length;
              temp.generatedTeams =
                temp.generatedTeams[temp.generatedTeams.length - 1];
              this.setState({
                generatedTeams: temp.generatedTeams,
                noFGeneratedTeams: cnt,
                loader: false
              });
            } else {
              this.setState({ noFGeneratedTeams: 0, loader: false });
            }
          }
        }
      });
    firebase
      .database()
      .ref("team_names")
      .off();
    firebase
      .database()
      .ref("team_names")
      .on("value", snap => {
        if (this._isMounted) {
          this.setState({
            teamNames: snap.val()
          });
        }
      });
  };
  teamRandom = e => {
    if (this.state.empList != null) {
      let temp = [];
      this.state.empList.forEach(element => {
        temp.push(element.name);
      });
      let shuffle = require("shuffle-array"),
        collection = temp;
      shuffle(collection);
      this.splitIntoSubArray(collection);
    } else {
    }
  };
  splitIntoSubArray(arr) {
    let count = Math.ceil(arr.length / this.state.divideCount);
    let newArray = [];
    var counter = 0;
    for (let i = 0; i < this.state.divideCount; i++) {
      let newTemp = [];
      for (let j = 0; j < count; j++) {
        if (arr[counter] != null) {
          newTemp.push(arr[counter]);
          ++counter;
        }
      }
      newArray.push(newTemp);
    }
    let randomTeamName = this.state.teamNames[
      Math.floor(Math.random() * this.state.teamNames.length) + 0
    ];
    for (let j = 0; j < newArray.length; j++) {
      newArray[j].unshift(randomTeamName[j]);
    }
    this.setState({ generatedTeam: newArray }, () => this.pushToDb());
  }
  pushToDb = e => {
    this.database = firebase
      .database()
      .ref("users")
      .child("" + this.state.user)
      .child("generatedTeams")
      .child("" + this.state.noFGeneratedTeams)
      .set(this.state.generatedTeam);
    this.setState({
      toasterIsOpen: false
    });
  };
  pushNewToDb = e => {
    this.database = firebase
      .database()
      .ref("users")
      .child("" + this.state.user)
      .child("generatedTeams")
      .child("" + this.state.noFGeneratedTeams)
      .set(this.state.generatedTeams);
    this.setState({
      toasterIsOpen: false
    });
  };
  //change handler for Input fields
  changeHandler = e => {
    if (e.target.value > 0) {
      this.setState({
        [e.target.name]: e.target.value,
        divideCount: 3
      });
    }
    if (e.target.value > 35) {
      this.setState({
        [e.target.name]: e.target.value,
        divideCount: 4
      });
    }
    if (e.target.value > 70) {
      this.setState({
        [e.target.name]: e.target.value,
        divideCount: 5
      });
    }
  };
  messagecopy = msg => {
    let temp = [];
    for (let i = 0; i < msg.length; i++) {
      if (i === 0) {
        temp.push(msg[i] + "\n" + "\n");
      } else {
        {
          i === msg.length - 1
            ? temp.push(msg[i])
            : temp.push(msg[i] + "\n");
        }
      }
    }
    let joined = "";
    temp.forEach(function(ele) {
      joined = joined + ele.substring(0);
    });
    const copyClip = joined;
    var textArea = document.createElement("textarea");
    textArea.value = copyClip;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    this.setState({
      showToast: true
    });
    setTimeout(() => {
      this.setState({
        showToast: false
      });
    }, 2500);
    document.body.removeChild(textArea);
  };
  onDrag = (data, index) => {
    if (index != 0) {
      let temp = this.state.generatedTeams;
      let count = -1;
      temp.forEach((element, indexMain) => {
        count++;
        element.forEach((nextEle, indexSub) => {
          if (nextEle === data) {
            temp[indexMain].splice(indexSub, 1);
            this.setState({
              inProg: true,
              dragging: true,
              generatedTeams: temp,
              completedDrop: false,
              lastKnowPos: count,
              draggingData: data.draggable,
              toasterIsOpen: true
            });
          }
        });
      });
    }
  };
  onDrop = data => {
    let temp = this.state.generatedTeams;
    temp[this.state.hovering].push(data.draggable);
    this.setState({
      completedDrop: true,
      generatedTeams: temp,
      dragging: false
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.toasterIsOpen ? (
          <Toaster
            msg={
              "Your changes are temporary, " +
              "you can revert them or Save them."
            }
            fetch={this.fetchData}
            update={this.pushNewToDb}
            close={() => this.setState({ toasterIsOpen: false })}
          />
        ) : null}
        {this.state.loader && !this.props.user === null ? <Loader /> : null}
        {this.props.user === null ? (
          <div className='error-div center-custom'>
            <Jumbotron className='mb-0'>
              <h2 className='display-3'>Error 1738!</h2>
              <p className='lead'>
                You definitely don't know what this error means.
              </p>
              <hr className='my-2' />
              <p>Loggin into an existing account might help.</p>
              <p className='lead'>
                <Button
                  color='primary'
                  onClick={() => this.props.history.push("/login")}
                >
                  Login
                </Button>
              </p>
            </Jumbotron>
          </div>
        ) : (
          <div className='pt-4' style={{ height: "91%" }}>
            {this.state.generatedTeams != null ? (
              <React.Fragment>
                <Row className='team-name'>
                  {this.state.generatedTeams.map((child, index) => {
                    return (
                      <Col
                        className='user-list'
                        key={index}
                        onDragEnter={() =>
                          this.setState({ hovering: index, inRange: false })
                        }
                        onDragLeave={() => this.setState({ inRange: true })}
                      >
                        <button
                          className='copy-button'
                          id='copyBtn'
                          onClick={() => this.messagecopy(child)}
                        >
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                        <ul>
                          <Droppable
                            types={["draggable"]} // <= allowed drop types
                            onDrop={this.onDrop.bind(this)}
                          >
                            {child.map((nextChild, index) => {
                              return (
                                <Draggable
                                  onDrag={
                                    this.state.dragging
                                      ? null
                                      : () => this.onDrag(nextChild, index)
                                  }
                                  className={
                                    index === 0 ? "teamName" : "draggable"
                                  }
                                  type={index === 0 ? "" : "draggable"}
                                  data={nextChild}
                                  key={index}
                                >
                                  <li>{nextChild}</li>
                                </Draggable>
                              );
                            })}
                          </Droppable>
                        </ul>
                      </Col>
                    );
                  })}
                </Row>
                {this.state.isVisible ? (
                  <Toaster
                    msg={
                      "Dropping this Member outside of Teams will delete it."
                    }
                  />
                ) : null}
              </React.Fragment>
            ) : (
              <h3 className='text-center'>Any Time Now</h3>
            )}
            <Form className='slider-parent'>
              <Input
                type='range'
                className='custom-range'
                name='range'
                value={this.state.range}
                onChange={this.changeHandler}
              />
              <Button
                className='team-randomBtn'
                onClick={this.teamRandom}
                outline
                color='secondary'
                size='lg'
              >
                <span>t</span>
                <span>e</span>
                <span>a</span>
                <span>m</span>
                <span>.</span>
                <span>R</span>
                <span>a</span>
                <span>n</span>
                <span>d</span>
                <span>o</span>
                <span>m</span>
                <span>( </span>
                <span> )</span>
              </Button>
              <span
                className='slider-main'
                style={{ left: this.state.range + "%" }}
              >
                {this.state.divideCount}
              </span>
            </Form>
            <Toast className='copied-toast' isOpen={this.state.showToast}>
              <ToastHeader>team.Random()</ToastHeader>
              <ToastBody>Team Copied to ClipBoard</ToastBody>
            </Toast>
          </div>
        )}
      </React.Fragment>
    );
  }
}

Home.propTypes = {};

export default Home;
