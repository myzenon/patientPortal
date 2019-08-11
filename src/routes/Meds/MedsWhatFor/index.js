import React, { Component } from 'react'
import { Container, Button, Row, Col } from 'reactstrap'
import Image from 'components/Image'
import ProgressBarPatient from 'components/ProgressBarPatient'
import style from './style.scss'
import InputText from 'components/InputText'
import { savePageData } from 'redux/page/action'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class MedsWhatFor extends Component {
    state = {
        medReview: {
            display: '',
            image: {
                small: {
                    url: ''
                }
            },
            indications: []
        },
        inputOther: ''
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


        /* gets the medId from params (/meds-what-for/(medId)) */
        const medId = this.props.match.params.medId
        if (medId) {
            /* gets the CMR data from redux though props */
            this.cmr = this.props.cmr
            /* gets medication by finding the id in cmr.medications */
            const medReview = this.cmr.medications.find(medication => medication.id === medId)
            /* gets the reviewedMed from cmr[medication_*] */
            const reviewedMed = this.cmr[`medication_${medId}`]
            if (medReview) {
                let inputOther = ""
                /* loop over all medication.indications */
                const checkbox = medReview.indications.reduce((obj, indication) => {
                    /* if there are the old answer then save the old answer to the state */
                    if (reviewedMed && reviewedMed.reasonCode) {
                        reviewedMed.reasonCode.map(r => {
                            if (r.conditionName === indication.conditionName) {
                                obj[indication.conditionName] = true
                            }
                            if (r.conditionName === "Other") {
                                inputOther = r.description
                            }
                            return null
                        })
                    } else {
                        obj[indication.conditionName] = false
                    }
                    return obj
                }, {})
                this.setState({
                    medReview,
                    checkbox,
                    inputOther
                })
            }
        }
    }

    onFocusInputOther = () => {
        /* this function will be called when user clicks the input text | auto check the checkbox */
        const state = {}
        state.checkbox = { ...this.state.checkbox }
        state.checkbox.Other = true;
        this.setState(state)
    }

    toggleCheckbox = (event) => {
        const { name } = event.target
        const checkbox = { ...this.state.checkbox }
        checkbox[name] = !checkbox[name]

        this.setState({ checkbox })

        /* when the user clicks the other checkbox then inputOther input box will be fucused */
        if (name === 'Other' && checkbox[name]) {
            this.refs.inputOther.focus()
        }
    }

    handleInputOther = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state)
    }

    handleSubmit = async () => {
        /* gets the reviewed med object */
        const reviewedMed = this.cmr[`medication_${this.state.medReview.id}`]
        /* sets the med value to putting to the API */
        const med = {
            ...reviewedMed,
            /* loop over this.state.checkbox and get the value */
            reasonCode: Object.keys(this.state.checkbox).filter(conditionName => this.state.checkbox[conditionName]).map(conditionName => {
                const indication = this.state.medReview.indications.find(indication => {
                    return indication.conditionName === conditionName
                })
                if (indication.conditionName === 'Other') {
                    if (this.state.inputOther !== "") {
                        indication.description = this.state.inputOther
                    }
                }
                return indication
            })
        }
        /* let the medPut be the med with medId key*/
        const medPut = {}
        medPut[`medication_${this.state.medReview.id}`] = med
        this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, medPut)
        this.cmr[`medication_${this.state.medReview.id}`] = med
        /* sets the cmr to the redux */
        this.props.setCMR(this.cmr)
        this.props.push(this.determineNextPage())

    }

    determineNextPage = () => {
        const med = this.cmr.medications.find(medication => medication.id === this.props.match.params.medId)
        /* if there are any smart questions in med then goes to /smart-questions/medication_* page */
        if (med.smartQuestions && med.smartQuestions.length > 0) {
            return `/smart-questions/medication_${this.props.match.params.medId}/1`
        }
        /* otherwise goes to meds-any-other-questions page */
        else {
            return `/meds-any-other-questions/${this.props.match.params.medId}`
        }
    }
    render() {
        return (
              <Container fluid className={style.content}>
                <div className={style.empty40}/>
                <Row className={style.inputWrapper}>
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
                    What did the doctor tell you this medication was for? (Check all that apply)
                    </div><p/>
                    </Col>
                    <div className={style. empty20}/>
                    </Row>
                    <Row className={style.inputWrapper}>
                     <Col>
                    <div className={style.indicationContainer}>

                                { /* create the checkbox list */}
                                {this.state.medReview.indications.map((indication, index) => (
                                    <span>
                                    <Row>
                                      <Col xs={{ size: 1 }} md={{ size: 1}}  className={style.selectCheckWrapper}>

                                        <label className={style.checkboxContainer}>
                                         <input
                                                name={indication.conditionName}
                                                type="checkbox"
                                                checked={this.state.checkbox[indication.conditionName]}
                                                onChange={this.toggleCheckbox}
                                            />
                                          <span className={style.checkbox}></span>
                                         </label>

                                        </Col>

                                        <Col xs={{ size: 11 }}  md={{ size:11}} className={style.formLabel} >

                                            {indication.conditionName === 'Other' ? (
                                                 <InputText
                                                 ref="inputOther"
                                                 name="inputOther"
                                                 type="text"
                                                 placeholder="Enter Other here"
                                                 value={this.state.inputOther}
                                                 onChange={this.handleInputOther}
                                                 onFocus={this.onFocusInputOther}
                                             />
                                            ) : (
                                                    <span
                                                        className={style.indicationConditionName}
                                                        onClick={() => this.toggleCheckbox({ target: { name: indication.conditionName } })}
                                                    >
                                                        {indication.conditionName}
                                                    </span>
                                                )}
                                                 <p />
                                        </Col>

                                    </Row>

                            <Row >
                            <Col>
                            <div className={style.line}/>
                            </Col>
                                </Row>
                                </span>

                                ))}
                    </div>
                    </Col>
                           </Row>
                    <Row className={style.inputWrapper}>
                        <Col>
                            <div className={style. empty20}/>
                           <div className={style.buttonWrapper}>
                               <Button id="MedsWhatForButton" className={[style.btn, style.btnNext ]} onClick={this.handleSubmit}> NEXT STEP
                               </Button>
                           </div>
                            </Col>
                           </Row>

                            <div className={style. empty40}/>


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
)(MedsWhatFor)
