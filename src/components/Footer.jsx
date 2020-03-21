import React from "react";
import { Col, Row } from "reactstrap";
import { a } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faFacebook,
  faGitlab
} from "@fortawesome/free-brands-svg-icons";
import me from "../images/Img2.jpg";
import ilmux from "../images/Ilmux.png";
import "./css/Footer.css";

const Footer = () => {
  return (
    <div className='footer-main'>
      <Row className='footer'>
        <Col >
          <ul>
            <li>
              <h5>Team.Random( )</h5>
            </li>
            <li>
              Made With{" "}
              <FontAwesomeIcon color='skyblue' size='lg' icon={faReact} spin />{" "}
              <a
                href='https://reactjs.org//'
                color='lightskyblue'
                target='_blank'
              >
                Reactjs.
              </a>
            </li>
            <li>
              Designed With
              <a href='https://reactstrap.github.io/' target='_blank'>
                {" "}
                Reactstrap.
              </a>
            </li>
            <li>
              Data Storage at
              <a href='https://firebase.google.com/' target='_blank'>
                {" "}
                Firebase.
              </a>
            </li>
          </ul>
        </Col>

        <Col className='about-me text-center'>
          <img className='dp' src={me} />
          <div className='d-inline-block pl-1 text-left'>
          <h5 style={{transform: "translateX(-50px)"}}>About Me</h5>
            <span className='name'>Amir Shaikh</span>
            <ul className='detail-list'>
              <li>
                <ul className="p-0">
                  <li className="pl-0">
                    <a target='_blank' href='https://gitlab.com/troublezdtv'>
                      <FontAwesomeIcon
                        color='white'
                        size='lg'
                        icon={faGitlab}
                      />
                    </a>
                  </li>
                  <li>
                    <a target='_blank' href='https://fb.com/amirdcruz'>
                      <FontAwesomeIcon
                        color='white'
                        size='lg'
                        icon={faFacebook}
                      />
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span className='work'>
                  UI Developer at
                  <a
                    className='ilmux-logo'
                    href='http://www.ilmux.com/'
                    target='_blank'
                  >
                    <img src={ilmux} />
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </Col>

        {/* <Col className='about-me'>
          <h3>About Me</h3>
          <img className='dp' src={me} />
          <span className='name'>Amir Shaikh</span>
          <ul className='social'>
            <li>
              <a target='_blank' href='https://gitlab.com/troublezdtv'>
                <FontAwesomeIcon color='skyblue' size='lg' icon={faGitlab} />
              </a>
            </li>
            <li>
              <a target='_blank' href='https://fb.com/amirdcruz'>
                <FontAwesomeIcon color='skyblue' size='lg' icon={faFacebook} />
              </a>
            </li>
          </ul>
          <span className='work'>
            UI Developer at
            <a
              className='ilmux-logo'
              href='http://www.ilmux.com/'
              target='_blank'
            >
              <img src={ilmux} />
            </a>
          </span>
        </Col> */}
      </Row>
    </div>
  );
};

export default Footer;
