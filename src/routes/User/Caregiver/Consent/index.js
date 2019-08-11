import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import Select from 'components/Select'
import style from './style.scss'
import ProgressBarPatient from 'components/ProgressBarPatient'

import { connect } from 'react-redux'
import { savePageData } from 'redux/page/action'
import { callSyncAPIGateway } from 'redux/apiGateway/action'
import { setPatient } from 'redux/patient/action'
import { setCMR } from 'redux/cmr/action'
import { push } from 'react-router-redux'
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

export class CaregiverConsent extends Component {
    state = {
        firstName: '',
        lastName: '',
        month: '',
        day: '',
        year: '',
        validation: {
            month: null,
            day: null,
            year: null
        },
        submitted: false,
        verified: null,
        errorMSG: '',
        isPageShow: false
    }
    componentWillMount() {
        const page = window.location.pathname + window.location.search;
        ReactGA.set({'dimension1':this.props.user.email});

        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

        // if found the patient by insuraceid from the previous page
        if (this.props.page.apiData && this.props.page.apiData.found) {
            if (this.props.page.apiData.firstName && this.props.page.apiData.lastName) {
                const { firstName, lastName } = this.props.page.apiData
                this.setState({ firstName, lastName })
            }
            let isPageShow = true
            // if the exist insuranceId is not already consent
            this.props.patients.forEach(async (consent) => {
                if (consent.insuranceId === this.props.page.data.insuranceId) {
                    isPageShow = false
                    // if already consent then go to confirm info
                    const patientId = consent.patientId
                    // get patient by patientId and save to redux
                    await this.props.callSyncAPIGateway('fhirPatientsIdGet', { id: patientId })
                    const patient = this.props.page.apiData
                    await this.props.setPatient(patient)

                    // get cmr by patientId and save to redux
                    await this.props.callSyncAPIGateway('fhirCmrGet', { patientId })
                    const cmr = this.props.page.apiData
                    await this.props.setCMR(cmr)
                    this.props.push('/confirm-info')
                }
            })
            this.setState({ isPageShow })
        }
        else {
            this.props.push('/caregiver-patient-lookup')
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
            default:  valid = true
        }
        return valid
    }

