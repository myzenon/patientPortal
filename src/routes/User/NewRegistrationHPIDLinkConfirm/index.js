import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'reactstrap'
import Select from 'components/Select'
import style from './style.scss'
import ProgressBarPatient from 'components/ProgressBarPatient'
import { connect } from 'react-redux'
import { callSyncAPIGateway } from 'redux/apiGateway/action'
import { savePageData } from 'redux/page/action'
import { push } from 'react-router-redux'
import ErrorMessage from 'components/ErrorMessage'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

const months = [
    { name: 'Jan', number: 1 },
    { name: 'Feb', number: 2 },
    { name: 'Mar', number: 3 },
    { name: 'Apr', number: 4 },
    { name: 'May', number: 5 },
    { name: 'Jun', number: 6 },
    { name: 'Jul', number: 7 },
    { name: 'Aug', number: 8 },
    { name: 'Sep', number: 9 },
    { name: 'Oct', number: 10 },
    { name: 'Nov', number: 11 },
    { name: 'Dec', number: 12 }
]

export class NewRegistrationHPIDLinkConfirm extends Component {
    state = {
        firstName: '',
        lastName: '',
        month: '',
        day: '',
        year: '',
        isLoading: false,
        errorMSG: '',
        validation: {
            month: null,
            day: null,
            year: null
        },
        submitted: false,
        verified: null
    }
    componentWillMount() {
        //set the state of the progress ProgressBarPatient
        this.props.savePageData({
            ShowProgressStep: 1
          })
        /* get the insuranceId from redux */
        const insuranceId = this.props.page.data.insuranceId
        if (!insuranceId) {
            this.props.push('/new-registration')
        }
        else {
            this.insuranceId = insuranceId
        }

        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

    }
    setValidDOB = () => {
        let valid = true
        const { month, day, year } = this.state
        switch (month) {
            case '2':
                if (day > 28 && year % 4 != 0) {
                    valid = false
                } else if (day > 29) {
                    valid = false
                }
                break
            case '4':
            case '6':
            case '9':
            case '11':
                if (day > 30) {
                    valid = false
                }
                break
            default: valid = true
        }
        return valid
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.setState({ submitted: true })
        /* check if all validation is true */
        const validation = Object.keys(this.state.validation).reduce((valid, field) => {
            if (!valid) {
                return valid
            }
            return this.state.validation[field] === true
        }, true)
        if (validation) {
            /* set the user for putting to API */
            let month = this.state.month
            let day = this.state.day
            if (this.state.month.length < 2)
                month = '0' + month
            if (this.state.day.length < 2)
                day = '0' + day
            const user = {
                insurance_id: this.insuranceId,
                date_of_birth: this.state.year + '-' + month + '-' + day
            }
            const DOBValidation = this.setValidDOB()
            if (DOBValidation) {
                await this.props.callSyncAPIGateway('usersVerifyPatientPost', null, user)
            }
            var gaSessionId;
            ReactGA.ga((tracker) => {
                gaSessionId = tracker.get('clientId');
              });
            /* get the result from redux */
            const result = this.props.page.apiData
            const verified = result.verified === 'true'
            this.setState({ verified })
            /* if user is verified then goes to setup page */
            if (verified) {
                this.props.savePageData({
                    userIdentityVerified: true,
                    securityPolicy: result.securityPolicy,
                    insuranceId: user.insurance_id,
                    birthDate: user.date_of_birth
                })
            if (process.env.NODE_ENV == 'production'){
                ReactGA.event({
                    category: 'Registration',
                    action: 'DOB Matched',
                    label: gaSessionId,
                    nonInteraction: false
                });
            }
                this.props.push('/setup')
            }
            else {
                this.setState({ errorMSG: `Uh oh! It looks like you might have entered the wrong birthdate, or we can't find you in our system. Please click HELP for further assistance.` })

                if (process.env.NODE_ENV == 'production'){
                    ReactGA.event({
                        category: 'Registration',
                        action: 'DOB Not Matched',
                        label: gaSessionId,
                        nonInteraction: false
                    });
                }

            }
        }
    }

