import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { Container, Row, Col, Button, Form } from 'reactstrap'
import Navbar from 'Navbar'
import style from 'themes/global.scss'
import ScrollToTop from 'components/ScrollToTop'
import ProgressBarPatient from 'components/ProgressBarPatient'

// User
import WelcomeNew from 'routes/User/WelcomeNew'
import NewRegistration from 'routes/User/NewRegistration'
import HelpMeFindHPID from 'routes/User/HelpMeFindHPID'
import NewRegistrationHPIDLinkConfirm from 'routes/User/NewRegistrationHPIDLinkConfirm'
import UpdatePolicies from 'routes/User/UpdatePolicies'
import Setup from 'routes/User/Setup'
import Login from 'routes/User/Login'
import UpdatePassword from 'routes/User/UpdatePassword'
import ConfirmInfo from 'routes/User/ConfirmInfo'

// User - Caregiver
import CaregiverRegister from 'routes/User/Caregiver/Register'
import CaregiverPatientLookup from 'routes/User/Caregiver/PatientLookup'
import CaregiverPatientLookupConfirm from 'routes/User/Caregiver/PatientLookupConfirm'
import CaregiverConsent from 'routes/User/Caregiver/Consent'

//Chapter pages
import PrepareChapter2 from 'routes/Meds/PrepareChapter2'
import PrepareChapter3 from 'routes/Meds/PrepareChapter3'
import PrepareChapter4 from 'routes/Meds/PrepareChapter4'
import PrepareChapter5 from 'routes/Meds/PrepareChapter5'

// Meds

import MedsIdentified from 'routes/Meds/MedsIdentified'
import MedsIdentifiedLanding from 'routes/Meds/MedsIdentifiedLanding'
import MedsVerifyDrug from 'routes/Meds/MedsVerifyDrug'
import MedsDosingRegimen from 'routes/Meds/MedsDosingRegimen'
import MedsDosingFrequency from 'routes/Meds/MedsDosingFrequency'
import MedsDosingOther from 'routes/Meds/MedsDosingOther'
import MedsWhatFor from 'routes/Meds/MedsWhatFor'
import MedsWhyStopped from 'routes/Meds/MedsWhyStopped'
import MedsAnyOtherQuestions from 'routes/Meds/MedsAnyOtherQuestions'
import MedsOtherMeds from 'routes/Meds/MedsOtherMeds'
// import AskedSoFarComplete from 'routes/Meds/AskedSoFarComplete'
import MedsNewMedication from 'routes/Meds/MedsNewMedication'
import MedsOtherMedWhatFor from 'routes/Meds/MedsOtherMedWhatFor'

// HEDIS
import HEDISCheckIn from './routes/HEDIS/HEDISCheckIn'
import SmartQuestions from './routes/HEDIS/SmartQuestions'

//PCP
import PCPQuery from './routes/PCP/PCPQuery'
import MethodDelivery from './routes/PCP/MethodDelivery'
import FinalScreen from './routes/PCP/FinalScreen'

// Landing Page
import LandingPage from 'routes/LandingPage/LandingPage'
import CMRComplete from './routes/LandingPage/CMRComplete'
import AppointmentScheduled from './routes/LandingPage/AppointmentScheduled'


// Reset Page [Temporary]
import { connect } from 'react-redux'
import { callAPIGateway } from 'redux/apiGateway/action'

import apiGatewayClient from 'libs/aws-api-gateway'

import ErrorBoundary from 'components/ErrorBoundary';
import FullLayout from 'components/FullLayout';

class MyReset extends Component {
    componentWillMount() {
        this.props.callAPIGateway('usersResetUserPost', null ,  {
            "id": this.props.auth.patientId,
            "accessToken": this.props.auth.accessToken
        })
    }
    render() {
        return (<div>Reset</div>)
    }
}
const Reset = connect(
    ({ auth }) => ({ auth }),
    { callAPIGateway }
)(MyReset)


