import React, { Component } from 'react'
import { Container, Button, Row, Col, Form } from 'reactstrap'
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


const reasonChoices = [
    { "code": "182868002", "text": "My doctor stopped it and started a different medication or dose" },
    { "code": "182873008", "text": "I ran out" },
    { "code": "182872003", "text": "I cannot pay for them" },
    { "code": "182864000", "text": "I am concerned about side effects" },
    { "text": "Other" }
]
const sideEffectsObj = reasonChoices.find(reason => reason.code === "182864000")

export class MedsWhyStopped extends Component {
    state = {
        checkbox: reasonChoices.reduce((obj, reason) => {
            obj[reason.text] = false
            return obj
        }, {}),
        inputOther: '',
        inputSideEffects: '',
        isModalShow: false,
        medReview: {
            display: '',
            image: {
                small: {
                    url: ''
                }
            }
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

        /* gets the medId from params (/meds-why-stopped/(medId)) */
        const medId = this.props.match.params.medId
        if (medId) {
            /* gets the CMR data from redux though props */
            this.cmr = this.props.cmr
            /* gets medication by finding the id in cmr.medications */
            const medReview = this.cmr.medications.find(medication => medication.id === medId)
            /* gets the reviewedMed from cmr[medication_*] */
            const reviewedMed = this.cmr[`medication_${medId}`]
            let inputOther = ""
            let inputSideEffects = ""
            /* loop over all reasonChoices to create the checkbox obj */
            const checkbox = reasonChoices.reduce((obj, reason) => {
                /* if reviewedMed.reasonNotTaken is array then check if any old reasonNotTaken answer */
                if (reviewedMed && Array.isArray(reviewedMed.reasonNotTaken)) {
                    reviewedMed.reasonNotTaken.map(r => {
                        if (r.text === reason.text) {
                            obj[reason.text] = true
                        }
                        if (r.text === "Other") {
                            inputOther = r.description
                        }
                        if (r.text === sideEffectsObj.text) {
                            inputSideEffects = reviewedMed.sideEffects
                        }
                        return null
                    })
                } else {
                    obj[reason.text] = false
                }
                return obj
            }, {})
            this.setState({
                medReview,
                checkbox,
                inputSideEffects,
                inputOther
            })
        }
    }
    selectCheckbox = (event) => {
        const { name } = event.target
        const checkbox = { ...this.state.checkbox }
        checkbox[name] = true
        if (name === 'Other') {
          this.refs.inputOther.focusTextInput()

        }
        else if (name === sideEffectsObj.text) {
            this.refs.inputSideEffects.focusTextInput()
        }
        this.setState({ checkbox })
    }
    toggleCheckbox = (event) => {
        const { name } = event.target
        const checkbox = { ...this.state.checkbox }
        checkbox[name] = !checkbox[name]
        // if (name === 'Other' && !checkbox[name]) {
        //   //  this.refs.inputOther.focusTextInput()
        //   this.refs.inputOther.setDisabled(true)
        // }
        // else if (name === sideEffectsObj.text && !checkbox[name]) {
        //     //this.refs.inputSideEffects.setDisabled(true)
        // }
        /* when the user clicks the other checkbox then inputOther input box will be fucused */
        if (name === 'Other' && checkbox[name]) {
          //  this.refs.inputOther.focusTextInput()
          //this.refs.inputOther.setDisabled(false)
          this.refs.inputOther.focusTextInput()

        }
        else if (name === sideEffectsObj.text && checkbox[name]) {
          //  this.refs.inputSideEffects.setDisabled(false)
            this.refs.inputSideEffects.focusTextInput()
        }
        this.setState({ checkbox })
    }

    onFocusInput = (event) => {
        /* this function will be called when user clicks the input text box for side effect or other
        clicking in the input box selects the check box| auto check the checkbox */
        const { name } = event.target
        const state = {}
        state.checkbox = { ...this.state.checkbox }
        if (name === 'inputOther')
        {
          state.checkbox.Other = true;
        }else if (name === 'inputSideEffects') {
          state.checkbox['I am concerned about side effects'] = true;
        }

        this.setState(state)
    }


    handleInputOther = (event) => {
        const { name, value } = event.target
        const state = {}

        state[name] = value
        state.checkbox = { ...this.state.checkbox }
        this.setState(state)
    }

    handleSubmit = async () => {
        /* gets the reviewed med object */
        const reviewedMed = this.cmr[`medication_${this.state.medReview.id}`]
        /* sets the med value to putting to the API the med is not taken so remove reason taken*/
        if (reviewedMed.reasonCode) {delete reviewedMed.reasonCode}
        const med = {
            ...reviewedMed,
            /* loop over this.state.checkbox and get the value */
            taken:"n",
            reasonNotTaken: Object.keys(this.state.checkbox).filter(text => this.state.checkbox[text]).map(text => {
                const reason = reasonChoices.find(reason => {
                    return reason.text === text
                })
                if (reason.text === 'Other') {
                    if (this.state.inputOther !== "") {
                        reason.description = this.state.inputOther
                    }
                }
                return reason
            })
        }
        if (this.state.checkbox[sideEffectsObj.text]) {
            if (this.state.inputSideEffects !== "") {
                med.sideEffects = this.state.inputSideEffects
            }
        }
        /* if user doesn't click any checkbox sets med.reasonNotTaken = {} */
        if (med.reasonNotTaken && med.reasonNotTaken.length === 0) {
            med.reasonNotTaken = {}
        }
        /* let the medPut be the med with medId key*/
        const medPut = {}
        medPut[`medication_${this.state.medReview.id}`] = med

        this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, medPut)
        this.cmr[`medication_${this.state.medReview.id}`] = med
        /* sets the cmr to the redux */
        this.props.setCMR(this.cmr)
        /* goes to meds-any-other-questions page */
        this.props.push(`/meds-any-other-questions/${this.props.match.params.medId}`)
    }

