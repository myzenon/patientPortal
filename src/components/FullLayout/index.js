import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import ReactDOM from 'react-dom'
import Navbar from 'Navbar'
import { Route, Redirect, Switch } from 'react-router'
import ScrollToTop from 'components/ScrollToTop'
import { Container, Row, Col, Button, Form } from 'reactstrap'
import ErrorBoundary from 'components/ErrorBoundary';
import { connect } from 'react-redux'
//Chapter pages
import PrepareChapter2 from 'routes/Meds/PrepareChapter2'
import PrepareChapter3 from 'routes/Meds/PrepareChapter3'
import PrepareChapter4 from 'routes/Meds/PrepareChapter4'
import PrepareChapter5 from 'routes/Meds/PrepareChapter5'

class PrivateRouteContainer extends Component {
    render() {
        const {
            component: Component,
            ...props
        } = this.props

      return (
        <Route
          {...props}
          render={props =>
            this.props.page.apiInited
              ?
              <ErrorBoundary>
                <Component {...props} />
              </ErrorBoundary>
              : (
              <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
            )
          }
        />
      )
    }
  }

const PrivateRoute = connect (
    ({ page }) => ({ page })
)(PrivateRouteContainer)

export default class FullLayout extends Component {

    static propTypes = {
      prgressStep: PropTypes.number
    }
    static defaultProps = {
        prgressStep: 1
    }


    render() {
      return (
      <Container fluid id="router-wrapper" className={[style.content, style.routerWrapper].join(' ')}>
          <Row>
             {//this.props.Loading
             }
            <ErrorBoundary>
            <Navbar />
            <ScrollToTop>
            <Switch>
            <Route exact path="/"  render={() => (
                          <Login />
                )} />

                <Route   path="/login"  render={() => (
                          <Login />
                )} />
                <PrivateRoute path="/prepare/Chapter2" component={PrepareChapter2} />
                <PrivateRoute path="/prepare/Chapter3" component={PrepareChapter3} />
                <PrivateRoute path="/prepare/Chapter4" component={PrepareChapter4} />
                <PrivateRoute path="/prepare/Chapter5" component={PrepareChapter5} />
                <Redirect to="/" />
            </Switch>
            </ScrollToTop>
            </ErrorBoundary>
          </Row>
        </Container>
    )}
}
