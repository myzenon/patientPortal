import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'reactstrap'
import Image from 'components/Image'
import ProgressBarPatient from 'components/ProgressBarPatient'
import InputTextAreaWithError from 'components/InputTextAreaWithError'
import style from './style.scss'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'
import { savePageData } from 'redux/page/action'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class MedsDosingOther extends Component {
    state = {
        medReview: {
            display: '',
            image: {
                small: {
                    url: ''
                }
            }
        },
        description: ''
    }

    handleInputText = (event) => {
        /* sets the input to the state and call handleValidation function */
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state)
    }


    handleSubmit = async (event) => {
        event.preventDefault()
        /* gets the med id from params (/meds-dosing-regimen/(medId)) */
        const id = this.props.match.params.medId
        let medId = "medication_" + id
        /* if otherMedication_ is in the id then medId = id */
        if (id.includes('otherMedication_')) {
            medId = id
        }
        const cmr = this.cmr
        let med = {}

        // get old data
        med[medId] = {
            ...this.reviewOfMed,
            dosage: {
              ...this.cmr[medId].dosage,
              description: this.state.description != "" ? this.state.description : " "
            }
        }

        this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, med)
        /* sets the cmr to the redux */
        cmr[medId] = med[medId]
        this.props.setCMR(cmr)

        this.props.push('/meds-what-for/' + this.state.medReview.id)

    }
    componentWillMount = () => {
        //set the state of the progress ProgressBarPatient
        this.props.savePageData({
            ShowProgressStep: 2
          })
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

        /* gets the CMR data from redux though
        /* gets the CMR data from redux though props */
        this.cmr = this.props.cmr
        /* gets the medId from params (/meds-verify-drug/(medId)) */
        const medId = this.props.match.params.medId

        if (medId) {
            let medReview = null
            let reviewOfMed = null

            /* gets medication by finding the id in cmr.medications */
            medReview = this.cmr.medications.find(medication => medication.id === medId)
            /* gets the reviewOfMed from cmr[medication_*] */
            reviewOfMed = this.cmr[`medication_${medId}`]

            // define variable to change state
            let newState = {
                medReview
            }

            // set reviewOfMed as attribute of class
            this.reviewOfMed = reviewOfMed

            /* if reviewOfMed is found then sets the old answer to the state */
            if (reviewOfMed.dosage) {
                newState.dosage = reviewOfMed.dosage
            }
            if (reviewOfMed.dosage && reviewOfMed.dosage.description) {
                newState.description = reviewOfMed.dosage.description
            }
            this.setState(newState)
        }
    }

    render() {
        return (
                <Container fluid className={style.content}>
                    <Row className={style.inputWrapper}>
                    <div className={style.empty40}/>
                    <Col xs={3}>
                            <div>
                            {(this.state.medReview.image)?
                            <Image name={this.state.medReview.display} src={this.state.medReview.image.small.url} className={style.contentImg} />
                            :<Image name={this.state.medReview.display} src={null} className={style.contentImg} />
                        }
                                </div>
                    </Col>
                        <Col xs={9}>

                            <div className={style.heading}>
                                {this.state.medReview.display}
                            </div>


                        <div className={style.subHeading}>
                        Please tell us how you are taking this medication.
                        </div>
                        </Col>
                        </Row>
                    <Form onSubmit={this.handleSubmit} >
                        { /* if alternativeScheduleActive is true then shows alternative schedule page*/}


                            <Row className={style.inputWrapper}>
                                <Col>
                                <div className={style.empty10}/>
                                    <InputTextAreaWithError
                                        label="PLEASE ENTER BELOW"
                                        name="description"
                                        type="text"
                                        autoFocus
                                        placeholder= { this.state.dosage.frequency == "asNeeded" ?
                                                        "I take 1-2 tablets every 4-6 hours as needed for pain" :
                                                        "I inject 1 ML every month or I take 1 tablet every Tuesday"
                                                     }
                                        onChange={this.handleInputText}
                                        value={this.state.description}
                                        grayborder="True"
                                    />

                                </Col>
                            </Row>

                                <Row className={style.inputWrapper}>
                                <div className={style.empty10}/>
                                        <Col >
                                        <div className={style.buttonWrapper}>

                                        <Button type="submit" className={[style.btn, style.btnNext ]}>NEXT STEP

                                        </Button>
                                        </div>

                                    </Col>
                            </ Row >

                    </Form>
            </Container>
        )
    }
}


/* gets what this page need from redux */
export default connect(
    ({
        cmr,
        page
    }) => ({
            cmr,
            page
        }),
    {
        callAPIGateway,
        savePageData,
        setCMR,
        push
    }
)(MedsDosingOther)
