import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Col, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setPatient } from 'redux/patient/action'
import { callAPIGateway } from 'redux/apiGateway/action'
import style from './style.scss'
import ProgressBarPatient from 'components/ProgressBarPatient'
import InputText from 'components/InputText'
import { savePageData } from 'redux/page/action'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

import SelectWithImage from 'components/SelectWithImage'

export class PCPQuery extends Component {
    state = {
        otherPractitioner: '',
        otherPharmacy: ''
    }

    handleTextChange = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state)
    }

    onFocusInput = (event) => {
        /* this function will be called when user clicks the input text box for other
        clicking in the input box selects the radio box| auto select the radio */

        const { name } = event.target
        const state = {}
        console.log(name)
        if (name === 'otherPractitioner')
        {
          this.state.selectedDoctor = 'otherPractitioner'
        }else if (name === 'otherPharmacy') {
          this.state.selectedPharmacy = 'otherPharmacy'
        }

        this.setState(state)
    }

    determineNextPage = () => {
        /* Loop over all meds */
        const cmr = this.props.cmr
        let FirstTimeThroughQues = true
        for (let medication of cmr.medications) {
            const medReview = cmr[`medication_${medication.id}`]
            /* Check if this med review is complete. If not get the next page to view */
            if (medReview && (medReview.reviewCompleted || cmr.otherMedsCompleted || cmr.smartQuestionsCompleted)) {
                FirstTimeThroughQues = false
                break
            }
        }
        if (FirstTimeThroughQues) {
            return '/prepare/Chapter2'
        } else {
            /* Something has been reviewed. We should go to the landing page */
            return '/landing-page'
        }
    }

    componentWillMount = () => {

        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
        this.props.savePageData({
             ShowProgressStep: 1
        })
        /* gets the Patient data from redux though props */
        this.patient = this.props.patient
        let doctorsInfo = []
        let pharmaciesInfo = []
        /* gets the recommendedDoctor by pcp key */
        if (this.patient.pcp) {
            if (this.patient.pcp !== 'otherPractitioner') {
                const recommendedDoctor = this.patient.practitioners[this.patient.pcp]
                /* push the recommendedDoctor to the first list */
                if(recommendedDoctor){doctorsInfo.push(recommendedDoctor)}

            }
        }
            /* loop over all practitioners and push another doctors to the doctorsInfo */
        if(this.patient.practitioners != null){
        Object.keys(this.patient.practitioners).map((key) => {
            if (key !== this.patient.pcp) {
                doctorsInfo.push(this.patient.practitioners[key])
            }
        })
        }


        if (this.patient.primaryPharmacy) {
            if (this.patient.primaryPharmacy !== 'otherPharmacy') {
                const recommendedPharmacy = this.patient.pharmacies[this.patient.primaryPharmacy]
                if(recommendedPharmacy){pharmaciesInfo.push(recommendedPharmacy)}
            }
            if(this.patient.pharmacies != null){
            Object.keys(this.patient.pharmacies).map((key) => {
                if (key !== this.patient.primaryPharmacy) {
                    pharmaciesInfo.push(this.patient.pharmacies[key])
                }
            })
        }
        }

        this.setState({
            selectedDoctor: this.patient.pcp,
            selectedPharmacy: this.patient.primaryPharmacy,
            otherPractitioner: this.patient.pcp === 'otherPractitioner' ? this.patient.otherPractitioner : '',
            otherPharmacy: this.patient.primaryPharmacy === 'otherPharmacy' ? this.patient.otherPharmacy : '',
            doctorsInfo,
            pharmaciesInfo
        })
    }

    handleInputText = (event) => {
        const { name, value } = event.target
        this.setState({ selectedDoctor: value })
    }

    handlePharmacyChange = (event) => {
        const { name, value } = event.target
        this.setState({ selectedPharmacy: value })
    }

    handleButton = async () => {
        /* set the boj for putting to the API */
        const body = {
            pcp: this.state.selectedDoctor,
            confirmedPcp: true,
            primaryPharmacy: this.state.selectedPharmacy,
            confirmedPharmacy: true
        }

        if (this.state.selectedDoctor === 'otherPractitioner') {
            body.otherPractitioner = this.state.otherPractitioner
            this.patient.otherPractitioner = this.state.otherPractitioner
        }

        if (this.state.selectedPharmacy === 'otherPharmacy') {
            body.otherPharmacy = this.state.otherPharmacy
            this.patient.otherPharmacy = this.state.otherPharmacy
        }
        await this.props.callAPIGateway('fhirPatientsIdPut', { id: this.props.patient.id }, body)
        /* sets the patient to the redux */
        this.patient.pcp = body.pcp
        this.patient.confirmedPcp = body.confirmedPcp
        this.patient.primaryPharmacy = body.primaryPharmacy
        this.patient.confirmedPharmacy = body.confirmedPharmacy
        this.props.setPatient(this.patient)
        this.props.push(this.determineNextPage())
    }


    render() {
        return (
                <Container fluid className={style.content}>
                    <Row>
                         <Col  className={[style.headingText, style.componentGap].join(' ')}>
                                 Please select your main doctor and your preferred pharmacy.
                          </Col>
                    </Row>
                    <Row>
                          <Col  className={[style.subheading, style.componentGap].join(' ')}>
                                  You can click to edit any field.
                          </Col>
                    </Row>
                        <Row>
                            <Col  className={style.componentGap}>
                                <SelectWithImage
                                            label="YOUR MAIN DOCTOR"
                                            errorMessage=""
                                            name="doctor"
                                            isleftalign="true"
                                            grayborder={true}
                                            image="doctor"
                                            onChange={this.handleInputText}
                                        >
                                        {this.state.doctorsInfo.map((doctor, index) => (
                                            <option  key={index} value={doctor.npi}>{
                                                    doctor.name[0].family+" " +
                                                    doctor.name[0].given+" - " +
                                                    doctor.address[0].line[0]+", " +
                                                    doctor.address[0].city+",  " +
                                                    doctor.address[0].state+", " +
                                                    doctor.address[0].country+",  " +
                                                    doctor.address[0].postalCode
                                                }
                                            </option>
                                            ))}
                                        </SelectWithImage>
                                </Col>
                          </Row>

                          <Row >
                            <Col  className={style.componentGap}>
                                <SelectWithImage
                                            label="YOUR  PREFERRED PHARMACY"
                                            errorMessage=""
                                            name="pharma"
                                            isleftalign="true"
                                            onChange={this.handlePharmacyChange}
                                            grayborder={true}
                                            image="pharma"
                                        >
                                        {this.state.pharmaciesInfo.map((pharmacy, index) => (
                                                <option  key={index} value={pharmacy.npi}>{
                                                    `${pharmacy.name} - ${pharmacy.address}`
                                                }
                                                 </option>
                                            ))}
                                        </SelectWithImage>
                                </Col>
                        </Row>
                        <Row>
                        <Col className={style.buttonWrapper}>
                          <Button id="btnNextConfirmInfo"
                              onClick={this.handleButton}
                              type="submit"
                              className = {[style.btn, style.btnNext ]}> NEXT STEP</Button>
                            </Col>
                        </Row>
            </Container>
        )
    }
}
export default connect(
    ({
        patient,
        cmr
    }) => ({
        patient,
        cmr
    }),
    {
        callAPIGateway,
        push,
        setPatient,
        savePageData
    }
)(PCPQuery)
