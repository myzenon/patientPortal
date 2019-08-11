import React, { Component } from 'react'
import { Container, Row, Col,Button } from 'reactstrap'
import Image from 'components/Image'
import ProgressBarPatient from 'components/ProgressBarPatient'
import style from './style.scss'
import InputTextAreaWithError from 'components/InputTextAreaWithError'
import { savePageData } from 'redux/page/action'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

export class MedsOtherMedWhatFor extends Component {
    state = {
        patientName: '',
        reason: '',
        medReview: {
            display: ''
        },
        isOtherMedication: true
    }

    componentWillMount = () => {
        //set the state of the progress ProgressBarPatient

        if (this.state.isOtherMedication){
          this.props.savePageData({
              ShowProgressStep: 3
            })
          }
        else{
          this.props.savePageData({
              ShowProgressStep: 2
            })
        }

        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

        /* gets the CMR data from redux though props */
        this.cmr = this.props.cmr
          /* gets the medId from params  */
        const medId = this.props.match.params.medId
        if (medId) {

            let reviewedMed = null

            // define new state
            const newState = {
                reason:'',
                isOtherMedication: true
            }

            //get the med info from the cmr
            newState.medReview = this.cmr[medId]
            reviewedMed = this.cmr[medId]

            /* if reviewedMed.reason is not undefined then save the old answer to state */
            if (reviewedMed && reviewedMed.reasonCode) {
                reviewedMed.reasonCode.map(r => {
                    if (r.conditionName === "Other") {
                        newState.reason = r.description
                    }
                    return null
                })
            }

            this.setState(newState)
        }
    }

    handleSubmit = async () => {
         /* gets the med id from params  */
        const id = this.props.match.params.medId
          /* if otherMedication_ is in the id then medId = id, let medId be "otherMedication_*" */
        let medId = id

        /* gets the reviewed med object */
        let reviewedMed = this.cmr[medId]
        /* add  reviewCompleted: true to the med */

         /* if reason is not empty. then add it to med */
        if (this.state.reason) {
              reviewedMed.reasonCode[0] =  {conditionName:"Other",   description: this.state.reason}
        }
        else {
          /* if no description input then set otherMedication.reasonCode to empty array */
          reviewedMed.reasonCode = []
        }

        const med = {
            ...reviewedMed,
            reviewCompleted: true
        }

        /* let the medPut be the med with medId key*/
        const medPut = {}
        medPut[medId] = med
        this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, medPut)
        /* sets the cmr to the redux */
        this.cmr[medId] = medPut[medId]
        this.props.setCMR(this.cmr)

        /* go to any other questions*/
        this.props.push( `/meds-any-other-questions/${this.props.match.params.medId}`)
    }

    handlereason = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state)
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
                                < p/>
                    <div className={style.subHeading}>
                      What do you take {this.state.medReview.display} for?
                      </div><p/>
                    <p /> <br />
                    </Col>
                    </Row>

               <Row className={style.inputWrapper}>
                     <Col>
                          <div className={style.empty20}/>
                        <InputTextAreaWithError
                            label="PLEASE ENTER THEM BELOW"
                            name="reason"
                            textalign="center"
                            type="text"
                            placeholder="Back pain or headaches"
                            value={this.state.reason}
                            onChange={this.handlereason}
                            grayborder="True"
                        />
                     </Col>
                </Row>

                <Row className={style.inputWrapper}>
                   <Col >
                             <div className={style.buttonWrapper}>

                    <Button
                        id="btnNextMedsOtherWhatFor"
                        className={[style.btn, style.btnNext ]}
                        onClick={this.handleSubmit}
                    >
                       NEXT STEP
                    </Button>

                     </div>

                        </Col>
                    </ Row >

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
)(MedsOtherMedWhatFor)
