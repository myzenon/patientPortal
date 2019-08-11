import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'reactstrap'
import InputText from 'components/InputText'
import Image from 'components/Image'
import ProgressBarPatient from 'components/ProgressBarPatient'
import style from './style.scss'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'
import { savePageData } from 'redux/page/action'
import Morning from 'assets/morning.svg'
import Afternoon from 'assets/afternoon.svg'
import Evening from 'assets/evening.svg'
import Night from 'assets/night.svg'
import ErrorMessage from 'components/ErrorMessage'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');



export class MedsDosingRegimen extends Component {
    state = {
      medReview: {
          display: '',
          image: {
              small: {
                  url: ''
              }
          }
      },
        quantity: {'am': ' ',
                   'noon': ' ',
                   'pm': ' ',
                   'night': ' '
        },
        frequency: '',
        description: '',
        validation: {
                     pm: null,
                     noon: null,
                     pm: null,
                     night: null
        },
        isOtherMedication: false
    }

    handleInputText = (event) => {
        /* sets the input to the state and call handleValidation function */
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state, () => this.handleValidation(name, value))
    }

    handleValidation = (name, value) => {
        /* Checks the validation for each case */
        if (isNaN(value) || parseInt(value) < 0 || parseInt(value) > 99) {
            this.setValidationState(name, false)
            return
        }

        this.setValidationState(name, true)

    }

    setValidationState = (name, state) => {
        /* sets the validation for each name of input */
        const validation = { ...this.state.validation }
        validation[name] = state
        this.setState({ validation })
    }

    isShowError(state) {
        /* if validation is not null and undefined then show error */
        if (state === null || state === undefined) {
            return false
        }
        return state !== true
    }

    isFormValid = () => Object.keys(this.state.validation).reduce((valid, key) => {
        if (!valid) {
            return valid
        }
        if (this.state.validation[key] === null || this.state.validation[key] ) {
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
        if (this.isFormValid()){
                /* gets the med id from params (/meds-dosing-regimen/(medId)) */
                const id = this.props.match.params.medId
                let medId = "medication_" + id
                // /* if otherMedication_ is in the id then medId = id */
                // if (id.includes('otherMedication_')) {
                //     medId = id
                // }
                const cmr = this.cmr
                let med = {}

                // get old data
                med[medId] = {
                    ...this.reviewedMed
                }

                /* save the data */

                    med[medId] = {
                        ...med[medId],
                        "taken":"y",
                        "dosage": {
                            ...med[medId].dosage,
                                "quantity": {"am": this.state.quantityAM != "" ? this.state.quantityAM : "0",
                                        "noon": this.state.quantityNoon != "" ? this.state.quantityNoon : "0",
                                        "pm": this.state.quantityPM != "" ? this.state.quantityPM : "0",
                                        "night": this.state.quantityNight != "" ? this.state.quantityNight : "0"}
                            }
                    }

                this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, med)
                /* sets the cmr to the redux */
                cmr[medId] = med[medId]
                this.props.setCMR(cmr)
                // /*this.props.savePageData({ alternativeScheduleActive: false })*/
                /* if the id of med that is reviewing is otherMedication_ then goes to meds-any-other-questions */
                // if (this.state.isOtherMedication) {
                //     this.props.push('/meds-any-other-questions/' + id)
                // }
                // else {
                this.props.push('/meds-what-for/' + this.state.medReview.id)
                //}
                }
    }
    componentWillMount = () => {
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
        //set the state of the progress ProgressBarPatient
        this.props.savePageData({
            ShowProgressStep: 2
          })
        /* gets the CMR data from redux though props */
        this.cmr = this.props.cmr

        /* gets the medId from params (/meds-verify-drug/(medId)) */
        const medId = this.props.match.params.medId

        if (medId) {

            let medReview = null
            let reviewedMed = null

            /* if otherMedication_ is in medId then gets the med from cmr[otherMedication_*] */
            // if (medId.includes('otherMedication_')) {
            //     medReview = this.cmr[medId]
            //     reviewedMed = this.cmr[medId]
            // }
            // else {
            /* gets medication by finding the id in cmr.medications */
            medReview = this.cmr.medications.find(medication => medication.id === medId)
            /* gets the reviewedMed from cmr[medication_*] */
            reviewedMed = this.cmr[`medication_${medId}`]


            // define variable to change state
            let newState = {
              quantityAM:'',
              quantityNoon:'',
              quantityPM:'',
              quantityNight:'',
              validation: {
                           quantityAM: null,
                           quantityNoon: null,
                           quantityPM: null,
                           quantityNight: null
              }
                // ,
                // isOtherMedication: medId.includes('otherMedication_')
            }
            newState.medReview = medReview

            // set reviewedMed as attribute of class
            this.reviewedMed = reviewedMed

            /* if reviewedMed is found then sets the old answer to the state */
             if (reviewedMed.dosage && reviewedMed.dosage.quantity) {
                newState.quantityAM = reviewedMed.dosage.quantity.am
                newState.quantityNoon = reviewedMed.dosage.quantity.noon
                newState.quantityPM = reviewedMed.dosage.quantity.pm
                newState.quantityNight = reviewedMed.dosage.quantity.night

            }

            this.setState(newState)




            /* if otherMedication_ is in medId then gets the med from cmr[otherMedication_*] */
            // if (medId.includes('otherMedication_')) {
            //     this.setState({
            //         medReview: this.cmr[medId],
            //         isOtherMedication: true
            //     })
            // }
            // else {

            //     // set reviewedMed as attribute of class
            //     this.reviewedMed = reviewedMed
            //     // define variable to change state
            //     let newState = {
            //         medReview
            //     }
            //     // /

            // }
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
                    Please tell us how you are taking this medication.
                    </div><p/>
                    </Col>
                    </Row>

                    <Row className={style.inputWrapper}>
                     <Col >
                     <div className={style.medsTakingHeading}>
                    Please enter the number of dosage_unit you take of this medication at each time of day.
                    </div>
                    </Col>
                    </Row>


                    <Form onSubmit={this.handleSubmit}>


                        <Row className={style.inputWrapper}>
                            <Col xs={12}  md={{ size: 3}} className={style.colGap} >
                                <div className={style.rectangle}>
                                    <div className={style.rectangleOValGap}>
                                        <div className={style.oval}>
                                            <div className={style.ovalIconGap}>
                                            <Morning className={style.morning}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={style.medSlotText}>
                                        In the Morning
                                    </div>

                                    <div className={style.ntextboxwrapper}>
                                        <InputText
                                            name="quantityAM"
                                            autoFocus
                                            type="text"
                                            placeholder=""
                                            value={this.state.quantityAM}
                                            onChange={this.handleInputText}
                                            error={this.isShowError(this.state.validation.quantityAM)}
                                            textalign="center"
                                        />
                                    </div>

                                    {this.isShowError(this.state.validation.quantityAM) ?
                                       <div>
                                            <p />
                                            <ErrorMessage  message="Please enter a number from 0-99." />
                                        </div>
                                            :
                                            null
                                        }
                                    </div>
                            </Col>
                            <Col xs={12}  md={{ size: 3}}  className={style.colGap} >
                                <div className={style.rectangle}>
                                    <div className={style.rectangleOValGap}>
                                        <div className={style.oval}>
                                            <div className={style.ovalIconGapNoon}>
                                            <Afternoon className={style.afternoon}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={style.medSlotText}>
                                        In the Afternoon
                                    </div>

                                        <div className={style.ntextboxwrapper}>
                                            <InputText
                                            name="quantityNoon"
                                            type="text"
                                            placeholder=""
                                            value={this.state.quantityNoon}
                                            onChange={this.handleInputText}
                                            error={this.isShowError(this.state.validation.quantityNoon)}
                                            textalign="center"
                                        />
                                    </div>

                                    {this.isShowError(this.state.validation.quantityNoon) ?
                                       <div>
                                            <p />
                                            <ErrorMessage  message="Please enter a number from 0-99." />
                                        </div>
                                            :
                                            null
                                        }
                                    </div>
                             </Col>


                            <Col xs={12}  md={{ size: 3}}  className={style.colGap} >
                                <div className={style.rectangle}>
                                    <div className={style.rectangleOValGap}>
                                        <div className={style.oval}>
                                            <div className={style.ovalIconGapEvening}>
                                            <Evening className={style.evening}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={style.medSlotText}>
                                    In the Evening
                                    </div>

                                        <div className={style.ntextboxwrapper}>
                                        <InputText
                                            name="quantityPM"
                                            placeholder=""
                                            type="text"
                                            value={this.state.quantityPM}
                                            onChange={this.handleInputText}
                                            error={this.isShowError(this.state.validation.quantityPM)}
                                            textalign="center"
                                        />
                                    </div>

                                    {this.isShowError(this.state.validation.quantityPM) ?
                                       <div>
                                            <p />
                                            <ErrorMessage  message="Please enter a number from 0-99." />
                                        </div>
                                            :
                                            null
                                        }
                                    </div>
                             </Col>


                            <Col xs={12}  md={{ size: 3}} className={style.colGap} >
                                <div className={style.rectangle}>
                                    <div className={style.rectangleOValGap}>
                                        <div className={style.oval}>
                                            <div className={style.ovalIconGapNight}>
                                            <Night className={style.night}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={style.medSlotText}>
                                    In the Night
                                    </div>
                                        <div className={style.ntextboxwrapper}>
                                            <InputText
                                                name="quantityNight"
                                                type="text"
                                                placeholder=""
                                                value={this.state.quantityNight}
                                                onChange={this.handleInputText}
                                                error={this.isShowError(this.state.validation.quantityNight)}
                                                textalign="center"
                                                />
                                       </div>

                                    {this.isShowError(this.state.validation.quantityNight) ?
                                       <div>
                                            <p />
                                            <ErrorMessage  message="Please enter a number from 0-99." />
                                        </div>
                                            :
                                            null
                                        }
                                    </div>
                             </Col>
                         </Row>
                        <Row className={style.inputWrapper}>
                        <Col>
                            <div className={style. empty40}/>
                           <div className={style.buttonWrapper}>
                               <Button type="submit" className={[style.btn, style.btnNext ]}>NEXT STEP
                               </Button>
                           </div>
                            </Col>
                           </Row>

                            <div className={style. empty40}/>
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
)(MedsDosingRegimen)
