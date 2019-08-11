import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'reactstrap'
import InputText from 'components/InputText'
import ProgressBarPatient from 'components/ProgressBarPatient'
import style from './style.scss'
import { savePageData } from 'redux/page/action'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

import InputTextWithError from 'components/InputTextWithError'

export class MedsNewMedication extends Component {
    state = {
        medReview: {
            display: '',
            image: {
                small: {
                    url: ''
                }
            }
        },
        submitted: false,
        validation: {
            medicine: null
        },
        isOtherMedication: true
    }

    getPageData(medId) {
      const cmr = this.props.cmr
      this.cmr = cmr

      if (medId && this.cmr[medId]) {

         //load med from state cmr
        //  let medReview = this.cmr[medId]
          let reviewedMed = this.cmr[medId]

         /* if otherMedication_ is in medId then gets the med from cmr[otherMedication_*] */
         // define variable to change state
         // /* if reviewedMed is found then sets the old answer to the state */
          if (reviewedMed) {
          let newState = {
                          medId: medId,
                          medicine: reviewedMed.brandName,
                          dosage: reviewedMed.dosage ? reviewedMed.dosage.description:'',
                          dose: reviewedMed.dosageStrength,
                          validation: {
                              medicine: true
                          },
                          isOtherMedication: true
           }
           // set reviewedMed as attribute of class
           this.reviewedMed = reviewedMed

           this.setState(newState)

         }
        }

    }
    componentWillReceiveProps(nextProps){
      const medId = nextProps.match.params.medId
      this.getPageData(medId)
    }
    componentWillMount() {
        //set the state of the progress ProgressBarPatient
        this.props.savePageData({
            ShowProgressStep: 3
          })
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
        //if there is a url otherMedid we are editing an existing other med load it
        const medId = this.props.match.params.medId
        this.getPageData(medId)

    }
    handleInputText = (event) => {
        const { name, value } = event.target
        const state = {}
        /* if input field name is medicine then change the value to uppercase */
        if (name === 'medicine') {
            state[name] = value.toUpperCase()
        }
        else if (name === 'dose' && (/([^0-9])(\.\d)/.test(value) || value.startsWith("."))) {
            state[name] = value.replace(".","0.")
        }
        else {
            state[name] = value
        }
        this.setState(state, () => this.handleValidation(name, value))
    }