    handleInputText = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state, () => this.handleValidation(name, value))
    }

    handleValidation = (name, value) => {
        /*eslint-disable */
        switch (name) {
            case 'firstName':
                const regexFirstName = /^[A-Za-z]+/
                if (!value || !regexFirstName.test(value)) {
                    this.setValidationState(name, false)
                    return
                }
                break
            case 'lastName':
                const regexLastName = /^[A-Za-z]+/
                if (!value || !regexLastName.test(value)) {
                    this.setValidationState(name, false)
                    return
                }
                break
        }
        this.setValidationState(name, true)
        /*eslint-enable */
    }

    setValidationState = (name, state) => {
        const validation = { ...this.state.validation }
        validation[name] = state
        this.setState({ validation })
    }

    isShowError(state) {
        if (!this.state.submitted && state === null) {
            return false
        }
        return state !== true
    }
    render() {
        return (
            <Container fluid className={style.content}>
                <div className={style.empty}/>
                <div className={style.headingText}>
                    Great, we think we've found your information.
                </div>
                 <div className={style.subHeading}>

                        Now we just need to make sure it's really you.
                      </div>
                        <p />
                        <div className={style.subHeading}>
                       Tell us your birthday below!
                       </div>
                       <br />
                    <div>
                        <Form onSubmit={this.handleSubmit}>

                            <Row className={style.inputWrapper}>

                                    <Col xs={3} sm={3}>
                                        <Select
                                            name="month"
                                            onChange={this.handleInputText}
                                            value={this.state.month}
                                            error={this.isShowError(this.state.validation.month) || this.state.verified === false}
                                            success={this.state.validation.month}
                                            isleftalign="true"
                                        >
                                            <option value="" disabled hidden>Month</option>
                                            {months.map(month => (
                                                <option key={month.number} value={month.number}>{month.name}</option>
                                            ))}
                                        </Select>
                                        <div className={style.empty}/>

                                        {this.isShowError(this.state.validation.month) ? (
                                             <ErrorMessage  message="Please select your birth month." />
                                        ) : null}
                                    </Col>
                                    <Col xs={3} sm={3}>
                                        <Select
                                            name="day"
                                            onChange={this.handleInputText}
                                            value={this.state.day}
                                            error={this.isShowError(this.state.validation.day) || this.state.verified === false}
                                            success={this.state.validation.day}
                                            isleftalign="true"
                                        >
                                            <option value="" disabled hidden>Day</option>
                                            {Array.from(Array(31)).map((nothing, index) => (
                                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </Select>
                                        <div className={style.empty}/>
                                        {this.isShowError(this.state.validation.day) ? (
                                            <ErrorMessage  message="Please select your birth day." />
                                        ) : null}
                                    </Col>
                                    <Col xs={3} sm={3}>
                                        <Select
                                            name="year"
                                            onChange={this.handleInputText}
                                            value={this.state.year}
                                            error={this.isShowError(this.state.validation.year) || this.state.verified === false}
                                            success={this.state.validation.year}
                                            isleftalign="true"
                                        >
                                            <option value="" disabled hidden>Year</option>
                                            {Array.from(Array(70)).map((nothing, index) => (
                                                <option key={index + 1917} value={index + 1917}>{index + 1917}</option>
                                            )).reverse()}
                                        </Select>
                                        <div className={style.empty}/>
                                        {this.isShowError(this.state.validation.year) ? (
                                               <ErrorMessage  message="Please select your birth year." />
                                        ) : null}
                                    </Col>
                                </Row>

                            {this.state.errorMSG ? (
                               <div className={style.errorWrapper}>
                                    <ErrorMessage  message={this.state.errorMSG} />
                                </div>
                            ) : null}
                           <div className={style.empty20}/>
                           <div className={style.buttonWrapper}>
                            <Button id="submit"   type="submit" className = {[style.btn, style.btnNext ]} >
                            NEXT  STEP
                                </Button>
                                </div>
                                <div className={style.empty}/>

                        </Form>
                    </div>
            </Container>
        )
    }
}

export default connect(
    ({
        page
    }) => ({
            page
        }),
    {
        callSyncAPIGateway,
        savePageData,
        push
    }
)(NewRegistrationHPIDLinkConfirm)