const getUrlParameter = (query, name) => {
    // eslint-disable-next-line
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    let results = regex.exec(query)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

class RobotTestReset extends Component {
    state = {
        status: null,
        message: null
    }
    componentWillMount = async () => {
        const parameters = this.props.location.search
        const email = getUrlParameter(parameters, 'email')
        const password = getUrlParameter(parameters, 'password')
        if (email && password) {
            let apiGateway = apiGatewayClient.newClient({})
            const user  = {
                user_name: email,
                password: password
            }
            try {
                const auth = (await apiGateway.usersLoginPost(null, { cred: user })).data
                apiGateway = apiGatewayClient.newClient ({
                    accessKey: auth.AccessKeyId,
                    secretKey: auth.SecretAccessKey,
                    sessionToken: auth.sessionToken
                })
                await apiGateway.usersResetUserPost(null, {
                    id: auth.patientId,
                    accessToken: auth.accessToken
                })
                this.setState({status: true})
            }
            catch (error) {
                this.setState({status: false, message: error.response.data.message})
            }
        }
        else {
            this.setState({status: false, message: 'Email or Password empty.'})
        }
    }
    render() {
        return (<div><strong>{this.state.status === null ? null : this.state.status ? 'Robot Test Reset Completed.' : 'Robot Test Reset Failed.'}</strong><br />{this.state.message}</div>)
    }
}

class PrivateRouteContainer extends Component {
    render() {
        const {
            component: Component,
            ...props
        } = this.props
      return (
        <Route
          {...this.props}
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


class BorderedLayoutContainer extends React.Component {
      constructor(props) {
          super(props);
        }
      render() {
       return (
         <Container fluid id="router-wrapper" className={[style.content, style.routerWrapper].join(' ')}>
           <Row>

        <Col sm={{ size: 10, order: 2, offset: 1 }}>
        {//this.props.Loading
        }
        <ErrorBoundary>
        <Navbar />
        <ScrollToTop>
        <Switch>
            <Route path="/welcome-new"   render={() => (
                      <WelcomeNew />
            )} />

            <Route path="/new-registration"   render={() => (
                      <NewRegistration />
            )} />

            <Route path="/help-me-find-hpid"    render={() => (
                      <HelpMeFindHPID />
            )} />

            <Route path="/new-registration-hpid-link-confirm"   render={() => (
                      <NewRegistrationHPIDLinkConfirm />
            )} />

            <Route path="/setup"  render={() => (
                      <Setup />
            )} />

            <Route path="/update-password"  render={() => (
                      <UpdatePassword />
            )} />

            <Route path="/caregiver-register" render={() => (
                      <CaregiverRegister />
            )} />

            <Route path="/caregiver-patient-lookup" render={() => (
                      <CaregiverPatientLookup />
            )} />

            <Route path="/caregiver-patient-lookup-confirm" render={() => (
                      <CaregiverPatientLookupConfirm />
            )} />

            <Route path="/caregiver-consent" render={() => (
                      <CaregiverConsent />
            )} />


            <PrivateRoute path="/update-policies" component={UpdatePolicies} />
            <PrivateRoute path="/confirm-info" component={ConfirmInfo} />

            <PrivateRoute path="/landing-page" component={LandingPage} />
            <PrivateRoute path="/cmr-complete" component={CMRComplete} />
            <PrivateRoute path="/appointment-scheduled" component={AppointmentScheduled} />


            <PrivateRoute path="/meds-identified" component={MedsIdentified} />
            <PrivateRoute path="/meds-identified-landing" component={MedsIdentifiedLanding} />
            <PrivateRoute path="/meds-verify-drug/:medId" component={MedsVerifyDrug} />
            <PrivateRoute path="/meds-dosing-regimen/:medId" component={MedsDosingRegimen} />
            <PrivateRoute path="/meds-dosing-frequency/:medId" component={MedsDosingFrequency} />
            <PrivateRoute path="/meds-dosing-other/:medId" component={MedsDosingOther} />

            <PrivateRoute path="/meds-what-for/:medId" component={MedsWhatFor} />
            <PrivateRoute path="/meds-why-stopped/:medId" component={MedsWhyStopped} />
            <PrivateRoute path="/meds-any-other-questions/:medId" component={MedsAnyOtherQuestions} />
            <PrivateRoute path="/meds-other-meds" component={MedsOtherMeds} />

            <PrivateRoute path="/meds-new-medication/:medId" component={MedsNewMedication} />
            <PrivateRoute path="/meds-other-whatfor/:medId" component={MedsOtherMedWhatFor} />

            <PrivateRoute path="/meds-new-medication" component={MedsNewMedication} />
            <PrivateRoute path="/hedis-check-in" component={HEDISCheckIn} />
            <PrivateRoute path="/smart-questions/:type/:page" component={SmartQuestions} />

            <PrivateRoute path="/pcp-query" component={PCPQuery} />
            <PrivateRoute path="/method-delivery" component={MethodDelivery} />
            <PrivateRoute path="/final-screen" component={FinalScreen} />

            <PrivateRoute path="/reset" component={Reset} />

            <Route path="/robot-test-reset" component={RobotTestReset} />
            <Redirect to="/" />
        </Switch>
        </ScrollToTop>
        </ErrorBoundary>
        </Col>
      </Row>
      <Row>
         <span>
            {this.props.page.data && this.props.page.data.ShowProgressStep ? <ProgressBarPatient step={this.props.page.data.ShowProgressStep} />:''}
         </span>
      </Row>
    </Container>
)}}

const BorderedLayout = connect (
    ({ page }) => ({ page })
)(BorderedLayoutContainer)

//const fullPageLayout = (step) => {
class FullPageLayoutContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    // state = {
    //     ShowProgressStep: ''
    // }
    // ProgressBarStep = (cstep) => {
    //     this.setState({ ShowProgressStep: cstep })
    // }

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
                    <PrivateRoute path="/prepare/Chapter2"  component={PrepareChapter2} />
                    <PrivateRoute path="/prepare/Chapter3"  component={PrepareChapter3} />
                    <PrivateRoute path="/prepare/Chapter4"  component={PrepareChapter4} />
                    <PrivateRoute path="/prepare/Chapter5"  component={PrepareChapter5} />
                    <Redirect to="/" />
                </Switch>
                <span >
                    {this.props.page.data && this.props.page.data.ShowProgressStep ? <ProgressBarPatient step={this.props.page.data.ShowProgressStep} />:''}
                </span>
                </ScrollToTop>
              </ErrorBoundary>
            </Row>
          </Container>
        )}}

const FullPageLayout = connect (
    ({ page }) => ({ page })
)(FullPageLayoutContainer)

export default class Router extends Component {
    render() {
        return (
          <Switch>
            <Route path="/login" component={FullPageLayout} />
            <Route path="/prepare" component={FullPageLayout} />
            <Route component={BorderedLayout} />
          </Switch>

        )
    }
}
