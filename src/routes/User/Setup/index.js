import React, { Component } from 'react'
import { Container, Button, Form, Table, Row, Col } from 'reactstrap'
import InputText from 'components/InputText'
import Switch from 'components/Switch'
import ProgressBarPatient from 'components/ProgressBarPatient'
import Policies from 'components/Policies'
import { Link } from 'react-router-dom'
import style from './style.scss'

import { connect } from 'react-redux'
import { callSyncAPIGateway, apiInited } from 'redux/apiGateway/action'
import { savePageData } from 'redux/page/action'
import { saveAuth } from 'redux/auth/action'
import { push } from 'react-router-redux'

import InputTextWithError from 'components/InputTextWithError'

import PasswordTextWithError from 'components/PasswordTextWithError'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

var isFirstTimeValid;

// load policies from files.
const policies = {
    nopp: require('assets/policy/nopp.html'),
    eula: require('assets/policy/eula.html'),
    terms: require('assets/policy/terms.html'),
    access: require('assets/policy/access.html')
}

// find policy version from html
const findPolicyVersion = (policy) => {
    const htmlElements = policy.replace(/(?:\\[rn]|[\r]+)+/g, '').split('\n')
    const versionElement = htmlElements[htmlElements.indexOf('<meta charset="UTF-8">') + 1]
    return versionElement.split('"')[1]
}

export class Setup extends Component {
    state = {
        email: '',
        password: '',
        rePassword: '',
        isPolicyCheck: false,
        validation: {
            email: null,
            password: null,
            rePassword: null
        },
        isLoading: false,
        isShowPassword: false,
        isShowPolicy: false
    }
    componentDidMount() {
        //by default show the password
        this.setState({ isShowPassword: true })
    }
    componentWillMount() {
        const page = window.location.pathname + window.location.search; 
        if (process.env.NODE_ENV == 'production'){ 
            ReactGA.pageview(page); 
        }      

        isFirstTimeValid = true;
        
        /* gets userIdentityVerified. if true, still here. if not, goes to new-registration page */
        const userIdentityVerified = this.props.page.data.userIdentityVerified
        if (userIdentityVerified !== true) {
            this.props.push('/new-registration')
        }
        else {
            this.insuranceId = this.props.page.data.insuranceId
            this.birthDate = this.props.page.data.birthDate
            this.securityPolicy = this.props.page.data.securityPolicy
            this.securityPolicy.passwordPattern = new RegExp(this.securityPolicy.passwordPattern)
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        /* call checkFormValidation function then call below function */
        this.checkFormValidation(async (validation) => {
            if (validation) {
                const date = new Date()
                const user = {
                    email: this.state.email,
                    password: this.state.password,
                    insurance_id: this.insuranceId,
                    birthDate: this.birthDate,
                    role: 'user',
                    nopp: {
                        date: date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate(),
                        vNopp: findPolicyVersion(policies.nopp),
                        vTerms: findPolicyVersion(policies.terms),
                        vEnd: findPolicyVersion(policies.eula)
                    }
                }
                var gaSessionId;
                ReactGA.ga((tracker) => {
                    gaSessionId = tracker.get('clientId');
                  });

            if (process.env.NODE_ENV == 'production'){ 
                if(isFirstTimeValid){                 
                  ReactGA.event({
                            category: 'Registration',
                            action: 'Password Valid',
                            label: gaSessionId, 
                            nonInteraction: false
                 });   
                } else{ 
                    ReactGA.event({
                        category: 'Registration',
                        action: 'Password Invalid',
                        label: gaSessionId, 
                        nonInteraction: false
                     });   
                }
            }

                // send user data to usersRegisterPost API
                await this.props.callSyncAPIGateway('usersRegisterPost', null, user)
                if (this.props.page.error.status) {
                    if (this.props.page.error.status === 409) {
                        if (this.props.page.error.message.includes('There is already an account with this email')) {
                            this.setState({ isEmailExist: true })
                        }
                        else {
                            this.setState({
                                registerApiError: true,
                                errorMsg: "There is already an account associate with this health plan ID or with this email address."
                            })
                        }
                    }
                    else {
                        this.setState({
                            registerApiError: true,
                            errorMsg: this.props.page.error.message,
                            insuranceId: this.insuranceId,
                            birthDate: this.birthDate
                        })
                    }
                }
                else {
                    const auth = this.props.page.apiData
                    // get auth data and save to redux
                    await this.props.saveAuth(auth)
                    this.props.push('/confirm-info')
                }
            }
        })
    }

    handleInputText = (event) => {
        this.setState({ isEmailExist: false })
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state, () => {
            if (name === 'rePassword') {
                this.handleTypingValidation(name, value)
            }
        })
    }