    handleValidation = (name, value) => {
        /*make sure name of drug is entered */
        if (!value || value == " ") {
            this.setValidationState(name, false)
            return
        }

        this.setValidationState(name, true)

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

    isFormValid = () => Object.keys(this.state.validation).reduce((valid, key) => {
        if (!valid) {
            return valid
        }
        if (this.state.validation[key]) {
            return true
        }
        else {
            return false
        }
    }, true)

    handleSubmit = async (event) => {
        event.preventDefault()
        // used to control when error message is visible only show after unsucesssful submit
        this.setState({ submitted: true })
        // if is a new med then create othermed with next id
        /* set default otherMedNumber to 1*/

      if (this.isFormValid()){
          var otherMedNumber = 1
          let reviewedMed = {}
          const medId = this.state.medId

          if (medId){
            //if (this.isExistingOtherMed(medId)){
                const split = medId.split('_')
                otherMedNumber = parseInt(split[1], 10)
                /* gets the reviewed med object */
                reviewedMed = this.cmr[medId]
            //  }
            }
          else {
                /* loop over cmr key, if there are any otherMedication then the number
                of this new other medication is one greater than the last/largest existing
                other medication id number*/
                let newOtherMedNumber = 1
                Object.keys(this.cmr).forEach(key => {
                    if (key.includes('otherMedication')) {
                        const split = key.split('_')
                        const otherMedNumber = parseInt(split[1], 10)
                        if (otherMedNumber >= newOtherMedNumber){
                          newOtherMedNumber = otherMedNumber + 1
                        }
                    }
                })
                reviewedMed = this.state.newState
                otherMedNumber = newOtherMedNumber
              }

          /* set default otherMedication object body */

          const otherMedication = {
              ...reviewedMed,
              display: this.state.medicine,
              brandName: this.state.medicine,
              genericName: this.state.medicine,
              dosageStrength: null,
              taken: 'y',
              reasonCode: [],
              dosage:{ description: this.state.dosage},
              hasQuantity: true
          }
          if (reviewedMed && reviewedMed.reasonCode) {
              otherMedication.reasonCode = reviewedMed.reasonCode
          }

          /* if user input dose then set the display and dosageStrength */
          if (this.state.dose) {
              otherMedication.display = otherMedication.display + ` ${this.state.dose}`
              otherMedication.dosageStrength = this.state.dose
          }

            /* let the medPut be the med with `otherMedication_${otherMedNumber}` key*/
          const medPut = {}
          medPut[`otherMedication_${otherMedNumber}`] = otherMedication
          this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, medPut)
           /* sets the cmr to the redux */
          this.cmr[`otherMedication_${otherMedNumber}`] = otherMedication
          this.props.setCMR(this.cmr)

            this.props.push(`/meds-other-whatfor/otherMedication_${otherMedNumber}`)
            this.setState({ isLoading: true })
        }
        else{
          // do nothing if the med name is blank
        }

    }
    render() {
        return (
              <Container fluid className={style.content}>
                <br /> <p />
                <Form  onSubmit={this.handleSubmit}>
                <Row className={style.inputWrapper}>
                    <Col className={style.headingText}>
                        Please tell us about your over-the-counter medication or herbal supplement and how you take it.

                    </Col>
                </Row>
                <Row className={style.inputWrapper}>
                    <Col className={style.subheading}>
                        You can click to edit any field.
                    </Col>
                </Row>
                    <Row className={style.inputWrapper}>

                    <div className={style.empty30}/>
                            <Col xs={6} >

                            <InputTextWithError
                                    label="MEDICINE NAME"
                                    name="medicine"
                                    autoFocus
                                    placeholder="For example: Advil"
                                    onChange={this.handleInputText}
                                    value={this.state.medicine}
                                    error={this.isShowError(this.state.validation.medicine)}
                                    success={this.isShowError(this.state.validation.medicine)}
                                    errorMessage="Please enter a medication name"
                                    type="text"
                                    grayborder={true}
                                />
                            </Col>
                            <Col xs={6}>

                             <InputTextWithError
                                    label="DOSAGE STRENGTH"
                                    name="dose"
                                    placeholder="For example: Advil"
                                    placeholder="For example: 200mg"
                                    onChange={this.handleInputText}
                                    value={this.state.dose}
                                    type="text"
                                    grayborder={true}
                                />
                            </Col>
                        </Row>
                        <Row className={style.inputWrapper}>
                        <div className={style.empty30}/>
                            <Col >
                            <InputTextWithError
                                    label="DESCRIBE HOW YOU CAN TAKE THIS MEDICINE"
                                    name="dosage"
                                    placeholder="I take 1 to 2 tablets every 4 to 6 hours as needed"
                                    onChange={this.handleInputText}
                                    value={this.state.dosage}
                                    type="text"
                                    grayborder={true}
                                />

                            </Col>
                        </Row>

                          <Row className={style.inputWrapper}>
                          <div className={style.empty40}/>
                           <Col >
                             <div className={style.buttonWrapper}>

                                <Button
                                    type="submit"
                                    className={[style.btn, style.btnNext ]}
                                >
                                NEXT STEP
                                </Button>
                                </div>
                            </Col>
                        </Row>
                        <div className={style.empty40}/>
                    </Form>


                </Container>
        )
    }
}

export default connect(
    ({
        cmr
    }) => ({
        cmr
    }),
    {
        callAPIGateway,
        setCMR,
        push,
        savePageData
    }
)(MedsNewMedication)
