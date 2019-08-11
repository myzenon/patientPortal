import React, { Component } from 'react'

import { Container, Form, Button,Row, Col } from 'reactstrap' 
import InputText from 'components/InputText'
import { Link } from 'react-router-dom'
import style from './style.scss'
import ProgressBarPatient from 'components/ProgressBarPatient' 
import InputTextWithError from 'components/InputTextWithError'
import { connect } from 'react-redux'
import { savePageData } from 'redux/page/action'
import { setPatient } from 'redux/patient/action'
import { setCMR } from 'redux/cmr/action'
import { callSyncAPIGateway, callAPIGateway } from 'redux/apiGateway/action'
import { push } from 'react-router-redux'
import moment from 'moment'
import ReactGA from 'react-ga';

import Faq from 'assets/question.svg'

ReactGA.initialize('UA-121783543-1');


export class CaregiverPatientLookup extends Component {
    state = {
        insuranceId: '',
        found: null,
        isLoading: false
    }

       
    componentDidMount() {         
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){ 
            ReactGA.pageview(page); 
        }
    }
    
    loadPatient = async (consent) => {
        const patientId = consent.patientId
        // get patient by patientId and save to redux
        await this.props.callSyncAPIGateway('fhirPatientsIdGet', { id: patientId })
        const patient = this.props.page.apiData
        await this.props.setPatient(patient)
        // get cmr by patientId and save to redux
        await this.props.callSyncAPIGateway('fhirCmrGet', { patientId })
        const cmr = this.props.page.apiData
        await this.props.setCMR(cmr)
        const date = moment().utc().format('YYYY-MM-DDTHH:mm:ss')
        await this.props.callAPIGateway('fhirPatientsIdPut', { id: patientId }, { lastReviewDate: date })
        const { user } = this.props
        
           // Display NOPP/Terms/end user if current policies have not been accepted
        if (cmr.complete) {
            // Arine has finished the CMR and it is ready to display to the patient
            this.props.push('/cmr-complete');
        } else if (!user.noppStatus) {
            this.props.push('/update-policies');
        } else if (!patient.confirmedInfo) {
            // User has not confirmed info
            this.props.push('/confirm-info');
        } else if (!patient.confirmedPcp) {
            this.props.push('/pcp-query');
        } else if (patient.appointment && !cmr.conversationDate) {
            this.props.push('/appointment-scheduled');
        } else {
            this.props.push('/landing-page');
        } 
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        if (this.state.insuranceId) {
            let isConsent = false
            // check whether the exist insuranceId is already consent or not
            this.props.patients.forEach(async (consent) => {
                if (consent.insuranceId === this.state.insuranceId) {
                    isConsent = true
                    this.loadPatient(consent)
                }
            })
            // if not consent yet | check whether insuranceId is correct or not
            if (!isConsent) {
                // lookup patient by using insturace id from api.
                await this.props.callSyncAPIGateway('usersLookupInsuranceIdPost', null, { insurance_id: this.state.insuranceId.toUpperCase() })
                /* get the result from redux */
                const result = this.props.page.apiData
                let { found } = result
                found = found === "true"
                this.setState({ found })
                if (found) {
                    /* save the insuranceId to the redux */
                    this.props.savePageData({
                        insuranceId: this.state.insuranceId.toUpperCase()
                    })
                    this.props.push('/caregiver-patient-lookup-confirm')
                }
            }
        }
    }
    goToHelpMeFindHPID = () => {
        this.props.savePageData({
            isCaregiver: true
        })
    }
    handleInputText = (event) => {
        const {name, value} = event.target
        const state = {}
        state[name] = value
        this.setState(state)
    }
    render() {
        return (
            <Container fluid>
                <Container className={style.content}>
                <Form onSubmit={this.handleSubmit}>

                <Row className={style.inputWrapper}>
                    <div className={style.empty20}/>  
                         <Col   className={style.textHeading} >
                         <div className={style.headingText}>
                         Please enter the patient's information below.
                           </div>  
                         </Col>
                         <div className={style.empty7}/>  
                        </Row> 

                        <Row className={style.inputWrapper}>
                            <Col > 
                            <InputTextWithError
                            label="ENTER HEALTH PLAN IDENTIFICATION NUMBER"
                                name="insuranceId"  
                                autoFocus
                                type="text"
                                value={this.state.insuranceId}
                                onChange={this.handleInputText}
                                placeholder="Your Health Plan Identification Number"
                                grayborder={true}
                                error={this.state.found === false } 
                                errorMessage="Uh oh! It looks like you might have entered the wrong number, or we can't find you in our system. Give us a call 1-833-ArineRx (1-833-274-6379) and we'll help you sort it out!"
                                /> 
                             <div className={style.errorSpace}> 
                            {
                                this.state.accountExists ? ( 
                                    <div className={style.loginText}>
                                    <Link to="/login">
                                    Click here to Sign In.
                                    </Link>
                                </div>
 
                                  
                                ) : null
                            }
                         </div>
                         </Col>
                        </Row> 

                
                      <Row className={style.inputWrapper}>
                        <div className={style.empty10}/>  
                        <Col > 
                       
                            <Link  className={style.helpText} to="/help-me-find-hpid" onClick={() => this.goToHelpMeFindHPID()}>
                            <div className={style.rectangle}>
                            <Faq className={style.icon}/> &nbsp; Help me find my patient's Health Plan Identification Number
                            </div> 
                            </Link>
                     
                        </Col>
                        </Row> 
                        <Row className={style.inputWrapper}>
                            <Col >
                            <div className={style.buttonWrapper}>
                            <Button id="submit"   type="submit" className = {[style.btn, style.btnNext ]} 
                              disabled={!this.state.insuranceId}>
                            NEXT STEP
                            </Button>
                            </div>

                            </Col>
                        </Row> 

                       
                    </Form>
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
        callAPIGateway,
        savePageData,
        setPatient,
        setCMR,
        push
    }
)(CaregiverPatientLookup)
