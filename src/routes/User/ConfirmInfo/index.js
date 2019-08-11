import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Button, Form } from 'reactstrap'
import style from './style.scss'
import InputText from 'components/InputText'
import InputTextWithError from 'components/InputTextWithError'
import Select from 'components/Select'
import SelectWithLabel from 'components/SelectWithLabel'

import ProgressBarPatient from 'components/ProgressBarPatient'

import { connect } from 'react-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setPatient } from 'redux/patient/action'
import { goToPageAfterAuth } from 'redux/auth/action'
import { push } from 'react-router-redux'

import { savePageData } from 'redux/page/action'
//react google analytics package
import ReactGA from 'react-ga';

//register the GA account
ReactGA.initialize('UA-121783543-1');

const state = [
    { long: 'Alabama', short: 'AL' },
    { long: 'Alaska', short: 'AK' },
    { long: 'Arizona', short: 'AZ' },
    { long: 'Arkansas', short: 'AR' },
    { long: 'California', short: 'CA' },
    { long: 'Colorado', short: 'CO' },
    { long: 'Connecticut', short: 'CT' },
    { long: 'Delaware', short: 'DE' },
    { long: 'Florida', short: 'FL' },
    { long: 'Georgia', short: 'GA' },
    { long: 'Hawaii', short: 'HI' },
    { long: 'Idaho', short: 'ID' },
    { long: 'Illinois', short: 'IL' },
    { long: 'Indiana', short: 'IN' },
    { long: 'Iowa', short: 'IA' },
    { long: 'Kansas', short: 'KS' },
    { long: 'Kentucky', short: 'KY' },
    { long: 'Louisiana', short: 'LA' },
    { long: 'Maine', short: 'ME' },
    { long: 'Maryland', short: 'MD' },
    { long: 'Massachusetts', short: 'MA' },
    { long: 'Michigan', short: 'MI' },
    { long: 'Minnesota', short: 'MN' },
    { long: 'Mississippi', short: 'MS' },
    { long: 'Missouri', short: 'MO' },
    { long: 'Montana', short: 'MT' },
    { long: 'Nebraska', short: 'NE' },
    { long: 'Nevada', short: 'NV' },
    { long: 'New Hampshire', short: 'NH' },
    { long: 'New Jersey', short: 'NJ' },
    { long: 'New Mexico', short: 'NM' },
    { long: 'New York', short: 'NY' },
    { long: 'North Carolina', short: 'NC' },
    { long: 'North Dakota', short: 'ND' },
    { long: 'Ohio', short: 'OH' },
    { long: 'Oklahoma', short: 'OK' },
    { long: 'Oregon', short: 'OR' },
    { long: 'Pennsylvania', short: 'PA' },
    { long: 'Rhode Island', short: 'RI' },
    { long: 'South Carolina', short: 'SC' },
    { long: 'South Dakota', short: 'SD' },
    { long: 'Tennessee', short: 'TN' },
    { long: 'Texas', short: 'TX' },
    { long: 'Utah', short: 'UT' },
    { long: 'Vermont', short: 'VT' },
    { long: 'Virginia', short: 'VA' },
    { long: 'Washington', short: 'WA' },
    { long: 'West Virginia', short: 'WV' },
    { long: 'Wisconsin', short: 'WI' },
    { long: 'Wyoming', short: 'WY' }
]