    handleTypingValidation = (name, value) => {
        switch (name) {
            case 'rePassword' :
                if (this.state.password !== this.state.rePassword) {
                    this.setValidationState(name, false)
                    return
                }
                break
            default: return
        }
        this.setValidationState(name, true)
    }

    setValidationState = (name, state, callback) => {
        const validation = {...this.state.validation}
        validation[name] = state
        this.setState({ validation }, callback)
    }

    isShowError(state) {
        return state === true || state === null
    }

    validateEmail = (event) => {
        const { name, value } = event.target
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regex.test(value)) {
            this.setValidationState(name, false)
        }
        else {
            this.setValidationState(name, true)
        }
    }
    validatePassword = (event) => {
        const { name, value } = event.target
        let isValid = null
        if (!this.securityPolicy.passwordPattern.test(value)) {
            isValid = false;
            isFirstTimeValid = false;    //used by GA     
        }
        else {
            isValid = true; 
        } 
        this.setValidationState(name, isValid, () => {
            if (this.state.rePassword) {
                this.handleTypingValidation('rePassword', this.state.rePassword)
            }
        })
    }
    handleSwitchPassword = (value) => {
        this.setState({ isShowPassword: value })
    }

    checkFormValidation = (callback) => {
        this.validateEmail({
            target: {
                name: 'email',
                value: this.state.email
            }
        })
        setTimeout(() => {
            this.validatePassword({
                target: {
                    name: 'password',
                    value: this.state.password
                }
            })
            setTimeout(() => {
                this.handleTypingValidation('rePassword', this.state.rePassword)
                setTimeout(() => {
                    const validation = Object.keys(this.state.validation).reduce((valid, key) => {
                        if (!valid) {
                            return valid
                        }
                        else {
                            return this.state.validation[key] === true
                        }
                    }, true)
                    callback(validation)
                }, 0)
            }, 0)
        }, 0)
    }

    /* check it all validation is true */
    isFormValid = () => Object.keys(this.state.validation).reduce((valid, key) => {
        if (!valid) {
            return valid
        }
        if (this.state.validation[key]|| this.state.validation[key] === null) {
            return true
        }
        else {
            return false
        }
    }, true) && this.state.isPolicyCheck

    togglePolicy = (status) => {
        this.setState({
            isShowPolicy: status
        })
    }

    togglePolicyCheck = () => {
        this.setState({
            isPolicyCheck: !this.state.isPolicyCheck
        })
    }
    handleSwitchPassword = (value) => {
        this.setState({ isShowPassword: !this.state.isShowPassword })
    }

    render() {
        if (!this.securityPolicy) {
            return null
        }
        /* when user changes to show password then passwordInputType change to 'text' style */
        let passwordInputType = 'password'
        if (this.state.isShowPassword) {
            passwordInputType = 'text'
        }
        return (
            <Container fluid>
                {this.state.isShowPolicy ? (<Policies user="patient" onDone={() => this.togglePolicy(false)} />) : null}
                <Container className={style.content}>
                <div className={style.empty} />
                   <div className={style.headingText}>
                        Let's get you set up with an account.
                    </div>
                    <div className={style.formWrapper}>
                        <Form onSubmit={this.handleSubmit}>
                            <div>

                                    <InputTextWithError
                                        name="email"
                                        label="EMAIL" 
                                        autoFocus
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.handleInputText}
                                        onBlur={this.validateEmail}
                                        error={this.state.validation.email === false } 
                                        success={this.state.validation.email}
                                        grayborder={true}
                                        errorMessage="Please enter a valid email address."
                                        error1={this.state.isEmailExist}
                                        errorMessage1="This email address is already registered. Click below to Login."
                                        />
 
                            </div>
                            <div  >
                            <PasswordTextWithError
                                    name="password"
                                    label="PASSWORD" 
                                    autoComplete="new-password" 
                                    placeholder="Enter Your Password"
                                    value={this.state.password}
                                    onChange={this.handleInputText}
                                    onBlur={this.validatePassword}
                                    grayborder={true}
                                    error={this.state.validation.password === false}
                                    success={this.state.validation.password}
                                    errorMessage={this.securityPolicy.passwordMsg}
                                /> 
                            </div>
                            <div  >
                            <PasswordTextWithError
                                    name="rePassword"
                                    label="PASSWORD" 
                                    autoComplete="new-password" 
                                    placeholder="Re-enter Your Password"
                                    value={this.state.rePassword}
                                    onChange={this.handleInputText}
                                    grayborder={true}
                                    error={this.state.validation.rePassword === false}
                                    success={this.state.validation.rePassword}
                                    errorMessage="Your passwords do not match, try again."
                                /> 

                             </div>
                            
                            {this.state.registerApiError ? (
                                     <ErrorMessage  message="Oops! Register API returned error.." />   
                            ) : null }
                            {this.state.isEmailExist ? (
                              
                                    <div className={style.loginText}>
                                        <Link to="/login">
                                             Take me to Login screen
                                        </Link>
                                    </div>
                                
                            ) : null}
                            {(!this.state.isEmailExist) ? (
                                <div className={style.formHint}>
                                    <div>
                                        Password must contain at least:
                                            <ul>
                                                {this.securityPolicy.passwordCriteria.map((criteria, index) => (
                                                    <li key={index}>- {criteria}</li>
                                                ))}
                                            </ul>
                                    </div>
                                </div>
                            ) : null}

                            <Row className={style.checkboxWrapper}>
                              <Col xs={12} md={{ size: 12 }} className={style.formLabel} > 
                             <label className={style.chkContainer}>
                                    <input  id="chkboxAgreeTerms"
                                            type="checkbox" 
                                            onChange={() => this.togglePolicyCheck()}
                                                checked={this.isPolicyCheck} 
                                        />
                                        <span className={style.checkbox}></span>

                             </label> 
                                <span className={style.noppCheckBoxWrapper}>
                                    &nbsp;I certify that all info I provide is correct and I have read and agree to the &nbsp;
                            
                                    <span id="policies-button" onClick={() => this.togglePolicy(true)}>
                                        Notice of Privacy Practices, Terms of Service and End User License Agreement
                                    </span>
                                </span>

                                </Col>
                            </Row> 

                            <div className={style.buttonWrapper}>
                            <Button id="btnCreateMyAccountSetup" type="submit" className={[style.btn]}
                             disabled={!this.isFormValid()}> 
                                    CREATE MY ACCOUNT
                            </Button>
                            </div>
                        </Form>
                    </div>
                </Container>
                <span className={style.footerWrapper}>
                    <ProgressBarPatient step={1} />
                </span>
            </Container>
        )
    }
}

export default connect(
    ({
        page,
        patient
    }) => ({
        page,
        patient
    }),
    {
        callSyncAPIGateway,
        savePageData,
        saveAuth,
        apiInited,
        push
    }
)(Setup)
