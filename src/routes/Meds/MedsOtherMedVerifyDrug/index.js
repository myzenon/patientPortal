import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import Image from 'components/Image'
import ProgressBarPatient from 'components/ProgressBarPatient'
import style from './style.scss'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'
import { savePageData } from 'redux/page/action'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class MedsVerifyDrug extends Component {
    state = {
        medReview: {
            display: '',
            image: {
                small: {
                    url: ''
                }
            }
        }
    }

    handleButton = async (isStilltaking) => {
        /* gets the meds id */
        const medId = "medication_" + this.state.medReview.id
        const med = {}

        /* clicks yes, we will get "y". Clicks no, we will get "n" */
        med[medId] = {
            ...this.cmr[medId],
            taken: isStilltaking ? "y" : "n"

        }
        if (!isStilltaking){
          med[medId].dosage = {}
        }
        /* sets the med[medication_*****] to the redux */
        this.cmr[medId] = med[medId]
        this.props.setCMR(this.cmr)

        /* calls API */
        this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, med)

        /* determines the next page. If yes, goes to meds-dosing-regimen. If no, goes to meds-why-stopped*/
        if (isStilltaking) {
            this.props.push('/meds-dosing-frequency/' + this.state.medReview.id)
        }
        else {
            this.props.push('/meds-why-stopped/' + this.state.medReview.id)
        }
    }

    componentWillReceiveProps = (nextProps) => {
      /* gets the CMR data from redux though props */
    const cmr = this.props.cmr
    /* gets the medId from params (/meds-verify-drug/(medId)) */
    const medId = nextProps.match.params.medId //this.props.match.params.medId
    this.cmr = cmr
    /* gets medication by finding the id in cmr.medications */
    const medReview = cmr.medications.find(medication => medication.id === medId)
    // alert(medId)
    // alert(nextProps.match.params.medId)
    this.setState({ medReview },() => console.log(this.state.medReview.display))
    //alert('re aft')
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

         /* gets the CMR data from redux though props */
        const cmr = this.props.cmr
        /* gets the medId from params (/meds-verify-drug/(medId)) */
        const medId = this.props.match.params.medId
        this.cmr = cmr
        /* gets medication by finding the id in cmr.medications */
        const medReview = cmr.medications.find(medication => medication.id === medId)
        this.setState({ medReview },() => console.log(this.state.medReview.display))
    }

    render() {
         if (this.state.medReview.id === this.props.match.params.medId) {
        return (
                <Container fluid className={style.content}>
                    <div className={style.heading1}>
                        {this.state.medReview.display}
                    </div>
                    <p />
                    { this.state.medReview.image.small.url ? (
                        <div>
                            <Image src={this.state.medReview.image.small.url} className={style.contentImg} />
                        </div>
                    ) : null}
                    < p />
                    <span className={style.questions}>
                        Are you still taking this medicine?
                    </span>
                    <Row className={style.buttonWrapper}>
                        <Col className="text-center">
                            <Button id="yesButton" onClick={() => this.handleButton(true)} className={style.button}>
                                YES
                            </Button>
                        </Col>
                        <Col className="text-center">
                            <Button id="noButton" onClick={() => this.handleButton(false)} className={style.button}>
                                NO
                            </Button>
                        </Col>
                    </Row>
                    <p />
                </Container>
        )}
        else{return(<div>Medication data did not load. Refresh page.</div>)}
    }
}

 /* gets what this page need from redux */
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
)(MedsVerifyDrug)
