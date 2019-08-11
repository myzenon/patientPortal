import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import ProgressBarPatient from 'components/ProgressBarPatient'
import style from './style.scss'
import { savePageData } from 'redux/page/action'
import { connect } from 'react-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'
import { push } from 'react-router-redux'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

export class MedsOtherMeds extends Component {
    state = {
        lastMedBrand: ''
    }
    componentWillMount() {

        //set the state of the progress ProgressBarPatient
        this.props.savePageData({
            ShowProgressStep: 3
          })
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

        const cmr = this.props.cmr
        const patient = this.props.patient
        // if (!cmr.otherMedsCompleted) {
            this.cmr = cmr
            this.patient = patient
            this.setLastMedBrand()
        // }
        // else {
        //     this.props.push('/hedis-check-in')
        // }
    }

    setLastMedBrand = () => {
        let brandName = ''
        let lastMedIndex = 0
        /* loop over all cmr key */
        Object.keys(this.cmr).forEach(key => {
            if (key.includes('otherMedication_')) {
                const split = key.split('_')
                const medIndex = parseInt(split[1],10)
                if (medIndex > lastMedIndex) {
                    /* get brandname */
                    lastMedIndex = medIndex
                    brandName = this.cmr[key].brandName
                }
            }
        })
        this.setState({ lastMedBrand: brandName })
    }

    handleYesButton = () => {
        /* determine next page when user clicks the yes button */
        let page = '/meds-new-medication'

        Object.keys(this.cmr).forEach(key => {
            if (key.includes('otherMedication_')) {
                const med = this.cmr[key]
                if (!med.dosage) {
                    page = '/meds-new-medication/' + key
                }
                else if(!med.reviewCompleted) {
                    page = '/meds-any-other-questions/' + key
                }
            }
        })
        this.props.push(page)
    }

    handleNoButton = async () => {
        this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, {
            otherMedsCompleted: true
        })
        this.props.setCMR({
            ...this.props.cmr,
            otherMedsCompleted: true
        })
        if (this.props.cmr.smartQuestionsCompleted){
            this.props.push('/landing-page')
        } else{
            this.props.push('/prepare-Chapter4')
        }

    }

    render() {
        return (
                <Container  fluid className={style.content}>
                  <Row className={style.inputWrapper}>
                      <Col className={style.headingText}>
                      {this.state.lastMedBrand ? (<span>
                              Thanks <strong>{this.patient.name[0].given[0]}</strong> for helping us understand how you are using
                          </span>) : '' }
                          {this.state.lastMedBrand ? (
                          <div className={style.medName}>
                              {this.state.lastMedBrand}
                          </div>
                      ) : null}
                      </Col>
                  </Row>

                  <Row className={style.inputWrapper}>
                  <Col >
                      {this.state.lastMedBrand ? (<div className={style.line}/>) : '' }
                   </Col>
                   </Row>

                  <Row className={style.inputWrapper}>

                  {this.state.lastMedBrand ? (

                       <Col >

                  <div className={style.empty80}/>
                       <div className={style.aditionalText}>
                       Are there additional medications or herbal supplements you are taking?
                       </div><div className={style.subheading}>
                       Choose appropriate answer.

                       </div>
                       </Col>
                   ):
                     ( <Col>
                      <div className={style.headingText}>
                        Are there additional medications or herbal supplements you are taking?
                        </div><div className={style.subheading}>
                        Choose appropriate answer.
                        </div>
                     </Col>)}
                    </Row>

                       <Row className={style.inputWrapper}>
                            <div className={style.empty15}/>
                             <Col >
                               <span className={style.buttonWrapper}>
                               <span className={style.buttonGap}>
                                  <Button
                                        onClick={this.handleYesButton}
                                        className = {[style.btn, style.btnOutlineBackText ]}
                                  >
                                    YES
                                  </Button>
                                  </span>
                                  </span>

                               <span className={style.buttonWrapper}>
                               <span className={style.buttonGap}>
                                  <Button
                                        className = {[style.btn, style.btnOutlineBackText ]}
                                        onClick={this.handleNoButton}
                                  >
                                    NO
                                  </Button>
                                  </span>
                                  </span>
                              </Col>


                          </Row>

                              <div className={style.empty80}/>

                  </Container>
        )
    }
}

export default connect(
    ({
        cmr,
        patient
    }) => ({
        cmr,
        patient
    }),
    {
        callAPIGateway,
        setCMR,
        push
    }
)(MedsOtherMeds)