export class ConfirmInfo extends Component {
    state = {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        email: '',
        validation: {
            address1: null,
            city: null,
            state: null,
            zipCode: null,
            phoneNumber: null,
            email: null
        },
        errorMSG: {
            phoneNumber: ''
        },
        isValid: true,
        getByEmail: false
    }
    componentWillMount = async () => {
        // keep the loading time of the 1st page of a chapter  page in page data,
        // so in chapter page display, we  can calcualte the total time for that chapter
        this.props.savePageData({
             chapter1Time: Date.now(),
             ShowProgressStep: 1
        })

        /* gets the patient data from redux */
        const patient = this.props.patient
        this.patient = patient

        const patientInfo = {
            address1: patient.address[0].line[0],
            address2: patient.address[0].line[1] ? patient.address[0].line[1] : '',
            city: patient.address[0].city,
            state: patient.address[0].state,
            zipCode: patient.address[0].postalCode
        }
        /* gets the delivery method attibute for patient and sets local attribute to same value*/
        let getByEmail = false
        if (this.patient.deliveryMethods != undefined && this.patient.deliveryMethods.length > 0) {
            if (this.patient.deliveryMethods[0].code === 'mail') {
                getByEmail = true
            }
        }
        this.setState({ getByEmail })
        /* gets total of phone number from patient */
        patient.telecom.forEach((telecome) => {
            if (telecome.system === 'phone') {
                patientInfo.phoneNumber = telecome.value
            }
            if (telecome.system === 'email') {
                patientInfo.email = telecome.value
            }
        })
        /* if there is no email for the patient use the email/login of the logged in user */
        patientInfo.email = patientInfo.email ? patientInfo.email : ( this.props.user.email ? this.props.user.email : '')
        this.setState({ ...patientInfo })

        //get the current tracker session id, so we can use this instead of user id
        var gaSessionId;
        ReactGA.ga((tracker) => {
            gaSessionId = tracker.get('clientId');
          });

        // find the current page
        const page = window.location.pathname + window.location.search;

        //set the session id as dimension
        ReactGA.set({'dimension1':gaSessionId});
        //ReactGA.set({'dimension1':this.props.user.email});

        //send the current page sats to GA
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
    }
    patient = {
        name: [
            {
                family: '',
                given: [
                    ''
                ]
            }
        ]
    }
    //toggle the method delivery checkbox if paient has indicated they need mailed cmr
    toggleCheckbox = () => {
        this.setState({ getByEmail: !this.state.getByEmail })
    }

