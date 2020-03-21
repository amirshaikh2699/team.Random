import React, { Component } from "react";
import { Button, Toast, ToastHeader, ToastBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Toaster extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let tstClass = {
      border: "1px solid rgba(13, 89, 128, 0.52)",
      boxShadow: "0 0px 2px 1px #0d598052",
      position: "absolute",
      right: "20px",
      marginTop: "15px",
      zIndex: "1000"
    };
    let cls = {
      position: "absolute",
      right: "5px",
      top: "1px"
    };
    let buttongrp = {
      display: "inline-block",
      float: "right",
      padding: "5px"
    };
    return (
      <Toast style={tstClass}>
        <ToastHeader className='position-relative'>
          Team.random( )
          <button
            onClick={this.props.close}
            type='button'
            className='close'
            style={cls}
            aria-label='Close'
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </ToastHeader>
        <ToastBody>
          {this.props.msg}
          <div style={buttongrp}>
            <Button
              className='m-1'
              outline
              color='success'
              size='sm'
              onClick={this.props.update}
            >
              Save
            </Button>
            <Button outline color='danger' size='sm' onClick={this.props.fetch}>
              Revert
            </Button>
          </div>
        </ToastBody>
      </Toast>
    );
  }
}
export default Toaster;