    handleTextArea = (event) => {
        const { value } = event.target
        this.setState({ inputSideEffects: value })
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
                    Why did you stop taking this medication?
                    </div>
                    </Col>
                    <div className={style. empty20}/>
                    </Row>


                    <Row className={style.inputWrapper}>
                     <Col>
                    <div className={style.indicationContainer}>

                                { /* create the checkbox list */}
                                {reasonChoices.map((reason, index) => (
                                       <span>
                                    <Row key={reason.text}>


                                      <Col xs={{ size: 1 }} md={{ size: 1}}  className={style.selectCheckWrapper}>
                                            <label className={style.checkboxContainer}>
                                            <input
                                                    name={reason.text}
                                                    type="checkbox"
                                                    checked={this.state.checkbox[reason.text]}
                                                    onChange={this.toggleCheckbox}
                                                />
                                              <span className={style.checkbox}></span>
                                             </label>
                                            </Col>


                                         <Col xs={{ size: 11 }}  md={{ size:11}} className={style.formLabel} >

                                            {reason.text === 'Other' ? (
                                              <div className={style.sideEffectLabel1} onClick={() => this.selectCheckbox({ target: { name: reason.text } })}>
                                                <InputText
                                                    ref="inputOther"
                                                    name="inputOther"
                                                    type="text"
                                                    placeholder="Enter Other Here"
                                                    value={this.state.inputOther}
                                                    onChange={this.handleInputOther}
                                                    onFocus={this.onFocusInput}
                                                    disabled={!this.state.checkbox.Other}
                                                />
                                              </div>
                                            ) : (reason.code === '182864000' ? (

                                              <span onClick={() => this.selectCheckbox({ target: { name: reason.text } })}>
                                              <Row>
                                              <Col>
                                              <span className={style.indicationConditionName}>{reason.text}</span>
                                              </Col>

                                              <Col className={style.sideEffectLabel} >
                                                <InputText
                                                    ref="inputSideEffects"
                                                    name="inputSideEffects"
                                                    type="text"
                                                    placeholder="Enter Side Effects Here"
                                                    value={this.state.inputSideEffects}
                                                    onChange={this.handleTextArea}
                                                    onFocus={this.onFocusInput}
                                                    disabled={!this.state.checkbox['I am concerned about side effects']}
                                                />
                                            </Col></Row>
                                          </span>

                                            ):(
                                                    <span
                                                        className={style.indicationConditionName}
                                                        onClick={() => this.toggleCheckbox({ target: { name: reason.text } })}
                                                    >
                                                        {reason.text}
                                                    </span>
                                                ))}
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
                               <Button id="MedsWhyStoppedButton" className={[style.btn, style.btnNext ]} onClick={this.handleSubmit}> NEXT STEP
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
)(MedsWhyStopped)
