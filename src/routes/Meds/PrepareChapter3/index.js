import React, { Component, Fragment } from 'react'
import { Container, Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import style from './style.scss'

import { connect } from 'react-redux'
import Medications from '../../../assets/meddications-bg-icon.svg'
import { savePageData } from 'redux/page/action'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class PrepareChapter3 extends Component {
  componentWillMount() {
      //set the state of the progress ProgressBarPatient
      this.props.savePageData({
          ShowProgressStep: 3
        })
      const cmr = this.props.cmr
      this.cmr = cmr
      this.anyOtherMeds()

      const page = window.location.pathname + window.location.search;
      if (process.env.NODE_ENV == 'production'){
        ReactGA.pageview(page);


      //get the current chapter starting time from page data
    var  startTime = this.props.page.data.chapter2Time;
      //current time, it gives the ending time of the previous chapter
      var currentTime = Date.now();
      //if start time avaliable, find the difference. it gives the total time spent on current chapter
      if(startTime) {
          var diff = currentTime - startTime;

          //generate the timing event to GA
          ReactGA.timing({
              category: 'Registration',
              variable: 'Chapter-2',
              value: diff, // in milliseconds
              label: 'Total Time'
          });
      }

          // keep the loading time of the 1st page of a chapter  page in page data,
      // so in chapter page display, we  can calcualte the total time for that chapter
      this.props.savePageData({
          chapter3Time: Date.now()
      })
    }
  }
  anyOtherMeds = () => {
      let anyOtherMedsFound = false
      /* loop over all cmr key */
      Object.keys(this.cmr).forEach(key => {
          if (key.includes('otherMedication_')) {
                anyOtherMedsFound = true
              }
      })
      this.setState({ anyOtherMeds: anyOtherMedsFound })
  }

    render() {
        return (
            <Fragment>
                <Row>
                    <Col className={style.pictureWrapper}>
                        <Medications className={style.pillWrapper} alt="Medications" />
                    </Col>
                </Row>

                <Container fluid className= {style.mainBodyPosition}>
                    <Row>
                        <Col className={style.headerBackground}>
                            <div className={style.mainHeader} >
                                <strong>
                                    <h1 className={style.heading}>
                                        {this.props.cmr.otherMedsCompleted
                                            ?  ('Click Next to Edit your Over the Counter Medications or Supplements')
                                            :(`  Nice Job! You've Completed Step 2`)
                                        }
                                    </h1>
                                    <span> Keep going, you are on your way to getting the most out of your medications.</span>
                                </strong>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className={style.bodyList}>
                                <ul className={style.bulletPoints}>
                                    <li>Medications can interact with each other and have a negative effect on your health, we are going to make sure that doesn't happen.</li>
                                    <li>In this next step, you can tell us about any over the counter medications or supplements you are taking.</li>
                                    <li>This can include things like daily vitamins, herbal supplements or medications that don't require a prescription.</li>
                                    <li>By sharing this information with our pharmacists, we can make sure you are on the safest, best medications for your condition.</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                      <Col className={[style.buttonInputWrapper, style.buttonWrapper].join(" ")}>
                            <Link to={this.state.anyOtherMeds ? ('/meds-new-medication/otherMedication_1'):(`/meds-other-meds`)}>
                                  <Button className = {[style.btn, style.btnNext, style.customBtnNext].join(" ")}>
                                      NEXT
                                  </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>

             </Fragment>
        )
    }
}

export default connect(
    ({
        page,
        cmr
    }) => ({
        page,
            cmr
        }),
    {
        savePageData
     }
)(PrepareChapter3)
