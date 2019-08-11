import React, { Component } from 'react'
import { Container,Row, Col, Button } from 'reactstrap'
import Image from 'components/Image'

import style from './style.scss'
import { savePageData } from 'redux/page/action'
import InputTextAreaWithError from 'components/InputTextAreaWithError'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

export class MedsAnyOtherQuestions extends Component {
    state = {
        patientName: '',
        question: '',
        medReview: {
            display: '',
            image: {
                small: {
                    url: ''
                }
            }
        },
        isOtherMedication: false
    }

    componentWillMount = () => {
      //set the state of the progress ProgressBarPatient

        if(this.state.isOtherMedication)
          {
            this.props.savePageData({
            ShowProgressStep: 3
          })}
          else{
            this.props.savePageData({
            ShowProgressStep: 2
          })}

        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

        /* gets the CMR data from redux though props */
        this.cmr = this.props.cmr
          /* gets the medId from params (/meds-any-other-questions/(medId)) */
        const medId = this.props.match.params.medId
        if (medId) {

            let reviewedMed = null

            // define new state
            const newState = {
                isOtherMedication: medId.includes('otherMedication_')
            }

            /* if otherMedication_ is in medId then gets the med from cmr[otherMedication_*] */
            if (medId.includes('otherMedication_')) {
                newState.medReview = this.cmr[medId]
                reviewedMed = this.cmr[medId]
            }
            else {
                newState.medReview = this.cmr.medications.find(medication => medication.id === medId)
                reviewedMed =  this.cmr[`medication_${medId}`]
            }

            /* if reviewedMed.question is not undefined then save the old answer to state */
            if (reviewedMed && reviewedMed.question) {
                newState.question = reviewedMed.question
            }

            this.setState(newState)
        }
    }

    handleSubmit = async () => {
         /* gets the med id from params (/meds-any-other-questions/(medId)) */
        const id = this.props.match.params.medId
        let medId = `medication_${id}`
          /* if otherMedication_ is in the id then medId = id, let medId be "otherMedication_*" */
        if (id.includes('otherMedication_')) {
            medId = id
        }
        /* gets the reviewed med object */
        let reviewedMed = this.cmr[medId]
        /* add  reviewCompleted: true to the med */
        const med = {
            ...reviewedMed,
            reviewCompleted: true
        }
         /* if question is not empty. then add it to med */
        if (this.state.question) {
            med.question = this.state.question
        } else {
            delete med['question']
        }
        /* let the medPut be the med with medId key*/
        const medPut = {}
        medPut[medId] = med
        await this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, medPut)
        /* sets the cmr to the redux */
        this.cmr[medId] = medPut[medId]
        this.props.setCMR(this.cmr)
        /* determine next page */
        if (id.includes('otherMedication_')) {
          // if otherMedsCompleted then display the next other med
          if (this.cmr.otherMedsCompleted){
            //if is not last other med load medsnewmedication for the next other med
            /* loop over all cmr key */
            let lastMedIndex = 0
            Object.keys(this.cmr).forEach(key => {
                if (key.includes('otherMedication_')) {
                    const split = key.split('_')
                    const medIndex = parseInt(split[1],10)
                    if (medIndex > lastMedIndex) {
                        /* get id of lastMedBrand */
                        lastMedIndex = medIndex
                    }
                }
            })
              // if this was the last othermed display /meds other meds
            const split = medId.split('_')
            const CurrentMedIdIndex = parseInt(split[1],10)
            if (CurrentMedIdIndex == lastMedIndex){
              //display meds-other-med
                this.props.push('/meds-other-meds')
            } else {
              //load MedsNewMedication go to next med
                let nextMedIndex = CurrentMedIdIndex + 1
                this.props.push('/meds-new-medication/otherMedication_' + nextMedIndex )
            }
          } else {
            this.props.push('/meds-other-meds')
          }
        }
        else {
            // Loop over meds and get next med after this current medId, regardless of whether the next one has been answered
            // Find index of this med
            var thisMedIndex = 0
            var smed
            for (smed in this.props.cmr.medications) {
                if (this.props.cmr.medications[smed].id == id) {
                    break
                 }
                 thisMedIndex += 1
            }
            // Check if this med is the last med
            if (thisMedIndex < (this.props.cmr.medications.length-1)) {
                // There are more meds after this med. Next med index is just the one after this med.
                var nextMedIndex = thisMedIndex + 1
                // Go to next med
                var nextMedId = this.props.cmr.medications[nextMedIndex]['id']
                this.props.push(`/meds-verify-drug/${nextMedId}`)
            } else {
                // This is last med. there is No next med then
                // if this is the first time through the questionnarie

                if (this.props.cmr.otherMedsCompleted){
                    //user is editing medication answers and should go back to the landing
                    this.props.push('/landing-page')
                } else {
                //  get ready to review OTC meds
                    this.props.push('/prepare/Chapter3')


              }
            }
        }
    }

    handleQuestion = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state)
    }

    render() {

        return (
              <Container fluid >
                <Row >
                <div className={style.empty40}/>
                <Col sm={12} md={3}>
                        {(this.state.medReview.image)?
                        <Image name={this.state.medReview.display} src={this.state.medReview.image.small.url} className={style.contentImg} />
                        :<Image name={this.state.medReview.display} src={null} className={style.contentImg} />
                    }
                </Col>
                <Col sm={12} md={9}>
                    <div className={style.headingText}>
                        {this.state.medReview.display}
                    </div>
                    < p/>
                    <div className={style.subheading}>
                        Ask our pharmacists any questions you have about this medication.
                    </div><p/>
                </Col>
              </Row>
                    <Row className={style.inputWrapper}>
                        <Col >
                            <InputTextAreaWithError
                                label="PLEASE ENTER BELOW"
                                name="question"
                                autoFocus
                                type="text"
                                placeholder="Write your questions here. [OPTIONAL]"
                                value={this.state.question}
                                onChange={this.handleQuestion}
                                grayborder={true}
                            />
                          </Col>
                      </ Row >
                      <Row className={[style.inputWrapper,style.buttonWrapper].join(" ")}>
                          <Button id="btnNextMedsAnyOtherQuestions"
                              onClick={this.handleSubmit}
                              className = {[style.btn, style.btnNext ]} >
                              NEXT  STEP
                          </Button>
                      </ Row >
                </Container>
        )}
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
)(MedsAnyOtherQuestions)
