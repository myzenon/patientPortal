import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './style.scss'
import { push } from 'react-router-redux'
import PDFPopup from 'components/viewPDFPopup'
import { callSyncAPIGateway } from 'redux/apiGateway/action'
import download from 'downloadjs'

import { Container, Button, Row, Col} from 'reactstrap'
import moment from 'moment'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class CMRComplete extends Component {
  state = {
      //pdf don't show until clicked/loaded
      showPDFPopup: false
  }


  setshowPDFPopup = (state) => {
      this.setState({
          showPDFPopup: state
      })
  }
  componentWillMount() {
    const page = window.location.pathname + window.location.search;
    if (process.env.NODE_ENV == 'production'){
        ReactGA.pageview(page);
    }
    const { cmr } = this.props

        // page protection
        if (!this.props.cmr.complete) {
           this.props.push('/')
        }
    }

    getTimes = () => {
        //const conversation = this.props.cmr.conversationDate.substr(0, this.props.cmr.conversationDate.length - 3)
        const conversation =  this.props.cmr.conversationDate;
        // generate the time into desire format with the moment lib.
        return moment(conversation).tz(moment.tz.guess()).format("MMMM Do")
    }


  downloadPDF(type){
      this.getPDF(type,false)
      // Call download lib | first param is file content | second is file name | third is file type.
      if (this.props.page.apiData) {
        download (
          'data:application/pdf;charset=utf-8;base64,' + this.props.page.apiData.body,
          `${this.props.user.firstName}_${this.props.user.lastName}_${type.toUpperCase()}.pdf`,
          'application/pdf'
      )
    }
    }

    getPDF = async (type, showView) => {

        // Call api to get an report
        await this.props.callSyncAPIGateway('reportsGet', {
            type: type.toUpperCase(),
            patientId: this.props.cmr.patientId
        })
        if (showView) {
          this.setshowPDFPopup(true)
        }
    }
    render() {

                if(this.state.showPDFPopup)
                    {return ( <Container fluid className={style.content}>
                                  <PDFPopup pdfData={this.props.page.apiData.body} onDone={() => this.setshowPDFPopup(false)} />
                              </Container>)}
                 else
                 {
                   return (
                              <Container fluid className={style.content}>
                               <div>
                                  <div className={style.title}>
                                          {this.props.user.firstName}, Your Review is Complete!
                                  </div>
                                  <div  className={style.bodytext}>
                                          Thank you for talking with us on <strong> {this.getTimes()} </strong> about your health and medications.
                                  </div>
                              </div>

                               <Row>
                                  <Col md={12} lg={6}>
                                       <br />
                                       <Row className={style.lettersWrapper}>
                                           <Col  lg={6} >
                                              <span className={style.heading3}>CMR Cover Letter </span>
                                           </Col>
                                           <Col  lg={3} >
                                              <Button className={style.buttonView} onClick={() => this.getPDF('cl', true)} >View</Button>
                                           </Col>
                                           <Col    lg={3} >
                                              <Button className={style.button} onClick={() => this.downloadPDF('cl')} >Download</Button>
                                           </Col>
                                       </Row>
                                       <Row className={style.lettersWrapper}>
                                          <Col lg={6}>
                                              <span className={style.heading3}>Medication Action Plan </span>
                                          </Col>
                                          <Col lg={3}>
                                              <Button className={style.buttonView} onClick={() => this.getPDF('map', true)} >View</Button>
                                          </Col>
                                          <Col lg={3}>
                                              <Button className={style.button} onClick={() => this.downloadPDF('map')} >Download</Button>
                                          </Col>
                                        </Row>
                                  <Row className={style.lettersWrapper}>

                                  <Col lg={6} >
                                  <span className={style.heading3}>Personal Medication List </span>
                                  </Col><Col lg={3}>
                                  <Button className={style.buttonView} onClick={() => this.getPDF('pml', true)} >View</Button>
                                  </Col><Col lg={3}>
                                  <Button className={style.buttonView} onClick={() => this.downloadPDF('pml')} >Download</Button>
                                  </Col></Row>

                              </Col>
                                  <Col md={12} lg={6} >
                                    <br />
                                    <div className={style.wrapper}>

                                      <strong>Suggestions from our pharmacists:</strong>
                                      <ul>
                                          <li>Have your action plan and medication list with you when you talk with your doctors, pharmacists, and other health care providers.</li>
                                          <li>Ask your doctors, pharmacists, and other healthcare providers to update them at every visit.</li>
                                          <li>Take your medication list with you if you go to the hospital or emergency room.</li>
                                          <li>Give a copy of the action plan and medication list to your family or caregivers.</li>
                                      </ul>


                                    </div>

                                  </Col>
                              </Row>
                              <div>
                                 <br />
                                      <div  className={style.bodytext}>
                                       If you want to discuss about your reports, please call <span className={style.phoneNumber}>{process.env.ARINE_PHONE}</span>.
                                       </div>
                              </div>
                              </Container>)
              }


    }
}



export default connect (
    ({ user, cmr, page }) => ({ user, cmr, page }),
    { push, callSyncAPIGateway }
)(CMRComplete)