    handleInput = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        // if select some things / the validation become true
        state['validation'] = { ...this.state.validation }
        state['validation'][name] = true
        this.setState(state)
    }
    isShowError(state) {
        if (!this.state.submitted && state === null) {
            return false
        }
        return state !== true
    }
    handleGrantAccess = async () => {
        // check validation
        const validation = { ... this.state.validation }
        if (this.state.month === '') {
            validation.month = false
        }
        if (this.state.day === '') {
            validation.day = false
        }
        if (this.state.year === '') {
            validation.year = false
        }
        // reset old state
        this.setState({ validation, verified: null, errorMSG: '' })
        // if non-null
        if (this.state.month && this.state.day && this.state.year) {
            const user = {
                first_name: this.props.page.apiData.firstName,
                last_name: this.props.page.apiData.last_name,
                date_of_birth: this.state.year + '-' + ('0' + this.state.month).slice(-2) + '-' + ('0' + this.state.day).slice(-2),
                insurance_id: this.props.page.data.insuranceId
            }
            // call usersVerifyPatientPost API
            const DOBValidation = this.setValidDOB()
            if (DOBValidation) {
                await this.props.callSyncAPIGateway('usersVerifyPatientPost', null, user)
            }
            const result = this.props.page.apiData
            const verified = result.verified === 'true'
            this.setState({ verified })
            // if verified is true

            if (verified) {
                // call usersPatientConsentPost API
                await this.props.callSyncAPIGateway('usersPatientConsentPost', null, {
                    insurance_id: this.props.page.data.insuranceId,
                    birthDate: this.state.year + '-' + ('0' + this.state.month).slice(-2) + '-' + ('0' + this.state.day).slice(-2)
                })
                // get patientId from usersPatientConsentPost API result
                const patientId = this.props.page.apiData.patientId
                // get patient by patientId and save to redux
                await this.props.callSyncAPIGateway('fhirPatientsIdGet', { id: patientId })
                const patient = this.props.page.apiData
                await this.props.setPatient(patient)

                // get cmr by patientId and save to redux
                await this.props.callSyncAPIGateway('fhirCmrGet', { patientId })
                const cmr = this.props.page.apiData
                await this.props.setCMR(cmr)
                this.props.push('/confirm-info')
            }
            else {
                // if verified is false then show error msg
                this.setState({ errorMSG: `Uh oh! It looks like you might have entered the wrong birthdate, or we can't find you in our system. Please click HELP for further assistance.` })
            }
        }
    }
    render() {
        if (!this.state.isPageShow) {
            return <div></div>
        }
        const { firstName, lastName } = this.state
        return (
            <Container fluid>
                <Container className={style.content}>
                <div className={style.empty}/>
                <div className={style.headingText}>
                        Now we just need to confirm that you are the patient's caregiver.
                </div> 
                 <div className={style.subHeading}>
                        Please have the patient fill out this screen.
                        </div>
                    <div className={style.formWrapper}>
                        <div className={style.labelTitle}>
                            I,  {firstName} {lastName} born on:
                        </div>
                        <div className={style.dobWrapper}>
                            <Row className={style.dobRow}>
                                <Col xs={4}>
                                    <Select
                                        name="month"
                                        autoFocus
                                        onChange={this.handleInput}
                                        value={this.state.month}
                                        error={this.state.errorMSG !== '' || this.state.validation.month === false}
                                        success={this.state.verified}
                                    >
                                        <option value="" disabled hidden>Month</option>
                                        {months.map(month => (
                                            <option key={month.number} value={month.number}>{month.name}</option>
                                        ))}
                                    </Select>
                                    <div className={style.empty}/>
                                    {this.isShowError(this.state.validation.month) ? (
                                        <div className={style.textError}>
                                            Please select your birth month.
                                        </div>
                                    ) : null}
                                </Col>
                                <Col xs={4}>
                                    <Select
                                        name="day"
                                        onChange={this.handleInput}
                                        value={this.state.day}
                                        error={this.state.errorMSG !== '' || this.state.validation.day === false}
                                        success={this.state.verified}
                                    >
                                        <option value="" disabled hidden>Day</option>
                                        {Array.from(Array(31)).map((nothing, index) => (
                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </Select>
                                    <div className={style.empty}/>
                                    {this.isShowError(this.state.validation.day) ? (
                                        <div className={style.textError}>
                                            Please select your birth day.
                                        </div>
                                    ) : null}
                                </Col>
                                <Col xs={4}>
                                    <Select
                                        name="year"
                                        onChange={this.handleInput}
                                        value={this.state.year}
                                        error={this.state.errorMSG !== '' || this.state.validation.year === false}
                                        success={this.state.verified}
                                    >
                                        <option value="" disabled hidden>Year</option>
                                        {Array.from(Array(70)).map((nothing, index) => (
                                            <option key={index + 1917} value={index + 1917}>{index + 1917}</option>
                                        )).reverse()}
                                    </Select>
                                    <div className={style.empty}/>
                                    {this.isShowError(this.state.validation.year) ? (
                                        <div className={style.textError}>
                                            Please select your birth year.
                                        </div>
                                    ) : null}
                                </Col>
                            </Row>
                        </div>
                        <div className={style.labelTitle}>
                            Authorize Arine to provide access to my health information to
                        </div>
                        <div className={style.caregiverName}>
                            {this.props.user.firstName} {this.props.user.lastName}
                        </div>
                        <div className={style.hint}>
                            For one calendar year from this date or until a removal request. Access to health information includes medical diagnoses, medication lists, and information on when you visited your doctor and hospital, and contact information for you and your care teams. I understand I may revoke access to my medical records at any time by calling the Arine Customer Support team at  <span className={style.contactNumber}>{process.env.ARINE_PHONE})</span>
                        </div>
                    </div>
                    {this.state.errorMSG ? (
                        <div className={style.errorWrapper}>
                            <div className={style.textError}>
                                {this.state.errorMSG}
                            </div>
                        </div>
                    ) : null}

                      <div className={style.buttonWrapper}>
                            <Button onClick={this.handleGrantAccess} className = {[style.btn]} >
                            GRANT ACCESS
                                </Button>
                                </div>
                                <div className={style.empty}/>

                   
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
        patients,
        user
    }) => ({
            page,
            patients,
            user
        }),
    {
        callSyncAPIGateway,
        savePageData,
        push,
        setPatient,
        setCMR
    }
)(CaregiverConsent)
