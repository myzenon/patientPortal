import React, { Component, Fragment } from 'react'
import { Container, Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import style from './style.scss'

import { countAmountMedsCompleted } from 'libs/utils'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Pill from '../../../assets/pill-bg-icon.svg'

import { savePageData } from 'redux/page/action'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

export class PrepareChapter2 extends Component {
    componentWillMount() {
      //set the state of the progress ProgressBarPatient
      this.props.savePageData({
          ShowProgressStep: 2
        })
      //this.setState({ ShowProgressStep: 'step 2' })
    //  ProgressBarStep('2e')
        //find the current page and send the current page stats to GA
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);

                //get the current chapter starting time from page data
                var startTime = this.props.page.data.chapter1Time;
                //current time, it gives the ending time of the previous chapter
                    var currentTime = Date.now();
                    //if start time avaliable, find the difference. it gives the total time spent on current chapter
                    if(startTime) {
                        var diff = currentTime - startTime;

                        //generate the timing event to GA
                        ReactGA.timing({
                            category: 'Registration',
                            variable: 'Chapter-1',
                            value: diff, // in milliseconds
                            label: 'Total Time'
                        });
                    }

                    // keep the loading time of the 1st page of a chapter  page in page data,
                    // so in chapter page display, we  can calcualte the total time for that chapter
                    this.props.savePageData({
                        chapter2Time: Date.now()
                })
            }
    }

    render() {
        var greetingHeader = (
            <Fragment>
              <h1 className={style.heading}>Click Next to Edit your Medications </h1>
              <span>Keep going, you are on your way to getting the most out of your medications</span>
            </Fragment>
        )

        var congratsHeader = (
            <Fragment>
                <h1 className={style.heading}> Congratulations! You have Completed Step 1 </h1>
            </Fragment>
        )
        return (
            <Fragment>
                <Row>
                    <Col className={style.pictureWrapper}>
                        <Pill className={style.pillWrapper} alt="Pill" />
                    </Col>
                </Row>

                <Container fluid className= {style.mainBodyPosition}>
                    <Row>
                        <Col className={style.headerBackground}>
                            <div className={style.mainHeader}>
                                <strong>
                                    <span>
                                        {countAmountMedsCompleted(this.props.cmr) == 0 ?  (congratsHeader) : (greetingHeader)}
                                    </span>
                                </strong>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className={style.bodyList}>
                            <ul className={style.bulletPoints}>
                                    <li>We are going to ask about how you are taking your medications, and what you are taking them for.</li>
                                    <li>If you have any questions about your medications you can ask us, and our pharmacists will answer them.</li>
                                    <li>It might be helpful to have your medications in front of you for the  next section.</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={[style.buttonInputWrapper, style.buttonWrapper].join(" ")}>

                                <Link to={countAmountMedsCompleted(this.props.cmr) == 0
                                            ? ('/meds-identified')
                                            : (`/meds-verify-drug/${this.props.cmr.medications[0].id}`
                                    )}>
                                    <Button className = {[style.btn, style.btnNext, style.customBtnNext].join(' ')}>
                                        NEXT STEP
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
    ({page, cmr }) => ({
        page, cmr }),
    {
        savePageData
     }
)(PrepareChapter2)