    handleInputText = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        /* handle the input and if it is phoneNumber field then call autoPhoneFormat function */
        this.setState(state, () => {
            if (name === 'phoneNumber') {
                this.setState({ phoneNumber: this.autoPhoneFormat(value) })
            }
        })
    }

    autoPhoneFormat = (phoneNumber) => {

        if (phoneNumber.length <= 12) {
            /* if phone number has '-' then replace it with '' */
            const phone = phoneNumber.replace(/-/g, '')
            /* change phone number format to xxx-xxx-xxxx */
            return phone.split('').reduce((sum, number, index) => {
                if (index === 3 || index === 6) {
                    sum += '-'
                }
                return sum + number
            }, '')
        }
        else {
            return phoneNumber.substring(0, 12)
        }
    }

    handleValidation = (event) => {
        const { name, value } = event.target
        switch (name) {
            case 'address1':
                if (!value) {
                    this.setValidationState(name, false)
                    return
                }
                break
            case 'city':
                if (!value) {
                    this.setValidationState(name, false)
                    return
                }
                break
            case 'zipCode':
                const regexZipCode = /^\d{5}(?:[-\s]\d{4})?$/
                if(!value || !regexZipCode.test(value)){
                  this.setValidationState(name, false, 'Please enter a valid ZipCode.')
                  return
                }
                break
            case 'phoneNumber':
                const number = value.replace(/-/g, '')
                /* checks if phonenumber is not NaN */
                if (isNaN(number)) {
                    this.setValidationState(name, false, 'Use only numbers.')
                    return
                }
                if (number.length < 10) {
                    this.setValidationState(name, false, 'Please enter a valid phone number.')
                    return
                }
                break
            case 'email':
                const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!value || !regexEmail.test(value)) {
                    this.setValidationState(name, false)
                    return
                }
                break
            default: return
        }
        this.setValidationState(name, true)
    }

    setValidationState = (name, state, message) => {
        /* gets validation */
        const validation = { ...this.state.validation }
        validation[name] = state
        /* gets errorMSG */
        const errorMSG = { ...this.state.errorMSG }
        /* if there are message in parameter then put it to errorMSG[name] */
        if (message) {
            errorMSG[name] = message
        }
        /* sets validation and errorMSG to the state, and call function to check all the input field is valid */
        this.setState({ validation, errorMSG }, () => {
            const isValid = Object.keys(this.state.validation).reduce((sum, field) => {
                if (sum === false) {
                    return sum
                }
                if (this.state.validation[field] !== null) {
                    return this.state.validation[field] === true
                }
                return sum
            }, true)
            this.setState({ isValid })
        })
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
    }, true)

    handleSubmit = async (event) => {
        event.preventDefault()
        const {
            address1,
            address2,
            city,
            state,
            zipCode,
            phoneNumber,
            email
        } = this.state
        const patient = { ...this.patient }
        patient.address[0].line[0] = address1
        if (address2) {
            patient.address[0].line[1] = address2
        }
        else if (patient.address[0].line.length > 1) {
            patient.address[0].line.pop()
        }
        patient.address[0].city = city
        patient.address[0].state = state
        patient.address[0].postalCode = zipCode
        //if there is not email attribute add one
         if (!(patient.telecom.find(communication => communication.system === 'email'))) {patient.telecom.push({"value":" ","system":"email"})}
        patient.telecom.forEach((telecome) => {
            if (telecome.system === 'phone') {
                telecome.value = phoneNumber
            }
            if (telecome.system === 'email') {
                telecome.value = email
            }
        })
         //save the deliveryMethods
         let deliveryMethods = []
         /* if user check the checkbox then deliveryMethods = [{ code: 'mail' }] */
         if (this.state.getByEmail) {
             deliveryMethods = [{ code: 'mail' }]
         }
        patient.deliveryMethods = deliveryMethods
        patient.confirmedInfo = true
        this.props.callAPIGateway('fhirPatientsIdPut', { id: patient.id }, { ...patient })
        const previouslyConfirmedInfo = this.patient.confirmedInfo
        await this.props.setPatient(patient)
        if (previouslyConfirmedInfo) {
            /* call function goToPageAfterAuth (from redux) to check what page to go next */
            this.props.goToPageAfterAuth()

        }
        else {
            this.props.push('/pcp-query')
        }
    }

    render() {
        return (
                    <Form onSubmit={this.handleSubmit}>
                        <Row >
                          <Col className={[style.headingText, style.componentGap].join(' ')}>
                              Please review your contact information and confirm that it is accurate and up to date.
                          </Col>
                        </Row>
                        <Row >
                             <Col className={[style.subheading, style.componentGap].join(' ')}>
                                You can click to edit any field
                             </Col>
                        </Row>
                        <br/>
                        <Row>
                           <Col className={style.componentGap}>
                                  <InputTextWithError
                                      label="FULL NAME"
                                      errorMessage=""
                                      name="fullname"
                                      type="text"
                                      value={this.patient.name[0].given[0] + ' ' + this.patient.name[0].family}
                                      readonly
                                      grayborder={true}
                                  />
                           </Col>
                        </Row>
                        <Row>
                          <Col md={6} xs={12} className={style.componentGap} >
                                <InputTextWithError
                                        label="ADDRESS 1"
                                        errorMessage="Address is Required"
                                        name="address1"
                                        autoFocus
                                        type="text"
                                        value={this.state.address1}
                                        onChange={this.handleInputText}
                                        onBlur={this.handleValidation}
                                        error={this.state.validation.address1 === false}
                                        grayborder={true}
                                    />
                            </Col>
                            <Col md={6} xs={12} className={style.componentGap} >
                                <InputTextWithError
                                    label="ADDRESS 2"
                                    name="address2"
                                    type="text"
                                    value={this.state.address2}
                                    onChange={this.handleInputText}
                                    grayborder={true}
                                />
                            </Col>

                        </Row>
                        <Row>

                            <Col md={6} xs={12} className={style.componentGap}>
                                <InputTextWithError
                                    label="CITY"
                                    errorMessage="City is Required"
                                    name="city"
                                    type="text"
                                    value={this.state.city}
                                    onChange={this.handleInputText}
                                    onBlur={this.handleValidation}
                                    error={this.state.validation.city === false}
                                    grayborder={true}
                                />
                            </Col>
                            <Col md={6} xs={12} className={style.componentGap}>
                                <SelectWithLabel
                                    label="STATE"
                                    errorMessage=""
                                    name="state"
                                    isleftalign="true"
                                    value={this.state.state}
                                    onChange={this.handleInputText}
                                    grayborder={true}
                                >
                                    {state.map(state => (
                                        <option key={state.short} value={state.short}>{state.long}</option>
                                    ))}
                                </SelectWithLabel>
                            </Col>

                        </Row>
                        <Row>
                          <Col md={6} xs={12} className={style.componentGap}>
                                <InputTextWithError
                                    label="PHONE NUMBER"
                                    errorMessage={this.state.errorMSG.phoneNumber}
                                    name="phoneNumber"
                                    type="text"
                                    value={this.state.phoneNumber}
                                    onChange={this.handleInputText}
                                    onBlur={this.handleValidation}
                                    error={this.state.validation.phoneNumber === false}
                                    placeholder="XXX-XXX-XXXX"
                                    grayborder={true}
                                />
                            </Col>
                            <Col md={6} xs={12} className={style.componentGap}>
                              <InputTextWithError
                                    label="ZIP CODE"
                                    errorMessage={this.state.errorMSG['zipCode']}
                                    name="zipCode"
                                    type="text"
                                    value={this.state.zipCode}
                                    onChange={this.handleInputText}
                                    onBlur={this.handleValidation}
                                    error={this.state.validation.zipCode === false}
                                    grayborder={true}
                                />
                            </Col>

                        </Row>

                        <Row>
                          <Col className={style.componentGap}>
                                    <InputTextWithError
                                        label="THE PHARMACIST SHOULD EMAIL MY RECOMMENDATION TO"
                                        errorMessage=" A valid email is Required"
                                        ref="emailInput"
                                        name="email"
                                        type="email"
                                        onClick={this.clickEmailInput}
                                        onBlur={this.handleValidation}
                                        value={this.state.email}
                                        onChange={this.handleInputText}
                                        error={this.state.validation.email === false}
                                        grayborder={true}
                                    />
                          </Col>
                        </Row>
                        <Row>
                          <Col  className={[style.subheading, style.componentGap].join(' ')}>
                              Once our pharmacist completes your medication review, we will email a link of your personal medication list and medication action plan.
                          </Col>
                        </Row>
                        <Row>
                          <Col >
                             < hr />
                          </Col>
                        </Row>
                        <Row>
                          <Col className={[ style.checkboxWrapper, style.componentGap].join(' ')}>
                                <td>
                                <label className={style.chkContainer}>
                                        <input
                                                name="getByEmail"
                                                type="checkbox"
                                                onChange={this.toggleCheckbox}
                                                checked={this.state.getByEmail}
                                         />
                                        <span className={style.checkbox}></span>
                                  </label>
                                </td>
                                <td>
                                    <span className={style.checkboxLabel}  onClick={this.toggleCheckbox }>In addition to the email, I would like a hard copy mailed to me.</span>
                                </td>
                            </Col>
                          </Row>


                        <Row>
                          <Col className={style.buttonWrapper}>

                                  <Button
                                        id="btnNextConfirmInfo"
                                        type="submit"
                                        className = {[style.btn, style.btnNext ]}
                                        disabled={!this.isFormValid()}>
                                      NEXT STEP
                                  </Button>
                            </Col>
                        </Row>
                    </Form>



        )
    }
}

export default connect(
    ({
        patient,
        page,
        user
    }) => ({
            patient,
            page,
            user
        }),
    {
        callAPIGateway,
        setPatient,
        goToPageAfterAuth,
        savePageData,
        push
    }
)(ConfirmInfo)
