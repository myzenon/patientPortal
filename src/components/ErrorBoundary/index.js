import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import ReactDOM from 'react-dom'
import { Container, Button, Form } from 'reactstrap'
import { push } from 'react-router-redux'

import { connect } from 'react-redux'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

class ErrorBoundary extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        error: null,
        errorInfo: null
      };
  }

  componentDidCatch(error, errorInfo) {
    const page = window.location.pathname + window.location.search;
    ReactGA.pageview(page);

      this.setState({
        hasError: true,
        error: error,
        errorInfo: errorInfo
      });
    }

    render() {
      if (this.state.hasError) {
        return (
          <body className={style.backgroundImage}>
          <div className={style.contentContainer}>
            <div className={style.headLine} >
              Oops
            </div>
            <div className={style.subheader} >
              Something went wrong
            </div>
            <div className={style.hr}></div>
            <div className={style.context} >
              <p>
                Click on 'Go To Dashboard' to go back to dahboard and try again.
                If you think something is broken, you can call at <span className={style.phoneNumber}>{process.env.ARINE_PHONE}</span> or email us by clicking the 'Report a Problem' button below.
              </p>
            </div>
            <div className={style.buttonsContainer}>

              <Button  id="gotodashboard" className={style.button} type="button" onClick={() => {this.props.push('/landing-page')}} >Go To Dashboard</Button>
                         &nbsp;&nbsp;&nbsp;
              <a  href={"mailto:" + process.env.ARINE_EMAIL + '"'} target="_blank">Report A Problem</a>
            </div>
          </div>
          </body>

      );
    }
      return this.props.children;
    }
  }


export default connect (
  ({
      user
  }) => ({
      user
  }),
  {
      push
  }
)(ErrorBoundary)
