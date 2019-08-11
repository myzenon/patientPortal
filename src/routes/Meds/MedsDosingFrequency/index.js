import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import Image from 'components/Image'
import ProgressBarPatient from 'components/ProgressBarPatient'
import style from './style.scss'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'
import MedDiff from 'assets/medication_different.svg'
import MedEveryDay from 'assets/medication_every_day.svg'
import MedNeed from 'assets/medication_when_need.svg'
import { savePageData } from 'redux/page/action'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class MedsDosingFrequency extends Component {
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

    handleButton = async (response) => {
        /* gets the meds id */
        const medId = "medication_" + this.state.medReview.id
        const med = {}
        /* the button which is clicked will determine response daily asneeded other */
        med[medId] = {
            ...this.cmr[medId],
            dosage: {
              ...this.cmr[medId].dosage,
              "frequency": response
            }

        }
        // if the dosage is as needed or other delete the quantity
        if (med[medId].dosage.quantity && (response == 'other' || response == 'asNeeded'))
          {
            med[medId].dosage.quantity = ''
          }


        /* calls API */
        this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, med)
        /* sets the med[medication_*****] to the redux */
        this.cmr[medId] = med[medId]
        this.props.setCMR(this.cmr)
        /* determines the next page. If yes, goes to meds-dosing-regimen. If no, goes to meds-why-stopped*/
        switch (response) {
            case 'everyday': return  this.props.push('/meds-dosing-regimen/' + this.state.medReview.id)
            default : return this.props.push('/meds-dosing-other/' + this.state.medReview.id)
        }
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
        this.setState({ medReview })
    }

    render() {
        return (
            <Container  fluid className={style.content}>
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
                    Please tell us how you are taking this medication.
                    </div><p/>
                    </Col>
                    </Row>


                    <Row className={style.inputWrapper}>
                    <div className={style.empty20}/>

                        <Col >
                        <span className={style.buttonWrapper}>
                            <Button id="everyDayButton" onClick={() => this.handleButton('everyday')} className = {[style.btnLean, style.leanbtnOutlineBackText]}>

                                <label className={style.buttonText}> <MedEveryDay  className={style.medIcon}/>&nbsp;I take it every day</label>

                            </Button>
                            &nbsp;&nbsp;&nbsp;
                       </span>

                        <span className={style.buttonWrapper}>
                            <Button id="asNeededButton" onClick={() => this.handleButton('asNeeded')} className = {[style.btnLean, style.leanbtnOutlineBackText]}>
                            <label className={style.buttonText}> <MedNeed  className={style.medIcon}/>&nbsp;I take it only when I need to</label>
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            </span>

                       <span className={style.buttonWrapper}>
                            <Button id="otherButton" onClick={() => this.handleButton('other')} className = {[style.btnLean, style.leanbtnOutlineBackText]}>
                            <label className={style.buttonText}> <MedDiff  className={style.medIcon}/>&nbsp;I take it in a different way</label>
                            </Button>
                            </span>
                        </Col >

                    </Row>
                    <div className={style.empty100}/>
            </Container>
        )
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
)(MedsDosingFrequency)
